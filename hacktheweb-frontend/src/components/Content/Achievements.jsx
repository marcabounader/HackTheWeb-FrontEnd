import { useSelector } from "react-redux";
import BadgeCard from "../Cards/BadgeCard";

const Achievements = () => {
    const badges = useSelector((state) => state.labs.badges);
    const user = useSelector((state) => state.user);
    const { type_id } = user;
    return ( 
        <>
        { type_id=="3" ?
        <h1 className="text-start w-full">Achievements</h1>
        :
        <h1 className="text-start w-full">Badges</h1>
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