// ASM CSIT reference recreation: a restrained ASM AI launcher that remains secondary to the real college website.
import { useChatbot } from "./ChatbotProvider";

export function ChatbotLauncher() {
  const { isOpen, openAssistant } = useChatbot();

  if (isOpen) return null;

  return (
    <button
      data-asm-ai-launcher
      type="button"
      onClick={() => openAssistant()}
      aria-label="Open ASM AI"
      className="asm-ai-launcher fixed bottom-4 right-4 z-50 grid h-[68px] w-[68px] place-items-center overflow-hidden rounded-full border border-[#d6e2ef] bg-[#f4fbff] shadow-[0_10px_28px_rgba(14,42,87,.24)] transition sm:bottom-6 sm:right-6"
    >
      <span className="grid h-[64px] w-[64px] place-items-center overflow-hidden rounded-full bg-white">
        <img
          src="/assets/asm-csit-chatbot-logo.png"
          alt="ASM CSIT"
          className="h-full w-full object-cover scale-[1.18]"
        />
      </span>
    </button>
  );
}