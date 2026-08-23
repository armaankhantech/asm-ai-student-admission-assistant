const express = require("express");

const router = express.Router();

router.post("/", (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res.status(400).json({
      success: false,
      message: "A valid message is required",
    });
  }

  res.json({
    success: true,
    reply: "ASM AI backend received your message.",
    receivedMessage: message.trim(),
  });
});

module.exports = router;
