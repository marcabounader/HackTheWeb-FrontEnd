const LabCard = ({lab}) => {
    console.log(lab);
    return ( 
        <div className="flex w-[352] h-[157px] p-[10px] flex-col align-start justify-around shadow-md bg-bg-card rounded-[10px]">
            <div className="flex flex-row">
                <img className="w-[60px] h-[50px]" src={lab.icon_url} alt="lab image"/>
                <h6 className=" flex-grow self-stretch text-center capitalize">{lab.name}</h6>
            </div>
            <div className="flex flex-row justify-between">
                <p className=" text-green-400">{lab.difficulty_info.difficulty}</p>
                <p>Reward: {lab.reward}</p>
            </div>
        </div>
     );
}
 
export default LabCard;