import { useEffect, useState } from "react";
import AdminUsercard from "../Cards/AdminUserCard";
import { Pagination, Stack } from "@mui/material";
import { useSelector } from "react-redux";


const Users = ({token,fetchUsers,setCurrentPage,totalPages,currentPage}) => {
    const users = useSelector((state) => state.labs.users);

    const handlePageChange = (event,page) => {
        setCurrentPage(page);
        fetchUsers();
    };
    useEffect(()=>{
        fetchUsers();
    },[])

    return ( 
        <>
        <h1 className="text-start self-stretch w-full">Hackers</h1>
        <Stack className="basis-full flex flex-col items-center">
                <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                />
        </Stack>
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
            <div className="basis-1/5  text-center uppercase">Rank</div>
            <div className="basis-1/5 uppercase text-center">Name</div>
            <div className="basis-1/5  text-center uppercase">Email</div>
            <div className="basis-1/5  text-center uppercase">Status</div>
            <div className="basis-1/5  text-center uppercase">Restrict</div>
        </div>
        {users && users.length > 0 ? (
            users
            .map((user, index) => <AdminUsercard user={user} token={token} key={index} />)
        ) : (
          <p>No Users.</p>
        )}
      </>
     );
}
 
export default Users;