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
  "relative isolate scroll-mt-24 overflow-hidden bg-[#f3ede1] py-14 sm:py-16";

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
 *
 * `fixed`: para sa section na nagbabago ang taas habang binabasa (hal. ang
 * accordion ng /faq). Sa default, nakagitna ang crest sa section, kaya
 * kapag humaba ang section ay bumababa rin ito — mukhang tumatalon ang logo
 * tuwing may binubuksan. Ang `fixed` ay nakadikit sa itaas ng section at
 * walang parallax, kaya hindi ito gumagalaw kahit ano pa ang buksan. Ang
 * shield (walang "Club" sa wordmark) ang gamit nito, ayon sa Brand
 * Guidelines 2026.
 */
export function Watermark({ speed, offsetY = "0px", fixed = false }: { speed: number; offsetY?: string; fixed?: boolean }) {
  if (fixed) {
    return (
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center pt-24 sm:pt-32" aria-hidden="true">
        <div className="relative w-[300px] opacity-[0.05] sm:w-[440px]">
          <Image src="/branding/camsur-uptown-golf-shield.png" alt="" width={770} height={1076} className="h-auto w-full grayscale" />
        </div>
      </div>
    );
  }

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
        <Image src="/branding/camsur-uptown-golf-shield.png" alt="" width={770} height={1076} className="h-auto w-full grayscale" />
      </div>
    </div>
  );
}

/** Maliit na uppercase na label sa itaas ng bawat pamagat. */
export function Kicker({ children }: { children: ReactNode }) {
  return (
    <p data-reveal="up" className="text-[11px] xl:text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d6224]">
      {children}
    </p>
  );
}

/**
 * Nakasentrong ulo ng section, pare-pareho ang type scale sa buong site.
 *
 * Ang `size="lg"` ay isang sadyang pagtaas para sa lead heading ng isang
 * pahina (hal. "Floor by floor" sa Clubhouse). Hindi nito ginagalaw ang
 * default — nananatiling pare-pareho ang ibang section sa buong site.
 */
export function EditorialHeading({
  kicker,
  title,
  intro,
  size = "default",
}: {
  kicker?: string;
  title: ReactNode;
  intro?: string;
  size?: "default" | "lg";
}) {
  const isLg = size === "lg";
  return (
    <div className={`mx-auto text-center ${isLg ? "max-w-2xl xl:max-w-3xl" : "max-w-xl xl:max-w-2xl"}`}>
      {kicker ? <Kicker>{kicker}</Kicker> : null}
      <h2
        data-reveal="up"
        style={delay(90)}
        className={`${kicker ? "mt-3 " : ""}font-medium tracking-[-0.035em] text-[#03321b] ${
          isLg
            ? "text-[clamp(2.25rem,4vw,3.5rem)] leading-[1.02]"
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
            isLg ? "mt-5 text-base leading-8 xl:text-lg xl:leading-9" : "mt-4 text-sm leading-7 xl:text-base xl:leading-8"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
