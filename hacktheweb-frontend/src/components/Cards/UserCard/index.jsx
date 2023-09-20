import { useSelector } from "react-redux";

const UserCard = ({user_rank}) => {
    return ( 
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black opacity-75 shadow-md">
            <div className="basis-1/5 text-left ml-2">{user_rank.rank}</div>
            <div className="basis-1/5 flex-grow capitalize text-left">{user_rank.name}</div>
            <div className="basis-1/5 flex-grow text-left">{user_rank.rewards}</div>
            <div className="basis-1/5 flex-grow text-left">{user_rank.completed_labs_count}</div>
            <div className="basis-1/5 flex-grow text-left">{user_rank.badges_count}</div>
        </div>
    );
}
 
export default UserCard;