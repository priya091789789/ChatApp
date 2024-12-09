const Message = require("../models/Message");

const getMessages = async (req, res) => {
  const { room } = req.params;
  const messages = await Message.find({ room }).sort({ timestamp: 1 });
  res.json(messages);
};

const postMessage = async (req, res) => {
  const { room, sender, message } = req.body;

  try {
    const newMessage = new Message({ room, sender, message });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

module.exports = { getMessages, postMessage };
