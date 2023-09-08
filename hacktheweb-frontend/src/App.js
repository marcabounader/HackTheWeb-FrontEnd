import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import UserDashboard from './pages/UserDashboard';


function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);
  const [areCirclesVisible, setAreCirclesVisible] = useState(true);

  const circleRefs = useRef([]);

  circleRefs.current = [];

  const onEnter = ({ currentTarget }) => {
    if(currentTarget.classList.contains("primary-btn")){
        gsap.to(currentTarget, { backgroundColor: "rgba(164, 177, 205, 0.35)",color:"var(--white-color)", scale: 1.2 });
    }else{
        gsap.to(currentTarget, { backgroundColor: "rgba(164, 177, 205, 0.35)",color:"var(--black-color)", scale: 1.2 });
    }
  };
  
  const onLeave = ({ currentTarget }) => {
    if(currentTarget.classList.contains("primary-btn")){
        gsap.to(currentTarget, {backgroundColor: "var(--primary-button-color)",color:"var(--black-color)",scale: 1 });
    } else if(currentTarget.classList.contains("secondary-btn")){
        gsap.to(currentTarget, {backgroundColor: "var(--secondary-button-color)",scale: 1 });
    } else{
        gsap.to(currentTarget, {backgroundColor: "",color:"var(--header-color)",scale: 1 });

    }
  };
  
  const addCircleRef = ref => {
    if (ref) {
      circleRefs.current.push(ref);
    }    
  };
  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    circleRefs.current.forEach(ref => ref.moveTo(innerWidth / 2, innerHeight / 2));
    
    const onMove = ({ clientX, clientY }) => {
      const cursorElement = document.elementFromPoint(clientX, clientY);
      const isCursorOverInputOrButton =
      cursorElement &&
      (cursorElement.tagName === "INPUT" || cursorElement.tagName === "BUTTON");

      circleRefs.current.forEach((ref) => 
      {
        ref.moveTo(clientX, clientY);
      });
    };
    
    
    window.addEventListener("pointermove", onMove);
    
    return () => window.removeEventListener("pointermove", onMove);
  }, [areCirclesVisible]);
  return (
   <Router>
        <Navbar onEnter={onEnter} onLeave={onLeave} handleOpenLoginModal={handleOpenLoginModal} handleOpenRegisterModal={handleOpenRegisterModal}/>
        <Routes>
          <Route path="/" element={<Landing addCircleRef={addCircleRef} isLoginModalOpen={isLoginModalOpen} handleCloseLoginModal={handleCloseLoginModal} isRegisterModalOpen={isRegisterModalOpen} handleCloseRegisterModal={handleCloseRegisterModal} handleOpenRegisterModal={handleOpenRegisterModal} handleOpenLoginModal={handleOpenLoginModal} onEnter={onEnter} onLeave={onLeave} areCirclesVisible={areCirclesVisible}/>} />
          <Route path="/user-dashboard" element={<UserDashboard addCircleRef={addCircleRef} areCirclesVisible={areCirclesVisible}/>}/>
        </Routes>
    </Router>
  );
}

export default App;
