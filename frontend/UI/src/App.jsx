// src/App.jsx

import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ChatRoom from './components/ChatRoom';
import { useState } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state

  return (
    <Router>
      <Routes>
        {/* Landing Page - The Welcome Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Login Page */}
        <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />

        {/* Signup Page */}
        <Route path="/signup" element={<SignupPage />} />

        {/* Chat Room Page - Only accessible if authenticated */}
        <Route
          path="/chat/:roomId"
          element={isAuthenticated ? <ChatRoom /> : <LandingPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;
