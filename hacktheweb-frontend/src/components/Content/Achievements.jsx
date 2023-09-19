import { useSelector } from "react-redux";
import BadgeCard from "../Cards/BadgeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddBadgeModal from "../Modals/AddBadgeModal";
import { Pagination, Stack } from "@mui/material";

const Achievements = ({fetchBadges,setCurrentPage,totalPages,currentPage}) => {
    const badges = useSelector((state) => state.labs.badges);
    const user = useSelector((state) => state.user);
    const { type_id ,token } = user;
    const [showAddBadge,setShowAddBadge]=useState(false);
    const handleCloseAddBadge = () => setShowAddBadge(false);
    const handleOpenAddBadge = () => setShowAddBadge(true);
    useEffect(()=>{
      setCurrentPage(1);
      fetchBadges();
    },[]);
    const handlePageChange = (event,page) => {
      setCurrentPage(page);
      fetchBadges();
  };
    return ( 
        <>
        <AddBadgeModal isOpen={showAddBadge} handleCloseViewModal={handleCloseAddBadge} token={token}/>
        { type_id=="3" ?
        <>
        <h1 className="text-start w-full">Achievements</h1>
        <Stack className="basis-full flex flex-col items-center">
                <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                />
        </Stack>
        </>
        :
        <>
        <div className="flex flex-row basis-full justify-between items-center">
        <h1 className="text-start">Badges</h1>
        <FontAwesomeIcon onClick={handleOpenAddBadge} icon={faPlusSquare} className="text-color-secondary w-[40px] h-[40px]" ></FontAwesomeIcon>
        </div>
        <Stack className="basis-full flex flex-col items-center">
                <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                />
        </Stack>
        </>
        }
        {badges && badges.length > 0 ? (
        badges.map((badge, index) => <BadgeCard badges={badges} type_id={type_id} badge={badge} key={index} token={token} />)
        ) : (
          <p>No Badges available.</p>
        )}
      </>
     );
}
 
export default Achievements;