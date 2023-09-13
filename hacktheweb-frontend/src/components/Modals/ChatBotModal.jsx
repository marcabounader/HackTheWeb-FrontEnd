import Modal from 'react-modal';
import Chatbot from 'react-chatbot-kit'
// import ActionProvider from './ActionProvider';
// import MessageParser from './MessageParser';
// import config from './config';
Modal.setAppElement('#root');

const ChatBotModal = ({isOpen,handleCloseViewModal}) => {
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2 dark:border dark:bg-slate-900 dark:text-slate-200 signIn-container flex flex-col items-center gap-5 rounded-2xl shadow-lg"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
        >       
        <h1>chatbot</h1>
        {/* <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}/> */}
        </Modal>
        );
}
 
export default ChatBotModal;