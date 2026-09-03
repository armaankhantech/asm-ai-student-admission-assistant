// ASM CSIT enquiry submission status.
// Shows a clear success or error state after backend submission.

import { CheckCircle2, MessageCircleMore, RefreshCw, XCircle } from "lucide-react";
import { requestAsmAiOpen } from "@/lib/asmAi";

type EnquiryStatusProps = {
  status: "submitted" | "error";
  message: string;
  onTryAgain: () => void;
};

export function EnquiryStatus({
  status,
  message,
  onTryAgain,
}: EnquiryStatusProps) {
  const submitted = status === "submitted";

  if (submitted) {
    return (
      <div
        className="mt-2 border border-[#b7d8c0] bg-[#f2faf4] p-6"
        role="status"
        aria-live="polite"
      >
        <div className="flex gap-4">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#dcefe0] text-[#3e8d34]">
            <CheckCircle2 size={23} />
          </span>

          <div className="min-w-0">
            <p className="font-heading text-lg font-semibold text-[#2f7035]">
              Enquiry submitted successfully
            </p>

            <p className="mt-2 text-sm leading-6 text-[#4d7453]">
              Thank you for contacting ASM CSIT. Your enquiry has been
              received successfully. Our admission team will review your
              enquiry and get back to you.
            </p>

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() =>
                  requestAsmAiOpen(
                    "I have submitted an admission enquiry. Can ASM AI help me with my admission questions?"
                  )
                }
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg bg-[#1c2d59] px-4 text-xs font-bold text-white transition hover:bg-[#263b70]"
              >
                <MessageCircleMore size={15} />
                Ask ASM AI
              </button>

              <button
                type="button"
                onClick={onTryAgain}
                className="inline-flex min-h-[42px] items-center justify-center gap-2 rounded-lg border border-[#cbd7e3] bg-white px-4 text-xs font-bold text-[#1c2d59] transition hover:border-[#159b67] hover:text-[#159b67]"
              >
                <RefreshCw size={14} />
                Submit another enquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="mt-5 border border-[#e2b8b2] bg-[#fff7f5] p-4"
      role="alert"
      aria-live="assertive"
    >
      <div className="flex gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#f5dfdb] text-[#b43b2e]">
          <XCircle size={18} />
        </span>

        <div>
          <p className="font-heading text-sm font-semibold text-[#96352b]">
            We couldn't submit your enquiry
          </p>

          <p className="mt-1 text-sm leading-5 text-[#7d514b]">
            {message}
          </p>

          <button
            type="button"
            onClick={onTryAgain}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#1c2d59] hover:text-[#0095eb]"
          >
            <RefreshCw size={14} />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}