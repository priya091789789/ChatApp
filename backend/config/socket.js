const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const Message = require("../models/Message");
const User = require("../models/User"); // To manage users in the room

const setupSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Event to generate a unique room ID (UUID) and join that room
    socket.on("create-room", () => {
      const roomId = uuidv4(); // Generate a unique room ID
      socket.join(roomId); // Join the room
      console.log(`User ${socket.id} created and joined room: ${roomId}`);

      // Optionally, emit the room ID back to the client
      socket.emit("room-created", { roomId });

      // Initialize room participants (could be empty initially)
      io.to(roomId).emit("participants", getRoomParticipants(roomId));
    });

    // Event to join an existing room using the room ID (UUID)
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);

      // Notify other users in the room about the new participant
      io.to(roomId).emit("participants", getRoomParticipants(roomId));

      // Emit room-joined event to the user
      socket.emit("room-joined", { roomId });
    });

    // Event to handle sending messages in the room
    socket.on("user-message", async ({ room, sender, message }) => {
      // Validate sender and message
      if (typeof sender !== "string" || typeof message !== "string" || !message.trim()) {
        return; // Do nothing if sender is invalid or message is empty
      }

      // Create and save the new message
      const newMessage = new Message({ room, sender, message });
      await newMessage.save();

      // Emit the message to all users in the room
      io.to(room).emit("message", { sender, message });
    });

    // Event to handle typing notifications
    socket.on("typing", ({ room, sender }) => {
      socket.to(room).emit("typing", { sender });
    });

    // Event to handle stopping typing notifications
    socket.on("stop-typing", (room) => {
      socket.to(room).emit("stop-typing");
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Optionally, remove the user from the room and update participants
      // io.emit('participants', getRoomParticipants(roomId));  // You might want to update participants list
    });
  });

  // Utility function to get participants in a room (you can improve this depending on how you manage users)
  const getRoomParticipants = (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    const participants = room ? Array.from(room) : [];  // Array of socket ids
    return participants;
  };

  return io;
};

module.exports = setupSocket;
