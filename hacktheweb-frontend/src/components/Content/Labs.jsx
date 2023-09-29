import LabCard from "../Cards/LabCard";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddLabModal from "../Modals/AddLabModal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { ThemeProvider } from '@mui/material/styles';
import { debounce } from "@mui/material";



const Labs = ({handleSearch,theme,labs_tab,setCurrentPage,totalPages,currentPage}) => {

    const labs = useSelector((state) => state.labs.labs);
    const user = useSelector((state) => state.user);
    const [showLabAdd,setShowLabAdd] = useState(false);
    const handleOpenLab = () => setShowLabAdd(true);
    const handleCloseLab = () =>setShowLabAdd(false);
    const { type_id,token} = user;   
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [debounceTimer, setDebounceTimer] = useState(null);

    const handlePageChange = (event,page) => {
        setCurrentPage(page);
        handleSearch(debouncedSearch)
    };


    const handleSearchChange = (event) => {
        const { value } = event.target;
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        setDebouncedSearch(value);
        if (value !== "" && labs && labs.length > 0) {
            setCurrentPage(1);
            const timerId = setTimeout(() => {
                handleSearch(value);
            }, 300);
            setDebounceTimer(timerId);
        } else {
            setCurrentPage(1);
            handleSearch('');
        }
      };

    useEffect(() => {
        setCurrentPage(1);
        setDebouncedSearch('');
        handleSearch(debouncedSearch);
    }, [labs_tab]); 

    return ( 
        <>
        <AddLabModal isOpen={showLabAdd} token={token} handleCloseViewModal={handleCloseLab}></AddLabModal>
        <div className="basis-full flex-wrap flex flex-row justify-between items-center">
        {type_id=="3" ?
        (
        <>
        <h1 className=" text-start ">Labs</h1>
        <input
                    type="search"
                    placeholder="Search Labs"
                    value={debouncedSearch}
                    onChange={handleSearchChange}
                    />
        </>
        )
        :
        (
        <>
            <h1 className=" text-start ">Labs</h1>
            <input
                type="search"
                placeholder="Search Labs"
                value={debouncedSearch}
                onChange={handleSearchChange}
            />
            <FontAwesomeIcon onClick={handleOpenLab} icon={faPlusSquare} className="text-color-secondary w-[40px] h-[40px]" ></FontAwesomeIcon>
        </>
        )}
        </div>

        {labs && labs.length > 0 ? (
                <>

                {labs.map((lab, index) => (
                    <LabCard lab={lab} key={index} />
                ))}
                <ThemeProvider theme={theme}>
                    <Stack className="basis-full flex flex-col items-center">
                            <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            color="primary"
                            style={{color:'red'}}
                            />
                    </Stack>
                </ThemeProvider>
                </>
            ) : (
                <p>No labs available.</p>
        )}
        
        </>
     );
}
 
export default Labs;