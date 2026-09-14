"use client";

/**
 * Ang pababang chevron sa ilalim ng hero.
 *
 * Nananatiling `<a href="#id">` ito, kaya gumagana pa rin kahit walang
 * JavaScript. Ang handler ay nagdadagdag lang ng katiyakan: tinatawag nito
 * ang scrollIntoView nang tuwiran sa halip na umasa sa native na hash
 * behaviour, na naaapektuhan ng scroll-behavior, ng scroll-padding, at ng
 * kung sino pang humahawak sa scroll position ng pahina.
 *
 * Iginagalang nito ang prefers-reduced-motion: agad ang paglipat doon.
 */
export default function ScrollCue({ targetId, label }: { targetId: string; label: string }) {
  function handleClick(event: React.MouseEvent<HTMLAnchorElement>) {
    const target = document.getElementById(targetId);
    /* Walang target: hayaan ang browser sa native nitong asal. */
    if (!target) return;

    event.preventDefault();

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    target.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });

    /* Nailalagay pa rin ang hash para mabalikan at maibahagi ang lugar, pero
       sa replaceState — kung hindi ay muling tatalon ang browser doon. */
    window.history.replaceState(null, "", `#${targetId}`);
  }

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      aria-label={label}
      className="group absolute bottom-0 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center text-white"
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/75 bg-black/[0.04] backdrop-blur-[1px] transition-colors group-hover:border-white group-hover:bg-white/10">
        <svg viewBox="0 0 24 14" className="h-2.5 w-4" fill="none" aria-hidden="true">
          <path d="M3 2.5 12 11l9-8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="mt-2 h-3 w-px bg-white/75 transition-colors group-hover:bg-white sm:h-4" aria-hidden="true" />
    </a>
  );
}
