import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios"; // Import the custom axios instance

const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check if the user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Make an API call to check if the user is authenticated
        const response = await api.get("/auth/check", {
          headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` },
        });
        if (response.status === 200) {
          setIsAuthenticated(true);
          // Redirect to the chat room or another page if authenticated
          navigate("/chat"); // You can change this to the appropriate page
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="text-center space-y-8">
        <h1 className="text-4xl font-bold">Welcome to My Chat App</h1>
        <p className="text-xl">A modern chat application with real-time messaging.</p>
        
        {loading ? (
          <p className="text-lg">Loading...</p>
        ) : (
          <div className="space-x-4">
            {!isAuthenticated && (
              <>
                <Link to="/login" className="text-lg bg-blue-500 px-6 py-2 rounded-lg">
                  Login
                </Link>
                <Link to="/signup" className="text-lg bg-green-500 px-6 py-2 rounded-lg">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
