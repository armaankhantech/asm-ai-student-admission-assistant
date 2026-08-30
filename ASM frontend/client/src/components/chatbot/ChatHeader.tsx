// ASM AI Signal Field: compact product identity bar, using only the isolated official ASM mark.
import { ChevronDown, Sparkles, X } from "lucide-react";
import { useChatbot } from "./ChatbotProvider";

export function ChatHeader() {
  const { minimizeAssistant, closeAssistant } = useChatbot();

  return (
    <div className="asm-ai-header px-4 py-3 text-white">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span className="asm-ai-header__mark grid h-10 w-10 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
  <img
    src="/assets/asm-csit-chatbot-logo.png"
    alt="ASM CSIT"
    className="h-full w-full object-cover scale-[1.18]"
  />
</span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-heading truncate text-[15px] font-semibold tracking-[-.02em]">
                ASM AI
              </p>
              <Sparkles size={12} className="text-[#9bdbff]" />
            </div>

            <p className="mt-0.5 truncate text-[9px] font-medium uppercase tracking-[.14em] text-[#c8d9f5]">
              Student & Admission Assistant
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={minimizeAssistant}
            className="asm-ai-header__control grid h-8 w-8 place-items-center rounded-full"
            aria-label="Minimize ASM AI"
          >
            <ChevronDown size={18} />
          </button>

          <button
            type="button"
            onClick={closeAssistant}
            className="asm-ai-header__control grid h-8 w-8 place-items-center rounded-full"
            aria-label="Close ASM AI"
          >
            <X size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}