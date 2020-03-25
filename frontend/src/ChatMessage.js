import React from "react";

export const ChatMessage = ({ name, message }) => {
  return (
    <p>
      <strong>{name}</strong>
      <em>{message}</em>
    </p>
  );
};

export default ChatMessage;
