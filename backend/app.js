const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const createRoomRouter = require('./routes/createRoomRouter'); // Import the create room router

const app = express();

// Enable CORS to allow requests from React (running on port 5173)
app.use(cors({
  origin: 'http://localhost:5173', // Allow React's development server to access API
  methods: ['GET', 'POST'],
  credentials: true
}));

// Parse incoming JSON data
app.use(express.json());

// Add your API routes for authentication, chat, and rooms
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/rooms', createRoomRouter); // Use the create room router

// Catch-all route for any other requests (optional)
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
