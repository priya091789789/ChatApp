// src/context/SocketContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import { io } from 'socket.io-client';

// The URL of the backend (adjust it according to your setup)
const SOCKET_SERVER_URL = 'http://localhost:5000'; // Or your actual backend URL

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Create a new socket connection when the component is mounted
    const socketConnection = io(SOCKET_SERVER_URL);

    // Set the socket connection to the state
    setSocket(socketConnection);

    // Cleanup the socket connection when the component is unmounted
    return () => {
      if (socketConnection) {
        socketConnection.disconnect();
      }
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
