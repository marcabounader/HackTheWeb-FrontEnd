import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { setLabActive, setActiveLabs, setLabInactive, setCompletedLabs, setLabComplete, incrementBadgeCount, incrementCompletedLabs, incrementRewards, addBadge, modifyLab } from '../../slices/labSlice';
import { useDispatch } from 'react-redux';
import { launchLab, submitFlag } from '../../helpers/user.helpers';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './LabModal.css';
import { gsap } from 'gsap';
import SpinningIcon from '../Animation/Spinner';
import { current } from '@reduxjs/toolkit';

Modal.setAppElement('#root');

const LabModal = ({isStopLoading,handleStopLab,isOpen,handleCloseViewModal,lab,token}) => {
    const boxRef = useRef();
    const [launchTime, setLaunchTime] = useState('');
    const [elapsedTime, setElapsedTime] = useState(0);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [errors, setErrors] = useState('');
    const [badge,setBadge] = useState('');
    const [showPopup,setShowPopup] = useState(false);
    const [showBadgePopup, setShowBadgePopup] = useState(false);
    const [flag,setFlag]=useState('');
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const calculateElapsedTime = () => {
            const currentTime = new Date().getTime();
            const timeElapsed = currentTime - launchTime;
            if (timeElapsed >= 0) 
            {
              setElapsedTime(timeElapsed);
            }
        };
        if (lab.isActive && isOpen) {
        setLaunchTime(   
            lab.active_lab && lab.active_lab.launch_time
            ? Date.parse(lab.active_lab.launch_time)
            : null
        );
        calculateElapsedTime();
        const intervalId = setInterval(calculateElapsedTime, 1000);
        return () => {
          clearInterval(intervalId);
          setElapsedTime(0);
        };
      }
    }, [isOpen,lab.isActive]);

    const hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    const minutes = Math.floor((elapsedTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((elapsedTime % (1000 * 60)) / 1000);

    function onChange(e) {
        const { value } = e.target;
        setFlag(value);
    }
    useEffect(()=>{
        setErrors('');
        setIsLoading(false);
        setFlag('');
        setBadge('')
    },[isOpen])

    const handleLabLaunch = async () => {
        setIsLoading(true); 

        const {data , errorMessages, message} = await launchLab(token,lab.id,lab.launch_api);
        setErrors('')
        if (errorMessages) {
            setErrors(errorMessages[0]);
        } else if (message) {
            setErrors(message);
        } else if (message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.active_lab) {
            setIsLoading(false);
            const active_lab=data.active_lab;
            const updatedLab={...lab,isActive:true,active_lab};
            dispatch(modifyLab(updatedLab));
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
        const {data , message, errorMessages} = await submitFlag(token,lab.id,flag,lab.active_lab.project_name);
        if (errorMessages) {
            setErrors(errorMessages[0]);
        } else if (message && message=="Unauthenticated."){
            navigate("/");
        } else if (message) {
            console.log(message);
            setErrors(message);
        } else if (data && data.message=="Flag is correct") {
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
                    <div className='flex flex-row items-center gap-3'>
                        <a className='btn-2 primary-btn m-0 text-center' target="_blank" href={`http://localhost:${lab.active_lab.port}`}>Open Lab</a>
                        {isStopLoading ?
                            <SpinningIcon className="w-[25px] h-[25px]"/>
                        :
                            <button className='btn-2 secondary-btn m-0' onClick={handleStopLab}>Stop Lab</button>
                        }
                    </div>
                    }
                </div>
                <div className='p-[10px] flex flex-col items-center gap-[5%] flex-grow bg-bg-main h-full'>
                    <div className='flex flex-col items-center justify-center flex-grow'>
                    <img src={lab.icon_url} className='w-[365px] h-[255px]' alt='Lab img'/>
                    </div>
                    <div className='flex-grow flex flex-col gap-3 justify-center box-border' >
                    {isLoading ? (
                    <SpinningIcon className="w-[50px] h-[50px]"/>
                    ) : 
                    lab.isActive ?
                        (  
                            <>
                            <input type="text" className=' bg-bg-main border border-white' onChange={onChange} value={flag} placeholder='Enter Flag'/>
                            <button className='btn-2 primary-btn' onClick={handleSubmitFlag}>Submit Flag</button>
                            <p>
                            Launch Time:{` ${hours.toString().padStart(2, "0")}h ${minutes.toString().padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`}
                            </p>
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