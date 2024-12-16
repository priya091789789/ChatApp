import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios'; // Import custom axios instance
import { useSocket } from '../context/SocketContext';
import ChatInput from '../components/ChatInput';
import MessageList from '../components/MessageList';
import ParticipantList from '../components/ParticipantList';

const ChatRoom = () => {
  const { roomId } = useParams(); // Get roomId from URL params
  const { socket } = useSocket();
  const [messages, setMessages] = useState([]);
  const [participants, setParticipants] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch initial room data (messages and participants) using axios
  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        // Fetch initial messages and participants for the room from the backend
        const responseMessages = await api.get(`/room/${roomId}/messages`);
        const responseParticipants = await api.get(`/room/${roomId}/participants`);
        
        setMessages(responseMessages.data.messages);
        setParticipants(responseParticipants.data.participants);
      } catch (error) {
        console.error('Error fetching room data:', error);
      }
    };

    fetchRoomData();
  }, [roomId]);

  useEffect(() => {
    if (!socket) return;

    // Join the room when the socket is available
    socket.emit('join-room', roomId);

    // Listen for incoming messages
    socket.on('message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Listen for participant updates
    socket.on('participants', (updatedParticipants) => {
      setParticipants(updatedParticipants);
    });

    // Clean up on unmount
    return () => {
      socket.off('message');
      socket.off('participants');
    };
  }, [socket, roomId]);

  const sendMessage = (msg) => {
    // Emit the message to the server
    socket.emit('user-message', { room: roomId, sender: 'Username', message: msg });
    setMessage('');
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-semibold mb-4">Chat Room: {roomId}</h2>

      <div className="flex-grow overflow-y-auto">
        {/* Message list */}
        <MessageList messages={messages} />
      </div>

      <div className="flex flex-col mt-4">
        {/* Chat input */}
        <ChatInput onSendMessage={sendMessage} />

        {/* Participant list */}
        <ParticipantList participants={participants} />
      </div>
    </div>
  );
};

export default ChatRoom;
