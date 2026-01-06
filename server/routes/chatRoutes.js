const express = require("express");
const auth = require("../middleware/authMiddleware");
const Message = require("../models/Message");

const router = express.Router();

router.get("/messages/:roomId", auth, async (req, res) => {
  const messages = await Message.find({ roomId: req.params.roomId })
    .sort({ createdAt: 1 });

  res.json(messages);
});

module.exports = router;
