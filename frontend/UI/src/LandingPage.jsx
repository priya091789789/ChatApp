import React from 'react';
import { Link } from 'react-router-dom'; // To handle routing in React

const LandingPage = () => {
  return (
    <div className="min-h-screen text-white flex flex-col justify-between">
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 fixed w-full top-0 left-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold text-white">Chatify</div>
          <div className="hidden md:flex space-x-6">
            <a href="#features" className="text-white hover:text-gray-400 transition duration-300">
              Features
            </a>
            <a href="#cta" className="text-white hover:text-gray-400 transition duration-300">
              Get Started
            </a>
            <Link to="/login" className="text-white hover:text-gray-400 transition duration-300">
              Login
            </Link>
            <Link to="/signup" className="text-white hover:text-gray-400 transition duration-300">
              Sign Up
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content Section */}
      <section className="flex flex-col justify-center items-center text-center py-32 space-y-6 bg-gray-900">
        <h1 className="text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl">
          Welcome to Chatify
        </h1>
        <p className="text-xl max-w-3xl mx-auto">
          Chat smarter, not harder. Choose from room-based chats or dynamic string-based matching. It's time to make your conversations more exciting and personalized.
        </p>

        {/* Buttons for Joining a Room or Chatting */}
        <div className="mt-8 flex justify-center gap-4">
          <a href="#room-chat" className="px-8 py-3 w-48 bg-green-500 text-lg rounded-md hover:bg-green-700 transition duration-300">
            Join a Room
          </a>
          <a href="#match-chat" className="px-8 py-3 w-48 bg-green-500 text-lg rounded-md hover:bg-green-700 transition duration-300">
            Chat Now
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-800 text-gray-200" id="features">
        <div className="container mx-auto text-center space-y-12">
          <h2 className="text-3xl font-semibold">Why Choose Chatify?</h2>
          <p className="text-lg max-w-xl mx-auto">
            Whether you're looking to chat in themed rooms or connect with people with similar interests, our platform provides the best of both worlds.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12">
            {/* Feature 1 */}
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold">Room-based Chat</h3>
              <p className="mt-4">Join chat rooms with like-minded individuals and dive deep into specific topics. From tech to hobbies, there's a room for everyone!</p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold">String-based Matching</h3>
              <p className="mt-4">Enter your interests, and our app will match you with people who are chatting about similar topics. Perfect for personalized conversations!</p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-700 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-semibold">Easy to Use</h3>
              <p className="mt-4">Our intuitive design ensures that you can start chatting immediately with minimal setup. It's as easy as clicking a button!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-black text-white text-center" id="cta">
        <h2 className="text-3xl font-semibold">Ready to Dive In?</h2>
        <p className="mt-4 text-lg">Join now and be part of exciting conversations with people from all around the world.</p>
        <div className="mt-6">
          <Link to="/signup" className="inline-block px-8 py-3 bg-yellow-400 text-lg rounded-full text-gray-800 hover:bg-yellow-500 transition duration-300">
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2024 Chatify. All rights reserved.</p>
        <p>Developed By Lucky Kumar</p>
      </footer>
    </div>
  );
};

export default LandingPage;
