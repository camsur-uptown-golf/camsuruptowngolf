"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Tr from "@/components/Tr";
import { useTranslation } from "@/i18n/LanguageProvider";
import { VILLA_NIGHTS } from "@/lib/golf-booking";
import { ACCOMMODATIONS } from "@/lib/site-content";
import { VILLA_DEL_REY_STAYS, villaHouseHref } from "@/lib/villa-del-rey";

/**
 * "After the round, come home to Villa Del Rey." — bersyong BENTO MOSAIC.
 * Mga kahalili: `HomeVillaDelReyCards`, `HomeVillaDelReyTabs`,
 * `HomeVillaDelReyShowcase`, at ang dating accordion (`HomeVillaDelRey`); ang
 * import sa `app/page.tsx` ang pumipili.
 *
 * HIERARCHY SA LAKI: ang pinakamahal (Villas) ang malaking tile sa kaliwa
 * (2×2); dalawang maliit sa itaas-kanan, isang malapad sa ibaba-kanan. Iba ito
 * sa card grid ng "Your day at the club" sa itaas, kaya may ritmo ang homepage.
 *
 * Nasa IBABA lang ng bawat tile ang teksto, sa ibabaw ng gradient — hindi
 * natatakpan ang mga bahay. Buong tile ang link papunta sa pahina ng tuluyan.
 *
 * Cellphone: malaki ang Villas, tapos 2-kolum ang tatlo (malapad ang huli).
 * Presyo mula sa `VILLA_NIGHTS`; `SHOW_PRICES = false` para "Up to N guests" na lang.
 */

const SHOW_PRICES = true;

const VILLA = ACCOMMODATIONS[0];
const VILLA_HREF = `/accommodations/${VILLA.slug}`;

/* Pinakamahal muna — Villas → Dwell → Cabins → Cabana. */
const STAYS = VILLA_DEL_REY_STAYS.map((stay) => ({
  ...stay,
  night: VILLA_NIGHTS.find((night) => night.slug === stay.slug),
})).sort((a, b) => (b.night?.pricePerNight ?? 0) - (a.night?.pricePerNight ?? 0));

/* Puwesto ng bawat tile, ayon sa pagkakasunod sa itaas. */
const TILE = [
  "col-span-2 aspect-[5/4] sm:aspect-[16/10] lg:col-span-1 lg:row-span-2 lg:aspect-auto",
  "aspect-[4/5] lg:aspect-auto",
  "aspect-[4/5] lg:aspect-auto",
  "col-span-2 aspect-[16/9] lg:aspect-auto",
];
const SIZES = [
  "(min-width: 1600px) 780px, (min-width: 1024px) 50vw, 100vw",
  "(min-width: 1600px) 380px, (min-width: 1024px) 25vw, 50vw",
  "(min-width: 1600px) 380px, (min-width: 1024px) 25vw, 50vw",
  "(min-width: 1600px) 780px, (min-width: 1024px) 50vw, 100vw",
];

const peso = (amount: number) => `₱${amount.toLocaleString("en-PH")}`;

export default function HomeVillaDelReyBento() {
  const { t } = useTranslation();

  return (
    <section id="home-stay" className="relative isolate bg-[#f3ede1] pb-16 pt-10 text-[#03321b] sm:pb-20 lg:pb-24 lg:pt-14">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p data-reveal="up" className="font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7d6224] sm:text-xs">
              {t("home.stay.eyebrow")}
            </p>
            <h2
              data-reveal="up"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              className="mt-3 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]"
            >
              {t("home.stay.title")}
            </h2>
            <p data-reveal="up" className="mt-4 max-w-xl text-[17px] leading-8 text-[#3f4c45]">
              {t("home.stay.intro")}
            </p>
          </div>
          <Link
            href={VILLA_HREF}
            data-reveal="up"
            className="inline-flex h-12 shrink-0 items-center justify-center self-start rounded-full bg-[#e2c77a] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b] shadow-[0_14px_34px_rgba(152,120,47,0.14)] transition hover:-translate-y-0.5 hover:bg-[#efd99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] sm:self-auto xl:text-[11px]"
          >
            {t("home.stay.cta")}
          </Link>
        </div>

      </div>

      {/* Iisang lapad (1600px) ang heading at ang grid, para magkahanay ang
          kaliwang gilid ng title at ng larawan, at ang pindutan sa kanang gilid.
          Magkaiba sila dati (1280 at 1600) at lumulutang ang title. */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
        <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:mt-12 lg:h-[min(86svh,860px)] lg:min-h-[600px] lg:grid-cols-[1.25fr_0.75fr_0.75fr] lg:grid-rows-2 lg:gap-5">
          {STAYS.map((stay, index) => {
            const featured = index === 0;
            return (
              <li
                key={stay.slug}
                data-reveal="up"
                style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
                className={`${TILE[index] ?? "aspect-[4/5]"} relative`}
              >
                <Link
                  href={villaHouseHref(stay.slug)}
                  className="group relative block h-full overflow-hidden rounded-[1.4rem] bg-[#03321b] shadow-[0_24px_60px_-36px_rgba(3,50,27,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2e5126]"
                >
                  <Image
                    src={stay.exterior}
                    alt={`${stay.name} at Villa Del Rey`}
                    fill
                    sizes={SIZES[index] ?? "50vw"}
                    className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  {/* Dilim sa ibaba lang, para sa teksto. Lumalalim ito kapag
                      lumalabas ang maikling info (hover/focus), para mabasa pa rin. */}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(4,20,13,0.82))] ${featured ? "h-1/2" : "h-2/3"}`}
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 bg-[linear-gradient(180deg,rgba(4,20,13,0.1)_0%,rgba(4,20,13,0.55)_45%,rgba(4,20,13,0.9)_100%)] opacity-0 transition-opacity duration-500 [@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100"
                  />

                  <span className={`absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 text-white ${featured ? "p-5 sm:p-8" : "p-4 sm:p-5"}`}>
                    <span className="min-w-0">
                      <span className={`block font-navigation font-bold uppercase tracking-[0.2em] text-[#efd99b] ${featured ? "text-[11px] sm:text-[12px]" : "text-[10px] sm:text-[11px]"} ${featured ? "" : "hidden sm:block"}`}>
                        {stay.setting}
                      </span>
                      <span
                        className={`mt-1.5 block font-display font-medium leading-[1] tracking-[-0.04em] ${
                          featured ? "text-[2rem] sm:text-[clamp(2.25rem,3.4vw,3.25rem)]" : "text-[1.5rem] sm:text-[1.9rem]"
                        }`}
                      >
                        {stay.name}
                      </span>
                      {stay.night ? (
                        <span className={`mt-2 block text-white/80 ${featured ? "text-[13px] sm:text-[14px]" : "text-[11px] sm:text-[13px]"}`}>
                          <svg viewBox="0 0 24 24" aria-hidden="true" className="mr-1.5 inline-block h-[1.05em] w-[1.05em] -translate-y-px align-middle" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                          <Tr t="Up to {0} guests" v={[String(stay.night.sleeps)]} />
                          {SHOW_PRICES ? (
                            <>
                              {" · "}
                              {/* Hindi hinahati: sa maliit na tile sa cellphone ay naghahati
                                  dati ang "/night" sa sariling linya. */}
                              <span className="whitespace-nowrap">
                                <span className="font-semibold tabular-nums text-white">{peso(stay.night.pricePerNight)}</span>
                                <span className="text-white/60"> per night</span>
                              </span>
                            </>
                          ) : null}
                        </span>
                      ) : null}
                      {/* MAIKLING INFO SA HOVER/FOCUS — galing sa parehong
                          `VILLA_DEL_REY_STAYS` ng /accommodations/villa-del-rey,
                          kaya sumasabay kapag binago roon. Sarado (grid-rows 0fr)
                          hanggang tinapatan; desktop lang (`hover:hover`), dahil
                          walang hover sa cellphone. Highlights sa malaking tile lang. */}
                      <span className="hidden lg:grid lg:grid-rows-[0fr] lg:transition-[grid-template-rows] lg:duration-500 lg:ease-out lg:group-hover:grid-rows-[1fr] lg:group-focus-visible:grid-rows-[1fr] motion-reduce:transition-none">
                        <span className="overflow-hidden">
                          <span className={`block pt-3 leading-6 text-white/85 ${featured ? "max-w-md text-[15px]" : "text-[13px] leading-[1.35rem]"}`}>
                            {stay.description}
                          </span>
                          {featured ? (
                            <span className="mt-3 flex flex-wrap gap-2">
                              {stay.highlights.map((item) => (
                                <span key={item} className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[12px] text-white/90 backdrop-blur-sm">
                                  {item}
                                </span>
                              ))}
                            </span>
                          ) : null}
                        </span>
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`flex shrink-0 items-center justify-center rounded-full border border-white/35 text-white transition-all duration-300 group-hover:border-[#e2c77a] group-hover:bg-[#e2c77a] group-hover:text-[#03321b] ${
                        featured ? "h-10 w-10 sm:h-12 sm:w-12 sm:text-lg" : "hidden h-10 w-10 sm:flex"
                      }`}
                    >
                      →
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
