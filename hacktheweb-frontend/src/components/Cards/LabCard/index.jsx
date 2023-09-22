import { useState } from "react";
import LabModal from "../../Modals/LabModal";
import { stopLab } from "../../../helpers/user.helpers";
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';
import { setActiveLabs, setLabInactive, setLabs } from '../../../slices/labSlice'; 
import { useNavigate } from "react-router-dom";
import AddLabModal from "../../Modals/AddLabModal";
import { deleteLab } from "../../../helpers/admin.helpers";
import SpinningIcon from "../../Animation/Spinner";
const LabCard = ({lab}) => {
    const dispatch= useDispatch();
    const active_labs = useSelector((state) => state.labs.activeLabs);
    const labs = useSelector((state) => state.labs.labs);
    const [showLab,setShowLab]=useState(false);
    const handleOpenShowLab = () => setShowLab(true);
    const handleCloseShowLab = () => setShowLab(false);
    const [showModifyLab,setShowModifyLab] = useState(false);
    const handleOpenModifyLab = () => setShowModifyLab(true);
    const handleCloseModifyLab = () =>setShowModifyLab(false);
    const navigate =useNavigate();
    const user = useSelector((state) => state.user);
    const { token ,type_id} = user;
    const [isStopLoading, setisStopLoading] = useState(false);

    const handleStopLab = async () => {
        setisStopLoading(true);
        const {data , errorMessages, message} = await stopLab(token,lab.active_lab.project_name);
        if(message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
            setisStopLoading(false);
            dispatch(setLabInactive(lab.id));
        }
    }
    const handleDeleteLab = async () => {
        const {data , errorMessages, message} = await deleteLab(token,lab.id);
        if(message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
            dispatch(setLabs(labs.filter((old_lab) => old_lab.id !== lab.id)));
        }
    }
    return ( 
        <>
        <LabModal isStopLoading={isStopLoading} handleStopLab={handleStopLab} isOpen={showLab} handleCloseViewModal={handleCloseShowLab} lab={lab} token={token} active_labs={active_labs} />
        <AddLabModal lab={lab} isOpen={showModifyLab} token={token} handleCloseViewModal={handleCloseModifyLab}></AddLabModal>

        { type_id =="3" ?
        (
        <div className=" flex w-[352px] p-[10px] flex-col align-start justify-around shadow-md bg-bg-card rounded-[10px] gap-2">
            <div className="flex flex-row cursor-pointer gap-3" onClick={handleOpenShowLab}>
                <img className="w-[60px] h-[50px]" src={lab.icon_url} alt="lab image"/>
                <h6 className=" flex-grow self-stretch text-center capitalize">{lab.name}</h6>
            </div>
            <div className="flex flex-row justify-between">
            <div className="flex flex-col justify-between items-start ">
                <p className={` ${lab.difficulty_id=='1' && "text-red-400"} ${lab.difficulty_id=='2' && "text-orange-400"} ${lab.difficulty_id=='3' && "text-green-400"}`}>Difficulty: {lab.difficulty_info.difficulty}</p>
                <p>Reward: {lab.reward}</p>
                { lab.isComplete ? 
                <p className=" text-color-main font-bold">Status: Complete</p> 
                :
                <p className=" text-color-main font-bold">Status: Incomplete</p> 
                }
            </div>
            <div className="flex flex-row justify-end items-end">
                { lab.isActive ?
                (
                    isStopLoading ?
                    <SpinningIcon className="w-[25px] h-[25px]"/>
                    :
                    <button className="btn secondary-btn mx-2" onClick={handleStopLab}>Stop</button>
                )
                :
                <></>
                }
            </div>
            </div>
        </div>
        )
        :
        (
        <div className="flex min-w-[352px] basis-1 p-[10px] flex-col align-start justify-around shadow-md bg-bg-card rounded-[10px] gap-2">
            <div className="flex flex-row cursor-pointer gap-3" onClick={handleOpenModifyLab}>
                <img className="w-[60px] h-[50px]" src={lab.icon_url} alt="lab image"/>
                <h6 className=" flex-grow self-stretch text-center capitalize">{lab.name}</h6>
            </div>
            <div className="flex flex-row justify-between">
                <div className="flex flex-col justify-between items-start ">
                <p className={` ${lab.difficulty_id=='1' && "text-red-400"} ${lab.difficulty_id=='2' && "text-orange-400"} ${lab.difficulty_id=='3' && "text-green-400"}`}>Difficulty: {lab.difficulty_info.difficulty}</p>
                    <p>Reward: {lab.reward}</p>
                </div>
            </div>
            <div className="flex flex-row justify-end items-end">
                <button className="btn secondary-btn mx-2" onClick={handleDeleteLab}>Delete</button>
            </div>
        </div>
        )
        }
        </>
     );
}
 
export default LabCard;