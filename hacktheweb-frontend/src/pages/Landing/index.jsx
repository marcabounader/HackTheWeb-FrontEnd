import { useState } from "react";
import Footer from "../../components/Footer";
import LoginForm from "../../components/Forms/LoginForm";
import RegisterForm from "../../components/Forms/RegisterForm";

const Landing = ({onEnter,onLeave,isLoginModalOpen,handleOpenLoginModal, handleCloseLoginModal,isRegisterModalOpen,handleCloseRegisterModal,handleOpenRegisterModal}) => {
    return ( 
        <section className="content-wrapper flex flex-col justify-center items-center flex-grow-1 flex-wrap">
            <LoginForm isOpen={isLoginModalOpen} handleCloseViewModal={handleCloseLoginModal} handleOpenRegisterModal={handleOpenRegisterModal}/>
            <RegisterForm isOpen={isRegisterModalOpen} handleCloseViewModal={handleCloseRegisterModal} handleOpenLoginModal={handleOpenLoginModal}/>
            <div className="flex flex-col justify-center items-center">
                <h1>Where offense becomes the ultimate defense!</h1>
                <p>Here is where you'll uncover the secrets to safeguarding digital fortresses in an ever-evolving digital landscape.</p>
            </div>
            <div className="my-5">
                <input placeholder="Email" className=""/>
                <button className="btn primary-btn" onMouseEnter={onEnter} onMouseLeave={onLeave}>Start Hacking</button>
            </div>   
            <Footer/>
        </section>
    );
}
 
export default Landing;