import './sidebar.css';
const Sidebar = ({children}) => {
    return ( 
        <aside className="sidebar">
            {children}
        </aside>
     );
}
 
export default Sidebar;