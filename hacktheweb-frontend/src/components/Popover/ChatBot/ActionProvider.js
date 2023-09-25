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
    const newMessage = `${messages}\n${request}`;
    setMessage(newMessage)
    console.log(newMessage);
    const {data,message,errorMessages} = await getBotResponse(token,newMessage);
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