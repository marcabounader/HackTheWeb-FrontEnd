import { useSelector } from "react-redux";
import LabCard from "../Cards/LabCard";

const CompletedLabs = () => {
    const labs = useSelector((state) => state.labs.completedLabs);
    return ( 
        <>
        <h1 className=" text-start w-full">Completed Labs</h1>
            {labs && labs.map((lab, index) => (
                <LabCard lab={lab} key={index}/>
                
            ))}
        </>
     );
}
 
export default CompletedLabs;