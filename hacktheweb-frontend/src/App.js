import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import Navbar from './components/Navbar';
import { gsap } from 'gsap';
import { useState } from 'react';
import UserDashboard from './pages/UserDashboard';


function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const handleOpenLoginModal = () => setIsLoginModalOpen(true);
  const handleCloseLoginModal = () => setIsLoginModalOpen(false);

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

  return (
   <Router>
        <Navbar onEnter={onEnter} onLeave={onLeave} handleOpenLoginModal={handleOpenLoginModal}/>
        <Routes>
          <Route path="/" element={<Landing isLoginModalOpen={isLoginModalOpen} handleCloseLoginModal={handleCloseLoginModal} onEnter={onEnter} onLeave={onLeave}/>} />
          <Route path="/user-dashboard" element={<UserDashboard/>}/>
        </Routes>
    </Router>
  );
}

export default App;
