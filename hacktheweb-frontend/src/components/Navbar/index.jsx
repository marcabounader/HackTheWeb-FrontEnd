import React from 'react';
import './Navbar.css'; 
import mainLogo from '../../assets/logos/main-logo.svg';
import { useLocation } from 'react-router-dom';

const Navbar = () => {
    const location = useLocation();
    const isLanding = location.pathname === '/';

    return (
    
        <div className="navbar flex flex-row justify-between items-center px-20 py-10 bg-">
        <div className="logo-container">
            <img src={mainLogo} alt="Main Logo" />
        </div>
        <div className="buttons-container">
            <button className="btn secondary-btn">Leaderboard</button>
            {
                isLanding ? 
                    (
                        <button className="btn primary-btn">Login/Register</button>
                    )
                :
                    (
                        <button className="btn primary-btn">Profile</button>

                    )
            }
        </div>
    </div>
  );
};

export default Navbar;
