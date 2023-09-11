import { useEffect, useState } from "react";
import { getLabs } from "../../helpers/user.helpers";
import { useNavigate } from "react-router-dom";
import LabCard from "../Cards/LabCard";
import { useSelector } from "react-redux";

const Labs = () => {
    const labs = useSelector((state) => state.labs.labs);
    return ( 
        <>
        <h1 className=" text-start w-full">Labs</h1>
            {labs && labs.length > 0 ? (
                labs
                .map((lab, index) => <LabCard lab={lab} key={index} />)
            ) : (
                <p>No labs available.</p>
            )}
        </>
     );
}
 
export default Labs;