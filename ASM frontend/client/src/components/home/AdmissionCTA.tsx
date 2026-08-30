// ASM CSIT reference recreation: a compact college-site admission band with the requested green enquiry action.
import { ArrowRight, MessageCircleMore } from "lucide-react";
import { Link } from "wouter";
import { requestAsmAiOpen } from "@/lib/asmAi";

export function AdmissionCTA() {
  return (
    <section id="admissions" className="section-anchor bg-[#eef7fc] py-14 sm:py-16">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-5 px-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <p className="font-heading text-xs font-semibold uppercase tracking-[.15em] text-[#0095eb]">Admissions</p>
          <h2 className="font-heading mt-2 text-[25px] font-semibold text-[#1c2d59]">Have questions about admission?</h2>
          <p className="mt-2 text-sm text-[#666]">Ask ASM AI or submit an admission enquiry for the future workflow.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => requestAsmAiOpen()} className="inline-flex min-h-[42px] items-center gap-2 rounded-[4px] border border-[#1c2d59] bg-white px-4 text-sm font-bold text-[#1c2d59] transition hover:bg-[#f6f9fd]"><MessageCircleMore size={17} /> Ask ASM AI</button>
          <Link href="/enquiry" className="asm-green-cta inline-flex min-h-[42px] items-center gap-2 px-5 text-sm font-bold">Enquire Now <ArrowRight size={16} /></Link>
        </div>
      </div>
    </section>
  );
}


