const SideButton = ({text,onClick}) => {
    return ( 
        <button className='text-white shadow-lg text-left' onClick={onClick}>{text}</button>
     );
}
 
export default SideButton;