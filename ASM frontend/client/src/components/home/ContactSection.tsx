// ASM CSIT reference recreation: compact official contact band with the institution's blue, white, and orange relationship.
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { contactInfo } from "@/data/collegeData";

export function ContactSection() {
  return (
    <section id="contact" className="section-anchor bg-white py-16 sm:py-20"><div className="mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12"><div className="text-center"><p className="font-heading text-xs font-semibold uppercase tracking-[.15em] text-[#0095eb]">Contact Us</p><h2 className="asm-section-title mt-2 text-[28px] sm:text-[34px]">Get in touch</h2></div><div className="mt-10 grid gap-4 md:grid-cols-3"><a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(contactInfo.address)}`} target="_blank" rel="noreferrer" className="asm-card p-6 text-center"><MapPin className="mx-auto text-[#0095eb]" size={25} /><p className="font-heading mt-4 text-[15px] font-semibold text-[#1c2d59]">Campus Location</p><p className="mt-2 text-sm leading-6 text-[#666]">{contactInfo.address}</p></a><a href={`tel:${contactInfo.phone.replace(/\s/g, "")}`} className="asm-card p-6 text-center"><Phone className="mx-auto text-[#0095eb]" size={24} /><p className="font-heading mt-4 text-[15px] font-semibold text-[#1c2d59]">Phone</p><p className="mt-2 text-sm leading-6 text-[#666]">{contactInfo.phone}</p></a><a href={contactInfo.source} target="_blank" rel="noreferrer" className="asm-card p-6 text-center"><Mail className="mx-auto text-[#0095eb]" size={24} /><p className="font-heading mt-4 text-[15px] font-semibold text-[#1c2d59]">Email</p><p className="mt-2 inline-flex items-center gap-1 text-sm leading-6 text-[#666]">{contactInfo.email} <ExternalLink size={14} /></p></a></div></div></section>
  );
}


