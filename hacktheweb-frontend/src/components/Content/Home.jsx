import { useEffect, useState } from "react";
import StatisticsCard from "../Cards/StatisticsCard";
import { getStatistics } from "../../helpers/user.helpers";
import { useNavigate } from "react-router-dom";

const Home = ({token}) => {
    const [statistics,setStatistics]=useState('');
    const navigate=useNavigate();
    useEffect(() => {
        const fetchStatistics = async () => {
          const {data , errors, message} = await getStatistics(token);
          if(message && message=="Unauthenticated."){
            navigate("/");
          } else if (data && data.message) {
            const {message,...statistics_temp} = data;
            setStatistics(statistics_temp);
          }

        };
    
        fetchStatistics();
      }, []);
    return ( 
        <>
        <h1 className=" text-start w-full">Home</h1>
        {statistics && 
            Object.keys(statistics).map((key) => {
                const value = statistics[key];
                const formattedKey = key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
                return (
                  <StatisticsCard name={formattedKey} statistic={value} key={key}/>
                );
        })}
        </>

     );
}
 
export default Home;