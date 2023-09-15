const AdminUsercard = ({user}) => {
    return ( 
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
            <div className="basis-1/5 text-center">{user.rank}</div>
            <div className="basis-1/5 flex-grow capitalize text-center">{user.name}</div>
            <div className="basis-1/5 flex-grow capitalize text-center">{user.email}</div>
            <div className="basis-1/5 flex-grow text-center"><button className="btn-2 secondary-btn">Restrict</button></div>
            <div className="basis-1/5 flex-grow text-center"><button className="btn-2 secondary-btn">Delete</button></div>
        </div>
    );
}
 
export default AdminUsercard;