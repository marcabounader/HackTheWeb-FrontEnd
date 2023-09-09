import { useEffect, useState } from "react";
import StatisticsCard from "../Cards/StatisticsCard";
import { getStatistics } from "../../helpers/user.helpers";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Home = () => {
  const statistics = useSelector((state) => state.labs.statistics);
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