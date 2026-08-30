// ASM CSIT reference recreation: transparent hero navigation with official lockup and a new green enquiry action.
import { Menu, MessageCircleMore, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect, useState } from "react";
import { requestAsmAiOpen } from "@/lib/asmAi";

function BrandLockup({ useLightNav }: { useLightNav: boolean }) {
  return (
    <Link href="/" className="group flex min-w-0 flex-col items-start text-left" aria-label="ASM CSIT home">
      <img src="/assets/asm-logo.png" alt="ASM CSIT — B+ NAAC Approved by AICTE" className="h-[46px] w-auto max-w-[192px] object-contain object-left" />
      <span className={`mt-0.5 whitespace-nowrap text-[7px] font-semibold leading-none tracking-[.01em] ${useLightNav ? "text-white/95 [text-shadow:0_1px_2px_rgba(0,0,0,.45)]" : "text-[#1c2d59]"}`}>Affiliated to Savitribai Phule Pune University · Approved by AICTE</span>
    </Link>
  );
}

const desktopItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Admissions", href: "#admissions" },
  { label: "Placements", href: "#placements" },
  { label: "Global Exposure", href: "#about" },
  { label: "Student Corner", href: "#campus" },
  { label: "Contact Us", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionHref = (href: string) => (location === "/" ? href : `/${href}`);
  const closeMenu = () => setMenuOpen(false);
  const useLightNav = location === "/" && !scrolled && !menuOpen;

  return (
    <header className={`fixed inset-x-0 top-0 z-40 transition-all duration-200 ${useLightNav ? "bg-[rgba(10,17,39,.36)]" : "border-b border-[#e7e7e7] bg-white shadow-[0_2px_10px_rgba(0,0,0,.09)]"}`}>
      <div className="mx-auto flex h-[82px] max-w-[1600px] items-center justify-between px-3 sm:h-[74px] sm:px-5 xl:px-8">
        <BrandLockup useLightNav={useLightNav} />
        <nav aria-label="Primary navigation" className="hidden items-center gap-1 xl:gap-2 lg:flex">
          {desktopItems.map((item, index) => (
            <a key={item.href + item.label} href={sectionHref(item.href)} className={`px-3 py-2 text-[12px] font-bold transition-colors ${index === 0 && location === "/" ? "asm-orange-active" : useLightNav ? "text-white hover:text-[#ffc293]" : "text-[#272727] hover:text-[#f58233]"}`}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-2 lg:flex">
          <button type="button" onClick={() => requestAsmAiOpen()} className={`inline-flex h-9 items-center gap-2 rounded-md border px-3 text-[12px] font-bold transition ${useLightNav ? "border-white/45 bg-white/10 text-white hover:bg-white/20" : "border-[#d2d2d2] bg-white text-[#1c2d59] hover:border-[#0095eb]"}`}>
            <MessageCircleMore size={15} /> Ask ASM AI
          </button>
          <Link href="/enquiry" className="asm-green-cta inline-flex h-9 items-center px-4 text-[12px] font-bold">Enquire Now</Link>
        </div>
        <button type="button" className={`grid h-10 w-10 place-items-center rounded-md border lg:hidden ${useLightNav ? "border-white/50 bg-white/10 text-white" : "border-[#d2d2d2] bg-white text-[#1c2d59]"}`} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <div id="mobile-navigation" className={`overflow-hidden border-t border-white/15 bg-[#1c2d59] transition-[max-height,opacity] duration-300 lg:hidden ${menuOpen ? "max-h-[620px] opacity-100" : "max-h-0 opacity-0"}`}>
        <nav aria-label="Mobile navigation" className="mx-auto flex max-w-[1440px] flex-col gap-1 px-4 py-4 sm:px-6">
          {desktopItems.map((item) => (
            <a key={item.href + item.label} href={sectionHref(item.href)} onClick={closeMenu} className="rounded-md px-4 py-3 text-sm font-bold text-white hover:bg-white/10">
              {item.label}
            </a>
          ))}
          <div className="mt-2 grid gap-2 border-t border-white/20 pt-4 sm:grid-cols-2">
            <button type="button" onClick={() => { closeMenu(); requestAsmAiOpen(); }} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border border-white/35 bg-white/10 px-4 text-sm font-bold text-white">
              <MessageCircleMore size={17} /> Ask ASM AI
            </button>
            <Link href="/enquiry" onClick={closeMenu} className="asm-green-cta inline-flex min-h-12 items-center justify-center px-4 text-sm font-bold">Enquire Now</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}


