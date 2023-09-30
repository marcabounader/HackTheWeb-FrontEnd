import { useSelector } from "react-redux";
import BadgeCard from "../Cards/BadgeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddBadgeModal from "../Modals/AddBadgeModal";
import { Pagination, Stack, ThemeProvider, debounce } from "@mui/material";

const Achievements = ({badgesPerPage,setBadgesPerPage,handleBadgeSearch,theme,setCurrentPage,totalPages,currentPage}) => {
    const badges = useSelector((state) => state.labs.badges);
    const user = useSelector((state) => state.user);
    const { type_id ,token } = user;
    const [showAddBadge,setShowAddBadge]=useState(false);
    const handleCloseAddBadge = () => setShowAddBadge(false);
    const handleOpenAddBadge = () => setShowAddBadge(true);
    const [debounceTimer, setDebounceTimer] = useState(null);
    const [debouncedSearch, setDebouncedSearch] = useState("");
    
    const handlePageChange = (event,page) => {
      setCurrentPage(page);
      handleBadgeSearch(debouncedSearch);
    };
    const handleItemsPerPageChange = (event, value) => {
      setBadgesPerPage(value);
    };
    const handleSearchChange = (event) => {
      const { value } = event.target;
      if (debounceTimer) {
        clearTimeout(debounceTimer);
    }
      setDebouncedSearch(value);
      if (value !== "" && badges && badges.length > 0) {
        setCurrentPage(1);
        const timerId = setTimeout(() => {
            handleBadgeSearch(value);
        }, 300);
        setDebounceTimer(timerId);
    } else {
        setCurrentPage(1);
        handleBadgeSearch('');
    }
    };
    useEffect(()=>{
      setCurrentPage(1);
      handleBadgeSearch('');
      setDebouncedSearch('');
    },[]);
    useEffect(()=>{
      handleBadgeSearch(debouncedSearch);
    },[badgesPerPage]);

    return ( 
        <>
        <AddBadgeModal isOpen={showAddBadge} handleCloseViewModal={handleCloseAddBadge} token={token}/>
        <div className=" basis-full flex-wrap flex flex-row justify-between items-center">
        { type_id=="3" ?
        <>
        <h1 className="text-start">Achievements</h1>
        <input
                    type="search"
                    placeholder="Search Badges"
                    value={debouncedSearch}
                    onChange={handleSearchChange}
        />
        </>
        :
        <>
        <h1 className="text-start">Badges</h1>
        <input
                    type="search"
                    placeholder="Search Badges"
                    value={debouncedSearch}
                    onChange={handleSearchChange}
        />
        <FontAwesomeIcon onClick={handleOpenAddBadge} icon={faPlusSquare} className="text-color-secondary w-[40px] h-[40px]" ></FontAwesomeIcon>
        </>
        }
        </div>
        {badges && badges.length > 0 ? (
          <>
        {badges.map((badge, index) => 
        <BadgeCard badges={badges} type_id={type_id} badge={badge} key={index} token={token} />
        )}
        <div className="basis-full flex flex-row justify-center items-center">
        <ThemeProvider theme={theme}>
        <Stack>
                <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                />
        </Stack>
        </ThemeProvider>
        <select className=" rounded-none text-black" value={badgesPerPage} onChange={(e) => handleItemsPerPageChange(e, e.target.value)}>
        <option value={4}>4 per page</option>
        <option value={8}>8 per page</option>
        <option value={12}>12 per page</option>
        <option value={16}>16 per page</option>
        </select>
        </div>
        </>
        ) : (
          <p>No Badges available.</p>
        )}
      </>
     );
}
 
export default Achievements;