import { useSelector } from "react-redux";
import LabCard from "../Cards/LabCard";

const CompletedLabs = () => {
    const labs = useSelector((state) => state.labs.labs);
    const completed_labs = useSelector((state) => state.labs.completedLabs);
    return ( 
        <>
        <h1 className=" text-start w-full">Completed Labs</h1>
            {completed_labs && completed_labs.length > 0 ? (
                labs
                .filter((lab) => lab.isComplete)
                .map((lab, index) => <LabCard lab={lab} key={index} />)
            ) : (
                <p>No completed labs available.</p>
            )}
        </>
     );
}
 
export default CompletedLabs;