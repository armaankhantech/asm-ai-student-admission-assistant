require("dotenv").config();

const express = require("express");
const supabase = require("./db");
const chatRouter = require("./routes/chat");
const enquiriesRouter = require("./routes/enquiries");

const app = express();

const PORT = process.env.PORT || 3000;

// --------------------------------------------------
// CORS
// Frontend: http://localhost:3001
// Backend:  http://localhost:3000
// --------------------------------------------------

app.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Origin",
    "http://localhost:3001"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// --------------------------------------------------
// Body parsing
// --------------------------------------------------

app.use(express.json());

// --------------------------------------------------
// Chat API
// --------------------------------------------------

app.use("/api/chat", chatRouter);
app.use("/api/enquiries", enquiriesRouter);

// --------------------------------------------------
// Health check
// --------------------------------------------------

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "ASM AI backend is running",
  });
});

// --------------------------------------------------
// Supabase test
// --------------------------------------------------

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

// --------------------------------------------------
// Start server
// --------------------------------------------------

app.listen(PORT, () => {
  console.log(
    `ASM AI backend running on http://localhost:${PORT}`
  );
});