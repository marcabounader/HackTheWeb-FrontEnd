import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Circle from './components/Objects/circle';
const falseState = {
  home:false,
  achievements:false,
  badges:false,
  labs_tab: false,
  active_tab: false,
  completed_tab:false,
  leaderboard:false
};

function App() {
  const [state, setState] = useState({
    home:true,
    achievements:false,
    badges:false,
    labs_tab: false,
    active_tab: false,
    completed_tab:false,
    users_tab:false,
    leaderboard:false
  });

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);
  const handleOpenRegisterModal = () => setIsRegisterModalOpen(true);
  const handleCloseRegisterModal = () => setIsRegisterModalOpen(false);
  const [areCirclesVisible, setAreCirclesVisible] = useState(true);
  const circleRefs = useRef([]);

  circleRefs.current = [];
  const toggleContent = (page) => {
    setState({ ...falseState, [page]: true });
  };

  const onEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { backgroundColor: "rgba(164, 177, 205, 0.35)",color:"var(--black-color)", scale: 1.1 });
  };
  const onPrimaryEnter = ({ currentTarget }) => {
        gsap.to(currentTarget, { backgroundColor: "rgba(164, 177, 205, 0.35)",color:"var(--white-color)", scale: 1.1 });

  };
  const onSecondaryEnter = ({ currentTarget }) => {
    gsap.to(currentTarget, { backgroundColor: "rgba(164, 177, 205, 0.35)",color:"var(--white-color)", scale: 1.1 });

  };
  
  const onSideLeave = ({ currentTarget }) => {

    gsap.to(currentTarget, {backgroundColor: "",color:"var(--text-color)",scale: 1 });

  };
  const onLeave = ({ currentTarget }) => {

        gsap.to(currentTarget, {backgroundColor: "",color:"var(--header-color)",scale: 1 });

  };
  const onPrimaryLeave = ({ currentTarget }) => {

        gsap.to(currentTarget, {backgroundColor: "var(--primary-btn-color)",color:"var(--black-color)",scale: 1 });
  };

  const onSecondaryLeave = ({ currentTarget }) => {

    gsap.to(currentTarget, {backgroundColor: "var(--secondary-btn-color)",color:"var(--black-color)",scale: 1 });
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
      (cursorElement.tagName === "INPUT" || cursorElement.tagName === "BUTTON" || cursorElement.tagName === "svg");
      if(!isCursorOverInputOrButton && !areCirclesVisible){
        setAreCirclesVisible(true);
      } else if(isCursorOverInputOrButton && areCirclesVisible){
        setAreCirclesVisible(false);

      } else {
        circleRefs.current.forEach((ref) => 
        {
          ref.moveTo(clientX, clientY);
        });
      }

    };
    
    
    window.addEventListener("pointermove", onMove);
    
    return () => window.removeEventListener("pointermove", onMove);
  }, [areCirclesVisible]);
  const circles= [];

  if (areCirclesVisible) {
    circles.push(<Circle size="sm" ref={addCircleRef} delay={0} key="circle-sm" />);
    circles.push(<Circle size="md" ref={addCircleRef} delay={0.1} key="circle-md" />);
    circles.push(<Circle size="lg" ref={addCircleRef} delay={0.2} key="circle-lg" />);
  }
  return (
   <Router>
        <Navbar onEnter={onEnter} onLeave={onLeave} toggleContent={toggleContent} onPrimaryEnter={onPrimaryEnter} onPrimaryLeave={onPrimaryLeave} handleOpenLoginModal={handleOpenLoginModal} handleOpenRegisterModal={handleOpenRegisterModal}/>
        {circles}
        <Routes>
          <Route path="/" element={<Landing isLoginModalOpen={isLoginModalOpen} handleCloseLoginModal={handleCloseLoginModal} isRegisterModalOpen={isRegisterModalOpen} handleCloseRegisterModal={handleCloseRegisterModal} handleOpenRegisterModal={handleOpenRegisterModal} handleOpenLoginModal={handleOpenLoginModal} onPrimaryEnter={onPrimaryEnter} onPrimaryLeave={onPrimaryLeave}/>} />
          <Route path="/user-dashboard" element={<UserDashboard onEnter={onEnter} onLeave={onSideLeave} toggleContent={toggleContent} state={state}/>}/>
          <Route path="/admin-dashboard" element={<AdminDashboard onEnter={onEnter} onLeave={onSideLeave} toggleContent={toggleContent} state={state}/>}/>

        </Routes>
    </Router>
  );
}

export default App;
