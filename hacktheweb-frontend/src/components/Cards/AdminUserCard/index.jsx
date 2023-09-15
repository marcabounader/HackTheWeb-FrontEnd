const AdminUsercard = ({user,token}) => {
    const handleRestrict = async () =>{
        const {data,message,errorMessages} = await restrict(token,user.id);
        if(message && message=="Unauthenticated."){
          navigate("/");
        } else if (data && data.message) {
            dispatch(setLabInactive(lab.id));
        }
    }
    }
    return ( 
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
            <div className="basis-1/5 text-center">{user.rank}</div>
            <div className="basis-1/5 flex-grow capitalize text-center">{user.name}</div>
            <div className="basis-1/5 flex-grow capitalize text-center">{user.email}</div>
            <div className="basis-1/5 flex-grow text-center"><button className="btn-2 secondary-btn" onClick={handleRestrict}>Restrict</button></div>
            <div className="basis-1/5 flex-grow text-center"><button className="btn-2 secondary-btn">Delete</button></div>
        </div>
    );
}
 
export default AdminUsercard;