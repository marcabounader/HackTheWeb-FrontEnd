import React, { useEffect } from 'react';
import './Navbar.css'; 
import mainLogo from '../../assets/logos/main-logo.svg';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { useLayoutEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

const Navbar = ({onEnter,onLeave,handleOpenLoginModal}) => {
    const location = useLocation();
    const isLanding = location.pathname === '/';
    const logoRef = useRef();
    const btnRef = useRef();
    const user = useSelector((state) => state.user);
    const { user_id, token, name, type_id, rank } = user;

    useEffect(() => {
      gsap.to(logoRef.current, {
        rotation: '+=360',
      });
      gsap.to(btnRef.current, {
        rotation: '+=360',
      });
    }, [location.pathname]);

    return (
    
        <div className="navbar flex flex-row justify-between items-center px-20 py-10 bg-">
        <div className="logo-container" ref={logoRef}>
            <img src={mainLogo} alt="Main Logo" />
        </div>
        <div className="buttons-container">
            <button className="btn" onMouseEnter={onEnter} onMouseLeave={onLeave}>Leaderboard</button>
            {
                isLanding ? 
                    (
                        <button ref={btnRef} className="btn primary-btn" onClick={handleOpenLoginModal} onMouseEnter={onEnter} onMouseLeave={onLeave}>Login/Register</button>
                    )
                :
                    (
                        <button ref={btnRef} className="btn primary-btn"  onMouseEnter={onEnter} onMouseLeave={onLeave}>{name ? name :"Profile"}</button>

                    )
            }
        </div>
    </div>
  );
};

export default Navbar;
