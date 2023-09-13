import Modal from 'react-modal';
Modal.setAppElement('#root');

const ChatBotModal = () => {
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}

        >       
        </Modal>
        );
}
 
export default ChatBotModal;