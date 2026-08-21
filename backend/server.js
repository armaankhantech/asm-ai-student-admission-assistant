require("dotenv").config();

const express = require("express");
const supabase = require("./db");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ASM AI backend is running",
  });
});

app.get("/api/test-db", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("knowledge_documents")
      .select("id")
      .limit(1);

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      message: "Supabase connection is working",
      data,
    });
  } catch (error) {
    console.error("Database connection error:", error);

    res.status(500).json({
      success: false,
      message: "Supabase connection failed",
    });
  }
});

app.listen(PORT, () => {
  console.log(`ASM AI backend running on http://localhost:${PORT}`);
});