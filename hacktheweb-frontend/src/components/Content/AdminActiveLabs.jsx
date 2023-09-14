import { useSelector } from "react-redux";
import ActiveLabCard from "../Cards/ActiveLabCard";

const AdminActiveLabs = ({}) => {
    const active_labs = useSelector((state) => state.labs.activeLabs);

    return ( 
        <>
        <h1 className="text-start self-stretch w-full">Top Ten Hackers</h1>
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
            <div className="basis-1/5  text-center uppercase">Rank</div>
            <div className="basis-1/5 uppercase text-center">Name</div>
            <div className="basis-1/5  text-center uppercase">Rewards</div>
            <div className="basis-1/5  text-center uppercase">Completed Labs</div>
            <div className="basis-1/5  text-center uppercase">Badges</div>
        </div>
        {active_labs && active_labs.length > 0 ? (
            active_labs
            .map((lab, index) => <ActiveLabCard lab={lab} key={index} />)
        ) : (
          <p>No Active Labs.</p>
        )}
      </>
     );
}
 
export default AdminActiveLabs;