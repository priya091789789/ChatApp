const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: { type: String, required: true, unique: true },
  participants: [{ type: String }] // Optional: store participant usernames or IDs
});

const Room = mongoose.model('Room', roomSchema);
module.exports = Room;
