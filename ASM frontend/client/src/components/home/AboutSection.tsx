// ASM CSIT reference recreation: official dark Why ASM banner treatment with concise institutional feature cards.
import { ArrowUpRight, Building2, Lightbulb, UsersRound } from "lucide-react";
import { officialSources } from "@/data/collegeData";

const pillars = [
  {
    icon: Building2,
    title: "Industry Interface",
    copy: "Explore the Industry Interface area in the official ASM CSIT website.",
  },
  {
    icon: Lightbulb,
    title: "Global Exposure",
    copy: "Explore the Global Exposure area in the official ASM CSIT website.",
  },
  {
    icon: UsersRound,
    title: "Faculty from Industry / Academia",
    copy: "Explore faculty information through official ASM CSIT resources.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="section-anchor relative overflow-hidden bg-[#1c2d59] py-16 text-white sm:py-20"
    >
      <img
        src="/assets/asm-csit-why-banner.jpg"
        alt="ASM CSIT campus and students"
        className="absolute inset-0 h-full w-full object-cover opacity-90"
      />

      <div className="absolute inset-0 bg-[#1c2d59]/45" />

      <div className="relative mx-auto max-w-[1240px] px-5 sm:px-8 lg:px-12">
        <div className="max-w-[650px]">
          <p className="font-heading text-xs font-semibold uppercase tracking-[.15em] text-[#9fd3ff]">
            Why ASM CSIT
          </p>

          <h2 className="font-heading mt-3 text-[28px] font-semibold sm:text-[36px]">
            About ASM CSIT
          </h2>

          <p className="mt-4 text-sm leading-6 text-white/90">
            Explore the academic, industry, global exposure, and faculty
            information available through official ASM CSIT resources.
          </p>

          <a
            href={officialSources.home}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-[#ffc293]"
          >
            Know more about ASM CSIT
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-9 grid gap-3 md:grid-cols-3">
          {pillars.map(({ icon: Icon, title, copy }) => (
            <article
              key={title}
              className="border border-white/25 bg-white/10 p-5 backdrop-blur-[2px]"
            >
              <Icon size={23} className="text-[#ffc293]" />

              <h3 className="font-heading mt-5 text-[15px] font-semibold">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-5 text-white/85">
                {copy}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}