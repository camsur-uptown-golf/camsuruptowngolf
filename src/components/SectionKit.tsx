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
  "relative isolate scroll-mt-24 overflow-hidden border-t border-[#1f3f2e]/10 bg-[#f7f5ee] py-14 sm:py-16";

/** Stagger helper — nababasa sa CSS bilang `transition-delay`. */
export const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/** Pare-parehong lapad, gitna, at gap sa magkabilang gilid. */
export function Container({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-12 xl:max-w-5xl">{children}</div>;
}

/**
 * Pare-parehong type scale at pagpasok ng bawat section heading.
 *
 * Ang `size="lg"` ay tumutugma sa scale ng "Opening Fairway" na custom
 * heading sa aerial-study section — para pantay ang dalawang ulo sa isang
 * pahina. Hindi nito ginagalaw ang default: nananatiling pareho ang ibang
 * section heading sa buong site.
 */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  size = "default",
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  size?: "default" | "lg";
}) {
  const isLg = size === "lg";
  return (
    <div className={`mx-auto text-center ${isLg ? "max-w-2xl xl:max-w-3xl" : "max-w-xl xl:max-w-2xl"}`}>
      <p data-reveal="up" style={delay(0)} className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#d1af58]">
        {eyebrow}
      </p>
      <h2
        data-reveal="up"
        style={delay(90)}
        className={`mt-3 font-medium tracking-[-0.035em] text-[#14271d] ${
          isLg
            ? "text-balance text-[clamp(1.85rem,3.2vw,3rem)] leading-[1.02] tracking-[-0.045em]"
            : "text-2xl sm:text-3xl xl:text-4xl"
        }`}
      >
        {title}
      </h2>
      {intro ? (
        <p
          data-reveal="up"
          style={delay(180)}
          className={`text-[#5d685f] ${
            isLg
              ? "mx-auto mt-6 max-w-3xl text-sm leading-7 sm:text-base sm:leading-8 lg:text-lg lg:leading-9"
              : "mt-4 text-sm leading-7 xl:text-base xl:leading-8"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
