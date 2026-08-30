type GroundingIndicatorProps = {
  grounding?: boolean;
};

export function GroundingIndicator({
  grounding,
}: GroundingIndicatorProps) {
  if (!grounding) return null;

  return (
    <div className="mt-1 ml-1 flex items-center gap-1.5 text-[10px] text-[#6b819c]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#3fae5a]" />
      <span>Grounded response</span>
    </div>
  );
}

