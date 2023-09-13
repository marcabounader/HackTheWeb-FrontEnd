import ActionProvider from "./ActionProvider";

class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = ActionProvider;
    }
  
    parse(message) {
      const lowerCaseMessage = message.toLowerCase()
      
      if (lowerCaseMessage.includes("hello")) {
        this.actionProvider.greet()
      }
    }
  }
  
  export default MessageParser