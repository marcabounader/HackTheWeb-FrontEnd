import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Circle from '../../components/Objects/circle';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import SideButton from '../../components/Sidebar/SideButton';
import Labs from '../../components/Content/Labs';
import ActiveLabs from '../../components/Content/ActiveLabs';
import CompletedLabs from '../../components/Content/CompletedLabs';
import Home from '../../components/Content/Home';
import './AdminDashboard.css';
import { faFlask, faHome, faRunning, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setLabs, setActiveLabs, setCompletedLabs, setBadges, setStatistics } from '../../slices/labSlice'; 
import { getActiveLabs, getAllLabs, getCompletedLabs, getLabs, getStatistics, getUserBadges } from '../../helpers/user.helpers';
import Leaderboard from '../../components/Content/Leaderboard';


const AdminDashboard = ({addCircleRef,areCirclesVisible,state,toggleContent}) => {
  const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { token } = user;

    const navigate=useNavigate();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      if (!token) {
        navigate('/');
      }
    }, []);
  
    useEffect(() => {
      if (isMounted) {
        const fetchLabs = async () => {
          try {
            const { data, message, errorMessages } = await getAllLabs(token);
            if (message && message === "Unauthenticated.") {
              navigate("/");
            } else if (data && data.labs) {
              dispatch(setLabs(data.labs));
            }
          } catch (error) {
            console.error("Error fetching labs:", error);
          }
        };
  
    //     const fetchActiveLabs = async () => {
    //       try {
    //         const { data, message, errorMessages } = await getActiveLabs(token);
    //         if (message && message === "Unauthenticated.") {
    //           navigate("/");
    //         } else if (data && data.active_labs) {
    //           dispatch(setActiveLabs(data.active_labs));
    //         }
    //       } catch (error) {
    //         console.error("Error fetching active labs:", error);
    //       }
    //     };
  
    //     const fetchCompletedLabs = async () => {
    //       try {
    //         const { data, message, errorMessages } = await getCompletedLabs(token);
    //         if (message && message === "Unauthenticated.") {
    //           navigate("/");
    //         } else if (data && data.completed_labs) {
    //           dispatch(setCompletedLabs(data.completed_labs));
    //         }
    //       } catch (error) {
    //         console.error("Error fetching completed labs:", error);
    //       }
    //     };
  
    //     const fetchBadges = async () => {
    //       try {
    //         const { data, message, errorMessages } = await getUserBadges(token);
    //         if (message && message === "Unauthenticated.") {
    //           navigate("/");
    //         } else if (data && data.badges) {
    //           dispatch(setBadges(data.badges));
    //         }
    //       } catch (error) {
    //         console.error("Error fetching badges:", error);
    //       }
    //     };
  
        fetchLabs();
    //     fetchActiveLabs();
    //     fetchCompletedLabs();
    //     fetchBadges();
      }
    }, [isMounted]);
        

    const circles = [];

    if (areCirclesVisible) {
      circles.push(<Circle size="sm" ref={addCircleRef} delay={0} key="circle-sm" />);
      circles.push(<Circle size="md" ref={addCircleRef} delay={0.1} key="circle-md" />);
      circles.push(<Circle size="lg" ref={addCircleRef} delay={0.2} key="circle-lg" />);
    }

    const {  home,labs_tab, active_tab, users_tab,leaderboard} = state;

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
                icon={faFlask}
                icon_style="text-color-secondary"
                text="Labs"
                onClick={() => {
                  toggleContent("labs_tab");
                }}
                className={`transition-all ${labs_tab && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Active"
                icon={faRunning}
                icon_style="text-color-secondary"
                onClick={() => {
                  toggleContent("active_tab");
                }}
                className={`transition-all ${active_tab && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Users"
                icon={faUsers}
                icon_style="text-color-secondary"
                onClick={() => {
                  toggleContent("users_tab");
                }}
                className={`transition-all ${users_tab && "text-black bg-bg-active"}`}
                />
            </Sidebar>
            <div className='content-wrapper'>
                {/* {home && <Home/>}
                {labs_tab && <Labs/>}
                {active_tab && <ActiveLabs/>}
                {users_tab && <Users/>} */}
                {labs_tab && <Labs/>}

                {leaderboard && <Leaderboard/>}

            </div>
        </section>
        
    );
}
 
export default AdminDashboard;