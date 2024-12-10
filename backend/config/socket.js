const { Server } = require("socket.io");
const { v4: uuidv4 } = require("uuid");
const Message = require("../models/Message");
const User = require("../models/User"); // Assuming you have this model to manage users in your app

const setupSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Event to set the username when the user logs in or registers
    socket.on("set-username", (username) => {
      socket.username = username; // Save username in socket object
      console.log(`User ${socket.id} set username: ${username}`);
    });

    // Event to create a new room
    socket.on("create-room", () => {
      const roomId = uuidv4(); // Generate a unique room ID
      socket.join(roomId); // Join the room
      console.log(`User ${socket.id} created and joined room: ${roomId}`);

      // Emit room ID to the client
      socket.emit("room-created", { roomId });

      // Emit current participants in the room
      io.to(roomId).emit("participants", getRoomParticipants(roomId));
    });

    // Event to join an existing room
    socket.on("join-room", (roomId) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room: ${roomId}`);

      // Notify other users in the room about the new participant
      io.to(roomId).emit("participants", getRoomParticipants(roomId));

      // Emit room-joined event to the user
      socket.emit("room-joined", { roomId });
    });

    // Event to handle sending messages in the room
    socket.on("user-message", async ({ room, message }) => {
      if (typeof message !== "string" || !message.trim()) {
        return; // Ignore empty messages
      }

      const sender = socket.username; // Get the username

      // Create and save the new message
      const newMessage = new Message({ room, sender, message });
      await newMessage.save();

      // Emit the message to all users in the room
      io.to(room).emit("message", { sender, message });
    });

    // Event to handle typing notifications
    socket.on("typing", ({ room }) => {
      socket.to(room).emit("typing", { sender: socket.username });
    });

    // Event to handle stopping typing notifications
    socket.on("stop-typing", (room) => {
      socket.to(room).emit("stop-typing");
    });

    // Event to exit the room
    socket.on("exit-room", async(roomId) => {
      socket.leave(roomId);
      console.log(`User ${socket.id} exited room: ${roomId}`);

      // Emit updated participants list
      io.to(roomId).emit("participants", getRoomParticipants(roomId));

      // Check if the room is empty and delete it if necessary
      const participants = getRoomParticipants(roomId);
      if (participants.length === 0) {
        console.log(`Room ${roomId} is empty. Deleting room...`);
        await Message.deleteMany({ room: roomId });

        // You can add code here to delete the room from your database or storage
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
      // Optionally, update participants list or clean up
    });
  });

  // Utility function to get participants in a room (get usernames from socket object)
  const getRoomParticipants = (roomId) => {
    const room = io.sockets.adapter.rooms.get(roomId);
    if (!room) return [];
    
    // Get participant usernames
    const participants = Array.from(room).map(socketId => io.sockets.sockets.get(socketId)?.username || "Anonymous");
    return participants;
  };

  return io;
};

module.exports = setupSocket;