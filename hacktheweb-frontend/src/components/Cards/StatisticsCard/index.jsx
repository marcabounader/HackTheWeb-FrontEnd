const StatisticsCard = ({name,statistic}) => {
    return ( 
        <div className="flex w-[306px] h-[157px] p-[10px] flex-col items-center gap-[10px] shadow-md bg-black rounded-[10px]">
            <h4>{name}</h4>
            <p>{statistic}</p>
        </div>       
    );
}
 
export default StatisticsCard;