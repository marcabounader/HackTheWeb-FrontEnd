import './BadgeCard.css';
const BadgeCard = ({badge}) => {
        
    return ( 
        <div className="flex w=[277px] h=[370px] p-[10px] flex-col items-center gap-[10px] bg-bg-card rounded-xl shadow-lg">
            <h4>{badge.name}</h4>
            { badge.category_id == 3 ? (
                <img src={badge.icon_url} alt={`${badge.name} icon`} className='w-[139px] h-[137px] bronze-badge'/>
            )
            :
            (
                <>
                { badge.category_id == 2 ? (
                <img src={badge.icon_url} alt={`${badge.name} icon`} className='w-[139px] h-[137px] silver-badge'/>
                )
                :
                (
                    <img src={badge.icon_url} alt={`${badge.name} icon`} className='w-[139px] h-[137px] gold-badge'/>
                )
                }
                </>
            )
            }

        </div>
    );
}
 
export default BadgeCard;