import { useState } from 'react';
import './BadgeCard.css';
import AddBadgeModal from '../../Modals/AddBadgeModal';
const BadgeCard = ({type_id,badge,token}) => {
    const [showModifyBadge,setShowModifyBadge]=useState(false);
    const handleCloseModifyBadge = () => setShowModifyBadge(false);
    const handleOpenModifyBadge = () => setShowModifyBadge(true);
    return ( 
        <>
        <AddBadgeModal badge={badge} isOpen={showModifyBadge} handleCloseViewModal={handleCloseModifyBadge} token={token}/>
        { type_id=="3" ?
        <div className="flex w=[277px] h=[370px] p-[10px] flex-col items-center gap-[10px] bg-bg-card rounded-xl shadow-lg">
            <h4>{badge.name}</h4>
            <img src={badge.icon_url} alt={`${badge.name} icon`} className='w-[139px] h-[137px]'/>
        </div>
        :
        <div className="flex w=[277px] h=[370px] p-[10px] flex-col items-center gap-[10px] bg-bg-card rounded-xl shadow-lg cursor-pointer" onClick={handleOpenModifyBadge}>
            <h4>{badge.name}</h4>
            <img src={badge.icon_url} alt={`${badge.name} icon`} className='w-[139px] h-[137px]'/>
        </div>
        }
        </>
    );
}
 
export default BadgeCard;