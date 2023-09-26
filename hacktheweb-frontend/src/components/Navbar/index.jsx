import React, { useEffect, useState } from 'react';
import './Navbar.css'; 
import mainLogo from '../../assets/logos/main-logo.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PasswordModal from '../Modals/PasswordModal';
import ProfileModal from '../Modals/ProfileModal';
import ProfileBar from '../Menu/ProfileBar';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { logOut } from '../../helpers/auth.helpers';
import { resetUserState } from '../../slices/userSlice';
import { resetLabState } from '../../slices/labSlice';

const Navbar = ({onEnter,onLeave, onPrimaryEnter, onPrimaryLeave, handleOpenLoginModal, toggleContent}) => {
    const location = useLocation();
    const isLanding = location.pathname === '/';
    const [showSide,setShowSide] = useState(false);
    const handleOpenSide = () =>{setShowSide(true)};
    const handleCloseSide = () =>{setShowSide(false)};
    const [showProfile,setShowProfile] = useState(false);
    const handleOpenProfile = () =>{setShowProfile(true)};
    const handleCloseProfile = () =>{setShowProfile(false)};
    const [showPassword,setShowPassword] = useState(false);
    const handleOpenPassword = () =>{setShowPassword(true)};
    const handleClosePassword = () =>{setShowPassword(false)};
    const user = useSelector((state) => state.user);
    const { profile_url,token, type_id} = user;
    const [anchorEl, setAnchorEL] = useState(null);
    const open = Boolean(anchorEl);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const handleClick= (event) => {
        setAnchorEL(event.currentTarget);
    };
    const handleClose = () =>{
        setAnchorEL(null);
    }
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

    let menu_items=[];
    if(type_id==3){
        menu_items=[
            <MenuItem onClick={()=>{handleOpenProfile(); handleClose();}}>Profile</MenuItem>,
            <MenuItem onClick={()=>{handleOpenPassword(); handleClose();}}>Settings</MenuItem>,
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        ];
    } else {
        menu_items=[
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        ];
    }             
    return (
    
        <div className="navbar flex-wrap flex flex-row justify-between items-center px-5 py-5 shadow-lg">
        <PasswordModal isOpen={showPassword} handleCloseViewModal={handleClosePassword}/>
        <ProfileModal isOpen={showProfile} handleCloseViewModal={handleCloseProfile}/>
        <div className="logo-container">
            <img src={mainLogo} alt="Main Logo" />
        </div>
        <>
            {
                isLanding ? 
                    (
                        <div className="landing-buttons-container flex-wrap-reverse flex flex-row">
                        <button className="btn primary-btn" onClick={handleOpenLoginModal} onMouseEnter={onPrimaryEnter} onMouseLeave={onPrimaryLeave}>Login/Register</button>
                        </div>
                    )
                :
                    (
                        <>
                        <div className='menu-container flex flex-row'>
                            <Button 
                            id="basic-btton"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                            >
                            {
                                profile_url ?
                                (
                                    <img  className='rounded-full' src={profile_url} alt="user image"/>
                                )
                                :
                                (
                                    <svg className='rounded-full bg-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <g clipPath="url(#clip0_156_5270)">
                                            <path d="M12 13.5C15.7266 13.5 18.75 10.4766 18.75 6.75C18.75 3.02344 15.7266 0 12 0C8.27344 0 5.25 3.02344 5.25 6.75C5.25 10.4766 8.27344 13.5 12 13.5ZM18 15H15.4172C14.3766 15.4781 13.2188 15.75 12 15.75C10.7812 15.75 9.62813 15.4781 8.58281 15H6C2.68594 15 0 17.6859 0 21V21.75C0 22.9922 1.00781 24 2.25 24H21.75C22.9922 24 24 22.9922 24 21.75V21C24 17.6859 21.3141 15 18 15Z" fill="black"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_156_5270">
                                            <rect width="24" height="24" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                )

                            }
                            </Button>
                            <Menu
                            id='basic-menu'
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            keepMounted
                            MenyListPropt={{
                                'aria-labelledby':'basic-button'
                            }}
                            PopoverClasses={{paper: 'custom-popover'}}
                            >
                                <MenuItem onClick={() => {toggleContent("leaderboard");}}>Leaderboard</MenuItem>
                                {menu_items}
                            </Menu>
                        </div>
                        <div className="buttons-container flex flex-row">
                                  
                            <button className="btn" onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={() => {toggleContent("leaderboard");}}>Leaderboard</button>
                            <ProfileBar handleOpenPassword={handleOpenPassword} handleOpenProfile={handleOpenProfile} onMouse={onPrimaryEnter} onLeave={onPrimaryLeave} onPrimaryEnter={onPrimaryEnter} onPrimaryLeave={onPrimaryLeave}/>
                            <div className=' flex w-[44px] h-[44px] ml-3 gap-[10px] justify-center self-center items-center rounded-full'>
                            <>
                            {
                                profile_url ?
                                (
                                    <img  className='rounded-full' src={profile_url} alt="user image"/>
                                )
                                :
                                (
                                    <svg className='rounded-full bg-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                                        <g clipPath="url(#clip0_156_5270)">
                                            <path d="M12 13.5C15.7266 13.5 18.75 10.4766 18.75 6.75C18.75 3.02344 15.7266 0 12 0C8.27344 0 5.25 3.02344 5.25 6.75C5.25 10.4766 8.27344 13.5 12 13.5ZM18 15H15.4172C14.3766 15.4781 13.2188 15.75 12 15.75C10.7812 15.75 9.62813 15.4781 8.58281 15H6C2.68594 15 0 17.6859 0 21V21.75C0 22.9922 1.00781 24 2.25 24H21.75C22.9922 24 24 22.9922 24 21.75V21C24 17.6859 21.3141 15 18 15Z" fill="black"/>
                                        </g>
                                        <defs>
                                        <clipPath id="clip0_156_5270">
                                            <rect width="24" height="24" fill="white"/>
                                        </clipPath>
                                        </defs>
                                    </svg>
                                )

                            }
                            </>
                            </div>
                        </div>
                        </>
                    )
            }
            </>
    </div>
  );
};

export default Navbar;
