import './sidebar.css';
const Sidebar = ({children}) => {
    return ( 
        <aside class="sidebar">
            {children}
        </aside>
     );
}
 
export default Sidebar;