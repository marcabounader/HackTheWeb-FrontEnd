import { useState } from 'react';
import './BadgeCard.css';
import AddBadgeModal from '../../Modals/AddBadgeModal';
import { setBadges } from '../../../slices/labSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const BadgeCard = ({type_id,badges,badge,token}) => {
    const [showModifyBadge,setShowModifyBadge]=useState(false);
    const handleCloseModifyBadge = () => setShowModifyBadge(false);
    const handleOpenModifyBadge = () => setShowModifyBadge(true);
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const handleDelete = async () =>{
        const {data , errorMessages, message} = await deleteBadge(token,badge.id);
        if(message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
            dispatch(setBadges(badges.filter((old_badge) => old_badge.id !== badge.id)));
        }
    }
    return ( 
        <>
        <AddBadgeModal badge={badge} isOpen={showModifyBadge} handleCloseViewModal={handleCloseModifyBadge} token={token}/>
        { type_id=="3" ?
        <div className="flex w-[277px] h-[370px] p-[10px] flex-col items-center gap-[10px] bg-bg-card rounded-xl shadow-lg">
            <h4>{badge.name}</h4>
            <div className='flex flex-row justify-center flex-grow items-center'>
            <img src={badge.icon_url} alt={`${badge.name} icon`} className='w-[139px] h-[137px]'/>
            </div>        
        </div>
        :
        <div className="flex w-[277px] h-[370px] p-[10px] flex-col items-center gap-[10px] bg-bg-card rounded-xl shadow-lg cursor-pointer" onClick={handleOpenModifyBadge}>
            <h4>{badge.name}</h4>
            <div className='flex flex-row justify-center flex-grow items-center'>
            <img src={badge.icon_url} alt={`${badge.name} icon`} className='w-[139px] h-[137px]'/>
            </div>
            <button className='btn-2 secondary-btn self-end' onClick={handleDelete}>Delete</button>
        </div>
        }
        </>
    );
}
 
export default BadgeCard;