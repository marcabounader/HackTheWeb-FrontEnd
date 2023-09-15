import { useSelector } from "react-redux";
import BadgeCard from "../Cards/BadgeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

const Achievements = () => {
    const badges = useSelector((state) => state.labs.badges);
    const user = useSelector((state) => state.user);
    const { type_id } = user;
    return ( 
        <>
        { type_id=="3" ?
        <h1 className="text-start w-full">Achievements</h1>
        :
        <div className="flex flex-row basis-full justify-between items-center">
        <h1 className="text-start">Badges</h1>
        <FontAwesomeIcon icon={faPlusSquare} className="text-color-secondary w-[40px] h-[40px]" ></FontAwesomeIcon>

        </div>

        }
        {badges && badges.length > 0 ? (
        badges.map((badge, index) => <BadgeCard badge={badge} key={index} />)
        ) : (
          <p>No Badges available.</p>
        )}
      </>
     );
}
 
export default Achievements;