import { useState } from "react";
import Footer from "../../components/Footer";
import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import "./landing.css"
import CyberSecurityLogo from "../../assets/logos/logo-cyber-security.svg"; // Import the SVG

const Landing = ({onPrimaryEnter,onPrimaryLeave,isLoginModalOpen,handleOpenLoginModal, handleCloseLoginModal,isRegisterModalOpen,handleCloseRegisterModal,handleOpenRegisterModal}) => {
    const [myEmail,setMyEmail]=useState('');
    

    function onChange(e) {
      const { value} = e.target;
      setMyEmail(value);
    }
    
    
    return ( 
        <section className="hero-wrapper flex flex-col justify-center items-center flex-grow-1">
            <LoginForm isOpen={isLoginModalOpen} handleCloseViewModal={handleCloseLoginModal} handleOpenRegisterModal={handleOpenRegisterModal}/>
            <RegisterForm isOpen={isRegisterModalOpen} handleCloseViewModal={handleCloseRegisterModal} handleOpenLoginModal={handleOpenLoginModal} setMyEmail={setMyEmail} myEmail={myEmail}/>
            <div className="hero-content flex flex-row px-[40px] self-stretch flex-wrap-reverse">
                <div className="flex flex-col justify-center basis-3/6">
                    <div className="flex flex-col justify-center items-center">
                        <h1>Where offense becomes the ultimate defense!</h1>
                        <p>Here is where you'll uncover the secrets to safeguarding digital fortresses in an ever-evolving digital landscape.</p>
                    </div>
                    <div className="my-5">
                        <input type="text" placeholder="Email" className="email-input" value={myEmail} onChange={onChange}/>
                        <button className="btn primary-btn email-btn" onMouseEnter={onPrimaryEnter} onMouseLeave={onPrimaryLeave} onClick={handleOpenRegisterModal}>New Hacker</button>
                    </div>   
                </div>
                <div className="flex flex-col self-stretch justify-center items-center basis-3/6 ">
                <img src={CyberSecurityLogo} alt="Cyber Security Logo"/>
                </div>
            </div>

            <Footer/>
        </section>
    );
}
 
export default Landing;