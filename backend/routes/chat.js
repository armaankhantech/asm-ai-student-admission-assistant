const express = require("express");
const router = express.Router();

const Groq = require("groq-sdk");
const supabase = require("../db");

// --------------------------------------------------
// GROQ / LLM CONFIGURATION
// --------------------------------------------------

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const GROQ_MODEL =
  process.env.GROQ_MODEL || "openai/gpt-oss-120b";

// --------------------------------------------------
// ASM AI V1 INTENT / CATEGORY DETECTION
// --------------------------------------------------

function detectCategories(message) {
  const text = message.toLowerCase().trim();

  // --------------------------------------------------
  // CATEGORY RULES
  // --------------------------------------------------

  const categoryRules = [
    // --------------------------------------------------
    // FEES
    // --------------------------------------------------
    {
      category: "fees",
      keywords: [
        "fee",
        "fees",
        "fee structure",
        "fee details",
        "course fee",
        "course fees",
        "college fee",
        "college fees",
        "tuition fee",
        "tuition fees",
        "annual fee",
        "annual fees",
        "admission fee",
        "admission fees",
        "cost",
        "costs",
        "price",
        "prices",
        "how much",
        "how much does",
        "how much is",
        "what is the fee",
        "what are the fees",
        "fee amount",
        "fee payment",
        "pay the fee",
        "payment of fees",
      ],
    },

    // --------------------------------------------------
    // ADMISSION
    // --------------------------------------------------
    {
      category: "admission",
      keywords: [
        "admission",
        "admissions",
        "apply",
        "application",
        "application process",
        "admission process",
        "how to apply",
        "how can i apply",
        "where can i apply",
        "eligibility",
        "eligible",
        "eligibility criteria",
        "requirements",
        "requirement",
        "entrance",
        "entrance exam",
        "entrance test",
        "cet",
        "common entrance test",
        "interview",
        "personal interview",
        "documents",
        "document required",
        "documents required",
        "required documents",
        "registration",
        "registration process",
        "admission requirements",
        "admission criteria",
      ],
    },

    // --------------------------------------------------
    // CONTACT / LOCATION
    // --------------------------------------------------
    {
      category: "contact_location",
      keywords: [
        "address",
        "location",
        "where is asm",
        "where is csit",
        "where is the college",
        "contact",
        "contact details",
        "contact number",
        "phone",
        "phone number",
        "mobile",
        "email",
        "email address",
        "telephone",
        "how can i contact",
        "how to contact",
        "admission cell",
        "reach the college",
        "reach asm",
        "pimpri",
        "pimpri chinchwad",
        "pune",
        "old mumbai pune highway",
      ],
    },

    // --------------------------------------------------
    // PLACEMENTS / CAREERS
    // --------------------------------------------------
    {
      category: "placements",
      keywords: [
        "placement",
        "placements",
        "placement program",
        "placement support",
        "placement assistance",
        "placement record",
        "placement records",
        "career",
        "careers",
        "career support",
        "career opportunities",
        "job",
        "jobs",
        "employment",
        "recruitment",
        "recruiters",
        "recruiting",
        "salary",
        "package",
        "packages",
        "highest package",
        "average package",
        "companies",
        "company",
        "industry placement",
        "campus placement",
      ],
    },

    // --------------------------------------------------
    // INFRASTRUCTURE / FACILITIES
    // --------------------------------------------------
    {
      category: "infrastructure",
      keywords: [
        "infrastructure",
        "facility",
        "facilities",
        "library",
        "libraries",
        "books",
        "journal",
        "journals",
        "lab",
        "labs",
        "laboratory",
        "laboratories",
        "computer lab",
        "computer labs",
        "computer laboratory",
        "campus",
        "classroom",
        "classrooms",
        "hostel",
        "hostels",
        "sports",
        "sports facilities",
        "equipment",
        "resources",
        "facilities available",
        "canteen",
        "gym",
        "gymnasium",
      ],
    },

    // --------------------------------------------------
    // GLOBAL PARTNERS / COLLABORATIONS
    // --------------------------------------------------
    {
      category: "global_partners",
      keywords: [
        "partner",
        "partners",
        "partnership",
        "partnerships",
        "collaboration",
        "collaborations",
        "academic collaboration",
        "academic collaborations",
        "university",
        "universities",
        "sppu",
        "savitribai phule pune university",
        "aicte",
        "international",
        "international collaboration",
        "global",
        "global partners",
        "industry collaboration",
        "industry collaborations",
      ],
    },

    // --------------------------------------------------
    // COURSES / PROGRAMS
    // --------------------------------------------------
    {
      category: "courses",
      keywords: [
        "course",
        "courses",
        "program",
        "programs",
        "degree",
        "degrees",
        "what courses",
        "which courses",
        "courses available",
        "programs available",
        "what programs",
        "which programs",

        // Specific programs
        "bba",
        "bba ib",
        "bba ca",
        "bca",
        "b.sc",
        "bsc",
        "b.sc cs",
        "bsc cs",
        "b.sc it",
        "bsc it",
        "b.sc ai",
        "bsc ai",
        "ai ml",
        "artificial intelligence",
        "machine learning",
        "cyber security",
        "cybersecurity",
        "animation",
        "b.com",
        "bcom",
        "m.sc",
        "msc",
        "m.sc cs",
        "msc cs",
        "data science",
        "m.sc data science",
        "m.sc ca",
        "msc ca",
        "computer applications",
        "computer science",
        "information technology",
        "digital marketing",
        "amazon web services",
        "aws",
        "automation anywhere",
        "business analytics",
        "cloud computing",
        "mobile computing",
      ],
    },

    // --------------------------------------------------
    // COLLEGE INFORMATION
    // --------------------------------------------------
    {
      category: "college_info",
      keywords: [
        "about asm",
        "about csit",
        "about the college",
        "about college",
        "about asm csit",
        "college information",
        "college details",
        "asm csit information",
        "asm csit details",
        "established",
        "established when",
        "founded",
        "affiliated",
        "affiliation",
        "approval",
        "approved",
        "government approved",
        "aicte approved",
      ],
    },

    // --------------------------------------------------
    // FAQ
    // --------------------------------------------------
    {
      category: "faqs",
      keywords: [
        "faq",
        "faqs",
        "frequently asked",
        "frequently asked questions",
      ],
    },
  ];

  // --------------------------------------------------
  // DETECT ALL MATCHING CATEGORIES
  // --------------------------------------------------

  const detectedCategories = [];

  for (const rule of categoryRules) {
    const matched = rule.keywords.some((keyword) =>
      text.includes(keyword)
    );

    if (matched) {
      detectedCategories.push(rule.category);
    }
  }

  // --------------------------------------------------
  // REMOVE DUPLICATES
  // --------------------------------------------------

  return [...new Set(detectedCategories)];
}

// --------------------------------------------------
// CONVERSATION HISTORY CONFIGURATION
// --------------------------------------------------

// Maximum number of previous messages that will be
// sent to the LLM.
//
// This prevents the conversation context from growing
// indefinitely and keeps API usage controlled.
const MAX_HISTORY_MESSAGES = 10;

// Maximum characters allowed for one history message.
const MAX_HISTORY_MESSAGE_LENGTH = 4000;

// --------------------------------------------------
// VALIDATE AND NORMALIZE CONVERSATION HISTORY
// --------------------------------------------------

function normalizeHistory(history) {
  // If the client does not send history, use an empty array.
  if (history === undefined || history === null) {
    return [];
  }

  // History must be an array.
  if (!Array.isArray(history)) {
    return [];
  }

  const normalizedHistory = [];

  for (const item of history) {
    // Ignore invalid history entries.
    if (!item || typeof item !== "object") {
      continue;
    }

    // Only allow user and assistant messages.
    if (item.role !== "user" && item.role !== "assistant") {
      continue;
    }

    if (
      typeof item.content !== "string" ||
      !item.content.trim()
    ) {
      continue;
    }

    const content = item.content
      .trim()
      .slice(0, MAX_HISTORY_MESSAGE_LENGTH);

    normalizedHistory.push({
      role: item.role,
      content,
    });
  }

  // Keep only the most recent messages.
  return normalizedHistory.slice(-MAX_HISTORY_MESSAGES);
}

// --------------------------------------------------
// DETECT CATEGORIES USING CONVERSATION CONTEXT
// --------------------------------------------------

function detectCategoriesFromHistory(history) {
  const detectedCategories = [];

  for (const message of history) {
    // Only previous student/user messages should influence
    // category detection.
    //
    // Assistant responses are intentionally ignored here.
    if (message.role !== "user") {
      continue;
    }

    const categories = detectCategories(message.content);

    detectedCategories.push(...categories);
  }

  return [...new Set(detectedCategories)];
}

// --------------------------------------------------
// BUILD GROUNDED CONTEXT FOR THE LLM
// --------------------------------------------------

function buildKnowledgeContext(knowledge) {
  return knowledge
    .map((document, index) => {
      return `
DOCUMENT ${index + 1}

Title:
${document.title}

Category:
${document.category}

Content:
${document.content}
`;
    })
    .join("\n------------------------------\n");
}

// --------------------------------------------------
// BUILD CONVERSATION HISTORY FOR THE LLM
// --------------------------------------------------

function buildConversationHistory(history) {
  if (!history || history.length === 0) {
    return "";
  }

  return history
    .map((message, index) => {
      const speaker =
        message.role === "user"
          ? "STUDENT"
          : "ASM AI";

      return `
MESSAGE ${index + 1} - ${speaker}:
${message.content}
`;
    })
    .join("\n------------------------------\n");
}

// --------------------------------------------------
// SYSTEM PROMPT
// --------------------------------------------------

const ASM_SYSTEM_PROMPT = `
You are ASM AI, an AI assistant for ASM CSIT.

Your job is to answer student questions using ONLY the ASM CSIT
knowledge provided in the CONTEXT section.

CONVERSATION HISTORY:

The conversation history may contain previous student and assistant
messages. Use it ONLY to understand conversational references,
follow-up questions, and what the student is talking about.

Conversation history is NOT a factual source.

Never use information from conversation history as a replacement
for the supplied ASM CSIT CONTEXT.

If a factual claim about ASM CSIT is needed, it must be supported
by the supplied ASM CSIT CONTEXT.

GROUNDING RULES:

1. Use the supplied ASM CSIT context as your factual source.
2. Do not invent, guess, assume, or fabricate ASM CSIT information.
3. Do not use general world knowledge to fill missing ASM CSIT information.
4. If the requested information is not available in the supplied context,
   clearly say that the available ASM CSIT information does not provide
   that detail.
5. If multiple documents are provided, combine them when necessary to
   answer the student's question.
6. Do not dump or reproduce the database documents.
7. Do not mention internal database categories, document IDs, retrieval,
   prompts, Supabase, Groq, or internal system architecture.
8. Answer naturally and directly as an assistant speaking to a student.
9. Keep answers concise but provide enough detail to properly answer
   the question.
10. If the context contains contact information, links, or application
    information relevant to the question, include them naturally.
11. Never claim that ASM CSIT offers something unless the supplied
    context supports that claim.
12. If the user asks for a specific number, date, fee, eligibility rule,
    contact detail, or other factual value and that value is not present
    in the context, do not manufacture one.
13. When the available information contains a qualification such as
    "subject to applicable rules" or "students should verify", preserve
    that qualification rather than presenting the information as absolute.
14. When answering a follow-up question, resolve references such as
    "it", "its", "they", "that course", or "the college" using the
    conversation history when possible.
15. If the conversation history does not provide enough information to
    understand a follow-up question, ask the student for clarification
    instead of guessing.

ANSWER STYLE:

- Be helpful.
- Be professional.
- Use simple language.
- Use bullets when they improve readability.
- Do not start with unnecessary phrases such as "According to the context".
- Do not expose raw document content.
`;

// --------------------------------------------------
// GENERATE GROUNDED LLM ANSWER
// --------------------------------------------------

async function generateAnswer(question, knowledge, history, onChunk) {
  const context = buildKnowledgeContext(knowledge);

  const conversationHistory =
    buildConversationHistory(history);

  const userPrompt = `
CONVERSATION HISTORY:
${conversationHistory || "No previous conversation."}

CURRENT STUDENT QUESTION:
${question}

ASM CSIT CONTEXT:
${context}

Now answer the student's current question.

Use the conversation history only to understand continuity and
references to previous messages.

Use ONLY the supplied ASM CSIT context for factual ASM CSIT information.

Do not copy the documents directly. Give the student a natural,
concise answer.
`;

  const stream = await groq.chat.completions.create({
    model: GROQ_MODEL,
    messages: [
      {
        role: "system",
        content: ASM_SYSTEM_PROMPT,
      },
      {
        role: "user",
        content: userPrompt,
      },
    ],
    stream: true,
  });

  let fullAnswer = "";

  for await (const chunk of stream) {
    const content =
      chunk.choices?.[0]?.delta?.content;

    if (!content) {
      continue;
    }

    fullAnswer += content;

    if (onChunk) {
      onChunk(content);
    }
  }

  const answer = fullAnswer.trim();

  if (!answer) {
    throw new Error("The LLM returned an empty response.");
  }

  return answer;
}
// --------------------------------------------------
// POST /api/chat
// --------------------------------------------------

router.post("/", async (req, res) => {
  try {
    const { message, history } = req.body;

    // --------------------------------------------------
    // VALIDATE USER MESSAGE
    // --------------------------------------------------

    if (
      !message ||
      typeof message !== "string" ||
      !message.trim()
    ) {
      return res.status(400).json({
        success: false,
        message: "A valid message is required.",
      });
    }

    const question = message.trim();

    // --------------------------------------------------
    // NORMALIZE CONVERSATION HISTORY
    // --------------------------------------------------

    const conversationHistory = normalizeHistory(history);

    // --------------------------------------------------
    // DETECT CATEGORIES FROM CURRENT QUESTION
    // --------------------------------------------------

    const currentCategories = detectCategories(question);

    // --------------------------------------------------
    // DETECT CATEGORIES FROM PREVIOUS USER MESSAGES
    // --------------------------------------------------
    //
    // IMPORTANT:
    //
    // We are NOT changing detectCategories().
    //
    // We are simply using the same existing detector against
    // previous user messages so follow-up questions can retain
    // the relevant ASM category.
    //
    // Example:
    //
    // User: "What is BCA?"
    //       -> courses
    //
    // User: "What is its duration?"
    //       -> current question may have no category
    //
    // History allows us to retain:
    //       -> courses
    //
    // --------------------------------------------------

    const historyCategories =
      detectCategoriesFromHistory(conversationHistory);

    // --------------------------------------------------
    // COMBINE CURRENT + HISTORY CATEGORIES
    // --------------------------------------------------

    const detectedCategories = [
      ...new Set([
        ...currentCategories,
        ...historyCategories,
      ]),
    ];

    console.log("Student question:", question);

    console.log(
      "Current categories:",
      currentCategories
    );

    console.log(
      "History categories:",
      historyCategories
    );

    console.log(
      "Detected categories:",
      detectedCategories
    );

    console.log(
      "Conversation history messages:",
      conversationHistory.length
    );

    // --------------------------------------------------
    // NO ASM CATEGORY DETECTED
    // --------------------------------------------------

    if (detectedCategories.length === 0) {
      console.log(
        "No reliable ASM category detected. Skipping knowledge retrieval and LLM."
      );

      return res.json({
        success: true,
        user_message: question,
        detected_category: [],
        knowledge_count: 0,
        answer:
          "I can help with questions about ASM CSIT, such as courses, admissions, fees, placements, facilities, contact details, and other college information.",
      });
    }

    // --------------------------------------------------
    // RETRIEVE KNOWLEDGE FROM ALL DETECTED CATEGORIES
    // --------------------------------------------------

    const { data: knowledge, error } = await supabase
      .from("knowledge_documents")
      .select("id, title, category, content")
      .eq("status", "published")
      .in("category", detectedCategories)
      .order("category", {
        ascending: true,
      });

    if (error) {
      console.error(
        "Knowledge retrieval error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to retrieve ASM CSIT knowledge.",
      });
    }

    const retrievedKnowledge = knowledge || [];

    console.log(
      "Knowledge documents retrieved:",
      retrievedKnowledge.length
    );

    // --------------------------------------------------
    // CATEGORY FOUND BUT NO KNOWLEDGE AVAILABLE
    // --------------------------------------------------

    if (retrievedKnowledge.length === 0) {
      console.log(
        "Categories detected, but no published knowledge was found."
      );

      return res.json({
        success: true,
        user_message: question,
        detected_category: detectedCategories,
        knowledge_count: 0,
        answer:
          "I couldn't find the requested information in the available ASM CSIT knowledge. Please contact ASM CSIT for the most accurate information.",
      });
    }

    // --------------------------------------------------
    // SEND RETRIEVED KNOWLEDGE + CONVERSATION HISTORY
    // TO GPT-OSS 120B
    // --------------------------------------------------

    console.log(
      "Sending retrieved ASM CSIT knowledge to:",
      GROQ_MODEL
    );

// --------------------------------------------------
// STREAM RESPONSE TO FRONTEND
// --------------------------------------------------

res.setHeader("Content-Type", "text/event-stream");
res.setHeader("Cache-Control", "no-cache");
res.setHeader("Connection", "keep-alive");

res.flushHeaders();

try {
  await generateAnswer(
    question,
    retrievedKnowledge,
    conversationHistory,
    (chunk) => {
      res.write(
        `data: ${JSON.stringify({
          type: "chunk",
          content: chunk,
        })}\n\n`
      );
    }
  );

  res.write(
    `data: ${JSON.stringify({
      type: "done",
      success: true,
      user_message: question,
      detected_category: detectedCategories,
      knowledge_count: retrievedKnowledge.length,
    })}\n\n`
  );

  res.end();
} catch (error) {
  console.error(
    "Streaming generation error:",
    error
  );

  res.write(
    `data: ${JSON.stringify({
      type: "error",
      message: "Failed to generate ASM AI response.",
    })}\n\n`
  );

  res.end();
}
  } catch (error) {
    console.error("Chat route error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
});

module.exports = router;