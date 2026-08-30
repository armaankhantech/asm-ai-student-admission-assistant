// ASM CSIT reference recreation: official ASM CSIT image treatment preserves continuity on the simplified enquiry page.
import { MessageCircleMore } from "lucide-react";
import { requestAsmAiOpen } from "@/lib/asmAi";

export function EnquiryAside() {
  return (
    <aside className="relative min-h-[410px] overflow-hidden bg-[#1c2d59] p-7 text-white sm:p-9 lg:min-h-[650px]">
      <img
        src="/assets/asm-csit-why-banner.jpg"
        alt="Official ASM CSIT campus and students"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-[#1c2d59]/68" />

      <div className="relative">
        <div className="inline-flex bg-white p-1.5">
          <img
            src="/assets/asm-logo.png"
            alt="ASM CSIT"
            className="h-[62px] w-auto max-w-[230px] object-contain object-left"
          />
        </div>

        <p className="font-heading mt-10 text-xs font-semibold uppercase tracking-[.15em] text-[#9fd3ff]">
          Admission Enquiry
        </p>

        <h1 className="font-heading mt-3 text-[30px] font-semibold leading-tight sm:text-[38px]">
          Start your enquiry with ASM CSIT.
        </h1>

        <p className="mt-4 max-w-sm text-sm leading-7 text-white/90">
          Share your course interest and question. This V1 form is ready for
          the future ASM admission workflow.
        </p>

        <div className="mt-10 border-t border-white/35 pt-6">
          <p className="text-xs font-semibold uppercase tracking-[.12em] text-[#d8e4fc]">
            Need help first?
          </p>

          <button
            type="button"
            onClick={() =>
              requestAsmAiOpen("What is the admission process at ASM CSIT?")
            }
            className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-[#ffc293]"
          >
            <MessageCircleMore size={18} />
            Ask ASM AI about admissions
          </button>
        </div>
      </div>
    </aside>
  );
}