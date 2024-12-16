const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

const app = express();

// Enable CORS to allow requests from React (running on port 5167)
app.use(cors({
  origin: 'http://localhost:5173', // Allow React's development server to access API
  methods: ['GET', 'POST'],
  credentials: true
}));

// Parse incoming JSON data
app.use(express.json());

// Add your API routes for authentication and chat
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);

// Catch-all route for any other requests (optional)
app.get('*', (req, res) => {
  res.status(404).json({ message: 'Not Found' });
});

module.exports = app;
