// ASM CSIT reference recreation: official website photo treatment and concise facility cards within the existing institutional palette.
import { BookOpen, Monitor, Presentation, Trophy } from "lucide-react";
import { facilities, officialSources } from "@/data/collegeData";

const iconMap = { Monitor, BookOpen, Presentation, Trophy };

export function CampusSection() {
  return (
    <section id="campus" className="section-anchor bg-[#f7f7f7] py-16 sm:py-20">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12"><div className="text-center"><p className="font-heading text-xs font-semibold uppercase tracking-[.15em] text-[#0095eb]">Campus & Facilities</p><h2 className="asm-section-title mt-2 text-[28px] sm:text-[34px]">Life at ASM CSIT</h2><p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-[#666]">Explore the campus and infrastructure references published through official ASM CSIT resources.</p></div><div className="mt-10 grid gap-6 lg:grid-cols-[.9fr_1.1fr]"><div className="grid grid-cols-2 gap-3"><img src="/assets/home-banner.jpg" alt="Official ASM CSIT website student image" className="h-full min-h-[180px] w-full object-cover" /><img src="/assets/home-banner.jpg" alt="Official ASM CSIT website student image" className="h-full min-h-[180px] w-full object-cover" /></div><div className="grid gap-3 sm:grid-cols-2">{facilities.map((facility) => { const Icon = iconMap[facility.icon]; return <article key={facility.title} className="asm-card p-5"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#eef7fc] text-[#0095eb]"><Icon size={18} /></span><h3 className="font-heading mt-5 text-[15px] font-semibold text-[#1c2d59]">{facility.title}</h3><p className="mt-2 text-sm leading-5 text-[#666]">{facility.description}</p></article>; })}<a href={officialSources.infrastructure} target="_blank" rel="noreferrer" className="flex min-h-[130px] items-center justify-between bg-[#1c2d59] p-5 text-white transition hover:bg-[#293a6b] sm:col-span-2"><span><span className="font-heading block text-sm font-semibold">Explore ASM CSIT infrastructure</span><span className="mt-1 block text-sm text-white/75">View official campus information.</span></span><span className="text-2xl">→</span></a></div></div></div>
    </section>
  );
}


