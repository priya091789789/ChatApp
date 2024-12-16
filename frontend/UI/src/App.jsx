import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './LandingPage'; // Main landing page
import LoginPage from './pages/Login'; // Login page
import SignupPage from './pages/SignUp'; // Signup page
import JoinOrCreateRoom from './pages/JoinOrCreateRoom'; // Page for joining or creating a room
import CreateRoom from './pages/CreateRoom'; // Page for creating a room
import ChatRoom from './pages/ChatInterface'; // Chat interface for a specific room

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Authentication Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Room Management Routes */}
        <Route path="/join-or-create-room" element={<JoinOrCreateRoom />} />
        <Route path="/create-room" element={<CreateRoom />} />

        {/* Chat Routes */}
        <Route path="/chat/:roomId" element={<ChatRoom />} />
      </Routes>
    </Router>
  );
};

export default App;
