const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for a message
const messageSchema = new Schema({
  room: { type: String, required: true },
  sender: { type: String, required: true },  // Ensure sender is a string
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// Create the message model
const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
