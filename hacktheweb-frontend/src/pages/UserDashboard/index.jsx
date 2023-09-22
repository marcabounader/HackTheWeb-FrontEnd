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
import { faFlaskVial, faHome, faMedal, faRunning, faVialCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setLabs, setBadges, setStatistics } from '../../slices/labSlice'; 
import { getLabs, getStatistics, getUserBadges } from '../../helpers/user.helpers';
import Leaderboard from '../../components/Content/Leaderboard';
import ChatBot from '../../components/Popover/ChatBot';
import { createTheme } from '@mui/material';


const UserDashboard = ({onLeave,onEnter,addCircleRef,areCirclesVisible,state,toggleContent}) => {
  const dispatch = useDispatch();
  const completedLabs = useSelector((state) => state.labs.completedLabs);
    const user = useSelector((state) => state.user);
    const { token } = user;
    const navigate=useNavigate();
    const [isMounted, setIsMounted] = useState(false);
    const [showBot,setShowBot]=useState(false);
    const handleOpenBot = () => setShowBot(true);
    const handleCloseBot =() => setShowBot(false);
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const [perPage,setPerPage]=useState(9);
    const [totalLabs,setTotalLabs] = useState('');
    const [badgesPerPage,setBadgesPerPage]=useState(5);
    const [totalBadges,setTotalBadges] = useState('');
    const theme = createTheme({
      palette: {
        primary: {
          main:'#55ABE0'
        },
        secondary: {
          main:'#A4B1CD'
        },
      },
    });
    useEffect(() => {
      setIsMounted(true);
      toggleContent('home');
      if (!token) {
        navigate('/');
      }
    }, []);
    const fetchLabs = async () => {
      try {
        const { data, message, errorMessages } = await getLabs(token,currentPage);
        if (message && message === "Unauthenticated.") {
          navigate("/");
        } else if (data && data.labs) {
          dispatch(setLabs(data.labs.data));
          setTotalPages(data.labs.last_page);
          setPerPage(data.labs.per_page);
          setTotalLabs(data.labs.total);
        }
      } catch (error) {
        console.error("Error fetching labs:", error);
      }
    };

    useEffect(() => {
      if (isMounted) {
        const fetchStatistics = async () => {
          try {
            const { data, message, errorMessages } = await getStatistics(token);
            if (message && message === "Unauthenticated.") {
              navigate("/");
            } else if (data && data.message) {
              const { message, ...statistics_temp } = data;
              dispatch(setStatistics(statistics_temp));
            }
          } catch (error) {
            console.error("Error fetching statistics:", error);
          }
        };
        fetchStatistics();
      }
    }, [completedLabs, isMounted]);

    const fetchBadges = async () => {
      try {
        const { data, message, errorMessages } = await getUserBadges(token);
        if (message && message === "Unauthenticated.") {
          navigate("/");
        } else if (data && data.badges) {
          dispatch(setBadges(data.badges.data)); 
          setTotalPages(data.badges.last_page);
          setBadgesPerPage(data.badges.per_page);
          setTotalBadges(data.badges.total); 
        }
      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };
    

    const circles = [];

    if (areCirclesVisible) {
      circles.push(<Circle size="sm" ref={addCircleRef} delay={0} key="circle-sm" />);
      circles.push(<Circle size="md" ref={addCircleRef} delay={0.1} key="circle-md" />);
      circles.push(<Circle size="lg" ref={addCircleRef} delay={0.2} key="circle-lg" />);
    }
    const {  home,achievements,labs_tab, active_tab, completed_tab,leaderboard} = state;

    return ( 
        <section className='main-wrapper'>
            {circles}
            <Sidebar>
                <SideButton 
                icon={faHome}
                onEnter={onEnter} 
                onLeave={onLeave}
                icon_style="text-color-main"
                text="Home"
                onClick={() => {
                  toggleContent("home");
                }}
                className={`transition-all ${home && " text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Achievements"
                icon={faMedal}
                onEnter={onEnter} 
                onLeave={onLeave}
                icon_style="text-color-secondary"
                onClick={() => {
                  toggleContent("achievements");
                }}
                className={`transition-all ${achievements && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Labs"
                icon={faFlaskVial}
                onEnter={onEnter} 
                onLeave={onLeave}
                icon_style="text-color-secondary"
                onClick={() => {
                  toggleContent("labs_tab");
                }}
                className={`transition-all ${labs_tab && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Active"
                icon={faRunning}
                onEnter={onEnter} 
                onLeave={onLeave}
                icon_style="text-color-secondary"
                onClick={() => {
                  toggleContent("active_tab");
                }}
                className={`transition-all ${active_tab && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Completed Labs"
                icon={faVialCircleCheck}
                onEnter={onEnter} 
                onLeave={onLeave}
                icon_style="text-color-secondary"
                onClick={() => {
                  toggleContent("completed_tab");
                }}
                className={`transition-all ${completed_tab && "text-black bg-bg-active"}`}
                />
            </Sidebar>
            <div className='content-wrapper'>
                {home && <Home/>}
                {achievements && <Achievements theme={theme} fetchBadges={fetchBadges} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
                {labs_tab && <Labs theme={theme} labs_tab={labs_tab} fetchLabs={fetchLabs} totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>}
                {active_tab && <ActiveLabs/>}
                {completed_tab && <CompletedLabs/>}
                {leaderboard && <Leaderboard />}
                <ChatBot/>
            </div>
        </section>
        
    );
}
 
export default UserDashboard;