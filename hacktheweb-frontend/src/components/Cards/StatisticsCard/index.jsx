const StatisticsCard = ({name,statistic}) => {
    return ( 
        <div className="flex w-[352px] h-[157px] p-[10px] flex-col justify-around items-center gap-[10px] shadow-md bg-bg-card rounded-[10px]">
            <h4>{name}</h4>
            <p className=" text-5xl">{statistic ? statistic : "0"}</p>
        </div>       
    );
}
 
export default StatisticsCard;