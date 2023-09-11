import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const SideBar = ({isOpen,handleCloseViewModal,handleOpenProfile, handleOpenPassword ,onEnter,onLeave}) => {
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 bg-[#0D1115] w-[30%] h-[100%] transition-opacity fixed top-0 right-0 transform dark:border flex flex-col items-center gap-3 shadow-lg py-[10px] px-[20px]"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
        >   
            <FontAwesomeIcon icon={faSquareXmark} onClick={handleCloseViewModal} className=' self-end w-[30px] h-[30px]' fill="var(--text-and-secondary, #A4B1CD)"/>            
            <button onMouseEnter={onEnter} onMouseLeave={onLeave} className="btn-2 self-stretch" onClick={()=>{handleCloseViewModal(); handleOpenProfile();}}>Profile</button>
            <button onMouseEnter={onEnter} onMouseLeave={onLeave} className="btn-2 self-stretch" onClick={()=>{handleCloseViewModal(); handleOpenPassword();}}>Settings</button>
        </Modal>
    );
}
 
export default SideBar;