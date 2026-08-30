// ASM CSIT reference recreation: an honest demo-state notice that looks intentional rather than failed.
import { Info, RefreshCw } from "lucide-react";

export function EnquiryStatus({ message, onTryAgain }: { message: string; onTryAgain: () => void }) {
  return <div className="mt-5 border border-[#b7d8c0] bg-[#f2faf4] p-4" role="status" aria-live="polite"><div className="flex gap-3"><span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#dcefe0] text-[#3e8d34]"><Info size={18} /></span><div><p className="font-heading text-sm font-semibold text-[#2f7035]">Demo mode</p><p className="mt-1 text-sm leading-5 text-[#4d7453]">{message}</p><button type="button" onClick={onTryAgain} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#1c2d59] hover:text-[#0095eb]"><RefreshCw size={14} /> Edit enquiry</button></div></div></div>;
}


