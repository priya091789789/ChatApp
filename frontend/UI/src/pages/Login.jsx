import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');  // State for username
  const [password, setPassword] = useState('');  // State for password
  const [errorMessage, setErrorMessage] = useState('');  // State for error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Clear previous error message
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),  // Send username and password
      });

      const data = await response.json();

      console.log('Response:', data);  // Log the response for debugging

      if (!response.ok) {
        // Check if there is an error message from the backend
        throw new Error(data.error || 'Login failed');
      }

      // Store token in localStorage
      localStorage.setItem('token', data.token);

      // Redirect to dashboard (or wherever you'd like)
      navigate('/join-or-create-room');
    } catch (error) {
      console.error('Error:', error.message);  // Log error message
      setErrorMessage(error.message);  // Show error message to the user
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-center mb-8">Login to Chatify</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}  // Update username state
              placeholder="Username"
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update password state
              placeholder="Password"
              className="w-full p-3 rounded-md bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}  {/* Show error message */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-700 text-white py-3 rounded-md transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
