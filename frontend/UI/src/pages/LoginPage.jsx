import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // Import the Axios instance

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For handling error messages
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send the login credentials to the backend
      const response = await api.post("/login", { username, password });

      // Assuming the backend sends back a JWT or a success response
      if (response.data.success) {
        // Store the token or user info if needed (e.g., in localStorage or Context)
        console.log("Logged in successfully", response.data);

        // Navigate to the room creation page
        navigate("/room");
      } else {
        setError("Invalid credentials, please try again.");
      }
    } catch (error) {
      // Handle error if the request fails
      console.error("Login failed:", error);
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-sm p-6 bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold mb-6">Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 bg-gray-700 rounded-md text-white"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 bg-gray-700 rounded-md text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>} {/* Display error message */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-md"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
