import { useEffect, useState } from "react";
import { getTopTen } from '../../helpers/user.helpers';
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserCard from "../Cards/UserCard";

const Leaderboard = () => {
    const [topTen,setTopTen] = useState([]);
    const navigate= useNavigate();
    const {token} = useSelector((state) => state.user);
    useEffect(()=>{
        const fetchUsers = async () =>{
            const {data,message,errorMessages} = await getTopTen(token);
            if(message && message=="Unauthenticated."){
                navigate("/");
              } else if (data && data.users) {
                setTopTen(data.users);
              }
      
            };
        fetchUsers();
    },[]);
    
    return ( 
        <>
        <h1 className="text-start self-stretch w-full">Top Ten Hackers</h1>
        <div className="leaderboard-header flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md overflow-x-auto">
            <div className="basis-1/5  text-left uppercase ml-2">Rank</div>
            <div className="basis-1/5 uppercase text-left">Name</div>
            <div className="basis-1/5  text-left uppercase">Rewards</div>
            <div className="basis-1/5  text-left uppercase">Completed Labs</div>
            <div className="basis-1/5  text-left uppercase">Badges</div>
        </div>
        <div className="flex flex-col w-full gap-[5px]">
        {topTen && topTen.length > 0 ? (
          topTen
            .map((user_rank, index) => <UserCard user_rank={user_rank} key={index} />)
        ) : (
          <p>No Top Hackers.</p>
        )}
        </div>
      </>
     );
}
 
export default Leaderboard;