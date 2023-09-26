import { useSelector } from "react-redux";
import LabCard from "../Cards/LabCard";

const CompletedLabs = () => {
    const labs = useSelector((state) => state.labs.labs);
    const completedLabs = labs.filter((lab) => lab.isComplete);

    return ( 
        <>
        <h1 className=" text-start w-full">Completed Labs</h1>
            {completedLabs && completedLabs.length > 0 ? (
                completedLabs
                .map((lab, index) => <LabCard lab={lab} key={index} />)
            ) : (
                <p>No completed labs available.</p>
            )}
        </>
     );
}
 
export default CompletedLabs;