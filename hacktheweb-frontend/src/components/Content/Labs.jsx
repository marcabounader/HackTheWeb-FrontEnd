import { useEffect, useState } from "react";
import { getLabs } from "../../helpers/user.helpers";
import { useNavigate } from "react-router-dom";
import LabCard from "../Cards/LabCard";

const Labs = ({token}) => {
    const [labs,setLabs]=useState([]);
    const navigate=useNavigate();
    useEffect(() => {
        const fetchLabs = async () => {
          const {data , errors, message} = await getLabs(token);
          if(data.message=="Unauthenticated."){
            navigate("/");
          }else if (data && data.labs) {
            setLabs([...data.labs]);
          }

        };
    
        fetchLabs();
      }, []);
    return ( 
        <>

            {labs && labs.map((lab, index) => (
                <LabCard lab={lab} key={index}/>
            ))}
        </>
     );
}
 
export default Labs;