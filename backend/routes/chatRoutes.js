const express = require("express");
const { getMessages, postMessage } = require("../controllers/chatController");
const verifyToken = require("../middleware/authMiddleware");  // Import the JWT verification middleware
const router = express.Router();

router.get("/:room", getMessages);  

router.post("/", verifyToken, postMessage);  // Apply the middleware to protect the route

module.exports = router;
