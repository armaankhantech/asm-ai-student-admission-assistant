// ASM AI integration seam: sends verified chat requests to the local ASM AI backend.
import type { ChatResponse, SendChatRequest } from "@/types/chat";

const API_BASE_URL = "http://localhost:3000";

type StreamHandlers = {
  onChunk?: (chunk: string) => void;
};

export const chatService = {
  async sendMessage(
    request: SendChatRequest,
    handlers?: StreamHandlers,
  ): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        console.error(
          "ASM AI backend returned an HTTP error:",
          response.status,
        );

        return {
          status: "error",
        };
      }

      if (!response.body) {
        console.error("ASM AI backend returned no response body.");

        return {
          status: "error",
        };
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let buffer = "";
      let fullMessage = "";

      while (true) {
        const { value, done } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, {
          stream: true,
        });

        const events = buffer.split("\n\n");

        buffer = events.pop() || "";

        for (const event of events) {
          const dataLine = event
            .split("\n")
            .find((line) => line.startsWith("data:"));

          if (!dataLine) {
            continue;
          }

          const jsonString = dataLine
            .slice(5)
            .trim();

          if (!jsonString) {
            continue;
          }

          let data;

          try {
            data = JSON.parse(jsonString);
          } catch (error) {
            console.error(
              "ASM AI returned invalid streaming data:",
              error,
            );

            continue;
          }

        if (data.type === "chunk") {
  const chunk =
    typeof data.content === "string"
      ? data.content
      : "";

  if (!chunk) {
    continue;
  }

  fullMessage += chunk;

  /*
   * Small delay between streamed chunks.
   *
   * This makes the response feel slightly smoother
   * without making the assistant noticeably slow.
   */
  await new Promise((resolve) =>
    setTimeout(resolve, 15),
  );

  handlers?.onChunk?.(chunk);
}

          if (data.type === "error") {
            console.error(
              "ASM AI streaming error:",
              data.message,
            );

            return {
              status: "error",
            };
          }

          if (data.type === "done") {
            return {
              status: "ok",
              message: fullMessage || undefined,
              conversationId:
                typeof data.conversationId === "string"
                  ? data.conversationId
                  : undefined,
              grounding: data.grounding,
              escalation: data.escalation,
            };
          }
        }
      }

      if (!fullMessage) {
        console.error(
          "ASM AI stream ended without a response.",
        );

        return {
          status: "error",
        };
      }

      return {
        status: "ok",
        message: fullMessage,
      };
    } catch (error) {
      console.error(
        "ASM AI chat streaming request failed:",
        error,
      );

      return {
        status: "notConnected",
      };
    }
  },
};