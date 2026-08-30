// Campus Ledger style reminder: section headings use a quiet prospectus-like coordinate system.
import type { ReactNode } from "react";

export function SectionHeading({ number, eyebrow, title, description, action }: { number: string; eyebrow: string; title: ReactNode; description?: string; action?: ReactNode }) {
  return (
    <div className="grid gap-5 lg:grid-cols-[112px_minmax(0,1fr)_auto] lg:items-end">
      <div className="flex items-center gap-3 text-[#275fb4]"><span className="font-display text-4xl leading-none">{number}</span><span className="h-px flex-1 bg-[#9ebbe9] lg:hidden" /><span className="hidden h-px flex-1 bg-gradient-to-r from-[#275fb4] via-[#9ebbe9] to-[#159b67] lg:block" /></div>
      <div><p className="text-[11px] font-extrabold uppercase tracking-[.17em] text-[#275fb4]">{eyebrow}</p><h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.05] tracking-[-.03em] text-[#10213b] sm:text-5xl">{title}</h2>{description && <p className="mt-4 max-w-2xl text-sm leading-6 text-[#5d697a] sm:text-base">{description}</p>}</div>
      {action && <div className="lg:pb-1">{action}</div>}
    </div>
  );
}


