import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import Circle from "../../components/Objects/circle";
import "./landing.css"
import CyberSecurityLogo from "../../assets/logos/logo-cyber-security.svg"; // Import the SVG

const Landing = ({addCircleRef,onEnter,onLeave,isLoginModalOpen,handleOpenLoginModal, handleCloseLoginModal,isRegisterModalOpen,handleCloseRegisterModal,handleOpenRegisterModal,areCirclesVisible}) => {
    const circleRefs = useRef([]);
    const [myEmail,setMyEmail]=useState('');
    circleRefs.current = [];
    

    function onChange(e) {
      const { value} = e.target;
      setMyEmail(value);
    }
    
    const circles= [];
    
    if (areCirclesVisible) {
      circles.push(<Circle size="sm" ref={addCircleRef} delay={0} key="circle-sm" />);
      circles.push(<Circle size="md" ref={addCircleRef} delay={0.1} key="circle-md" />);
      circles.push(<Circle size="lg" ref={addCircleRef} delay={0.2} key="circle-lg" />);
    }
    return ( 
        <section className="hero-wrapper flex flex-col justify-center items-center flex-grow-1 flex-wrap">
            <LoginForm isOpen={isLoginModalOpen} handleCloseViewModal={handleCloseLoginModal} handleOpenRegisterModal={handleOpenRegisterModal}/>
            <RegisterForm isOpen={isRegisterModalOpen} handleCloseViewModal={handleCloseRegisterModal} handleOpenLoginModal={handleOpenLoginModal} setMyEmail={setMyEmail} myEmail={myEmail}/>
            {circles}
            <div className="flex flex-row px-[20px] self-stretch">
                <div className="flex flex-col justify-center basis-3/6">
                    <div className="flex flex-col justify-center items-center">
                        <h1>Where offense becomes the ultimate defense!</h1>
                        <p>Here is where you'll uncover the secrets to safeguarding digital fortresses in an ever-evolving digital landscape.</p>
                    </div>
                    <div className="my-5">
                        <input type="text" placeholder="Email" className="email-input" value={myEmail} onChange={onChange}/>
                        <button className="btn primary-btn" onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={handleOpenRegisterModal}>Start Hacking</button>
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