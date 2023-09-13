import { useSelector } from "react-redux";
import LabCard from "../Cards/LabCard";

const CompletedLabs = () => {
    const labs = useSelector((state) => state.labs.labs);
    return ( 
        <>
        <h1 className=" text-start w-full">Completed Labs</h1>
            {labs && labs.length > 0 ? (
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