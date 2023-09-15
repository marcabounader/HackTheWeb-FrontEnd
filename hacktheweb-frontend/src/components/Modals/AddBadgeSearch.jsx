import Modal from 'react-modal';

const AddBadgeSearch = ({labs,setInputState,setFilteredLabs,filteredLabs,isOpen,handleCloseViewModal}) => {
    const handleLabSearch = (e) => {
        const searchInput = e.target.value;
        if(searchInput!=='')
        {
            const filtered = labs.filter((lab) =>
            lab.name.toLowerCase().includes(searchInput.toLowerCase())
          );
          setFilteredLabs(filtered);
        }
      };
      const handleLabSelect = (lab_id) => {
        setInputState((prev) => ({ ...prev, lab_id: lab_id }));
        handleCloseViewModal();
      };
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-35 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 dark:text-slate-200 signIn-container flex flex-col items-center gap-5 rounded-2xl shadow-lg"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
      >
        <h4 className="p-4">Search for Lab</h4>
        <div className="flex flex-row gap-5 p-6 pb-0">
        <div className='flex flex-col gap-5 basis-[50%]'>
            <input
            type="search"
            placeholder="Search for a lab"
            onChange={handleLabSearch}
          />
        <ul className=' cursor-pointer'>
            {filteredLabs.map((lab) => (
              <li key={lab.id} onClick={() => handleLabSelect(lab.id)}>
                {lab.name}
              </li>
            ))}
          </ul>
          </div>
          </div>
            <div className=" monster flex justify-between gap-3 w-full px-5 pb-5">
          <button onClick={handleCloseViewModal} className="btn">
            Cancel
          </button>
        </div>
      </Modal>
    );
}
 
export default AddBadgeSearch;