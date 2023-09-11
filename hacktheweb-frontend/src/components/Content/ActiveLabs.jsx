import { useSelector } from "react-redux";
import LabCard from "../Cards/LabCard";

const ActiveLabs = () => {
  const labs = useSelector((state) => state.labs.labs);
  const active_labs=useSelector((state) => state.labs.ActiveLabs);
  return (
    <>
      <h1 className="text-start w-full">Active Labs</h1>
      {active_labs && active_labs.length > 0 ? (
        labs
          .filter((lab) => lab.isActive)
          .map((lab, index) => <LabCard lab={lab} key={index} />)
      ) : (
        <p>No active labs available.</p>
      )}
    </>
  );
};

export default ActiveLabs;
