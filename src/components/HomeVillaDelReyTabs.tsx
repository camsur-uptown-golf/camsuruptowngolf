"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import Tr from "@/components/Tr";
import { useTranslation } from "@/i18n/LanguageProvider";
import { VILLA_NIGHTS } from "@/lib/golf-booking";
import { ACCOMMODATIONS } from "@/lib/site-content";
import { VILLA_DEL_REY_STAYS, villaHouseHref } from "@/lib/villa-del-rey";

/**
 * "After the round, come home to Villa Del Rey." — bersyong THUMBNAIL TABS
 * (option 2). Kahalili ng accordion (`HomeVillaDelRey.tsx`) at ng showcase
 * (`HomeVillaDelReyShowcase.tsx`); ang import sa `app/page.tsx` ang pumipili.
 *
 * Malaking larawan sa kaliwa, apat na thumbnail tab sa ilalim nito, at isang
 * info panel sa kanan. Ang mga tab ang IISANG navigation (wala nang accordion
 * at tuldok ng carousel), at bawat isa ay may sariling larawan — kaya kita ang
 * lahat ng tuluyan kahit hindi pa pinipindot. Isang beses na lang ang "setting"
 * (hal. "Private poolside"); tatlong beses itong inuulit dati.
 *
 * Isang pangunahing aksyon: "Find your stay" (gold) sa header. Ang "Ask about
 * availability" ay text link na lang sa panel, kaya hindi na sila nag-aagawan.
 *
 * Mga tab: ARIA tabs pattern — `role="tab"`, ←/→ para lumipat, Home/End.
 * Presyo mula sa `VILLA_NIGHTS`; `SHOW_PRICES = false` para "Up to N guests" na lang.
 */

const SHOW_PRICES = true;

const VILLA = ACCOMMODATIONS[0];
const VILLA_HREF = `/accommodations/${VILLA.slug}`;

const STAYS = VILLA_DEL_REY_STAYS.map((stay) => ({
  ...stay,
  night: VILLA_NIGHTS.find((night) => night.slug === stay.slug),
}));

const peso = (amount: number) => `₱${amount.toLocaleString("en-PH")}`;

export default function HomeVillaDelReyTabs() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = STAYS[active] ?? STAYS[0];

  function onTabKey(event: KeyboardEvent<HTMLButtonElement>) {
    const last = STAYS.length - 1;
    const next =
      event.key === "ArrowRight" ? (active === last ? 0 : active + 1)
      : event.key === "ArrowLeft" ? (active === 0 ? last : active - 1)
      : event.key === "Home" ? 0
      : event.key === "End" ? last
      : null;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

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

        <div className="mt-10 grid gap-8 lg:mt-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          {/* Larawan + mga tab */}
          <div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.6rem] bg-[#03321b] shadow-[0_30px_80px_-40px_rgba(3,50,27,0.55)] sm:aspect-[16/10]">
              {STAYS.map((stay, index) => (
                <Image
                  key={stay.slug}
                  src={stay.exterior}
                  alt={index === active ? `${stay.name} at Villa Del Rey` : ""}
                  aria-hidden={index !== active}
                  fill
                  sizes="(min-width: 1280px) 720px, (min-width: 1024px) 58vw, 100vw"
                  className={`object-cover transition-[opacity,transform] duration-[800ms] ease-out motion-reduce:transform-none motion-reduce:transition-opacity ${
                    index === active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                  }`}
                />
              ))}
            </div>

            <div role="tablist" aria-label="Villa Del Rey stays" className="mt-4 grid grid-cols-4 gap-2 sm:gap-3">
              {STAYS.map((stay, index) => {
                const isActive = index === active;
                return (
                  <button
                    key={stay.slug}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`stay-tab-${stay.slug}`}
                    aria-selected={isActive}
                    aria-controls="stay-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(index)}
                    onKeyDown={onTabKey}
                    className="group text-left focus-visible:outline-none"
                  >
                    <span
                      className={`relative block aspect-[4/3] overflow-hidden rounded-xl ring-offset-2 ring-offset-[#f3ede1] transition-[box-shadow,opacity] duration-300 group-focus-visible:ring-2 group-focus-visible:ring-[#2e5126] ${
                        isActive ? "ring-2 ring-[#7d6224]" : "opacity-70 group-hover:opacity-100"
                      }`}
                    >
                      <Image src={stay.exterior} alt="" fill sizes="160px" className="object-cover" />
                    </span>
                    <span
                      className={`mt-2 block font-navigation text-[11px] font-bold uppercase tracking-[0.14em] transition-colors sm:text-[12px] ${
                        isActive ? "text-[#03321b]" : "text-[#03321b]/55 group-hover:text-[#03321b]"
                      }`}
                    >
                      {stay.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Info panel */}
          <div id="stay-panel" role="tabpanel" aria-labelledby={`stay-tab-${current.slug}`} className="lg:pt-2">
            <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.22em] text-[#7d6224]">{current.setting}</p>
            <h3 className="mt-3 font-display text-[clamp(2.25rem,3.2vw,3.25rem)] font-medium leading-[1] tracking-[-0.045em] text-[#17251e]">
              {current.name}
            </h3>

            {current.night ? (
              <p className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 border-y border-[#03321b]/12 py-4">
                <span className="font-navigation text-[12px] font-semibold uppercase tracking-[0.16em] text-[#3f4c45]">
                  <svg viewBox="0 0 24 24" aria-hidden="true" className="mr-1.5 inline-block h-[1.05em] w-[1.05em] -translate-y-px align-middle" fill="none"><circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.8" /><path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
                          <Tr t="Up to {0} guests" v={[String(current.night.sleeps)]} />
                </span>
                {SHOW_PRICES ? (
                  <span className="ml-auto text-right">
                    <span className="text-[12px] text-[#5f6a62]">from </span>
                    <span className="font-navigation text-[18px] font-semibold tabular-nums text-[#03321b]">{peso(current.night.pricePerNight)}</span>
                    <span className="text-[12px] text-[#5f6a62]"> per night</span>
                  </span>
                ) : null}
              </p>
            ) : null}

            <p className="mt-5 text-[17px] leading-8 text-[#3f4c45]">{current.description}</p>

            <ul className="mt-5 space-y-2.5">
              {current.highlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[15px] leading-6 text-[#34423a]">
                  <span aria-hidden="true" className="mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#7d6224]" />
                  {item}
                </li>
              ))}
            </ul>

            <Link
              href={villaHouseHref(current.slug)}
              className="mt-8 inline-flex items-center gap-2 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#2e5126] underline-offset-[6px] transition hover:gap-3 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2e5126]"
            >
              Ask about availability
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
