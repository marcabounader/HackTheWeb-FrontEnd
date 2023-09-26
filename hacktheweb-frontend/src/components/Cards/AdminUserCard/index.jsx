import { useDispatch } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { restrict } from "../../../helpers/admin.helpers";
import { setUserRestricted, setUserUnrestricted } from "../../../slices/labSlice";
import './index.css'
import ConfirmModal from "../../Modals/ConfirmModal";
const AdminUsercard = ({token,user}) => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [showRestrictConfirmation,setRestrictConfirmation] = useState(false);
    const handleOpenConfirmation = () => setRestrictConfirmation(true);
    const handleCloseConfirmation = () =>setRestrictConfirmation(false);
    const [action,setAction] = useState('');
    const handleRestrict = async () =>{
        const {data,message,errorMessages} = await restrict(token,user.id);
        if(message && message=="Unauthenticated."){
        navigate("/");
        } else if (data) {
            if (data.message === "unrestricted") {
                dispatch(setUserUnrestricted(user.id))

            } else if (data.message === "restricted") {
                dispatch(setUserRestricted(user.id))
            }
        }
    }
    return ( 
        <>
        <ConfirmModal action={action} name={user.name} handler={handleRestrict} isOpen={showRestrictConfirmation} handleCloseViewModal={handleCloseConfirmation}/>
        <div className="admin-user-wrapper flex flex-start gap-[10px] h-[64px] w-full items-center bg-black opacity-75 shadow-md">
            <div className="basis-[10%] text-left ml-2 parent">{user.rank}</div>
            <div className="basis-1/5 capitalize text-left parent">{user.name}</div>
            <div className="basis-1/5 capitalize text-left parent">{user.email}</div>
            {user.is_restricted ?
            <>
            <div className="basis-1/5 capitalize text-left parent">Restricted</div>
            <div className="basis-[15%] flex flex-row justify-center parent"><button className="btn-2 secondary-btn" onClick={() => {handleOpenConfirmation(); setAction('Unrestrict');}}>Unrestrict</button></div>
            </>
            :
            <>
            <div className="basis-1/5 capitalize text-left parent">Not restricted</div>
            <div className="basis-[15%] flex flex-row justify-center parent"><button className="btn-2 secondary-btn" onClick={() => {handleOpenConfirmation(); setAction('Restrict');}}>Restrict</button></div>
            </>
            }
        </div>
        </>
    );
}
 
export default AdminUsercard;