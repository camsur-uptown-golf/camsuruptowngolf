/**
 * Maliit na marka sa gilid ng isang larawan: konsepto/AI-generated pa ito,
 * hindi pa ang tunay na kuha. Pansamantala habang wala pa ang totoong litrato.
 *
 * Ilagay ito sa loob ng isang `relative`/`sticky` na image container. Default
 * na sulok ay kaliwang-itaas; ipasa ang `className` para ilipat (hal. ang hero
 * na may fixed header sa itaas).
 */
export default function GeneratedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`pointer-events-none absolute z-20 inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 font-navigation text-[8px] font-bold uppercase tracking-[0.14em] text-[#e7d18d] backdrop-blur-sm sm:text-[9px] ${
        className || "left-3 top-3"
      }`}
    >
      <svg viewBox="0 0 24 24" className="h-2.5 w-2.5" fill="currentColor" aria-hidden="true">
        <path d="M12 2l1.7 6.5L20 10l-6.3 1.5L12 18l-1.7-6.5L4 10l6.3-1.5z" />
      </svg>
      Generated
    </span>
  );
}
