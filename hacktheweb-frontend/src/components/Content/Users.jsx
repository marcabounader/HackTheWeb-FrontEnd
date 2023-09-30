import { useEffect, useState } from "react";
import AdminUsercard from "../Cards/AdminUserCard";
import { Pagination, Stack, ThemeProvider, debounce } from "@mui/material";
import { useSelector } from "react-redux";


const Users = ({usersPerPage,setUsersPerPage,handleUserSearch,theme,token,setCurrentPage,totalPages,currentPage}) => {
    const users = useSelector((state) => state.labs.users);
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const handleItemsPerPageChange = (event, value) => {
        setUsersPerPage(value);
      };
    const handleSearchChange = (event) => {
        const { value } = event.target;
        setDebouncedSearch(value);
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        setDebouncedSearch(value);
        if (value !== "" && users && users.length > 0) {
            setCurrentPage(1);
            const timerId = setTimeout(() => {
                handleUserSearch(value);
            }, 300);
            setDebounceTimer(timerId);
        } else {
            setCurrentPage(1);
            handleUserSearch('');
        }
      };
    const handlePageChange = (event,page) => {
        setCurrentPage(page);
        handleUserSearch(debouncedSearch);
    };
    useEffect(()=>{
        setCurrentPage(1);
        handleUserSearch('');
        setDebouncedSearch('');
    },[])
    useEffect(()=>{
        handleUserSearch(debouncedSearch);
      },[usersPerPage]);
    return ( 
        <>
        <div className=" basis-full flex flex-row justify-between items-center">
        <h1 className="text-start self-stretch w-full">Hackers</h1>

        <input
                    type="search"
                    placeholder="Search Users"
                    value={debouncedSearch}
                    onChange={handleSearchChange}
        />
        </div>

        <div className="admin-user-header flex gap-[10px] h-[64px] w-full items-center bg-black shadow-md overflow-x-auto">
            <div className="basis-[10%]  text-left uppercase ml-2">Rank</div>
            <div className="basis-1/5 uppercase text-left">Name</div>
            <div className="basis-1/5  text-left uppercase">Email</div>
            <div className="basis-1/5  text-left uppercase">Status</div>
            <div className="basis-[15%] text-center uppercase">Restrict</div>
        </div>
        {users && users.length > 0 ? (
            <>
            <div className="flex flex-col w-full gap-[5px]">
                {users
                .map((user, index) => <AdminUsercard user={user} token={token} key={index} />)}
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
            <select className=" rounded-none text-black" value={usersPerPage} onChange={(e) => handleItemsPerPageChange(e, e.target.value)}>
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={15}>15 per page</option>
            <option value={20}>20 per page</option>
            </select>
            </div>
            </>
        ) : (
          <p>No Users.</p>
        )}
      </>
     );
}
 
export default Users;