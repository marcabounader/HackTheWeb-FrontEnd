import { useState } from 'react';
import './BadgeCard.css';
import AddBadgeModal from '../../Modals/AddBadgeModal';
import { setBadges } from '../../../slices/labSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteBadge } from '../../../helpers/admin.helpers';
import ConfirmModal from '../../Modals/ConfirmModal';
const BadgeCard = ({type_id,badges,badge,token}) => {
    const [showModifyBadge,setShowModifyBadge]=useState(false);
    const handleCloseModifyBadge = () => setShowModifyBadge(false);
    const handleOpenModifyBadge = () => setShowModifyBadge(true);
    const navigate=useNavigate();
    const dispatch = useDispatch();
    const [showDeleteConfirmation,setDeleteConfirmation] = useState(false);
    const handleOpenConfirmation = () => setDeleteConfirmation(true);
    const handleCloseConfirmation = () =>setDeleteConfirmation(false);
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
        <ConfirmModal action="Delete" handler={handleDelete} isOpen={showDeleteConfirmation} handleCloseViewModal={handleCloseConfirmation}/>
        <AddBadgeModal badge={badge} isOpen={showModifyBadge} handleCloseViewModal={handleCloseModifyBadge} token={token}/>
        { type_id=="3" ?
        <div className="flex basis-[23%] self-stretch p-[10px] flex-col items-center gap-[10px] bg-bg-card rounded-xl shadow-lg">
            <h4>{badge.name}</h4>
            <div className='flex flex-row justify-center items-center'>
            <img src={badge.icon_url} alt={`${badge.name} icon`} className='w-[139px] h-[137px]'/>
            </div>        
        </div>
        :
        <div className="flex basis-[23%] self-stretch p-[10px] flex-col items-center gap-[10px] bg-bg-card rounded-xl shadow-lg">
            <h4 className=' cursor-pointer'>{badge.name}</h4>
            <div className='flex flex-row justify-center items-center cursor-pointer' onClick={handleOpenModifyBadge}>
            <img src={badge.icon_url} alt={`${badge.name} icon`} className='w-[139px] h-[137px]'/>
            </div>
            <button className='btn-2 secondary-btn self-end' onClick={handleOpenConfirmation}>Delete</button>
        </div>
        }
        </>
    );
}
 
export default BadgeCard;