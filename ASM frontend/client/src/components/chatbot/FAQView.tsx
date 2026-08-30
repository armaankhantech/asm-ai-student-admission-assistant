// ASM AI Signal Field: categorized FAQ discovery is a question-selector UI, ready for the future chat API.
import { ArrowLeft, ArrowUpRight, BookOpenCheck, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useChatbot } from "./ChatbotProvider";

const faqGroups = [
  { label: "Courses", questions: ["What courses are offered?", "What programs are available?"] },
  { label: "Admissions", questions: ["How do I apply?", "When do admissions start?", "What is the admission process?"] },
  { label: "Eligibility", questions: ["What are the eligibility requirements?"] },
  { label: "Fees", questions: ["What are the course fees?"] },
  { label: "Documents", questions: ["What documents are required?"] },
  { label: "College", questions: ["Tell me about ASM CSIT.", "What facilities are available?", "What is the campus like?"] },
  { label: "Contact", questions: ["How can I contact the admission department?"] },
];

export function FAQView({ onBack }: { onBack: () => void }) {
  const { sendQuestion } = useChatbot();
  const [active, setActive] = useState(0);
  const group = faqGroups[active];
  const ask = async (question: string) => { onBack(); await sendQuestion(question); };
  return <section className="asm-ai-faq" aria-label="ASM AI frequently asked questions"><div className="asm-ai-faq__hero"><button type="button" onClick={onBack} className="asm-ai-faq__back"><ArrowLeft size={16} /> Back to assistant</button><div className="mt-5 flex items-start gap-3"><span className="asm-ai-faq__icon"><BookOpenCheck size={19} /></span><div><p className="font-heading text-[20px] font-semibold tracking-[-.025em]">Important questions</p><p className="mt-1 text-[11px] leading-4 text-[#d8e8ff]">Choose a category, then send a question to ASM AI.</p></div></div></div><div className="asm-ai-faq__tabs mt-4" role="tablist" aria-label="FAQ categories">{faqGroups.map((item, index) => <button key={item.label} type="button" role="tab" aria-selected={active === index} onClick={() => setActive(index)} className={active === index ? "asm-ai-faq__tab--active" : ""}>{item.label}</button>)}</div><div className="mt-4"><div className="flex items-center justify-between"><p className="font-heading text-[12px] font-semibold text-[#18325f]">{group.label}</p><span className="text-[10px] text-[#7d8ca1]">Select a question</span></div><div className="mt-2.5 space-y-2">{group.questions.map((question) => <button key={question} type="button" onClick={() => void ask(question)} className="asm-ai-faq__question"><span>{question}</span><span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-[#e9f6ff] text-[#008bdc]"><ArrowUpRight size={13} /></span></button>)}</div></div><div className="mt-5 flex items-start gap-2 border-t border-[#dce8f2] pt-4 text-[10px] leading-4 text-[#718199]"><ChevronRight size={13} className="mt-0.5 shrink-0 text-[#008bdc]" />Select any question to continue in the same conversation.</div></section>;
}


