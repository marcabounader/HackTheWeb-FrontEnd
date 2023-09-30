import { useSelector } from "react-redux";
import ActiveLabCard from "../Cards/ActiveLabCard";
import { Pagination, Stack, ThemeProvider, debounce } from "@mui/material";
import { useEffect, useState } from "react";

const AdminActiveLabs = ({activePerPage,setActivePerPage,handleActiveSearch,theme, setCurrentPage,totalPages,currentPage}) => {
    const active_labs = useSelector((state) => state.labs.activeLabs);
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const handleItemsPerPageChange = (event, value) => {
      setActivePerPage(value);
    };
    const handleSearchChange = (event) => {
      const { value } = event.target;
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
      setDebouncedSearch(value);
      if (value !== "" && active_labs && active_labs.length > 0) {
        setCurrentPage(1);
          const timerId = setTimeout(() => {
              handleActiveSearch(value);
          }, 300);
          setDebounceTimer(timerId);
      } else {
          setCurrentPage(1);
          handleActiveSearch('');
      }
    };
    const handlePageChange = (event,page) => {
      setCurrentPage(page);
      handleActiveSearch(debouncedSearch)
    };
    useEffect(() => {
        setCurrentPage(1);
        handleActiveSearch('');
        setDebouncedSearch('');
    }, []);
    useEffect(()=>{
      handleActiveSearch(debouncedSearch);
    },[activePerPage]);
    return ( 
        <>
        <div className=" basis-full flex flex-row justify-between items-center">
        <h1 className="text-start self-stretch w-full">User Active Labs</h1>
        <input
                    type="search"
                    placeholder="Search Active Labs"
                    value={debouncedSearch}
                    onChange={handleSearchChange}
        />
        </div>
        <div className="active-lab-header flex gap-[10px] h-[64px] w-full items-center bg-black shadow-md overflow-x-auto">
            <div className="basis-1/5  text-left uppercase ml-2">Name</div>
            <div className="basis-1/5 uppercase text-left">Email</div>
            <div className="basis-1/5  text-left uppercase">Docker Name</div>
            <div className="basis-1/5  text-left uppercase">Flag</div>
            <div className="basis-[15%] text-left uppercase">Port</div>
            <div className="basis-1/5  text-left uppercase">Launch Time</div>
            <div className="basis-[15%]  text-center uppercase">Action</div>

        </div>
        {active_labs && active_labs.length > 0 ? (
          <>

                <div className="flex flex-col w-full gap-[5px]">
                {active_labs
                .map((lab, index) => <ActiveLabCard lab={lab} key={index} />)}
                </div>

                <div className="basis-full flex flex-row justify-center items-center">
        <ThemeProvider theme={theme}>
        <Stack>
                <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                />
        </Stack>
        </ThemeProvider>
        <select className=" rounded-none text-black" value={activePerPage} onChange={(e) => handleItemsPerPageChange(e, e.target.value)}>
        <option value={5}>5 per page</option>
        <option value={10}>10 per page</option>
        <option value={15}>15 per page</option>
        <option value={20}>20 per page</option>
        </select>
        </div>
          </>
        ) : (
          <p>No Active Labs.</p>
        )}
      </>
     );
}
 
export default AdminActiveLabs;