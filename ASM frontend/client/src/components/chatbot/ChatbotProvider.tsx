// ASM CSIT reference recreation: polished, transparent assistant state management with no fabricated answers.

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "wouter";
import { chatService } from "@/services/chatService";
import type { ChatMessage } from "@/types/chat";

type ChatbotContextValue = {
  isOpen: boolean;
  isClosing: boolean;
  messages: ChatMessage[];
  draft: string;
  isSending: boolean;
  mode: "welcome" | "conversation" | "disconnected" | "error" | "insufficient";
  openAssistant: (prompt?: string) => void;
  minimizeAssistant: () => void;
  closeAssistant: () => void;
  setDraft: (draft: string) => void;
  sendDraft: () => Promise<void>;
  sendQuestion: (question: string) => Promise<void>;
  resetConnectionState: () => void;
};

const ChatbotContext = createContext<ChatbotContextValue | null>(null);

export function useChatbot() {
  const value = useContext(ChatbotContext);

  if (!value) {
    throw new Error("useChatbot must be used inside ChatbotProvider");
  }

  return value;
}

export function ChatbotProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [location] = useLocation();

  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [mode, setMode] =
    useState<ChatbotContextValue["mode"]>("welcome");

  const openedAutomatically = useRef(false);

  const returnFocusToLauncher = useCallback(
    () =>
      window.setTimeout(
        () =>
          document
            .querySelector<HTMLElement>("[data-asm-ai-launcher]")
            ?.focus(),
        0,
      ),
    [],
  );

  const openAssistant = useCallback((prompt?: string) => {
    if (prompt) {
      setDraft(prompt);
    }

    setIsClosing(false);
    setIsOpen(true);
  }, []);

  const closeWithMotion = useCallback(() => {
    setIsClosing(true);

    window.setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      returnFocusToLauncher();
    }, 280);
  }, [returnFocusToLauncher]);

  const minimizeAssistant = useCallback(
    () => closeWithMotion(),
    [closeWithMotion],
  );

  const closeAssistant = useCallback(
    () => closeWithMotion(),
    [closeWithMotion],
  );

  const resetConnectionState = useCallback(() => {
    setMode(messages.length ? "conversation" : "welcome");
  }, [messages.length]);

  const submitQuestion = useCallback(
    async (content: string) => {
      const question = content.trim();

      if (!question || isSending) {
        return;
      }

      /*
       * Build history BEFORE adding the current question.
       */
      const history = messages
        .filter(
          (message) =>
            message.role === "user" ||
            message.role === "assistant",
        )
        .slice(-6)
        .map((message) => ({
          role: message.role as "user" | "assistant",
          content: message.content,
        }));

      /*
       * Create IDs before updating state.
       */
      const userMessageId = crypto.randomUUID();
      const assistantMessageId = crypto.randomUUID();

      /*
       * Immediately display:
       * 1. The user's question
       * 2. One empty assistant bubble
       *
       * The assistant bubble will be filled progressively
       * as streaming chunks arrive.
       */
      setMessages((current) => [
        ...current,
        {
          id: userMessageId,
          role: "user",
          content: question,
          createdAt: Date.now(),
        },
        {
          id: assistantMessageId,
          role: "assistant",
          content: "",
          createdAt: Date.now(),
        },
      ]);

      setIsSending(true);
      setMode("conversation");

      try {
        const result = await chatService.sendMessage(
          {
            message: question,
            history,
            context: {
              route: location,
            },
          },
          {
            onChunk: (chunk) => {
              /*
               * The first streamed chunk means the assistant
               * has started responding.
               *
               * Hide the typing indicator so only the streamed
               * assistant bubble remains visible.
               */
              setIsSending(false);

              /*
               * Append each streamed chunk to the SAME
               * assistant message.
               */
              setMessages((current) =>
                current.map((message) =>
                  message.id === assistantMessageId
                    ? {
                        ...message,
                        content: message.content + chunk,
                      }
                    : message,
                ),
              );
            },
          },
        );

        if (result.status === "notConnected") {
          /*
           * Remove the empty assistant bubble if the backend
           * could not be reached.
           */
          setMessages((current) =>
            current.filter(
              (message) => message.id !== assistantMessageId,
            ),
          );

          setMode("disconnected");
          return;
        }

        if (result.status === "error") {
          /*
           * Remove the empty/partial assistant bubble on error.
           */
          setMessages((current) =>
            current.filter(
              (message) => message.id !== assistantMessageId,
            ),
          );

          setMode("error");
          return;
        }

        if (result.status === "ok") {
          /*
           * The streamed content is already inside the assistant
           * message.
           *
           * Here we only attach the final metadata returned by
           * the backend.
           */
          setMessages((current) =>
            current.map((message) =>
              message.id === assistantMessageId
                ? {
                    ...message,
                    content:
                      message.content ||
                      result.message ||
                      "",
                    grounding: result.grounding,
                    escalation: result.escalation,
                  }
                : message,
            ),
          );

          setMode(
            result.escalation?.contactAdmission
              ? "insufficient"
              : "conversation",
          );
        }
      } catch (error) {
        console.error(
          "ASM AI conversation error:",
          error,
        );

        setMessages((current) =>
          current.filter(
            (message) => message.id !== assistantMessageId,
          ),
        );

        setMode("error");
      } finally {
        setIsSending(false);
      }
    },
    [isSending, location, messages],
  );

  const sendDraft = useCallback(async () => {
    const question = draft;

    setDraft("");

    await submitQuestion(question);
  }, [draft, submitQuestion]);

  const sendQuestion = useCallback(
    async (question: string) => {
      setDraft("");

      await submitQuestion(question);
    },
    [submitQuestion],
  );

  useEffect(() => {
    const onOpenRequest = (event: Event) => {
      openAssistant(
        (event as CustomEvent<{ prompt?: string }>).detail?.prompt,
      );
    };

    window.addEventListener("asm-ai:open", onOpenRequest);

    return () =>
      window.removeEventListener("asm-ai:open", onOpenRequest);
  }, [openAssistant]);

  useEffect(() => {
    if (location !== "/" || openedAutomatically.current) {
      return;
    }

    openedAutomatically.current = true;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, 2400);

    return () => window.clearTimeout(timer);
  }, [location]);

  useEffect(() => {
    if (!isOpen || window.innerWidth > 767) {
      return;
    }

    document.body.dataset.scrollLocked = "true";

    return () => {
      delete document.body.dataset.scrollLocked;
    };
  }, [isOpen]);

  const value = useMemo(
    () => ({
      isOpen,
      isClosing,
      messages,
      draft,
      isSending,
      mode,
      openAssistant,
      minimizeAssistant,
      closeAssistant,
      setDraft,
      sendDraft,
      sendQuestion,
      resetConnectionState,
    }),
    [
      isOpen,
      isClosing,
      messages,
      draft,
      isSending,
      mode,
      openAssistant,
      minimizeAssistant,
      closeAssistant,
      sendDraft,
      sendQuestion,
      resetConnectionState,
    ],
  );

  return (
    <ChatbotContext.Provider value={value}>
      {children}
    </ChatbotContext.Provider>
  );
}