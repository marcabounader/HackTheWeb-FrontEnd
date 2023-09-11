import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

const PasswordModal = ({isOpen,handleCloseViewModal}) => {
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 bg-[#0D1115] w-[90%] h-[90%] transition-opacity fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border flex flex-col items-center gap-3 shadow-lg py-[10px] px-[20px]"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
        >   
            <FontAwesomeIcon icon={faSquareXmark} onClick={handleCloseViewModal} className=' self-end w-[30px] h-[30px]' fill="var(--text-and-secondary, #A4B1CD)"/>            
            
        </Modal>     );
}
 
export default PasswordModal;