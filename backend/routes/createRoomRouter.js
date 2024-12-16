const express = require('express');
const { v4: uuidv4 } = require('uuid'); 
const Room = require("../models/Room"); // Assuming you have a Room model
const router = express.Router();

// Route for creating a new room
router.post('/create-room', (req, res) => {
  try {
    const roomId = uuidv4(); 
    res.status(200).json({ roomId });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ error: 'Failed to create room' });
  }
});

// Route to join an existing room
router.post("/join/:roomId", async (req, res) => {
    const { roomId } = req.params;
  
    try {
      // Check if room exists in your database (optional)
      const room = await Room.findOne({ roomId }); // Assuming you have a Room model
  
      if (!room) {
        return res.status(404).json({ error: "Room not found" });
      }
  
      // Respond with success and room details
      res.status(200).json({ success: true, roomId });
    } catch (error) {
      console.error('Error joining room:', error);
      res.status(500).json({ error: "Failed to join room" });
    }
  });
  

module.exports = router;
