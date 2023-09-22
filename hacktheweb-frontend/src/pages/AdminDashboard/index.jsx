import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Circle from '../../components/Objects/circle';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import SideButton from '../../components/Sidebar/SideButton';
import Labs from '../../components/Content/Labs';
import './AdminDashboard.css';
import { faFlaskVial, faHome, faMedal, faRunning, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { setActiveLabs, setBadgeCategories, setBadges, setLabCategories, setLabDifficulties, setLabs, setStatistics, setUsers } from '../../slices/labSlice'; 
import { getActiveLabs, getAdminStatistics, getAllLabs, getBadgeCategories, getBadges, getLabCategory, getLabDifficulty, getUsers } from '../../helpers/admin.helpers';
import Leaderboard from '../../components/Content/Leaderboard';
import Home from '../../components/Content/Home';
import AdminActiveLabs from '../../components/Content/AdminActiveLabs';
import Achievements from '../../components/Content/Achievements'
import Users from '../../components/Content/Users';
import { createTheme } from '@mui/material';

const AdminDashboard = ({onEnter,onLeave,addCircleRef,areCirclesVisible,state,toggleContent}) => {
  const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { token } = user;
    const [perPage,setPerPage]=useState(9);
    const [usersPerPage,setUsersPerPage]=useState(5);
    const [badgesPerPage,setBadgesPerPage]=useState(5);
    const [activePerPage,setActivePerPage]=useState(5);
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
    const [currentPage,setCurrentPage]=useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const [totalLabs,setTotalLabs] = useState('');
    const [totalUsers,setTotalUsers] = useState('');
    const [totalBadges,setTotalBadges] = useState('');
    const [totalActive,setTotalActive] = useState('');
    const navigate=useNavigate();
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
      toggleContent('home');
      if (!token) {
        navigate('/');
      }
    }, []);
  
    const fetchLabs = async () => {
      try {
        const { data, message, errorMessages } = await getAllLabs(token,currentPage);
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
    const fetchUsers = async () =>{
      try{
      const {data,message,errorMessages} = await getUsers(token,currentPage);
      if (message && message === "Unauthenticated.") {
        navigate("/");
      } else if (data && data.users) {
        dispatch(setUsers(data.users.data));
        setTotalPages(data.users.last_page);
        setUsersPerPage(data.users.per_page);
        setTotalUsers(data.users.total);
      }
    } catch (error) {
      console.error("Error fetching labs:", error);
    }
    };
    const fetchBadges = async () => {
      try {
        const { data, message, errorMessages } = await getBadges(token,currentPage);
        if (message && message === "Unauthenticated.") {
          navigate("/");
        } else if (data && data.badges) {
          dispatch(setBadges(data.badges.data)); 
          setTotalPages(data.badges.last_page);
          setBadgesPerPage(data.badges.per_page);
          setTotalBadges(data.badges.total); 
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    const fetchActiveLabs = async () => {
      try {
        const { data, message, errorMessages } = await getActiveLabs(token,currentPage);
        if (message && message === "Unauthenticated.") {
          navigate("/");
        } else if (data && data.active_labs) {
          console.log(data);
          dispatch(setActiveLabs(data.active_labs.data));  
          setTotalPages(data.active_labs.last_page);
          setActivePerPage(data.active_labs.per_page);
          setTotalActive(data.active_labs.total); 
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    useEffect(() => {
      if (isMounted) {

  
        const fetchStatistics = async () => {
          try {
            const { data, message, errorMessages } = await getAdminStatistics(token);
            if (message && message === "Unauthenticated.") {
              navigate("/");
            } else if (data) {
              const { message, ...statistics_temp } = data;
              dispatch(setStatistics(statistics_temp));     
            }
          } catch (error) {
            console.error("Error fetching statistics:", error);
          }
        };
          
        const fetchLabCategories = async () => {
          try {
            const { data, message, errorMessages } = await getLabCategory(token);
            if (message && message === "Unauthenticated.") {
              navigate("/");
            } else if (data && data.lab_categories) {
              dispatch(setLabCategories(data.lab_categories));     
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        const fetchLabDifficulties = async () => {
          try {
            const { data, message, errorMessages } = await getLabDifficulty(token);
            if (message && message === "Unauthenticated.") {
              navigate("/");
            } else if (data && data.difficulties) {
              dispatch(setLabDifficulties(data.difficulties));     
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };

        const fetchBadgeCategories = async () => {
          try {
            const { data, message, errorMessages } = await getBadgeCategories(token);
            if (message && message === "Unauthenticated.") {
              navigate("/");
            } else if (data && data.categories) {
              dispatch(setBadgeCategories(data.categories));  
            }
          } catch (error) {
            console.error("Error fetching categories:", error);
          }
        };
        fetchLabDifficulties();
        fetchStatistics();
        fetchLabCategories();
        fetchBadgeCategories();
      }
    }, [isMounted]);
        
    const circles = [];

    if (areCirclesVisible) {
      circles.push(<Circle size="sm" ref={addCircleRef} delay={0} key="circle-sm" />);
      circles.push(<Circle size="md" ref={addCircleRef} delay={0.1} key="circle-md" />);
      circles.push(<Circle size="lg" ref={addCircleRef} delay={0.2} key="circle-lg" />);
    }

    const {  home,labs_tab, active_tab, users_tab,leaderboard,badges} = state;

    return ( 
        <section className='main-wrapper'>
            {circles}
            <Sidebar>
                <SideButton 
                icon={faHome}
                icon_style="text-color-main"
                text="Home"
                onEnter={onEnter} 
                onLeave={onLeave}
                onClick={() => {
                  toggleContent("home");
                }}
                className={`transition-all ${home && " text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Badges"
                onEnter={onEnter} 
                onLeave={onLeave}
                icon={faMedal}
                icon_style="text-color-secondary"
                onClick={() => {
                  toggleContent("badges");
                }}
                className={`transition-all ${badges && "text-black bg-bg-active"}`}
                />
                <SideButton 
                icon={faFlaskVial}
                onEnter={onEnter} 
                onLeave={onLeave}
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
                onEnter={onEnter} 
                onLeave={onLeave}
                icon_style="text-color-secondary"
                onClick={() => {
                  toggleContent("active_tab");
                }}
                className={`transition-all ${active_tab && "text-black bg-bg-active"}`}
                />
                <SideButton 
                text="Users"
                icon={faUsers}
                onEnter={onEnter} 
                onLeave={onLeave}
                icon_style="text-color-secondary"
                onClick={() => {
                  toggleContent("users_tab");
                }}
                className={`transition-all ${users_tab && "text-black bg-bg-active"}`}
                />
            </Sidebar>
            <div className='content-wrapper'>

                {users_tab && <Users fetchUsers={fetchUsers} token={token} totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} theme={theme}/>}
                {home && <Home/>}
                {labs_tab && <Labs labs_tab={labs_tab} fetchLabs={fetchLabs} totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} theme={theme}/>}
                {active_tab && <AdminActiveLabs fetchActiveLabs={fetchActiveLabs} totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} theme={theme}/>}
                {leaderboard && <Leaderboard/>}
                {badges && <Achievements fetchBadges={fetchBadges} totalPages={totalPages} setCurrentPage={setCurrentPage} currentPage={currentPage} theme={theme}/> }

            </div>
        </section>
        
    );
}
 
export default AdminDashboard;