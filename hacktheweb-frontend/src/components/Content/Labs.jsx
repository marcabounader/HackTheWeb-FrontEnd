import LabCard from "../Cards/LabCard";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddLabModal from "../Modals/AddLabModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from '@mui/material/styles';



const Labs = ({theme,labs_tab,setCurrentPage,fetchLabs,totalPages,currentPage}) => {

    const labs = useSelector((state) => state.labs.labs);
    const user = useSelector((state) => state.user);
    const [showLabAdd,setShowLabAdd] = useState(false);
    const handleOpenLab = () => setShowLabAdd(true);
    const handleCloseLab = () =>setShowLabAdd(false);
    const { type_id,token} = user;   
    const [searchTerm,setSearchTerm] = useState("");
    const filteredLabs = labs.filter((lab) =>
    lab.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const handlePageChange = (event,page) => {
        setCurrentPage(page);
        fetchLabs();
    };
    useEffect(() => {
        setCurrentPage(1);
        fetchLabs();
    }, [labs_tab]); 
    return ( 
        <>
        <AddLabModal isOpen={showLabAdd} token={token} handleCloseViewModal={handleCloseLab}></AddLabModal>
        {type_id=="3" ?
        (
        <h1 className=" text-start w-full">Labs</h1>
        )
        :
        (
        <div className="flex flex-row basis-full justify-between items-center">
            <h1 className=" text-start ">Labs</h1>
            <FontAwesomeIcon onClick={handleOpenLab} icon={faPlusSquare} className="text-color-secondary w-[40px] h-[40px]" ></FontAwesomeIcon>
        </div>
        )}

        {labs && labs.length > 0 ? (
                <>
                <div className="w-full flex flex-row justify-center items-center">
                    <input
                    type="search"
                    placeholder="Search Labs"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {filteredLabs && filteredLabs.length > 0 ? 
                (
                    <>
                    {filteredLabs.map((lab, index) => (
                    <LabCard lab={lab} key={index} />
                    ))}
                </>
                )
                :
                (
                <>
                    {labs
                    .map((lab, index) => <LabCard lab={lab} key={index} />)}

                    <ThemeProvider theme={theme}>
                    <Stack className="basis-full flex flex-col items-center">
                            <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            />
                    </Stack>
                    </ThemeProvider>

                </>
                )}
                </>
            ) : (
                <p>No labs available.</p>
        )}
        
        </>
     );
}
 
export default Labs;