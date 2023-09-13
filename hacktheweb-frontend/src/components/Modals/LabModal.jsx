import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { setLabActive, setActiveLabs, setLabInactive, setCompletedLabs, setLabComplete, incrementBadgeCount, incrementCompletedLabs, incrementRewards, addBadge } from '../../slices/labSlice';
import { useDispatch } from 'react-redux';
import { launchLab, submitFlag } from '../../helpers/user.helpers';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './LabModal.css';
import { gsap } from 'gsap';

Modal.setAppElement('#root');

const LabModal = ({ isOpen,handleCloseViewModal,lab, matchingActiveLab,active_labs,token}) => {
    const boxRef = useRef();

    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [errors, setErrors] = useState('');
    const [badge,setBadge] = useState('');
    const [showPopup,setShowPopup] = useState(false);
    const [showBadgePopup, setShowBadgePopup] = useState(false);
    const [flag,setFlag]=useState('');
    function onChange(e) {
        const { value } = e.target;
        setFlag(value);
    }
    const handleLabLaunch = async () => {
        const {data , errorMessages, message} = await launchLab(token,lab.id,lab.launch_api);
        setErrors('')
        if (errorMessages) {
            setErrors(errorMessages[0]);
        } else if (message) {
            setErrors(message);
        } else if (message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
            const updatedActiveLabs = [...active_labs, data.active_lab];
            dispatch(setActiveLabs(updatedActiveLabs));
            dispatch(setLabActive(lab.id))
        }
    }
    useLayoutEffect(() => {
        gsap.to(boxRef.current, {
          rotation: "+=360",
          scale: 1.2
        });
        return () => { 
            gsap.to(boxRef.current, {
                scale: 1
            })
        }
      },[showBadgePopup,showPopup]);

    const showCongratulationPopup = (is_badge) => {
        if(!is_badge){
            setShowPopup(true);
    
            setTimeout(() => {
              setShowPopup(false);
            }, 3000);
        } else{
            setShowBadgePopup(true);

            setTimeout(() => {
              setShowBadgePopup(false);
            }, 3000);
        }

    };

    const handleSubmitFlag = async () => {
        const {data , message, errorMessages} = await submitFlag(token,lab.id,flag);
        const updatedActiveLabs = active_labs.filter((activeLab) => activeLab.id !== matchingActiveLab.id);
        if (errorMessages) {
            setErrors(errorMessages[0]);
        } else if (message && message=="Unauthenticated."){
            navigate("/");
        } else if (message) {
            console.log(message);
            setErrors(message);
        } else if (data && data.message=="Flag is correct") {
            dispatch(setActiveLabs(updatedActiveLabs));
            dispatch(setLabInactive(lab.id))
            dispatch(setLabComplete(lab.id))
            showCongratulationPopup(false);
            setFlag('');
            setErrors('')
            // dispatch(incrementCompletedLabs());
            if(data.user_badge){
                // dispatch(incrementBadgeCount());
                dispatch(addBadge(data.user_badge))
                showCongratulationPopup(true);
                setBadge(data.user_badge);
            }
            // dispatch(incrementRewards(lab.reward));
        } else if (data && data.message=="Flag is correct, lab already completed before") {
            dispatch(setActiveLabs(updatedActiveLabs));
            dispatch(setLabInactive(lab.id))
            showCongratulationPopup();
            setFlag('');
            setErrors('')
        }
    }
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
            {showPopup && <div ref={boxRef} className='congratulation-popup'>
                Congratulations! Flag is correct.
            </div>}
            {showBadgePopup && <div ref={boxRef} className='congratulation-popup flex items-center'>
                Congratulations! Flag is correct and {badge.name} earned.
                <img src={badge.icon_url} className='w-[100px] h-[100px]'></img>
            </div>}
            <div className='lab-content self-stretch flex-grow gap-[10px] flex overflow-y-auto'>
                <div className='flex w-[300px] flex-col gap-[40px] items-stretch justify-start content-start'>
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
                    {lab.isActive &&
                    <div>
                        <a className='btn-2 secondary-btn m-0' target="_blank" href={`http://localhost:${matchingActiveLab.port}`}>Open Lab</a>
                    </div>
                    }
                </div>
                <div className='p-[10px] flex flex-col items-center gap-[5%] flex-grow bg-bg-main h-full'>
                    <div className='flex flex-col items-center justify-center flex-grow'>
                    <img src={lab.icon_url} className='w-[365px] h-[255px]' alt='Lab img'/>
                    </div>
                    <div className='flex-grow flex flex-col gap-3 justify-center box-border' >
                    
                    {lab.isActive ?
                        (  
                            <>
                            <input type="text" className=' bg-bg-main border border-white' onChange={onChange} value={flag} placeholder='Enter Flag'/>
                            <button className='btn-2 primary-btn' onClick={handleSubmitFlag}>Submit Flag</button>
                            <div className="error text-center">{errors}</div>
                            </>
                        )
                        :
                        (
                            <>
                            <button className='btn-2 primary-btn' onClick={handleLabLaunch}>Launch Lab</button>
                            </>
                        )
                    }
                    </div>
                </div>
            </div>
        </Modal>
    );
}
 
export default LabModal;