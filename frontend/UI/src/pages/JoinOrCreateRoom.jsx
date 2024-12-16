import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const JoinOrCreateRoom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [joinRoomId, setJoinRoomId] = useState('');
  const [createdRoomId, setCreatedRoomId] = useState('');

  // Handle create room action
  const handleCreateRoom = async () => {
    setLoading(true);
    setErrorMessage('');
    setCreatedRoomId('');

    try {
      const response = await fetch(`http://localhost:9000/rooms/create-room`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: 'User' }), // Pass the username as needed
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create room');
      }

      setCreatedRoomId(data.roomId); // Save the created room ID
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle join room action
  const handleJoinRoom = async () => {
    if (!joinRoomId) {
      setErrorMessage('Please enter a room ID to join');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      const response = await fetch(`http://localhost:9000/rooms/join/${joinRoomId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to join room');
      }

      // Navigate to the chat interface
      navigate(`/chat/${joinRoomId}`);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Join or Create Room</h2>

        {errorMessage && <p className="text-red-500 text-center mb-4">{errorMessage}</p>}

        <div className="mb-6">
          <button
            onClick={handleCreateRoom}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white py-3 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? 'Creating Room...' : 'Create Room'}
          </button>
          {createdRoomId && (
            <div className="mt-4 bg-gray-700 p-3 rounded-md">
              <p className="text-center">Room Created!</p>
              <input
                type="text"
                value={createdRoomId}
                readOnly
                className="w-full mt-2 p-2 bg-gray-600 text-white rounded-md text-center"
              />
            </div>
          )}
        </div>

        <div className="mb-6">
          <input
            type="text"
            value={joinRoomId}
            onChange={(e) => setJoinRoomId(e.target.value)}
            placeholder="Enter Room ID"
            className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none mb-4"
          />
          <button
            onClick={handleJoinRoom}
            className="w-full bg-green-500 hover:bg-green-700 text-white py-3 rounded-md transition duration-300"
            disabled={loading}
          >
            {loading ? 'Joining Room...' : 'Join Room'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinOrCreateRoom;
