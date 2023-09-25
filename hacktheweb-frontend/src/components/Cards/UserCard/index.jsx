import { useSelector } from "react-redux";
import './index.css'
const UserCard = ({user_rank}) => {
    return ( 
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black opacity-75 shadow-md">
            <div className="basis-1/5 text-left ml-2 parent">{user_rank.rank}</div>
            <div className="basis-1/5 capitalize text-left parent">{user_rank.name}</div>
            <div className="basis-1/5 text-left parent">{user_rank.rewards}</div>
            <div className="basis-1/5 text-left parent">{user_rank.completed_labs_count}</div>
            <div className="basis-1/5 text-left parent">{user_rank.badges_count}</div>
        </div>
    );
}
 
export default UserCard;