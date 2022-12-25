import { createContext, useContext, useState } from "react";

const ADD_MESSAGE_COLOR = "#3d84b8";
const REGULAR_MESSAGE_COLOR = "#2b2e4a";
const ERROR_MESSAGE_COLOR = "#fb3640";

const ScoreCardContext = createContext({
  messages: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
});

const makeMessage = (type, message, color) => {
  return {
    message: `${type} (${message.name}, ${message.subject}, ${message.score})`,
    color: color,
  };
};
const makeErrorMessage = (message, color) => {
  return {
    message: message,
    color: color,
  };
};
const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);

  const addCardMessage = (message, card) => {
    setMessages([...messages, makeMessage(message, card, ADD_MESSAGE_COLOR)]);
  };

  const addRegularMessage = (type, ms) => {
    // if (...ms.length() == 0) {
    //console.log(typeof ms);
    // } else {
    if (ms !== undefined) {
      setMessages([
        ...messages,
        ...ms.map((m) =>
          makeMessage(`Found card with ${type}:`, m, REGULAR_MESSAGE_COLOR)
        ),
      ]);
    } else {
      setMessages([makeErrorMessage(type, REGULAR_MESSAGE_COLOR)]);
    }
    //}
  };

  const addErrorMessage = (message) => {
    setMessages([...messages, makeErrorMessage(message, ERROR_MESSAGE_COLOR)]);
  };

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard }; // export the context provider and consumer
