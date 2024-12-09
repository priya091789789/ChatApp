import React from "react";

function Chat({ sender, message }) {
  return (
    <div className="mb-4">
      <p className="font-bold">{sender}</p>
      <p>{message}</p>
    </div>
  );
}

export default Chat;
