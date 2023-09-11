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
        <h1 className="text-start self-stretch">Top Ten Hackers</h1>
        <div className="flex flex-start gap-[10px] h-[64px] w-[70%] justify-evenly items-center bg-black shadow-md">
            <div className="w-[212.2px] text-center uppercase">Rank</div>
            <div className="w-[212.2px] uppercase text-center">Name</div>
            <div className="w-[212.2px] text-center uppercase">Rewards</div>
            <div className="w-[212.2px] text-center uppercase">Completed Labs</div>
            <div className="w-[212.2px] text-center uppercase">Badges</div>
        </div>
        {topTen && topTen.length > 0 ? (
          topTen
            .map((user_rank, index) => <UserCard user_rank={user_rank} key={index} />)
        ) : (
          <p>No Top Hackers.</p>
        )}
      </>
     );
}
 
export default Leaderboard;