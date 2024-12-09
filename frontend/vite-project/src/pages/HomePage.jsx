import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const url = isLogin
      ? "http://localhost:9000/auth/login"
      : "http://localhost:9000/auth/register";

    try {
      const response = await axios.post(url, { username, password });
      if (isLogin) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username", response.data.username);
        navigate("/room/general");
      } else {
        alert("Registration successful, please login!");
        setIsLogin(true);
      }
    } catch (error) {
      alert("Error: " + error.response.data.error);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">{isLogin ? "Login" : "Register"}</h2>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-2 p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-2 p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleSubmit}
        >
          {isLogin ? "Login" : "Register"}
        </button>
        <button
          className="text-sm text-blue-500 mt-2"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin ? "Create an account" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
}

export default HomePage;
