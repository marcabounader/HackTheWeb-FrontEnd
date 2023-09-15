import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { stopLab } from "../../../helpers/admin.helpers";
import { removeActiveLab, setLabInactive } from "../../../slices/labSlice";
const ActiveLabCard = ({lab}) => {
    const dispatch= useDispatch();

    const navigate =useNavigate();
    const user = useSelector((state) => state.user);
    const { token ,type_id} = user;
    const handleStopLab = async () => {
        const {data , errorMessages, message} = await stopLab(token,lab.project_name);
        console.log(data);
        if(message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
            dispatch(removeActiveLab(lab.id));
            dispatch(setLabInactive(lab.id));
        }
    }
    return ( 
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
            <div className="basis-1/5 capitalize text-center">{lab.user_info.name}</div>
            <div className="basis-1/5 text-center">{lab.user_info.email}</div>
            <div className="basis-1/5 text-center">{lab.project_name}</div>
            <div className="basis-1/5 text-center">{lab.flag}</div>
            <div className="basis-1/5 text-center">{lab.port}</div>
            <div className="basis-1/5 text-center">{lab.launch_time}</div>
            <div className="basis-1/5 text-center">
                <button className="btn-2 secondary-btn" onClick={handleStopLab}>Stop</button>
            </div>


        </div>
    );
}
 
export default ActiveLabCard;