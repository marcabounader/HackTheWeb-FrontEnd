import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Circle from '../../components/Objects/circle';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';

const UserDashboard = () => {
    const user = useSelector((state) => state.user);
    const { user_id, token, name, type_id, rank } = user;
    const circleRefs = useRef([]);
    const navigate=useNavigate();

    circleRefs.current = [];
    useEffect(() => {
      if (!token) {
        navigate('/');
      } 
    },[]);
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
        <section className='main-wrapper'>
            <Circle size="sm" ref={addCircleRef} delay={0} />
            <Circle size="md" ref={addCircleRef} delay={0.1} />
            <Circle size="lg" ref={addCircleRef} delay={0.2} />
            <Sidebar/>
            <div className='content-wrapper'>

            </div>
        </section>
        
    );
}
 
export default UserDashboard;