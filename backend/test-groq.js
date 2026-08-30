require("dotenv").config();

const Groq = require("groq-sdk");

async function testGroq() {
  try {
    if (!process.env.GROQ_API_KEY) {
      throw new Error("GROQ_API_KEY is missing from .env");
    }

    if (!process.env.GROQ_MODEL) {
      throw new Error("GROQ_MODEL is missing from .env");
    }

    console.log("GROQ_API_KEY: Loaded");
    console.log("GROQ_MODEL:", process.env.GROQ_MODEL);

    const groq = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });

    const response = await groq.chat.completions.create({
      model: process.env.GROQ_MODEL,
      messages: [
        {
          role: "user",
          content: "Reply with exactly: ASM AI Groq connection successful.",
        },
      ],
    });

    const answer = response.choices?.[0]?.message?.content;

    console.log("\nModel response:");
    console.log(answer);

    console.log("\nGroq test successful.");
  } catch (error) {
    console.error("\nGroq test failed.");

    if (error?.status) {
      console.error("Status:", error.status);
    }

    if (error?.message) {
      console.error("Message:", error.message);
    } else {
      console.error(error);
    }

    process.exit(1);
  }
}

testGroq();