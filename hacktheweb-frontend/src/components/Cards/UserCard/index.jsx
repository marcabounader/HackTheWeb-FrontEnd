import { useSelector } from "react-redux";
import './index.css'
const UserCard = ({user_rank}) => {
    return ( 
        <div className="user-card-wrapper flex flex-start gap-[10px] h-[64px] w-full items-center bg-black opacity-75 shadow-md overflow-x-auto">
            <div className="basis-1/5 ml-2 parent">{user_rank.rank}</div>
            <div className="basis-1/5 capitalize parent">{user_rank.name}</div>
            <div className="basis-1/5 parent">{user_rank.rewards ? user_rank.rewards : "0"}</div>
            <div className="basis-1/5 parent">{user_rank.completed_labs_count}</div>
            <div className="basis-1/5 parent">{user_rank.badges_count}</div>
        </div>
    );
}
 
export default UserCard;