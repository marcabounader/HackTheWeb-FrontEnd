import { Button, Dropdown, Space } from 'antd';
import { logOut } from '../../helpers/auth.helpers';
import { resetUserState } from '../../slices/userSlice';
import { resetLabState } from '../../slices/labSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './ProfileBar.css';

const ProfileBar = ({handleOpenProfile, handleOpenPassword ,onEnter,onLeave,onPrimaryEnter,onPrimaryLeave}) => {
    const text = <span>Title</span>;
    const user = useSelector((state) => state.user);
    const {name, token ,type_id} = user;
    const navigate=useNavigate();
    const overlayClassName ='custom-dropdown-overlay'
    const dispatch=useDispatch();
    const handleLogOut = async () =>{
        const {data,message,errorMessages} = await logOut(token);
        if (message && message === "Unauthenticated.") {
            navigate("/");
         } else if (data && data.message=="Successfully logged out"){
            dispatch(resetUserState());
            dispatch(resetLabState());
                  navigate('/');
        }
    }
    let items=null
    if(type_id==3) {
        items = [
        {
          key: '1',
          label: (
            <>
            { type_id=='3' && <a onClick={()=>{handleOpenProfile();}}>Profile</a>}
            </>
          ),
        },
        {
          key: '2',
          label: (
            <>
            { type_id=='3' && <a onClick={()=>{handleOpenPassword();}}>Settings</a>}
            </>
          ),
        },
        {
          key: '3',
          label: (
            <a onClick={()=>{handleLogOut();}}>Logout</a>
          ),
        },
      ];
    } else {
        items = [
            {
                key: '1',
                label: (
                  <a onClick={()=>{handleLogOut();}}>Logout</a>
                ),
            },
        ]
    }
      
    return ( 
        <Dropdown placement="bottom" menu={{ items }} arrow className='flex justify-center self-center border-none items-center' overlayClassName='custom-dropdown-overlay' openClassName='custom-open' rootClassName='custom-root'>
            <button className="btn primary-btn capitalize"  onMouseEnter={onPrimaryEnter} onMouseLeave={onPrimaryLeave}>
                {name ? name :"Profile"}
            </button>
        </Dropdown>
        
     );
}
 
export default ProfileBar;