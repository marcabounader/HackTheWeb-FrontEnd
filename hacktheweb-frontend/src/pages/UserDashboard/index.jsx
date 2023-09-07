import { useSelector } from 'react-redux';

const UserDashboard = () => {
    const user = useSelector((state) => state.user);
    const { user_id, token, name, type_id, rank } = user;
  
    return ( 
        <section className='content-wrapper'>

        </section>
        
    );
}
 
export default UserDashboard;