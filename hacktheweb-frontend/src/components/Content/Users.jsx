import { useEffect, useState } from "react";
import AdminUsercard from "../Cards/AdminUserCard";
import { Pagination, Stack, ThemeProvider, debounce } from "@mui/material";
import { useSelector } from "react-redux";


const Users = ({handleUserSearch,searchedUsers,setSearchedUsers,theme,token,fetchUsers,setCurrentPage,totalPages,currentPage}) => {
    const users = useSelector((state) => state.labs.users);
    const debouncedHandleSearch = debounce(handleUserSearch, 300);
    const [debouncedSearch, setDebouncedSearch] = useState("");

    const handleSearchChange = (event) => {
        const { value } = event.target;
        setDebouncedSearch(value);
        if (value !== "" && users && users.length>0) {
            debouncedHandleSearch(value);
        } else {
            setSearchedUsers([]);
        }
      };
    const handlePageChange = (event,page) => {
        setCurrentPage(page);
        if(debouncedSearch!==""){
            handleUserSearch(debouncedSearch)
        } else {
            fetchUsers();
        }
    };
    useEffect(()=>{
        setCurrentPage(1);
        fetchUsers();
        setSearchedUsers([]);
        setDebouncedSearch('');
    },[])

    return ( 
        <>
        <h1 className="text-start self-stretch w-full">Hackers</h1>
        <div className="w-full flex flex-row justify-center items-center">
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
                {searchedUsers && searchedUsers.length > 0 ? 
                (
                <div className="flex flex-col w-full gap-[5px]">
                    {searchedUsers
                    .map((user, index) => <AdminUsercard user={user} token={token} key={index} />)}
                    </div>
                )
                :
                (
                <>
                    <div className="flex flex-col w-full gap-[5px]">
                    {users
                    .map((user, index) => <AdminUsercard user={user} token={token} key={index} />)}
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
          <p>No Users.</p>
        )}
      </>
     );
}
 
export default Users;