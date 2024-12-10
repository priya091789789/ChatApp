// src/components/ChatInput.jsx

import { useState } from 'react';

const ChatInput = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message); // Pass the message to the parent component
      setMessage(''); // Reset the input field after sending the message
    }
  };

  return (
    <div className="flex items-center space-x-2 mt-4">
      <input
        type="text"
        className="w-full p-3 bg-gray-700 text-white rounded-lg"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
