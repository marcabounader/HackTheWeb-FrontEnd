import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { logOut } from '../../helpers/auth.helpers';
import { resetUserState } from '../../slices/userSlice';
import { resetLabState } from '../../slices/labSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

Modal.setAppElement('#root');

const SideBar = ({isOpen,handleCloseViewModal,handleOpenProfile, handleOpenPassword ,onEnter,onLeave}) => {
    const user = useSelector((state) => state.user);
    const { token ,type_id} = user;
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const handleLogOut = async () =>{
        const {data,message,errorMessages} = await logOut(token);
        if (message && message === "Unauthenticated.") {
            navigate("/");
         } else if (data && data.message=="Successfully logged out"){
            dispatch(resetUserState());
            dispatch(resetLabState());
            navigate('/');
        }
    }
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 bg-[#0D1115] sm:w-[15%] h-[100%] transition-opacity fixed top-0 right-0 transform dark:border flex flex-col items-center gap-3 shadow-lg py-[10px] px-[20px]"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
        >   
            <FontAwesomeIcon icon={faSquareXmark} onClick={handleCloseViewModal} className=' self-end w-[30px] h-[30px]' fill="var(--text-and-secondary, #A4B1CD)"/>            
            { type_id=='3' && <button onMouseEnter={onEnter} onMouseLeave={onLeave} className="btn-2 self-stretch" onClick={()=>{handleCloseViewModal(); handleOpenProfile();}}>Profile</button>}
            { type_id=='3' && <button onMouseEnter={onEnter} onMouseLeave={onLeave} className="btn-2 self-stretch" onClick={()=>{handleCloseViewModal(); handleOpenPassword();}}>Settings</button>}
            <button onMouseEnter={onEnter} onMouseLeave={onLeave} className="btn-2 self-stretch" onClick={()=>{handleLogOut(); handleCloseViewModal();}}>Logout</button>

        </Modal>
    );
}
 
export default SideBar;