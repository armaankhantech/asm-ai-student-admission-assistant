// ASM AI Signal Field: restrained assistant-processing state with the same official mark used in messages.
export function TypingIndicator() {
  return (
    <div className="asm-ai-message asm-ai-message--assistant flex items-start gap-2.5">
      <span className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-full border border-[#cce2ef] bg-white">
        <img
          src="/assets/asm-csit-chatbot-logo.png"
          alt="ASM CSIT"
          className="h-full w-full object-cover scale-[1.18]"
        />
      </span>

      <div>
        <p className="mb-1 ml-1 text-[9px] font-bold uppercase tracking-[.12em] text-[#5c83ae]">
          ASM AI
        </p>

        <div className="rounded-[18px] rounded-tl-[4px] border border-[#dce7f0] bg-white px-3.5 py-3 shadow-[0_3px_9px_rgba(20,61,113,.05)]">
          <div
            className="flex items-center gap-1.5"
            aria-label="ASM AI is thinking"
          >
            <span className="asm-ai-dot" />
            <span className="asm-ai-dot [animation-delay:120ms]" />
            <span className="asm-ai-dot [animation-delay:240ms]" />
            <span className="ml-1 text-[10px] font-medium text-[#7c8da5]">
              Finding the right next step…
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}