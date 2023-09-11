import { useSelector } from "react-redux";

const UserCard = ({user_rank}) => {
    return ( 
        <div className="flex flex-start gap-[10px]  w-[70%] h-[64px] justify-evenly items-center bg-black shadow-md">
            <div className="w-[212.2px] text-center">{user_rank.rank}</div>
            <div className="w-[212.2px] capitalize text-center">{user_rank.name}</div>
            <div className="w-[212.2px] text-center">{user_rank.rewards}</div>
            <div className="w-[212.2px] text-center">{user_rank.completed_labs_count}</div>
            <div className="w-[212.2px] text-center">{user_rank.badges_count}</div>
        </div>
    );
}
 
export default UserCard;