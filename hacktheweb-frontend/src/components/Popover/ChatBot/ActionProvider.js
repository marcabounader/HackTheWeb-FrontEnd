// in ActionProvider.jsx
import React from 'react';
import { getBotResponse } from '../../../helpers/user.helpers';
import { useSelector } from 'react-redux';
import { useState } from 'react';


const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const user = useSelector((state) => state.user);
    const { token } = user;
    const [messages,setMessage]=useState('');
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleRequest = async (request) => {
    let initialMessage = "This message is being sent using HackTheWeb Assistant to aid the user on how to implement web app attacks.";
    initialMessage += "\nThe user will be asking questions related to the app.";
    initialMessage += "\nThe app contains different labs for implementing different web attacks according to OWASP standards.";
    initialMessage += "\nThe app is using Docker to run instances of OWASP Mutillidae 2.";
    initialMessage += "\nEach instance is a different attack scenario.";
    initialMessage += "\nAnswer the question as if you are HackTheWeb Assistant.";
    initialMessage += "\nThe user is asking the following questions:";
  
    const newMessage = `${initialMessage}\n${messages}\n${request}`;
    setMessage(`${messages}\n${request}`);
    const { data, message, errorMessages } = await getBotResponse(token, newMessage);
    const botMessage = createChatBotMessage(data.response);
  
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  

  // Put the handleHello function in the actions object to pass to the MessageParser
  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            handleHello,
            handleRequest
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;