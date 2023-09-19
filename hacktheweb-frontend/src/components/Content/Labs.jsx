import LabCard from "../Cards/LabCard";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddLabModal from "../Modals/AddLabModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { getLabs } from "../../helpers/user.helpers";
import { setLabs } from "../../slices/labSlice";

const Labs = ({labs_tab}) => {
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const [perPage,setPerPage]=useState(9);
    const [totalLabs,setTotalLabs] = useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const labs = useSelector((state) => state.labs.labs);
    const user = useSelector((state) => state.user);
    const [showLabAdd,setShowLabAdd] = useState(false);
    const handleOpenLab = () => setShowLabAdd(true);
    const handleCloseLab = () =>setShowLabAdd(false);
    const { type_id,token} = user;   
    const fetchLabs = async () => {
        try {
          const { data, message, errorMessages } = await getLabs(token,currentPage);
          if (message && message === "Unauthenticated.") {
            navigate("/");
          } else if (data && data.labs) {
            dispatch(setLabs(data.labs.data));
            setTotalPages(data.labs.last_page);
            setPerPage(data.labs.per_page);
            setTotalLabs(data.labs.total);
          }
        } catch (error) {
          console.error("Error fetching labs:", error);
        }
      };
      const handlePageChange = (event,page) => {
        setCurrentPage(page);
        fetchLabs();
      };
      useEffect(() => {
        if (labs_tab) {  
          fetchLabs();
        }
      }, [labs_tab]); 
    return ( 
        <>
        <AddLabModal isOpen={showLabAdd} token={token} handleCloseViewModal={handleCloseLab}></AddLabModal>
        {type_id=="3" ?
        <h1 className=" text-start w-full">Labs</h1>
        :
        <div className="flex flex-row basis-full justify-between items-center">
            <h1 className=" text-start ">Labs</h1>
            <FontAwesomeIcon onClick={handleOpenLab} icon={faPlusSquare} className="text-color-secondary w-[40px] h-[40px]" ></FontAwesomeIcon>
        </div>
        }
            <Stack className="basis-full flex flex-col items-center">
                <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                />
            </Stack>
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