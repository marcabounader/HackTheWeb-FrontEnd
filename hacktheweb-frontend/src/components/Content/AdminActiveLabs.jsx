import { useSelector } from "react-redux";
import ActiveLabCard from "../Cards/ActiveLabCard";
import { Pagination, Stack, ThemeProvider } from "@mui/material";
import { useEffect } from "react";

const AdminActiveLabs = ({theme, setCurrentPage,fetchActiveLabs,totalPages,currentPage}) => {
    const active_labs = useSelector((state) => state.labs.activeLabs);
    const handlePageChange = (event,page) => {
      setCurrentPage(page);
      fetchActiveLabs();
    };
    useEffect(() => {
        setCurrentPage(1);
        fetchActiveLabs();
    }, []); 
    return ( 
        <>
        <h1 className="text-start self-stretch w-full">User Active Labs</h1>
        <div className="flex flex-start gap-[10px] h-[64px] w-full items-center bg-black shadow-md">
            <div className="basis-1/5  text-left uppercase ml-2">Name</div>
            <div className="basis-1/5 uppercase text-left">Email</div>
            <div className="basis-1/5  text-left uppercase">Docker Name</div>
            <div className="basis-1/5  text-left uppercase">Flag</div>
            <div className="basis-1/5  text-left uppercase">Port</div>
            <div className="basis-1/5  text-left uppercase">Launch Time</div>
            <div className="basis-1/5  text-left uppercase">Action</div>

        </div>
        {active_labs && active_labs.length > 0 ? (
          <>
          <div className="flex flex-col w-full gap-[5px]">
            {active_labs
            .map((lab, index) => <ActiveLabCard lab={lab} key={index} />)}
            </div>
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
          <p>No Active Labs.</p>
        )}
      </>
     );
}
 
export default AdminActiveLabs;