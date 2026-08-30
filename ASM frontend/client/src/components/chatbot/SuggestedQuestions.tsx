// ASM AI Signal Field: a flowing prompt rail and focused FAQ doorway keep discovery quick and scannable.
import { ArrowUpRight, ListFilter, Sparkles } from "lucide-react";
import { popularQuestions } from "@/data/collegeData";
import { useChatbot } from "./ChatbotProvider";

export function SuggestedQuestions({ onViewFAQs }: { onViewFAQs: () => void }) {
  const { sendQuestion } = useChatbot();
  const questions = popularQuestions;
  return <section className="asm-ai-question-rail" aria-label="Suggested questions"><div className="flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded-full bg-[#e8f5ff] text-[#008bdc]"><Sparkles size={11} /></span><p className="font-heading text-[11px] font-semibold text-[#18325f]">Question trail</p><button type="button" onClick={onViewFAQs} className="asm-ai-faq-trigger ml-auto inline-flex items-center gap-1 text-[10px] font-semibold"><ListFilter size={12} /> View all FAQs</button></div><div className="asm-ai-question-rail__track mt-2.5">{questions.map((question) => <button key={question} type="button" onClick={() => void sendQuestion(question)} className="asm-ai-question-chip"><span>{question}</span><ArrowUpRight size={12} className="shrink-0 text-[#008bdc]" /></button>)}</div></section>;
}


