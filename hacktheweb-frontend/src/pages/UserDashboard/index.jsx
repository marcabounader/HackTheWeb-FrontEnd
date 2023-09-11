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
import { useDispatch } from 'react-redux';
import { setLabs, setActiveLabs, setCompletedLabs, setBadges, setStatistics } from '../../slices/labSlice'; 
import { getActiveLabs, getCompletedLabs, getLabs, getStatistics, getUserBadges } from '../../helpers/user.helpers';

const falseState = {
  home:false,
  achievements:false,
  labs_tab: false,
  active_tab: false,
  completed_tab:false,
};


const UserDashboard = ({addCircleRef,areCirclesVisible}) => {
  const dispatch = useDispatch();
  const completedLabs = useSelector((state) => state.labs.completedLabs);
    const user = useSelector((state) => state.user);
    const { token } = user;
    const [state, setState] = useState({
      home:true,
      achievements:false,
      labs_tab: false,
      active_tab: false,
      completed_tab:false,
    });
    const toggleContent = (page) => {
      setState({ ...falseState, [page]: true });
    };

    const navigate=useNavigate();

    useEffect(() => {
      if (!token) {
        navigate('/');
      }
    });
    useEffect(() => {
      const fetchStatistics = async () => {
        const {data , errors, message} = await getStatistics(token);
        if(message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
          const {message,...statistics_temp} = data;
          dispatch(setStatistics(statistics_temp));
        }

      };
      fetchStatistics();
    },[completedLabs]);
    useEffect(() => {

        const fetchLabs = async () => {
          const {data , errors, message} = await getLabs(token);
            if(message && message=="Unauthenticated."){
              navigate("/");
            }else if (data && data.labs) {
              dispatch(setLabs(data.labs));
            }
  
        };
        const fetchActiveLabs = async () => {
          const {data , errors, message} = await getActiveLabs(token);
            if(message && message=="Unauthenticated."){
              navigate("/");
            }else if (data && data.active_labs) {
              dispatch(setActiveLabs(data.active_labs));
            }
  
        };
        const fetchCompletedLabs = async () => {
          const {data , errors, message} = await getCompletedLabs(token);
            if(message && message=="Unauthenticated."){
              navigate("/");
            }else if (data && data.completed_labs) {
              dispatch(setCompletedLabs(data.completed_labs));
            }
        };
        const fetchBadges = async () => {
          const {data , errors, message} = await getUserBadges(token);
            if(message && message=="Unauthenticated."){
              navigate("/");
            }else if (data && data.badges) {
              dispatch(setBadges(data.badges));
            }
        };
        fetchLabs();
        fetchActiveLabs();
        fetchCompletedLabs();
        fetchBadges();
        }, []);
        

    const circles = [];

    if (areCirclesVisible) {
      circles.push(<Circle size="sm" ref={addCircleRef} delay={0} key="circle-sm" />);
      circles.push(<Circle size="md" ref={addCircleRef} delay={0.1} key="circle-md" />);
      circles.push(<Circle size="lg" ref={addCircleRef} delay={0.2} key="circle-lg" />);
    }
    const {  home,achievements,labs_tab, active_tab, completed_tab} = state;

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
                  toggleContent("labs_tab");
                }}
                className={`transition-all ${labs_tab && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Active"
                onClick={() => {
                  toggleContent("active_tab");
                }}
                className={`transition-all ${active_tab && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Completed Labs"
                onClick={() => {
                  toggleContent("completed_tab");
                }}
                className={`transition-all ${completed_tab && "text-black bg-bg-active"}`}
                />
            </Sidebar>
            <div className='content-wrapper'>
                {home && <Home/>}
                {achievements && <Achievements/>}
                {labs_tab && <Labs/>}
                {active_tab && <ActiveLabs/>}
                {completed_tab && <CompletedLabs/>}
            </div>
        </section>
        
    );
}
 
export default UserDashboard;