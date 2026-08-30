// ASM CSIT reference recreation: an admission enquiry page that shares the real college website's logo, colors, image treatment, header, and footer.
import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { EnquiryAside } from "@/components/enquiry/EnquiryAside";
import { EnquiryForm } from "@/components/enquiry/EnquiryForm";
import { SiteShell } from "@/components/site/SiteShell";

export default function Enquiry() {
  return <SiteShell><section className="min-h-screen bg-[#f7f7f7] px-4 pb-20 pt-[108px] sm:px-6 lg:px-10"><div className="asm-top-rule absolute inset-x-0 top-[74px]" /><div className="mx-auto w-full max-w-[1200px]"><Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#1c2d59] transition hover:text-[#0095eb]"><ArrowLeft size={17} /> Back to ASM CSIT</Link><div className="mt-6 grid gap-7 lg:grid-cols-[.87fr_1.13fr] lg:items-stretch"><EnquiryAside /><EnquiryForm /></div></div></section></SiteShell>;
}


