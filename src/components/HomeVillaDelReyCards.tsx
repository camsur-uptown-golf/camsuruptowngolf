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
 * "After the round, come home to Villa Del Rey." — bersyong APAT NA CARD
 * (option 3). Mga kahalili: `HomeVillaDelReyTabs`, `HomeVillaDelReyShowcase`,
 * at ang dating accordion (`HomeVillaDelRey`); ang import sa `app/page.tsx` ang
 * pumipili.
 *
 * Pinakamadaling paghambingin ang apat na tuluyan: magkakatabi ang larawan,
 * kapasidad, at presyo. Kaparehong anyo ng "Your day at the club" cards
 * (`HomeClubhouseDayCards`) — larawan, tapos teksto sa ilalim — para iisa ang
 * wika ng disenyo sa homepage. Buong card ang napipindot (stretched link sa
 * `<h3>`), papunta sa sariling pahina ng tuluyan.
 *
 * Cellphone: swipeable na hanay na sumisilip ang kasunod (scroll-snap).
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

const peso = (amount: number) => `₱${amount.toLocaleString("en-PH")}`;

export default function HomeVillaDelReyCards() {
  const { t } = useTranslation();

  return (
    <section id="home-stay" className="relative isolate bg-[#f3ede1] pb-16 pt-10 text-[#03321b] sm:pb-20 lg:pb-24 lg:pt-14">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
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

        <ol className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-12 lg:grid lg:grid-cols-4 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {STAYS.map((stay, index) => (
            <li
              key={stay.slug}
              data-reveal="up"
              style={{ "--reveal-delay": `${index * 80}ms` } as CSSProperties}
              className="group relative w-[78%] shrink-0 snap-start sm:w-[46%] lg:w-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-[#03321b] shadow-[0_24px_60px_-36px_rgba(3,50,27,0.55)]">
                <Image
                  src={stay.exterior}
                  alt={`${stay.name} at Villa Del Rey`}
                  fill
                  sizes="(min-width: 1024px) 300px, (min-width: 640px) 46vw, 78vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>

              <p className="mt-5 font-navigation text-[11px] font-bold uppercase tracking-[0.2em] text-[#7d6224]">{stay.setting}</p>
              <h3 className="mt-2 font-display text-[clamp(1.75rem,2vw,2.1rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#17251e]">
                {/* Stretched link: ang `after` ang tumatakip sa buong card. */}
                <Link
                  href={villaHouseHref(stay.slug)}
                  className="after:absolute after:inset-0 after:rounded-[1.4rem] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[#2e5126]"
                >
                  {stay.name}
                </Link>
              </h3>

              {stay.night ? (
                <p className="mt-3 flex items-baseline justify-between gap-3 border-t border-[#03321b]/12 pt-3">
                  <span className="font-navigation text-[11px] font-semibold uppercase tracking-[0.16em] text-[#3f4c45]">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="mr-1.5 inline-block h-[1.05em] w-[1.05em] -translate-y-px align-middle" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                          <Tr t="Up to {0} guests" v={[String(stay.night.sleeps)]} />
                  </span>
                  {SHOW_PRICES ? (
                    <span className="text-right">
                      <span className="text-[11px] text-[#5f6a62]">from </span>
                      <span className="font-navigation text-[15px] font-semibold tabular-nums text-[#03321b]">{peso(stay.night.pricePerNight)}</span>
                      <span className="text-[11px] text-[#5f6a62]"> per night</span>
                    </span>
                  ) : null}
                </p>
              ) : null}

              <span
                aria-hidden="true"
                className="mt-4 inline-flex items-center gap-2 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#2e5126] transition-all group-hover:gap-3"
              >
                View stay
                <span>→</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
