import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Circle from '../../components/Objects/circle';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/Sidebar';
import SideButton from '../../components/Sidebar/SideButton';
import Badges from '../../components/Content/Badges';
import Labs from '../../components/Content/Labs';
import ActiveLabs from '../../components/Content/ActiveLabs';
import CompletedLabs from '../../components/Content/CompletedLabs';
import Home from '../../components/Content/Home';
const falseState = {
  home:false,
  badges:false,
  labs: false,
  active_labs: false,
  completed_labs:false,
};


const UserDashboard = ({addCircleRef,areCirclesVisible}) => {
    const user = useSelector((state) => state.user);
    const { user_id, token, name, type_id, rank } = user;

    const [state, setState] = useState({
      home:true,
      badges:false,
      labs: false,
      active_labs: false,
      completed_labs:false,
    });
    const toggleContent = (page) => {
      setState({ ...falseState, [page]: true });
    };
    const {  home,badges,labs, active_labs, completed_labs} = state;

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
              <div className='main-icons'>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none"
              onClick={() => {
                toggleContent("home");
              }}
              >
                  <g clip-path="url(#clip0_110_550)">
                      <path d="M17.0363 10.9532L5.83327 20.1802V30.1388C5.83327 30.3967 5.9357 30.6439 6.11802 30.8263C6.30035 31.0086 6.54764 31.111 6.80549 31.111L13.6147 31.0934C13.8717 31.0921 14.1177 30.9891 14.299 30.8069C14.4803 30.6247 14.5821 30.3782 14.5821 30.1212V24.3055C14.5821 24.0476 14.6845 23.8003 14.8668 23.618C15.0491 23.4357 15.2964 23.3333 15.5543 23.3333H19.4432C19.701 23.3333 19.9483 23.4357 20.1306 23.618C20.313 23.8003 20.4154 24.0476 20.4154 24.3055V30.1169C20.415 30.2449 20.4398 30.3716 20.4885 30.4899C20.5372 30.6082 20.6087 30.7158 20.6991 30.8064C20.7894 30.897 20.8967 30.9688 21.0148 31.0179C21.133 31.0669 21.2597 31.0922 21.3876 31.0922L28.1944 31.111C28.4522 31.111 28.6995 31.0086 28.8818 30.8263C29.0642 30.6439 29.1666 30.3967 29.1666 30.1388V20.1735L17.966 10.9532C17.8343 10.8471 17.6703 10.7892 17.5011 10.7892C17.332 10.7892 17.168 10.8471 17.0363 10.9532ZM34.7326 17.2247L29.6527 13.0374V4.62101C29.6527 4.42763 29.5759 4.24216 29.4391 4.10541C29.3024 3.96867 29.1169 3.89185 28.9235 3.89185H25.5208C25.3274 3.89185 25.1419 3.96867 25.0052 4.10541C24.8684 4.24216 24.7916 4.42763 24.7916 4.62101V9.03308L19.3514 4.55721C18.8293 4.1276 18.1742 3.8927 17.4981 3.8927C16.822 3.8927 16.1669 4.1276 15.6448 4.55721L0.263649 17.2247C0.189814 17.2857 0.128726 17.3607 0.0838777 17.4453C0.0390291 17.53 0.0112982 17.6226 0.00226954 17.718C-0.00675913 17.8133 0.00309137 17.9095 0.0312582 18.0011C0.059425 18.0927 0.105356 18.1778 0.166427 18.2516L1.71591 20.1352C1.77681 20.2093 1.85172 20.2706 1.93636 20.3157C2.02099 20.3608 2.11368 20.3887 2.20912 20.3979C2.30456 20.4071 2.40088 20.3974 2.49257 20.3693C2.58425 20.3412 2.66949 20.2954 2.74342 20.2343L17.0363 8.4619C17.168 8.35576 17.332 8.29788 17.5011 8.29788C17.6703 8.29788 17.8343 8.35576 17.966 8.4619L32.2595 20.2343C32.3333 20.2954 32.4184 20.3413 32.5099 20.3695C32.6015 20.3976 32.6977 20.4075 32.7931 20.3985C32.8884 20.3894 32.9811 20.3617 33.0657 20.3168C33.1504 20.272 33.2254 20.2109 33.2864 20.1371L34.8359 18.2534C34.8969 18.1792 34.9426 18.0936 34.9704 18.0017C34.9983 17.9097 35.0077 17.8131 34.9981 17.7176C34.9885 17.622 34.9601 17.5292 34.9145 17.4446C34.8689 17.36 34.8071 17.2853 34.7326 17.2247Z" fill="#55ABE0"/>
                  </g>
                  <defs>
                      <clipPath id="clip0_110_550">
                      <rect width="35" height="35" fill="white"/>
                      </clipPath>
                  </defs>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 35 35" fill="none"
              onClick={() => {
                toggleContent("badges");
              }}
              >
                  <g clip-path="url(#clip0_110_285)">
                      <path d="M15.2954 8.93799L10.5697 1.0623C10.3754 0.738322 10.1005 0.470188 9.77174 0.284022C9.44302 0.0978559 9.07168 4.63836e-06 8.6939 0H1.09575C0.210497 0 -0.307667 0.995996 0.19956 1.72129L7.80591 12.5877C9.83755 10.6894 12.4215 9.38643 15.2954 8.93799ZM33.9041 0H26.306C25.5376 0 24.8253 0.40332 24.4302 1.0623L19.7045 8.93799C22.5784 9.38643 25.1624 10.6894 27.194 12.587L34.8003 1.72129C35.3076 0.995996 34.7894 0 33.9041 0ZM17.5 10.9375C10.8554 10.9375 5.4687 16.3242 5.4687 22.9688C5.4687 29.6133 10.8554 35 17.5 35C24.1445 35 29.5312 29.6133 29.5312 22.9688C29.5312 16.3242 24.1445 10.9375 17.5 10.9375ZM23.8246 21.6877L21.2317 24.2143L21.8449 27.784C21.9542 28.4238 21.2802 28.9126 20.7067 28.6104L17.5 26.9254L14.2939 28.6104C13.7197 28.9146 13.0463 28.4231 13.1557 27.784L13.7689 24.2143L11.176 21.6877C10.7098 21.2338 10.9675 20.4415 11.6101 20.3485L15.1942 19.8263L16.7958 16.5778C16.9401 16.2853 17.219 16.141 17.4986 16.141C17.7795 16.141 18.0605 16.2873 18.2047 16.5778L19.8064 19.8263L23.3905 20.3485C24.0331 20.4415 24.2908 21.2338 23.8246 21.6877Z" fill="#A4B1CD"/>
                  </g>
                  <defs>
                      <clipPath id="clip0_110_285">
                      <rect width="35" height="35" fill="white"/>
                      </clipPath>
                  </defs>
              </svg>

              </div>
              <div className='button-wrapper'>
                <SideButton 
                text="Labs"
                onClick={() => {
                  toggleContent("labs");
                }}
                />
                <SideButton 
                text="Active"
                onClick={() => {
                  toggleContent("active_labs");
                }}
                />
                <SideButton 
                text="Completed Labs"
                onClick={() => {
                  toggleContent("completed_labs");
                }}
                />

              </div>
            </Sidebar>
            <div className='content-wrapper'>
                {home && <Home/>}
                {badges && <Badges/>}
                {labs && <Labs/>}
                {active_labs && <ActiveLabs/>}
                {completed_labs && <CompletedLabs/>}
            </div>
        </section>
        
    );
}
 
export default UserDashboard;