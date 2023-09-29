import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SideButton = ({onEnter,onLeave, icon, text, onClick,className, fill, icon_style=null}) => {
  return (
    <div className={`side-button-wrapper self-stretch items-center flex gap-[10px] h-[60px] cursor-pointer ${className}`} onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {icon && (
        <div>
          <FontAwesomeIcon icon={icon} width="35px" height="35px" className={icon_style}/>
        </div>
      )}
      <div className='side-text px-[10px] font-bold'>{text}</div>
    </div>
  );
}

export default SideButton;
