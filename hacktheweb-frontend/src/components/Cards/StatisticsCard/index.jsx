const StatisticsCard = ({name,statistic}) => {
    return ( 
        <div className=".statistics-card-wrapper flex basis-1/5 p-[10px] self-stretch flex-col justify-around items-center gap-[10px] shadow-md bg-bg-card rounded-[10px]">
            <h4>{name}</h4>
            <p className=" text-5xl">{statistic ? statistic : "0"}</p>
        </div>       
    );
}
 
export default StatisticsCard;