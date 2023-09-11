import { useSelector } from "react-redux";
import BadgeCard from "../Cards/BadgeCard";

const Achievements = () => {
    const badges = useSelector((state) => state.labs.badges);

    return ( 
        <>
        <h1 className="text-start w-full">Achievements</h1>
        {badges && badges.length > 0 ? (
        badges.map((badge, index) => <BadgeCard badge={badge} key={index} />)
        ) : (
          <p>No Badges available.</p>
        )}
      </>
     );
}
 
export default Achievements;