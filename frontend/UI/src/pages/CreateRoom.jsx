import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const CreateRoom = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [socket, setSocket] = useState(null);

  // Initialize Socket.IO connection
  useEffect(() => {
    const newSocket = io('http://localhost:9000'); // Ensure this matches the server's URL
    setSocket(newSocket);

    // Clean up socket connection when component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  const handleCreateRoom = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      // Make a POST request to create the room
      const response = await fetch('http://localhost:9000/rooms/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const text = await response.text();  // Get the raw response text

      console.log('Response text:', text);  // Log to inspect the raw response

      if (!response.ok) {
        throw new Error('Failed to create room');
      }

      const data = JSON.parse(text);  // Parse the response as JSON

      // Emit socket event to handle room creation on the server-side
      if (socket) {
        socket.emit('create-room');

        // Listen for the room-created event to get the room ID
        socket.on('room-created', (roomData) => {
          // On success, navigate to the created room
          navigate(`/chat/${roomData.roomId}`);
        });
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Create a Room</h2>
        <div className="flex flex-col items-center">
          <button
            onClick={handleCreateRoom}
            className={`w-full bg-green-500 hover:bg-green-700 text-white py-3 rounded-md transition duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading}
          >
            {loading ? 'Creating Room...' : 'Create Room'}
          </button>
          {errorMessage && <p className="text-red-500 text-center mt-3">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
