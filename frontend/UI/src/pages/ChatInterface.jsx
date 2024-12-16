import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import io from 'socket.io-client';

const ChatRoom = () => {
  const { roomId } = useParams(); // Get the room ID from the URL
  const [socket, setSocket] = useState(null); // Socket instance
  const [messages, setMessages] = useState([]); // Chat messages
  const [message, setMessage] = useState(''); // Current message input
  const [participants, setParticipants] = useState([]); // List of room participants

  // Initialize socket and set up event listeners
  useEffect(() => {
    const newSocket = io('http://localhost:9000'); // Connect to backend
    setSocket(newSocket);

    // Join the room
    newSocket.emit('join-room', roomId);

    // Listen for new messages
    newSocket.on('message', (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Listen for updated participant list
    newSocket.on('participants', (users) => {
      setParticipants(users);
    });

    // Cleanup on unmount
    return () => {
      newSocket.emit('exit-room', roomId); // Notify server about room exit
      newSocket.disconnect();
    };
  }, [roomId]);

  // Send a message to the room
  const handleSendMessage = () => {
    if (message.trim() && socket) {
      socket.emit('user-message', { room: roomId, message }); // Emit message event
      setMessage(''); // Clear the input field
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <header className="bg-gray-800 p-4 text-center">
        <h1 className="text-xl font-bold">Room: {roomId}</h1>
        <p className="text-sm mt-1">Participants: {participants.join(', ')}</p>
      </header>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{msg.sender || 'Anonymous'}: </span>
            <span>{msg.message}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gray-800">
        <div className="flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-3 rounded-md bg-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={handleSendMessage}
            className="ml-4 bg-blue-500 hover:bg-blue-700 text-white py-3 px-6 rounded-md"
          >
            Send
          </button>
        </div>
      </footer>
    </div>
  );
};

export default ChatRoom;
