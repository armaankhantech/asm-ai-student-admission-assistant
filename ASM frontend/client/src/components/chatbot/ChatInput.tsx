// ASM AI Signal Field: a floating composer dock makes each question feel intentional and easy to send.
import { ArrowUp, Sparkles } from "lucide-react";
import { useRef } from "react";
import { useChatbot } from "./ChatbotProvider";

export function ChatInput() {
  const { draft, setDraft, sendDraft, isSending } = useChatbot();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const onKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); void sendDraft(); } };
  return <div className="asm-ai-composer"><div className="asm-ai-composer__dock"><span className="asm-ai-composer__spark"><Sparkles size={14} /></span><textarea ref={textareaRef} value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={onKeyDown} disabled={isSending} rows={1} maxLength={700} placeholder="Ask ASM AI anything…" aria-label="Ask ASM AI anything" className="max-h-[104px] min-h-[40px] flex-1 resize-none bg-transparent px-1 py-2 text-sm leading-5 text-[#243952] outline-none placeholder:text-[#96a6b9] disabled:opacity-60" /><button type="button" onClick={() => void sendDraft()} disabled={!draft.trim() || isSending} className="asm-ai-composer__send grid h-10 w-10 shrink-0 place-items-center rounded-full" aria-label="Send message"><ArrowUp size={18} /></button></div><p className="mt-1.5 px-2 text-[9px] text-[#8a98aa]">Enter to send · Shift + Enter for a new line</p></div>;
}


