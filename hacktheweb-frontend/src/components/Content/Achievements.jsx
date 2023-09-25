import { useSelector } from "react-redux";
import BadgeCard from "../Cards/BadgeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddBadgeModal from "../Modals/AddBadgeModal";
import { Pagination, Stack, ThemeProvider, debounce } from "@mui/material";

const Achievements = ({handleBadgeSearch,searchedBadges,setSearchedBadges,theme,fetchBadges,setCurrentPage,totalPages,currentPage}) => {
    const badges = useSelector((state) => state.labs.badges);
    const user = useSelector((state) => state.user);
    const { type_id ,token } = user;
    const [showAddBadge,setShowAddBadge]=useState(false);
    const handleCloseAddBadge = () => setShowAddBadge(false);
    const handleOpenAddBadge = () => setShowAddBadge(true);
    const debouncedHandleSearch = debounce(handleBadgeSearch, 300);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const handleSearchChange = (event) => {
      const { value } = event.target;
      setDebouncedSearch(value);
      if (value !== "" && badges && badges.length>0) {
          debouncedHandleSearch(value);
      } else {
          setSearchedBadges([]);
      }
    };
    useEffect(()=>{
      setCurrentPage(1);
      fetchBadges();
      setSearchedBadges([]);
      setDebouncedSearch('');
    },[]);
    const handlePageChange = (event,page) => {
      setCurrentPage(page);
      if(debouncedSearch!==""){
        handleBadgeSearch(debouncedSearch)
    } else {
      fetchBadges();
    }
  };
    return ( 
        <>
        <AddBadgeModal isOpen={showAddBadge} handleCloseViewModal={handleCloseAddBadge} token={token}/>
        { type_id=="3" ?
        <>
        <h1 className="text-start w-full">Achievements</h1>
        </>
        :
        <>
        <div className="flex flex-row basis-full justify-between items-center">
        <h1 className="text-start">Badges</h1>
        <FontAwesomeIcon onClick={handleOpenAddBadge} icon={faPlusSquare} className="text-color-secondary w-[40px] h-[40px]" ></FontAwesomeIcon>
        </div>
        </>
        }
        {badges && badges.length > 0 ? (
          <>
          <div className="w-full flex flex-row justify-center items-center">
        <input
                    type="search"
                    placeholder="Search Badges"
                    value={debouncedSearch}
                    onChange={handleSearchChange}
        />
        </div>
        {searchedBadges && searchedBadges.length > 0 ? 
                (
                  <>
                  {searchedBadges.map((badge, index) => 
                  <BadgeCard badges={badges} type_id={type_id} badge={badge} key={index} token={token} />
                  )}
                  </>
                )
                :
                (
                  <>
                  {badges.map((badge, index) => 
                  <BadgeCard badges={badges} type_id={type_id} badge={badge} key={index} token={token} />
                  )}
                  </>
                )
        }
        <ThemeProvider theme={theme}>
        <Stack className="basis-full flex flex-col items-center">
                <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                />
        </Stack>
        </ThemeProvider>

        </>
        ) : (
          <p>No Badges available.</p>
        )}
      </>
     );
}
 
export default Achievements;