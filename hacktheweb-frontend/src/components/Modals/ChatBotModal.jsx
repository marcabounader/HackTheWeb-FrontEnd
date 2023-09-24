import Modal from 'react-modal';
import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import ActionProvider from '../Popover/ChatBot/ActionProvider';
import MessageParser from '../Popover/ChatBot/MessageParser';
import config from '../Popover/ChatBot/config';
import './chat.css'

Modal.setAppElement('#root');
const ChatBotModal = ({isOpen,handleCloseViewModal}) => {
    return ( 
        <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseViewModal}
        className="z-30 transition-opacity bg-bg-main fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 dark:border rounded-2xl shadow-lg"
        overlayClassName="fixed top-0 z-10 left-0 w-[100vw] h-full backdrop-blur-xl drop-shadow-lg"
        >     
            <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}/>
        </Modal>
        );
}
 
export default ChatBotModal;