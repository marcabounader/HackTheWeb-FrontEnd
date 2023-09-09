import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Circle from '../../components/Objects/circle';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import SideButton from '../../components/Sidebar/SideButton';
import Achievements from '../../components/Content/Achievements';
import Labs from '../../components/Content/Labs';
import ActiveLabs from '../../components/Content/ActiveLabs';
import CompletedLabs from '../../components/Content/CompletedLabs';
import Home from '../../components/Content/Home';
import './UserDashboard.css';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const falseState = {
  home:false,
  achievements:false,
  labs: false,
  active_labs: false,
  completed_labs:false,
};


const UserDashboard = ({addCircleRef,areCirclesVisible}) => {
    const user = useSelector((state) => state.user);
    const { token } = user;

    const [state, setState] = useState({
      home:true,
      achievements:false,
      labs: false,
      active_labs: false,
      completed_labs:false,
    });
    const toggleContent = (page) => {
      setState({ ...falseState, [page]: true });
    };
    const {  home,achievements,labs, active_labs, completed_labs} = state;

    const navigate=useNavigate();

    useEffect(() => {
      if (!token) {
        navigate('/');
      }
    });
    const circles = [];

    if (areCirclesVisible) {
      circles.push(<Circle size="sm" ref={addCircleRef} delay={0} key="circle-sm" />);
      circles.push(<Circle size="md" ref={addCircleRef} delay={0.1} key="circle-md" />);
      circles.push(<Circle size="lg" ref={addCircleRef} delay={0.2} key="circle-lg" />);
    }
    return ( 
        <section className='main-wrapper'>
            {circles}
            <Sidebar>
                <SideButton 
                icon={faHome}
                icon_style="text-color-main"
                text="Home"
                onClick={() => {
                  toggleContent("home");
                }}
                className={`transition-all ${home && " text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Achievements"
                onClick={() => {
                  toggleContent("achievements");
                }}
                className={`transition-all ${achievements && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Labs"
                onClick={() => {
                  toggleContent("labs");
                }}
                className={`transition-all ${labs && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Active"
                onClick={() => {
                  toggleContent("active_labs");
                }}
                className={`transition-all ${active_labs && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Completed Labs"
                onClick={() => {
                  toggleContent("completed_labs");
                }}
                className={`transition-all ${completed_labs && "text-black bg-bg-active"}`}
                />
            </Sidebar>
            <div className='content-wrapper'>
                {home && <Home token={token}/>}
                {achievements && <Achievements token={token}/>}
                {labs && <Labs token={token}/>}
                {active_labs && <ActiveLabs token={token}/>}
                {completed_labs && <CompletedLabs token={token}/>}
            </div>
        </section>
        
    );
}
 
export default UserDashboard;