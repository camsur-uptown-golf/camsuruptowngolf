"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Tr from "@/components/Tr";
import { useTranslation } from "@/i18n/LanguageProvider";
import { VILLA_NIGHTS } from "@/lib/golf-booking";
import { ACCOMMODATIONS } from "@/lib/site-content";
import { VILLA_DEL_REY_STAYS, villaHouseHref } from "@/lib/villa-del-rey";

/**
 * "After the round, come home to Villa Del Rey." — bersyong SHOWCASE.
 * Kahalili ng accordion + carousel sa `HomeVillaDelRey.tsx`, na naiwan pa rin;
 * ang import sa `app/page.tsx` ang pumipili kung alin.
 *
 * Isang malaking larawan (may bilog na kanto at maliit na margin — hindi
 * edge-to-edge, dahil full-bleed na ang "Plan your golf getaway" banner na
 * kasunod nito) at isang madilim na glass panel sa kaliwa na may listahan ng
 * apat na tuluyan. Ang listahan ang IISANG navigation: ang tinatapatan o
 * naka-focus na tuluyan ang nagpapalit ng larawan (crossfade), at ang pindot
 * ay papunta sa sariling pahina nito. Dati ay dalawa — accordion at mga tuldok
 * ng carousel — at tatlong beses na inuulit ang "Private poolside".
 *
 * Kita agad ang kapasidad at presyo kada gabi ng bawat isa, mula sa
 * `VILLA_NIGHTS` (ang parehong presyo ng villa add-on sa tee-time booking).
 * Itakda ang `SHOW_PRICES` sa `false` para "Up to N guests" na lang.
 *
 * Cellphone: larawan sa itaas, listahan sa ibaba — bawat hilera ay may sariling
 * maliit na larawan, dahil walang hover doon.
 */

const SHOW_PRICES = true;

const VILLA = ACCOMMODATIONS[0];
const VILLA_HREF = `/accommodations/${VILLA.slug}`;

/* Pinakamahal muna — Villas → Dwell → Cabins → Cabana. */
const STAYS = VILLA_DEL_REY_STAYS.map((stay) => ({
  ...stay,
  night: VILLA_NIGHTS.find((night) => night.slug === stay.slug),
})).sort((a, b) => (b.night?.pricePerNight ?? 0) - (a.night?.pricePerNight ?? 0));

const peso = (amount: number) => `₱${amount.toLocaleString("en-PH")}`;

export default function HomeVillaDelReyShowcase() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const current = STAYS[active] ?? STAYS[0];

  return (
    <section id="home-stay" className="relative isolate bg-[#f3ede1] px-3 pb-12 pt-6 sm:px-4 lg:px-5 lg:pb-16">
      {/* DALAWANG HANAY SA DESKTOP, WALANG PATONG: panel sa kaliwa, larawan sa
          kanan. Nakapatong dati ang panel sa larawan at natatakpan nito ang mga
          bahay — kadalasang nasa kaliwa sila ng litrato (Cabana, Cabins). */}
      <div className="relative mx-auto flex max-w-[1440px] flex-col overflow-hidden rounded-[1.8rem] bg-[#06170f] text-white lg:grid lg:min-h-[86svh] lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:rounded-[2.2rem]">
        {/* Mga larawan: nakapatong ang apat; opacity lang ang nagbabago, kaya
            walang bagong download sa paglipat. */}
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:order-2 lg:aspect-auto lg:h-full">
          {STAYS.map((stay, index) => (
            <Image
              key={stay.slug}
              src={stay.exterior}
              alt={index === active ? `${stay.name} at Villa Del Rey` : ""}
              aria-hidden={index !== active}
              fill
              sizes="(min-width: 1440px) 840px, (min-width: 1024px) 58vw, 100vw"
              className={`object-cover transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transform-none motion-reduce:transition-opacity ${
                index === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
              }`}
            />
          ))}
          {/* Dilim sa ibaba lang, para sa caption — wala nang nakatakip sa bahay. */}
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(6,23,15,0.6)_100%)]" />
          {/* Pangalan ng tinitingnan, sa ibabang-kanan ng larawan. */}
          <p className="pointer-events-none absolute bottom-5 right-6 font-navigation text-[11px] font-bold uppercase tracking-[0.22em] text-white/90 lg:bottom-8 lg:right-10">
            <span className="text-[#efd99b]">{current.name}</span>
            <span className="text-white/60"> · {current.setting}</span>
          </p>
        </div>

        {/* Panel */}
        <div className="relative px-6 pb-8 pt-8 sm:px-10 lg:order-1 lg:flex lg:items-center lg:px-12 lg:py-14 xl:px-16">
          <div className="w-full max-w-[30rem]">
            <p data-reveal="up" className="font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#e2c77a] sm:text-xs">
              {t("home.stay.eyebrow")}
            </p>
            <h2
              data-reveal="up"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              className="mt-3 text-[clamp(2.1rem,3.4vw,3.4rem)] font-medium leading-[1] tracking-[-0.045em] text-[#f5efe2]"
            >
              {t("home.stay.title")}
            </h2>
            <p data-reveal="up" className="mt-4 text-[16px] leading-7 text-white/75">
              {t("home.stay.intro")}
            </p>

            <ul className="mt-8 border-t border-white/12">
              {STAYS.map((stay, index) => {
                const isActive = index === active;
                return (
                  <li key={stay.slug} className="border-b border-white/12">
                    <Link
                      href={villaHouseHref(stay.slug)}
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      className={`group relative flex items-center gap-4 py-4 pl-4 pr-1 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e2c77a] ${
                        isActive ? "text-white" : "text-white/70 hover:text-white"
                      }`}
                    >
                      {/* Gold na guhit sa kaliwa ng tinitingnan. */}
                      <span
                        aria-hidden="true"
                        className={`absolute left-0 top-1/2 h-8 w-[2px] -translate-y-1/2 rounded-full bg-[#e2c77a] transition-opacity duration-300 ${isActive ? "opacity-100" : "opacity-0"}`}
                      />
                      {/* Maliit na larawan sa cellphone lang — walang hover doon. */}
                      <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl lg:hidden">
                        <Image src={stay.exterior} alt="" fill sizes="56px" className="object-cover" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-[1.6rem] font-medium leading-none tracking-[-0.03em]">{stay.name}</span>
                        <span className="mt-1.5 block font-navigation text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55">
                          {stay.night ? (
                            <>
                              <svg viewBox="0 0 24 24" aria-hidden="true" className="mr-1.5 inline-block h-[1.05em] w-[1.05em] -translate-y-px align-middle" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                              <Tr t="Up to {0} guests" v={[String(stay.night.sleeps)]} />
                            </>
                          ) : (
                            stay.setting
                          )}
                        </span>
                      </span>
                      {SHOW_PRICES && stay.night ? (
                        <span className="shrink-0 text-right">
                          <span className="block text-[11px] text-white/55">from</span>
                          <span className="block font-navigation text-[15px] font-semibold tabular-nums text-[#efd99b]">
                            {peso(stay.night.pricePerNight)}
                            <span className="text-[11px] font-medium text-white/55"> per night</span>
                          </span>
                        </span>
                      ) : null}
                      <span aria-hidden="true" className="shrink-0 text-[#e2c77a] transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            <Link
              href={VILLA_HREF}
              className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#e2c77a] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b] shadow-[0_14px_34px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:bg-[#efd99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#e2c77a]"
            >
              {t("home.stay.cta")}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
