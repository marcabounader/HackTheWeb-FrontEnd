import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';

Modal.setAppElement('#root');

const LabModal = ({ isOpen,handleCloseViewModal,lab}) => {
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 bg-[#0D1115] w-[90%] h-[90%] transition-opacity fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border flex flex-col items-center gap-3 shadow-lg py-[10px] px-[20px]"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
        >   
            <div className='lab-title flex justify-between items-center self-stretch'>
                <h1>{lab.name}</h1>
                <FontAwesomeIcon icon={faSquareXmark} onClick={handleCloseViewModal} className='w-[30px] h-[30px]' fill="var(--text-and-secondary, #A4B1CD)"/>            
            </div>
            <div className='lab-content self-stretch gap-[10px] flex'>
                <div className='flex w-[300px] flex-col gap-[10px] items-stretch justify-between content-start'>
                    <div>
                        <div className='sub-header'>Difficulty: </div>
                        <div>{lab.difficulty_info.difficulty}</div>
                    </div>
                    <div>
                        <div className='sub-header'>Reward: </div>
                        <div>{lab.reward}</div>
                    </div>
                    <div>
                        <div className='sub-header'>Objective: </div>
                        <div>{lab.objective}</div>
                    </div>
                    {/* <div>
                        <div className='sub-header'>Lab URL: </div>
                        <div>{`http://localhost{lab.port}:{lab.launch_api}`}</div>
                    </div> */}
                </div>
                <div className='p-[10px] flex flex-col items-center gap-[150px] flex-grow self-stretch'>
                    <div className='flex flex-col items-center justify-center flex-grow'>
                    <img src={lab.icon_url} className='' alt='Lab img'/>
                    </div>
                    <div className='flex-grow flex flex-col items-center justify-center' >
                        <button className='btn primary-btn'>Launch Lab</button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
 
export default LabModal;