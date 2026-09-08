import type { CSSProperties, ReactNode } from "react";

/**
 * Shared na balangkas ng mga content page (Visit, Golf).
 *
 * Nandito ito para iisa ang lapad, gitna, at laki ng teksto sa lahat ng
 * pahina. Kapag nakakalat ang mga bilang na ito sa bawat file, unti-unti
 * silang naghihiwalay at hindi na magkatugma ang mga pahina.
 */

/* Iisa ang kulay ng lahat ng section dito, kaya hairline rule ang naghahati
   sa kanila. Ang mga concept page lang ang gumagamit ng SECTION. */
export const SECTION =
  "relative isolate scroll-mt-24 overflow-hidden border-t border-[#173b2a]/10 bg-[#f7f5ee] py-14 sm:py-16";

/** Stagger helper — nababasa sa CSS bilang `transition-delay`. */
export const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/** Pare-parehong lapad, gitna, at gap sa magkabilang gilid. */
export function Container({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-12">{children}</div>;
}

/** Pare-parehong type scale at pagpasok ng bawat section heading. */
export function SectionHeading({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <div className="mx-auto max-w-xl text-center">
      <p data-reveal="up" style={delay(0)} className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">
        {eyebrow}
      </p>
      <h2
        data-reveal="up"
        style={delay(90)}
        className="mt-3 text-2xl font-medium tracking-[-0.035em] text-[#14271d] sm:text-3xl"
      >
        {title}
      </h2>
      {intro ? (
        <p data-reveal="up" style={delay(180)} className="mt-4 text-sm leading-7 text-[#5d685f]">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
