import LabCard from "../Cards/LabCard";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddLabModal from "../Modals/AddLabModal";

const Labs = () => {
    const labs = useSelector((state) => state.labs.labs);
    const user = useSelector((state) => state.user);
    const [showLabAdd,setShowLabAdd] = useState(false);
    const handleOpenLab = () => setShowLabAdd(true);
    const handleCloseLab = () =>setShowLabAdd(false);
    const [showModifyLab,setShowModifyLab] = useState(false);
    const handleOpenModifyLab = () => setShowModifyLab(true);
    const handleCloseModifyLab = () =>setShowModifyLab(false);
    const { type_id,token} = user;    
    return ( 
        <>
        <AddLabModal isOpen={showLabAdd} token={token} handleCloseViewModal={handleCloseLab}></AddLabModal>
        {type_id=="3" ?
        <h1 className=" text-start w-full">Labs</h1>
        :
        <div className="flex flex-row basis-full justify-between items-center">
            <h1 className=" text-start ">Labs</h1>
            {type_id=="3" ? 
            <FontAwesomeIcon onClick={handleOpenLab} icon={faPlusSquare} className="text-color-secondary w-[40px] h-[40px]" ></FontAwesomeIcon>
            :
            <FontAwesomeIcon onClick={handleOpenModifyLab} icon={faPlusSquare} className="text-color-secondary w-[40px] h-[40px]" ></FontAwesomeIcon>
            }
        </div>
        }
            {labs && labs.length > 0 ? (
                labs
                .map((lab, index) => <LabCard lab={lab} key={index} />)
            ) : (
                <p>No labs available.</p>
            )}
        </>
     );
}
 
export default Labs;