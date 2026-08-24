const express = require("express");
const router = express.Router();

const supabase = require("../db");

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    // Validate user message
    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({
        success: false,
        message: "A valid message is required.",
      });
    }

    // Fetch all published ASM CSIT knowledge documents
    const { data: knowledge, error } = await supabase
      .from("knowledge_documents")
      .select("id, title, category, content")
      .eq("status", "published")
      .order("category", { ascending: true });

    if (error) {
      console.error("Knowledge retrieval error:", error);

      return res.status(500).json({
        success: false,
        message: "Failed to retrieve ASM CSIT knowledge.",
      });
    }

    return res.json({
      success: true,
      user_message: message.trim(),
      knowledge_count: knowledge.length,
      knowledge,
    });
  } catch (error) {
    console.error("Chat route error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;