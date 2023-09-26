import { createChatBotMessage } from 'react-chatbot-kit';

const config = { 
  botName: "HackerBot",
  initialMessages: [createChatBotMessage("You are now using the HackTheWeb Assistant, your guide to implementing web attacks securely. How can I assist you today?")],
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