import { createChatBotMessage } from 'react-chatbot-kit';

const config = { 
  botName: "HackerBot",
  initialMessages: [createChatBotMessage("Hi, I'm here to help. What attack do you need to implement?")],
  lang:'en',
  customStyles: {
    botMessageBox: {
      backgroundColor: '#55ABE0',
    },
    chatButton: {
      backgroundColor: '#55ABE0',
    },
  },
}

export default config