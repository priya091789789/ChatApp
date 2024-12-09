const express = require("express");
const { getMessages, postMessage } = require("../controllers/chatController");
const router = express.Router();

router.get("/:room", getMessages);
router.post("/", postMessage);

module.exports = router;
