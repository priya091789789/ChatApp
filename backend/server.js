require("dotenv").config();
const http = require("http");
const connectDB = require("./config/db");
const setupSocket = require("./config/socket");
const app = require("./app");

const PORT = process.env.PORT || 9000;

// Connect to MongoDB
connectDB();

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
setupSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
