import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";

/**
 * Layout kit ng mga content page (Visit, Golf, Events, Packages).
 *
 * Pareho ang sukat nito sa SectionKit — 896px na hanay, 30px na nakasentrong
 * pamagat — para iisa ang hitsura ng buong site, kasama na ang mga concept
 * page na SectionKit pa rin ang gamit.
 *
 * Isang pagkakaiba lang sa SectionKit: walang hairline sa pagitan ng mga
 * section. Ang maluwag na padding at ang pagpapalit ng background ang
 * naghahati sa kanila.
 */

/**
 * Ang dalawang background ng mga content section. Walang hairline sa
 * pagitan nila — ang maluwag na padding at ang pagpapalit ng kulay ang
 * naghahati sa kanila.
 *
 * Hindi ito awtomatikong nagsasalitan: bawat pahina mismo ang pumipili
 * kung alin ang gagamitin ng bawat section, kaya may mga bahaging sadyang
 * magkasunod ang puti.
 */
export const EDITORIAL_SECTION =
  "relative isolate scroll-mt-24 overflow-hidden bg-white py-14 sm:py-16";

/** Ang salitan ng EDITORIAL_SECTION. */
export const EDITORIAL_SECTION_ALT =
  "relative isolate scroll-mt-24 overflow-hidden bg-[#f7f5ee] py-14 sm:py-16";

export const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/** Pare-parehong lapad, gitna, at gap sa magkabilang gilid. */
export function Shell({ children }: { children: ReactNode }) {
  return <div className="relative mx-auto w-full max-w-4xl px-6 sm:px-10 lg:px-12 xl:max-w-5xl">{children}</div>;
}

/**
 * Malamlam na club crest sa likod ng isang section, dahan-dahang gumagalaw
 * kontra sa scroll.
 *
 * Kailangan ng dalawang bagay ng section na maglalagay nito: `relative
 * isolate overflow-hidden` (nasa EDITORIAL_SECTION na), at <ScrollMotion />
 * sa pahina — kung wala iyon ay hindi gumagalaw ang parallax, bagaman
 * nakikita pa rin ang crest.
 */
export function Watermark({ speed, offsetY = "0px" }: { speed: number; offsetY?: string }) {
  return (
    /* Ang offset ay nasa labas na balot, hindi sa loob: ang panloob na div ang
       may data-parallax, at ang transform doon ay isinusulat ng ScrollMotion
       kada frame — mapapatungan nito ang anumang ilalagay nating transform. */
    <div
      className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
      style={{ transform: `translateY(${offsetY})` }}
      aria-hidden="true"
    >
      <div data-parallax={speed} className="relative w-[420px] opacity-[0.04] sm:w-[560px]">
        <Image src="/camsur-uptown-logo.png" alt="" width={720} height={958} className="h-auto w-full grayscale" />
      </div>
    </div>
  );
}

/** Maliit na uppercase na label sa itaas ng bawat pamagat. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p data-reveal="up" className="text-[10px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#98782f]">
      {children}
    </p>
  );
}

/** Nakasentrong ulo ng section, pare-pareho ang type scale sa buong site. */
export function EditorialHeading({
  kicker,
  title,
  intro,
}: {
  kicker: string;
  title: ReactNode;
  intro?: string;
}) {
  return (
    <div className="mx-auto max-w-xl text-center xl:max-w-2xl">
      <Kicker>{kicker}</Kicker>
      <h2
        data-reveal="up"
        style={delay(90)}
        className="mt-3 text-2xl font-medium tracking-[-0.035em] text-[#14271d] sm:text-3xl xl:text-4xl"
      >
        {title}
      </h2>
      {intro ? (
        <p data-reveal="up" style={delay(180)} className="mt-4 text-sm leading-7 xl:text-base xl:leading-8 text-[#5d685f]">
          {intro}
        </p>
      ) : null}
    </div>
  );
}
