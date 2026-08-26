import type { ReactNode } from "react";

/**
 * Image placeholder — para makita agad ang layout habang wala pang totoong photos.
 * Palitan mo na lang ito ng <Image .../> (next/image) kapag handa na ang mga larawan.
 */
export function ImgPlaceholder({
  label = "Photo coming soon",
  className = "",
  tone = "green",
}: {
  label?: string;
  className?: string;
  tone?: "green" | "cream";
}) {
  const bg =
    tone === "cream"
      ? "from-[#efe9db] to-[#ddd2ba] text-[#14442c]/45"
      : "from-[#16452c] to-[#08190f] text-[#c9a54e]/55";

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${bg} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 120 80"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 h-1/2 w-full opacity-40"
      >
        <path d="M0 55 L34 22 L50 40 L64 28 L100 55 Z" fill="currentColor" opacity="0.45" />
        <path d="M0 62 Q40 46 80 58 T120 54 L120 80 L0 80 Z" fill="currentColor" opacity="0.5" />
        <rect x="70" y="20" width="1.4" height="40" fill="currentColor" />
        <path d="M71.4 21 L86 25 L71.4 29 Z" fill="currentColor" />
      </svg>
      <span className="relative flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em]">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
          <rect x="3" y="5" width="18" height="15" rx="2" stroke="currentColor" strokeWidth="1.4" />
          <path d="M3 16l5-5 4 4 3-3 6 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="9" cy="9.5" r="1.4" fill="currentColor" />
        </svg>
        {label}
      </span>
    </div>
  );
}

export function Eyebrow({
  children,
  className = "text-[#a1770f]",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`mb-4 text-xs font-semibold uppercase tracking-[0.35em] ${className}`}>
      {children}
    </p>
  );
}
