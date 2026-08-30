// ASM CSIT reference recreation: official full-width home banner with traditional website hierarchy and added assistant access.
import { ArrowRight, MessageCircleMore } from "lucide-react";
import { Link } from "wouter";
import { requestAsmAiOpen } from "@/lib/asmAi";

export function Hero() {
  return (
    <section id="home" className="section-anchor relative h-[534px] overflow-hidden bg-[#1c2d59] pt-[94px] sm:h-[590px] sm:pt-[74px]">
      <img src="/assets/asm-csit-home-banner_3f6f17c5.jpg" alt="ASM CSIT students" className="absolute inset-x-0 bottom-0 h-[calc(100%-94px)] w-full object-cover sm:h-[calc(100%-74px)]" />
      <div className="asm-banner-overlay absolute inset-x-0 bottom-0 h-[calc(100%-94px)] sm:h-[calc(100%-74px)]" />
      <div className="relative mx-auto flex h-[calc(100%-94px)] max-w-[1320px] items-center px-5 pt-2 sm:h-[calc(100%-74px)] sm:px-8 sm:pt-0 lg:px-12">
        <div className="max-w-[620px] text-white"><p className="font-heading text-[12px] font-semibold uppercase tracking-[.16em] text-[#b9f0ff]">Audyogik Shikshan Mandal&apos;s</p><h1 className="font-heading mt-5 text-[32px] font-semibold leading-tight sm:text-[43px] lg:text-[49px]">College of Commerce, Science &amp; Information Technology</h1><p className="mt-5 max-w-[540px] text-[16px] leading-7 text-white/90">Explore programs, admissions, placements, campus information, and student resources from ASM CSIT.</p><div className="mt-7 flex flex-wrap gap-3"><a href="#programs" className="inline-flex min-h-[43px] items-center justify-center rounded-[4px] bg-[#f58233] px-5 text-sm font-bold text-white transition hover:bg-[#dc6b21]">Explore Programs</a><Link href="/enquiry" className="asm-green-cta inline-flex min-h-[43px] items-center justify-center gap-2 px-5 text-sm font-bold">Enquire Now <ArrowRight size={16} /></Link><button type="button" onClick={() => requestAsmAiOpen()} className="inline-flex min-h-[43px] items-center justify-center gap-2 rounded-[4px] border border-white/60 bg-white/10 px-5 text-sm font-bold text-white transition hover:bg-white/20"><MessageCircleMore size={17} /> Ask ASM AI</button></div></div>
      </div>
    </section>
  );
}


