// ASM AI Signal Field: viewport-contained assistant panel with FAQ discovery that preserves the existing conversation context.
import { useEffect, useRef, useState } from "react";
import { ChatErrorState } from "./ChatErrorState";
import { ChatHeader } from "./ChatHeader";
import { ChatInput } from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { ChatWelcome } from "./ChatWelcome";
import { FAQView } from "./FAQView";
import { TypingIndicator } from "./TypingIndicator";
import { useChatbot } from "./ChatbotProvider";

export function ChatbotPanel() {
  const { isOpen, isClosing, messages, isSending, mode } = useChatbot();
  const [screen, setScreen] = useState<"assistant" | "faqs">("assistant");
  const bottomRef = useRef<HTMLDivElement>(null);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }); }, [messages, isSending, mode, screen]);
  if (!isOpen) return null;
  const main = messages.length === 0 ? <ChatWelcome onViewFAQs={() => setScreen("faqs")} /> : messages.map((message) => <ChatMessage key={message.id} message={message} />);
  return <section className="fixed inset-0 z-50 flex items-end bg-black/20 p-0 sm:inset-auto sm:bottom-4 sm:right-4 sm:block sm:bg-transparent" role="dialog" aria-label="ASM AI Student and Admission Assistant" aria-modal="false"><div className={`asm-ai-panel flex h-[100dvh] w-full flex-col overflow-hidden bg-[#f7f9fc] shadow-[0_22px_55px_rgba(17,38,78,.24)] sm:h-[min(700px,calc(100dvh-32px))] sm:w-[min(456px,calc(100vw-32px))] sm:max-h-[calc(100dvh-32px)] sm:rounded-[20px] sm:border sm:border-[#cbd8e6] ${isClosing ? "asm-ai-panel--closing" : ""}`}><ChatHeader /><div className="asm-ai-panel__body min-h-0 flex-1 overscroll-contain overflow-y-auto p-4 sm:p-5"><div className="space-y-5">{screen === "faqs" ? <FAQView onBack={() => setScreen("assistant")} /> : main}{screen === "assistant" && isSending && <TypingIndicator />}{screen === "assistant" && mode === "disconnected" && <ChatErrorState variant="disconnected" />}{screen === "assistant" && mode === "error" && <ChatErrorState variant="error" />}{screen === "assistant" && mode === "insufficient" && <ChatErrorState variant="insufficient" />}<div ref={bottomRef} /></div></div><ChatInput /></div></section>;
}


