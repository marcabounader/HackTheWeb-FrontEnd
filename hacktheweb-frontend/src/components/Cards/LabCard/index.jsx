import { useState } from "react";
import LabModal from "../../Modals/LabModal";
import { stopLab } from "../../../helpers/user.helpers";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setActiveLabs, setLabInactive } from '../../../slices/labSlice'; 
import { useNavigate } from "react-router-dom";
const LabCard = ({lab}) => {
    const dispatch= useDispatch();
    const active_labs = useSelector((state) => state.labs.activeLabs);
    const [showLab,setShowLab]=useState(false);
    const handleOpenShowLab = () => setShowLab(true);
    const handleCloseShowLab = () => setShowLab(false);
    const navigate =useNavigate();
    const matchingActiveLab = active_labs.find((active_lab) => active_lab.lab_id === lab.id);
    const user = useSelector((state) => state.user);
    const { token } = user;
    const handleStopLab = async () => {
        const {data , errorMessages, message} = await stopLab(token,matchingActiveLab.project_name);
        if(message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
            dispatch(setActiveLabs(active_labs.filter((activeLab) => activeLab.lab_id !== lab.id)));
            dispatch(setLabInactive(lab.id));
        }
    }
    return ( 
        <>
        <LabModal isOpen={showLab} handleCloseViewModal={handleCloseShowLab} lab={lab} token={token} active_labs={active_labs} matchingActiveLab={matchingActiveLab}/>
        <div className=" flex w-[352] h-[157px] p-[10px] flex-col align-start justify-around shadow-md bg-bg-card rounded-[10px] gap-2">
            <div className="flex flex-row cursor-pointer gap-3" onClick={handleOpenShowLab}>
                <img className="w-[60px] h-[50px]" src={lab.icon_url} alt="lab image"/>
                <h6 className=" flex-grow self-stretch text-center capitalize">{lab.name}</h6>
            </div>
            <div className="flex flex-row justify-between items-center">
                <p className=" text-green-400">{lab.difficulty_info.difficulty}</p>
                <p>Reward: {lab.reward}</p>
            </div>
            <div className="flex flex-row justify-end items-center">
                { lab.isComplete && <p className=" text-color-main font-bold">Done</p> }
                { lab.isActive && <button className="btn secondary-btn mx-2" onClick={handleStopLab}>Stop</button>}
            </div>
        </div>
        </>
     );
}
 
export default LabCard;