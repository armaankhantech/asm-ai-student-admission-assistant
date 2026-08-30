// ASM AI Signal Field: a memorable product hero with a quiet campus-to-future visual metaphor.
import { Compass, Sparkles } from "lucide-react";
import { QuickActions } from "./QuickActions";
import { SuggestedQuestions } from "./SuggestedQuestions";

export function ChatWelcome({ onViewFAQs }: { onViewFAQs: () => void }) {
  return <div className="space-y-5"><section className="asm-ai-welcome"><div className="asm-ai-welcome__orbit asm-ai-welcome__orbit--one" aria-hidden="true" /><div className="asm-ai-welcome__orbit asm-ai-welcome__orbit--two" aria-hidden="true" /><div className="relative"><div className="flex items-center gap-2"><span className="asm-ai-welcome__eyebrow"><Sparkles size={12} /> ASM AI</span><span className="h-px flex-1 bg-white/20" /></div><div className="mt-5 flex items-start gap-3"><span className="asm-ai-welcome__compass"><Compass size={19} /></span><div><h2 className="font-heading text-[22px] font-semibold leading-[1.12] tracking-[-.03em]">Your questions about ASM CSIT, answered clearly.</h2><p className="mt-2.5 max-w-[295px] text-[12px] leading-5 text-[#e0ebff]">ASM AI can help you explore courses, admissions, eligibility, fees, documents, campus information and more about ASM CSIT.</p></div></div><div className="asm-ai-welcome__footer mt-5"><span className="asm-ai-welcome__signal" /><span>Choose a topic or ask your question below.</span></div></div></section><QuickActions /><SuggestedQuestions onViewFAQs={onViewFAQs} /></div>;
}


