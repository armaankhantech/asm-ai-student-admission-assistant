// ASM AI Signal Field: an asymmetric action launcher replaces a generic uniform topic-card grid.
import { BadgeCheck, FileText, FolderOpen, GraduationCap, Landmark, PhoneCall, WalletCards, ArrowUpRight } from "lucide-react";
import { quickActions } from "@/data/collegeData";
import { useChatbot } from "./ChatbotProvider";

const icons = { GraduationCap, FileText, BadgeCheck, FolderOpen, WalletCards, PhoneCall, Landmark };
const descriptions: Record<string, string> = { Courses: "Explore programmes", Admissions: "Plan your application", Eligibility: "Understand requirements", Documents: "Prepare your checklist", Fees: "Find official guidance", "Contact Admission": "Reach the right team", "About ASM CSIT": "Learn about the college" };

export function QuickActions() {
  const { sendQuestion } = useChatbot();
  const [featured, ...remaining] = quickActions;
  const FeaturedIcon = icons[featured.icon];
  return <section aria-label="Conversation starters" className="asm-ai-starters"><div className="flex items-center justify-between"><p className="font-heading text-[11px] font-semibold text-[#18325f]">Start a conversation</p><span className="text-[10px] font-medium text-[#7e8da6]">Choose an intention</span></div><button type="button" onClick={() => void sendQuestion(featured.prompt)} className="asm-ai-featured-action mt-2.5 w-full text-left"><span className="asm-ai-featured-action__icon"><FeaturedIcon size={19} /></span><span className="min-w-0"><span className="block text-[13px] font-bold">{featured.label}</span><span className="mt-0.5 block text-[10px] font-medium text-white/75">{descriptions[featured.label]}</span></span><ArrowUpRight className="ml-auto shrink-0 text-[#a6e1ff]" size={17} /></button><div className="asm-ai-intent-loop mt-2.5">{remaining.map((action) => { const Icon = icons[action.icon]; return <button key={action.label} type="button" onClick={() => void sendQuestion(action.prompt)} className="asm-ai-intent-pill group"><span className="asm-ai-intent-pill__icon"><Icon size={14} /></span><span><span className="block text-[11px] font-bold leading-4">{action.label}</span><span className="block text-[9px] leading-3 text-[#718198]">{descriptions[action.label]}</span></span></button>; })}</div></section>;
}


