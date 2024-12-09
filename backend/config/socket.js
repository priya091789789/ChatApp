const { Server } = require("socket.io");
const Message = require("../models/Message");

const setupSocket = (server) => {
  const io = new Server(server, { cors: { origin: "*" } });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join-room", (room) => {
      socket.join(room);
      console.log(`User ${socket.id} joined room: ${room}`);
    });

    socket.on("user-message", async ({ room, sender, message }) => {
      const newMessage = new Message({ room, sender, message });
      await newMessage.save();
      io.to(room).emit("message", { sender, message });
    });

    socket.on("typing", ({ room, sender }) => {
      socket.to(room).emit("typing", { sender });
    });

    socket.on("stop-typing", (room) => {
      socket.to(room).emit("stop-typing");
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

module.exports = setupSocket;
