import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';  // Import the custom axios instance

const RoomPage = ({ userToken }) => {
  const [roomId, setRoomId] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Create a new room
  const createRoom = async () => {
    setLoading(true);
    try {
      // Use the custom axios instance
      const response = await api.post('/room/create', {}, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      const { roomId } = response.data;
      navigate(`/chat/${roomId}`);
    } catch (error) {
      console.error('Error creating room:', error);
    } finally {
      setLoading(false);
    }
  };

  // Join an existing room
  const joinRoom = async () => {
    if (!roomId) {
      alert('Please enter a valid Room ID.');
      return;
    }

    setLoading(true);
    try {
      // Use the custom axios instance
      await api.post('/room/join', { roomId }, {
        headers: { Authorization: `Bearer ${userToken}` },
      });
      navigate(`/chat/${roomId}`);
    } catch (error) {
      console.error('Error joining room:', error);
      alert('Room not found or invalid.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-800 rounded-lg shadow-lg text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Welcome to the Chat App</h2>
      
      <div className="flex flex-col items-center space-y-4">
        <button
          onClick={createRoom}
          className="w-1/2 p-4 bg-blue-600 hover:bg-blue-700 text-xl font-bold rounded-lg"
          disabled={loading}
        >
          {loading ? 'Creating Room...' : 'Create Room'}
        </button>

        <div className="w-1/2">
          <input
            type="text"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="w-full p-4 bg-gray-700 rounded-lg text-white"
          />
          <button
            onClick={joinRoom}
            className="w-full mt-4 p-4 bg-green-600 hover:bg-green-700 text-xl font-bold rounded-lg"
            disabled={loading}
          >
            {loading ? 'Joining Room...' : 'Join Room'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
