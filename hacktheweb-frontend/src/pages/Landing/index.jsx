import { useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";
import Circle from "../../components/Objects/circle";
import "./landing.css"

const Landing = ({onEnter,onLeave,isLoginModalOpen,handleOpenLoginModal, handleCloseLoginModal,isRegisterModalOpen,handleCloseRegisterModal,handleOpenRegisterModal}) => {
    const circleRefs = useRef([]);
    const [myEmail,setMyEmail]=useState('');
    circleRefs.current = [];
    

    function onChange(e) {
      const { value} = e.target;
      setMyEmail(value);
    }

    useEffect(() => {
      const { innerWidth, innerHeight } = window;
      circleRefs.current.forEach(ref => ref.moveTo(innerWidth / 2, innerHeight / 2));
      
      const onMove = ({ clientX, clientY }) => {      
        circleRefs.current.forEach(ref => ref.moveTo(clientX, clientY));
      };
      
      window.addEventListener("pointermove", onMove);
      
      return () => window.removeEventListener("pointermove", onMove);
    }, []);
    
    const addCircleRef = ref => {
      if (ref) {
        circleRefs.current.push(ref);
      }    
    };
    return ( 
        <section className="content-wrapper flex flex-col justify-center items-center flex-grow-1 flex-wrap">
            <LoginForm isOpen={isLoginModalOpen} handleCloseViewModal={handleCloseLoginModal} handleOpenRegisterModal={handleOpenRegisterModal}/>
            <RegisterForm isOpen={isRegisterModalOpen} handleCloseViewModal={handleCloseRegisterModal} handleOpenLoginModal={handleOpenLoginModal} setMyEmail={setMyEmail} myEmail={myEmail}/>
            <Circle size="sm" ref={addCircleRef} delay={0} />
            <Circle size="md" ref={addCircleRef} delay={0.1} />
            <Circle size="lg" ref={addCircleRef} delay={0.2} />
            <div className="flex flex-col justify-center items-center">
                <h1>Where offense becomes the ultimate defense!</h1>
                <p>Here is where you'll uncover the secrets to safeguarding digital fortresses in an ever-evolving digital landscape.</p>
            </div>
            <div className="my-5">
                <input placeholder="Email" className="" value={myEmail} onChange={onChange}/>
                <button className="btn primary-btn" onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={handleOpenRegisterModal}>Start Hacking</button>
            </div>   
            <Footer/>
        </section>
    );
}
 
export default Landing;