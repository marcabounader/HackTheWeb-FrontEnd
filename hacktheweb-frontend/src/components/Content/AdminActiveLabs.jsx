import { useSelector } from "react-redux";
import ActiveLabCard from "../Cards/ActiveLabCard";

const AdminActiveLabs = ({}) => {
    const active_labs = useSelector((state) => state.labs.activeLabs);

    return ( 
        <>
        <h1 className="text-start self-stretch w-full">User Active Labs</h1>
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
            <div className="basis-1/5  text-center uppercase">Name</div>
            <div className="basis-1/5 uppercase text-center">Email</div>
            <div className="basis-1/5  text-center uppercase">Docker Name</div>
            <div className="basis-1/5  text-center uppercase">Flag</div>
            <div className="basis-1/5  text-center uppercase">Port</div>
            <div className="basis-1/5  text-center uppercase">Launch Time</div>
            <div className="basis-1/5  text-center uppercase">Action</div>

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