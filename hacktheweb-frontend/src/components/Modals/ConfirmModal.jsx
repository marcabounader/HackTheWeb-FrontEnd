import Modal from 'react-modal';

const ConfirmModal = ({handler,action,name ,isOpen, handleCloseViewModal}) => {
    const handleConfirm = () =>{
        handler();
        handleCloseViewModal();
    }
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-31 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 dark:text-slate-200 signIn-container flex flex-col items-center gap-5 rounded-2xl shadow-lg"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
        >
        <h4 className="p-4">
          Confirm {action} {name}
        </h4>
        <div className=" monster flex justify-between gap-3 w-full px-5 pb-5">
          <button
            onClick={handleCloseViewModal}
            className="btn"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="btn primary-btn"
          >
            {action}
          </button>
  
        </div>
      </Modal>
     );
}
 
export default ConfirmModal;