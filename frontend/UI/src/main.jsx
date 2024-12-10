// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SocketProvider } from './context/SocketContext'; // Import SocketProvider

// Render the app and wrap with SocketProvider to provide the socket connection
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketProvider> {/* Wrap the app with the SocketProvider */}
      <App />
    </SocketProvider>
  </React.StrictMode>
);
