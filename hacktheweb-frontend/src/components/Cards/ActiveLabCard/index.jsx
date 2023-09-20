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
        if(message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
            dispatch(removeActiveLab(lab.id));
            dispatch(setLabInactive(lab.id));
        }
    }
    return ( 
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black opacity-75 shadow-md">
            <div className="basis-1/5 capitalize text-left ml-2">{lab.user_info.name}</div>
            <div className="basis-1/5 text-left">{lab.user_info.email}</div>
            <div className="basis-1/5 text-left">{lab.project_name}</div>
            <div className="basis-1/5 text-left">{lab.flag}</div>
            <div className="basis-1/5 text-left">{lab.port}</div>
            <div className="basis-1/5 text-left">{lab.launch_time}</div>
            <div className="basis-1/5 text-left">
                <button className="btn-2 secondary-btn" onClick={handleStopLab}>Stop</button>
            </div>


        </div>
    );
}
 
export default ActiveLabCard;