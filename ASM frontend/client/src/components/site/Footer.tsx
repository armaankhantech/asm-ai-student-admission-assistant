// ASM CSIT reference recreation: dark institutional footer with official logo and compact program/contact columns.
import { ArrowUpRight, MessageCircleMore } from "lucide-react";
import { Link } from "wouter";
import { contactInfo, programs } from "@/data/collegeData";
import { requestAsmAiOpen } from "@/lib/asmAi";

export function Footer() {
  return (
    <footer className="bg-[#1c2d59] text-white">
      <div className="asm-top-rule" />
      <div className="mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_.9fr_.9fr_1.1fr]">
          <div>
            <div className="inline-flex bg-white p-1.5"><img src="/assets/asm-logo.png" alt="ASM CSIT" className="h-[62px] w-auto max-w-[230px] object-contain object-left" /></div>
            <p className="mt-5 max-w-sm text-sm leading-6 text-[#d1d8ed]">ASM&apos;s College of Commerce, Science & Information Technology. This V1 demonstration adds ASM AI and a simplified enquiry flow to the college website experience.</p>
            <button type="button" onClick={() => requestAsmAiOpen()} className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#9fd3ff] transition hover:text-white"><MessageCircleMore size={17} /> Ask ASM AI <ArrowUpRight size={15} /></button>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Quick Links</h2>
            <ul className="mt-4 space-y-3">
              {["About Us", "Programs", "Admissions", "Placements", "Contact Us"].map((item, index) => <li key={item}><a className="text-sm text-[#d7dfec] transition hover:text-[#9fd3ff]" href={["/#about", "/#programs", "/#admissions", "/#placements", "/#contact"][index]}>{item}</a></li>)}
              <li><Link href="/enquiry" className="text-sm text-[#d7dfec] transition hover:text-[#9fd3ff]">Enquire Now</Link></li>
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Programs</h2>
            <ul className="mt-4 space-y-3">
              {programs.slice(0, 5).map((program) => <li key={program.id}><a href="/#programs" className="text-sm text-[#d7dfec] transition hover:text-[#9fd3ff]">{program.title}</a></li>)}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold text-white">Contact Us</h2>
            <p className="mt-4 text-sm leading-6 text-[#d7dfec]">{contactInfo.address}</p>
            <a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="mt-3 block text-sm text-[#d7dfec] transition hover:text-[#9fd3ff]">{contactInfo.phone}</a>
            <a href={`mailto:${contactInfo.email}`} className="mt-2 block text-sm text-[#d7dfec] transition hover:text-[#9fd3ff]">{contactInfo.email}</a>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-3 border-t border-white/15 pt-5 text-xs text-[#b5c1dd] sm:flex-row sm:items-center sm:justify-between"><p>© {new Date().getFullYear()} ASM&apos;s CSIT. ASM AI — V1 Demonstration.</p><a href="https://www.csit.edu.in/" target="_blank" rel="noreferrer" className="transition hover:text-white">Visit the official ASM CSIT website ↗</a></div>
      </div>
    </footer>
  );
}


