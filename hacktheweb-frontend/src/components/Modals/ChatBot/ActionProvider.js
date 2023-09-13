// in ActionProvider.jsx
import React from 'react';
import { getBotResponse } from '../../../helpers/user.helpers';
import { useSelector } from 'react-redux';


const ActionProvider = ({ createChatBotMessage, setState, children }) => {
    const user = useSelector((state) => state.user);
    const { token } = user;
  const handleHello = () => {
    const botMessage = createChatBotMessage('Hello. Nice to meet you.');

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleRequest = async (request) => {
    const {data,message,errorMessages} = await getBotResponse(token,request);
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