import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { restrict } from "../../../helpers/admin.helpers";

const AdminUsercard = ({setUsers,user,token}) => {
        const navigate=useNavigate();
        const dispatch=useDispatch();
        const handleRestrict = async () =>{
            const {data,message,errorMessages} = await restrict(token,user.id);
            if(message && message=="Unauthenticated."){
            navigate("/");
            } else if (data) {
                if (data.message === "unrestricted") {
                    setUsers((prev) => {
                        const updatedUsers = prev.map((u) => {
                            if (u.id === user.id) {
                                return { ...u, is_restricted: 0 };
                            }
                            return u;
                        });
                        return updatedUsers;
                    });
                } else if (data.message === "restricted") {
                    setUsers((prev) => {
                        const updatedUsers = prev.map((u) => {
                            if (u.id === user.id) {
                                return { ...u, is_restricted: 1 };
                            }
                            return u;
                        });
                        return updatedUsers;
                    });
                }
            }
        }
    return ( 
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
            <div className="basis-1/5 text-center">{user.rank}</div>
            <div className="basis-1/5 flex-grow capitalize text-center">{user.name}</div>
            <div className="basis-1/5 flex-grow capitalize text-center">{user.email}</div>
            {user.is_restricted ?
            <>
            <div className="basis-1/5 flex-grow capitalize text-center">Restricted</div>
            <div className="basis-1/5 flex-grow text-center"><button className="btn-2 secondary-btn" onClick={handleRestrict}>Unrestrict</button></div>
            </>
            :
            <>
            <div className="basis-1/5 flex-grow capitalize text-center">Not restricted</div>
            <div className="basis-1/5 flex-grow text-center"><button className="btn-2 secondary-btn" onClick={handleRestrict}>Restrict</button></div>
            </>
            }
            {/* <div className="basis-1/5 flex-grow text-center"><button className="btn-2 secondary-btn" >Delete</button></div> */}
        </div>
    );
}
 
export default AdminUsercard;