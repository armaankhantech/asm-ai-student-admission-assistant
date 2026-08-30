// ASM CSIT reference recreation: official program-banner layout with practical white course tiles.
import { ArrowRight, BookOpenCheck, MessageCircleMore } from "lucide-react";
import { useMemo, useState } from "react";
import { programs } from "@/data/collegeData";
import { requestAsmAiOpen } from "@/lib/asmAi";
import type { ProgramCategory } from "@/types/college";

export function ProgramsSection() {
  const [category, setCategory] = useState<ProgramCategory>("Undergraduate");

  const visiblePrograms = useMemo(
    () => programs.filter((program) => program.category === category),
    [category]
  );

  return (
    <section id="programs" className="section-anchor bg-white py-16 sm:py-20">
      <div className="mx-auto grid max-w-[1320px] gap-10 px-5 sm:px-8 lg:grid-cols-[.62fr_1fr] lg:px-12">
        <div className="relative min-h-[300px] overflow-hidden bg-[#0095eb]">
          <img
            src="/assets/asm-csit-programs-banner.jpg"
            alt="ASM CSIT program banner with graduating students"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#0078bd]/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 bg-[#1c2d59]/88 px-6 py-5 text-white">
            <p className="font-heading text-xl font-semibold">
              Programs at ASM CSIT
            </p>

            <p className="mt-1 text-sm text-white/85">
              Discover undergraduate and postgraduate options.
            </p>
          </div>
        </div>

        <div>
          <p className="font-heading text-xs font-semibold uppercase tracking-[.15em] text-[#0095eb]">
            Programs
          </p>

          <h2 className="asm-section-title mt-2 text-[28px] sm:text-[34px]">
            Choose your course
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-[#666]">
            Explore listed courses and use ASM AI to prepare questions about
            admissions, eligibility, documents, and fees when the college
            knowledge system is connected.
          </p>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div
              className="inline-flex w-fit border border-[#dedede] bg-[#f7f7f7] p-1"
              role="tablist"
              aria-label="Program level"
            >
              {(["Undergraduate", "Postgraduate"] as ProgramCategory[]).map(
                (item) => (
                  <button
                    key={item}
                    role="tab"
                    aria-selected={category === item}
                    type="button"
                    onClick={() => setCategory(item)}
                    className={`px-4 py-2 text-xs font-bold transition ${
                      category === item
                        ? "bg-[#1c2d59] text-white"
                        : "text-[#555] hover:bg-white"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <button
              type="button"
              onClick={() =>
                requestAsmAiOpen("What courses are available at ASM CSIT?")
              }
              className="inline-flex items-center gap-2 self-start text-sm font-bold text-[#1c2d59] transition hover:text-[#f58233]"
            >
              <MessageCircleMore size={17} />
              Ask ASM AI about programs
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {visiblePrograms.map((program) => (
              <article
                key={program.id}
                className="asm-card flex min-h-[94px] items-center gap-3 p-4"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#eef7fc] text-[#0095eb]">
                  <BookOpenCheck size={17} />
                </span>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[.1em] text-[#999]">
                    {program.category}
                  </p>

                  <h3 className="font-heading mt-1 text-[13px] font-semibold leading-5 text-[#1c2d59]">
                    {program.title}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}