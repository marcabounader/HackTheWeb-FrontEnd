import { useState } from "react";
import LabModal from "../../Modals/LabModal";
import { stopLab } from "../../../helpers/user.helpers";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setActiveLabs } from '../../../slices/labSlice'; 
import { useNavigate } from "react-router-dom";
const LabCard = ({lab,isActive}) => {
    const dispatch= useDispatch();
    const activeLabs = useSelector((state) => state.labs.activeLabs);
    const [showLab,setShowLab]=useState(false);
    const handleOpenShowLab = () => setShowLab(true);
    const handleCloseShowLab = () => setShowLab(false);
    const navigate =useNavigate();

    const user = useSelector((state) => state.user);
    const { token } = user;
    const handleStopLab = async () => {
        
        const {data , errors, message} = await stopLab(token,lab.project_name);
        if(message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
            dispatch(setActiveLabs(activeLabs.filter((activeLab) => activeLab.id !== lab.id)));
        }
    }
    return ( 
        <>
        <LabModal isOpen={showLab} handleCloseViewModal={handleCloseShowLab} lab={lab}/>
        <div className=" cursor-pointer flex w-[352] h-[157px] p-[10px] flex-col align-start justify-around shadow-md bg-bg-card rounded-[10px]">
            <div className="flex flex-row" onClick={handleOpenShowLab}>
                <img className="w-[60px] h-[50px]" src={lab.icon_url} alt="lab image"/>
                <h6 className=" flex-grow self-stretch text-center capitalize">{lab.name}</h6>
            </div>
            <div className="flex flex-row justify-between items-center">
                <p className=" text-green-400">{lab.difficulty_info.difficulty}</p>
                <p>Reward: {lab.reward}</p>
                { isActive && <button className="btn secondary-btn" onClick={handleStopLab}>Stop</button>}
            </div>
        </div>
        </>
     );
}
 
export default LabCard;