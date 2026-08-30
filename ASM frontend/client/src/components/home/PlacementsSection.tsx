// ASM CSIT reference recreation: official placement-company asset and restrained college-site career information.
import { ArrowUpRight, BriefcaseBusiness, MessageCircleMore } from "lucide-react";
import { officialSources } from "@/data/collegeData";
import { requestAsmAiOpen } from "@/lib/asmAi";

export function PlacementsSection() {
  return (
    <section id="placements" className="section-anchor bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1240px] gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_.9fr] lg:items-center lg:px-12"><div><p className="font-heading text-xs font-semibold uppercase tracking-[.15em] text-[#0095eb]">Placements</p><h2 className="asm-section-title mt-2 text-[28px] sm:text-[34px]">Career support</h2><p className="mt-4 max-w-xl text-sm leading-6 text-[#666]">Access official placement resources and use ASM AI to prepare a college-specific question when the future knowledge system is connected.</p><div className="mt-6 flex flex-wrap gap-3"><button type="button" onClick={() => requestAsmAiOpen("How can I contact the admission department?")} className="inline-flex min-h-[42px] items-center gap-2 rounded-[4px] bg-[#1c2d59] px-4 text-sm font-bold text-white transition hover:bg-[#283c70]"><MessageCircleMore size={17} /> Ask ASM AI</button><a href={officialSources.placements} target="_blank" rel="noreferrer" className="inline-flex min-h-[42px] items-center gap-2 rounded-[4px] border border-[#1c2d59] px-4 text-sm font-bold text-[#1c2d59] transition hover:bg-[#f4f7fc]">Placement resources <ArrowUpRight size={16} /></a></div></div><div className="border border-[#e2e2e2] bg-white p-3 shadow-[0_5px_15px_rgba(0,0,0,.08)]"><img src="/assets/placed-companies.jpg" alt="Official ASM CSIT website placement-company visual" className="w-full object-contain" /><div className="flex items-center gap-2 border-t border-[#e8e8e8] px-2 pt-3 text-xs font-bold text-[#1c2d59]"><BriefcaseBusiness size={15} className="text-[#0095eb]" /> Official placement-company visual</div></div></div>
    </section>
  );
}


