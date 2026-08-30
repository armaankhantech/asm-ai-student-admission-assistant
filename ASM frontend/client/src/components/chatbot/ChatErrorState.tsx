// ASM CSIT reference recreation: graceful, visitor-ready fallback messages that do not expose development architecture.
import { ArrowRight, Info, RefreshCw } from "lucide-react";
import { Link } from "wouter";
import { useChatbot } from "./ChatbotProvider";

export function ChatErrorState({ variant }: { variant: "disconnected" | "error" | "insufficient" }) {
  const { resetConnectionState, setDraft } = useChatbot();
  const copy = variant === "insufficient" ? { title: "I don’t have a verified answer for that yet.", text: "Please try another question or contact the admission team." } : { title: "I’m unable to provide a response right now.", text: "Please try another question or contact the admission team for help." };
  return <div className="border border-[#dbe5ef] bg-[#f7fbfe] p-3.5"><div className="flex gap-2.5"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#eaf6fd] text-[#0095eb]"><Info size={16} /></span><div><p className="text-[11px] font-bold leading-4 text-[#1c2d59]">{copy.title}</p><p className="mt-1 text-[10px] leading-4 text-[#65758c]">{copy.text}</p><div className="mt-3 flex flex-wrap gap-2"><button type="button" onClick={() => { setDraft(""); resetConnectionState(); }} className="inline-flex items-center gap-1.5 border border-[#cad9e7] bg-white px-2.5 py-1.5 text-[10px] font-bold text-[#1c2d59] transition hover:border-[#0095eb]"><RefreshCw size={12} /> Ask another question</button><Link href="/enquiry" className="inline-flex items-center gap-1.5 bg-[#52a946] px-2.5 py-1.5 text-[10px] font-bold text-white transition hover:bg-[#428d39]">Contact Admission <ArrowRight size={12} /></Link></div></div></div></div>;
}


