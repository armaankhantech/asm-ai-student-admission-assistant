// ASM CSIT reference recreation: ASM AI is a transparent RAG-ready student assistant, never fake AI.

export type ChatRole = "assistant" | "user" | "system";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;

  grounding?: {
    label?: string;
    sources?: Array<{
      title: string;
      url?: string;
    }>;
  };

  escalation?: {
    reason?: string;
    contactAdmission: boolean;
  };
};

export type ChatHistoryMessage = {
  role: "user" | "assistant";
  content: string;
};

export type SendChatRequest = {
  message: string;

  /*
   * Previous conversation messages.
   * The current user message is sent separately
   * through `message`.
   */
  history?: ChatHistoryMessage[];

  conversationId?: string;

  context?: {
    program?: string;
    route?: string;
  };
};

export type ChatResponse = {
  status: "ok" | "notConnected" | "error";

  message?: string;

  conversationId?: string;

  grounding?: ChatMessage["grounding"];

  escalation?: ChatMessage["escalation"];
};