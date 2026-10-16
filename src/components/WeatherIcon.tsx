import type { WeatherKind } from "@/lib/weather";

/* Stroke-based na weather icon, katugma ng header. Ginagamit ng side bar at
   ng forecast sa mga form. */
export default function WeatherIcon({ kind, className = "h-4 w-4" }: { kind: WeatherKind; className?: string }) {
  if (kind === "sun") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "partly") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 2.5v1M2.5 8h1M4.4 4.4l.7.7M11.6 4.4l-.7.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 17.5a3.2 3.2 0 0 1 .3-6.4 4 4 0 0 1 7.6.9 2.8 2.8 0 0 1-.4 5.5H9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "rain" || kind === "storm") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M7.5 14.5a3.5 3.5 0 0 1 .3-7 4.4 4.4 0 0 1 8.4 1 3 3 0 0 1-.4 6H7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        {kind === "storm" ? (
          <path d="m12 15-1.5 3h2L11 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 17.5 8 20M12.5 17.5 11.5 20M16 17.5 15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M7 16.5a3.5 3.5 0 0 1 .3-7 4.4 4.4 0 0 1 8.4 1 3 3 0 0 1-.4 6H7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}
