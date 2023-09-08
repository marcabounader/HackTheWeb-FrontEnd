const LabCard = ({lab}) => {
    console.log(lab);
    return ( 
        <div className="flex w-[306px] h-[157px] p-[10px] flex-col align-start justify-between shadow-md bg-black rounded-[10px]">
            <div className="flex flex-row">
                <img className="w-[60px] h-[50px]" src={lab.icon_url} alt="lab image"/>
                <h4 className=" flex-grow self-stretch text-center">{lab.name}</h4>
            </div>
            <div className="flex flex-row justify-around">
                <p className=" text-green-400">{lab.difficulty_info.difficulty}</p>
                <p>Score: {lab.score}</p>
            </div>
        </div>
     );
}
 
export default LabCard;