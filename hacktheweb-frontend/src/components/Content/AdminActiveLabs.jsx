import { useSelector } from "react-redux";
import ActiveLabCard from "../Cards/ActiveLabCard";
import { Pagination, Stack, ThemeProvider, debounce } from "@mui/material";
import { useEffect, useState } from "react";

const AdminActiveLabs = ({handleActiveSearch, searchedActive,setSearchedActive,theme, setCurrentPage,fetchActiveLabs,totalPages,currentPage}) => {
    const active_labs = useSelector((state) => state.labs.activeLabs);
    const debouncedHandleSearch = debounce(handleActiveSearch, 300);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const handleSearchChange = (event) => {
      const { value } = event.target;
      setDebouncedSearch(value);
      if (value !== "" && active_labs && active_labs.length>0) {
          debouncedHandleSearch(value);
      } else {
          setSearchedActive([]);
      }
    };
    const handlePageChange = (event,page) => {
      setCurrentPage(page);
      if(debouncedSearch!==""){
        handleActiveSearch(debouncedSearch)
      } else {
        fetchActiveLabs();
      }
    };
    useEffect(() => {
        setCurrentPage(1);
        fetchActiveLabs();
        setSearchedActive([]);
        setDebouncedSearch('');
    }, []); 
    return ( 
        <>
        <h1 className="text-start self-stretch w-full">User Active Labs</h1>
        <div className="w-full flex flex-row justify-center items-center">
        <input
                    type="search"
                    placeholder="Search Active Labs"
                    value={debouncedSearch}
                    onChange={handleSearchChange}
        />
        </div>
        <div className="flex gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
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
          {searchedActive && searchedActive.length > 0 ? 
                (
                <div className="flex flex-col w-full gap-[5px]">
                    {searchedActive
                      .map((lab, index) => <ActiveLabCard lab={lab} key={index} />)}
                    </div>
                )
                :
                (
                <>
                <div className="flex flex-col w-full gap-[5px]">
                {active_labs
                .map((lab, index) => <ActiveLabCard lab={lab} key={index} />)}
                </div>
                </>
                )}

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
        ) : (
          <p>No Active Labs.</p>
        )}
      </>
     );
}
 
export default AdminActiveLabs;