import Chatbot from "react-chatbot-kit";
import { Button, Popover } from 'antd';

import ActionProvider from "../Modals/ChatBot/ActionProvider";
import MessageParser from "../Modals/ChatBot/MessageParser";
import config from "../Modals/ChatBot/config";

const ChatBot = () => {
    const text = '';

    const content=(
        <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser}/>
    );
    return ( 
        <div className="fixed bottom-2 right-2">
        <Popover placement="topLeft" content={content} trigger="click">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 100 100"
                  width="75px"
                  height="75px"
                  className="fixed bottom-2 right-2"
                >
                  <g>
                    <path fill="#55ABE0" d="M73.142 40.869c0-.084.003-.166.003-.25 0-14.843-6.384-26.875-14.259-26.875-2.438 0-4.733 1.156-6.739 3.191a2.997 2.997 0 0 1-4.294 0c-2.007-2.035-4.301-3.191-6.739-3.191-7.875 0-14.26 12.032-14.26 26.875 0 .084.003.166.003.25C15.209 43.914 7.5 49.186 7.5 55.185c0 9.429 19.028 14.476 42.5 14.476s42.5-5.047 42.5-14.476c0-5.999-7.709-11.271-19.358-14.316z" />
                    <path fill="#55ABE0" d="M17.849 71.963l3.061 11.073a2.556 2.556 0 0 0 2.48 1.942l13.756 1.223c.734.065 1.474.086 2.204-.012 2.211-.295 4.286-1.32 5.763-3.013 1.443-1.654 3.109-2.6 4.886-2.6 1.776 0 3.442.946 4.886 2.6 1.477 1.692 3.553 2.718 5.763 3.013.73.097 1.471.077 2.204.012l13.756-1.223a2.554 2.554 0 0 0 2.48-1.942l3.061-11.073a2.555 2.555 0 0 0-2.48-3.169c-19.78 4.054-39.56 4.054-59.341 0a2.556 2.556 0 0 0-2.479 3.169z" />
                  </g>
                </svg>
        </Popover>
    </div>
    );
}
 
export default ChatBot;