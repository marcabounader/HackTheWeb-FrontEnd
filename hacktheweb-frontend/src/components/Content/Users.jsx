import { useEffect, useState } from "react";
import AdminUsercard from "../Cards/AdminUserCard";

const Users = ({token}) => {
    const [users,setUsers] = useState('');
    useEffect(()=>{
        const fetchUsers = async () =>{
            const {data,message,errorMessages} = await getUsers(token);
            console.log(data);
        };
        fetchUsers();
    })
    return ( 
        <>
        <h1 className="text-start self-stretch w-full">Top Ten Hackers</h1>
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
            <div className="basis-1/5  text-center uppercase">Rank</div>
            <div className="basis-1/5 uppercase text-center">Name</div>
            <div className="basis-1/5  text-center uppercase">Email</div>
            <div className="basis-1/5  text-center uppercase">Actions</div>
            <div className="basis-1/5  text-center uppercase"></div>
            <div className="basis-1/5  text-center uppercase"></div>

        </div>
        {users && users.length > 0 ? (
            users
            .map((user, index) => <AdminUsercard user={user} key={index} />)
        ) : (
          <p>No Users.</p>
        )}
      </>
     );
}
 
export default Users;