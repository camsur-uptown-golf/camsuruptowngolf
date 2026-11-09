"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageProvider";
import { CLUBHOUSE_DAY } from "@/lib/clubhouse";

/**
 * "Your day at the club." ng homepage — isang scroll story ng tatlong oras ng
 * araw (Umaga → Hapon → Gabi). Iisa ang pinagmulan: `CLUBHOUSE_DAY` sa
 * lib/clubhouse.ts.
 *
 * DESKTOP (lg pataas): dalawang hanay. Sa kaliwa ang tatlong moment, bawat isa
 * ~52svh, na dinadaanan habang nag-i-scroll; sa kanan ang malaking larawan na
 * nakadikit (sticky) at dahan-dahang nagpapalit (crossfade) sa moment na nasa
 * gitna ng screen. Pinalitan nito ang dating expanding panels: hindi tugma ang
 * timeline sa lapad ng mga card, at patagilid na label lang ang nakikita sa
 * dalawa sa tatlong moment.
 *
 * CELLPHONE: tatlong simpleng card na magkakasunod (larawan, tapos teksto) —
 * walang sticky, dahil mabigat iyon at masikip sa makitid na screen.
 *
 * Ang aktibong moment ay galing sa IntersectionObserver (ang tumatawid sa
 * gitnang linya ng viewport), hindi sa scroll listener. Walang kusang
 * paglipat; ang scroll ng bisita ang nagtutulak. Sa reduced motion ay
 * crossfade na lang, walang zoom.
 */

/* Ang kuwarto ng bawat moment, para sa "View the space" (`/clubhouse/<id>`). */
const SPACE_FOR: Record<string, string> = {
  Morning: "practice-bays",
  Afternoon: "members-lounge",
  Evening: "rooftop",
};

/* KULAY NG ORAS NG ARAW (desktop lang, kung saan may aktibong moment):
   cream sa umaga, mainit na buhangin sa hapon, madilim na emerald sa gabi —
   at liliwanag ang teksto sa gabi. Nasa `--day-bg` ang kulay; naka-
   `@property` ito sa globals.css (`.day-story`) kaya dahan-dahan ang palit,
   pati ang fade sa ibaba papunta sa cream ng susunod na section. */
const DAY_BG = ["#f3ede1", "#ecdfc6", "#0d2419"] as const;

export default function HomeClubhouseDay() {
  const { t } = useTranslation();
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    for (const el of stepRefs.current) if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* Gabi ang huling moment. Sa cellphone ay hindi kailanman nagbabago ang
     `active` (nakatago ang mga hakbang ng desktop), kaya laging araw doon. */
  const night = active === CLUBHOUSE_DAY.length - 1;
  const c = (day: string, dark: string) => (night ? dark : day);

  return (
    <section
      id="clubhouse-day"
      className="day-story relative isolate bg-[#f3ede1] pb-10 pt-14 text-[#03321b] sm:pb-12 sm:pt-20 lg:pb-28 lg:pt-28"
      style={{ "--day-bg": DAY_BG[active] ?? DAY_BG[0] } as CSSProperties}
    >
      {/* Fade sa ibaba: mula sa kulay ng kasalukuyang oras papunta sa cream ng
          Villa Del Rey, para walang matalas na guhit sa gabi. */}
      <div aria-hidden="true" className="day-story-fade pointer-events-none absolute inset-x-0 bottom-0 hidden h-28 lg:block" />
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p
              data-reveal="up"
              className={`font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors duration-700 sm:text-xs ${c("text-[#7d6224]", "text-[#e2c77a]")}`}
            >
              {t("home.day.eyebrow")}
            </p>
            <h2
              data-reveal="up"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              className={`mt-3 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.045em] transition-colors duration-700 ${c("text-[#17251e]", "text-[#f5efe2]")}`}
            >
              {t("home.day.title")}
            </h2>
            <p data-reveal="up" className={`mt-4 max-w-md text-[17px] leading-8 transition-colors duration-700 ${c("text-[#3f4c45]", "text-white/75")}`}>
              {t("home.day.intro")}
            </p>
          </div>
          {/* Outline, hindi gold: ang mga larawan ang dapat manguna rito. */}
          <Link
            href="/clubhouse"
            data-reveal="up"
            className={`inline-flex h-12 shrink-0 items-center self-start rounded-full border px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] transition hover:border-[#2e5126] hover:bg-[#2e5126] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2e5126] sm:self-auto ${c("border-[#2e5126]/35 text-[#2e5126]", "border-white/30 text-white")}`}
          >
            {t("home.day.cta")}
          </Link>
        </div>

        {/* ---------- Cellphone: mga card ---------- */}
        <ol className="mt-10 space-y-10 lg:hidden">
          {CLUBHOUSE_DAY.map((part, index) => (
            <li key={part.time} data-reveal="up">
              <div className="relative aspect-[4/3] overflow-hidden rounded-[1.4rem] bg-[#03321b]">
                <Image
                  src={part.image}
                  alt={`${part.title} at the CamSur Uptown clubhouse`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
              <p className="mt-5 flex items-baseline gap-3">
                <span aria-hidden="true" className="font-display text-[2.75rem] font-light leading-none tracking-[-0.04em] text-[#7d6224]/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-navigation text-[11px] font-bold uppercase tracking-[0.22em] text-[#7d6224]">{part.time}</span>
              </p>
              <h3 className="mt-2 font-display text-[1.9rem] font-medium leading-[1.02] tracking-[-0.04em] text-[#17251e]">
                {part.title}
              </h3>
              <p className="mt-3 text-[15px] leading-7 text-[#3f4c45]">{part.detail}</p>
            </li>
          ))}
        </ol>

        {/* ---------- Desktop: scroll story ---------- */}
        <div className="mt-10 hidden lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-8 xl:gap-10">
          {/* Kaliwa: ang tatlong moment, may manipis na progress line sa gilid. */}
          <div className="relative">
            <span aria-hidden="true" className={`absolute bottom-[26svh] left-0 top-[26svh] w-px transition-colors duration-700 ${c("bg-[#03321b]/12", "bg-white/15")}`} />
            <span
              aria-hidden="true"
              className={`absolute left-0 top-[26svh] w-px origin-top transition-[transform,background-color] duration-700 ease-out motion-reduce:transition-none ${c("bg-[#7d6224]", "bg-[#e2c77a]")}`}
              style={{
                bottom: "26svh",
                transform: `scaleY(${CLUBHOUSE_DAY.length > 1 ? active / (CLUBHOUSE_DAY.length - 1) : 1})`,
              }}
            />
            {CLUBHOUSE_DAY.map((part, index) => {
              const isActive = index === active;
              const isPast = index < active;
              return (
                <div
                  key={part.time}
                  ref={(el) => {
                    stepRefs.current[index] = el;
                  }}
                  data-index={index}
                  className="relative flex min-h-[52svh] items-center pl-10 xl:pl-12"
                >
                  {/* Tuldok sa timeline, nasa gitna ng moment — kapareho ng dulo
                      ng gold na linya, kaya nagtatagpo ang dalawa. */}
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 transition-colors duration-500 ${
                      isActive || isPast
                        ? c("border-[#7d6224] bg-[#7d6224]", "border-[#e2c77a] bg-[#e2c77a]")
                        : c("border-[#03321b]/25 bg-[#f3ede1]", "border-white/30 bg-[#0d2419]")
                    } ${isActive ? c("shadow-[0_0_0_6px_rgba(125,98,36,0.14)]", "shadow-[0_0_0_6px_rgba(226,199,122,0.18)]") : ""}`}
                  />
                  {/* HIERARCHY: numero (dekorasyon, mahina) → oras (label) →
                      title (pinakamalakas sa hanay) → detalye. Ang hindi aktibo
                      ay maliit at kupas pero nababasa — para kita ang kasunod —
                      at napipindot para tumalon doon. */}
                  {/* `div` na napipindot, hindi `button`: kailangang manatiling
                      `<h3>` ang title para sa screen reader, at bawal ang heading
                      sa loob ng button. Pang-mouse lang ang pagtalon; ang scroll
                      ang pangunahing daan, kaya walang nawawala sa keyboard. */}
                  <div
                    onClick={() => stepRefs.current[index]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                    aria-current={isActive ? "step" : undefined}
                    className={`w-full cursor-pointer text-left transition-opacity duration-500 ease-out motion-reduce:transition-none ${
                      isActive ? "opacity-100" : "opacity-45 hover:opacity-80"
                    }`}
                  >
                    <span className="flex items-baseline gap-4">
                      <span
                        aria-hidden="true"
                        className={`font-display font-light leading-none tracking-[-0.04em] transition-[font-size,color] duration-500 motion-reduce:transition-none ${
                          isActive ? `text-[4.5rem] ${c("text-[#7d6224]/45", "text-[#e2c77a]/55")}` : `text-[2.5rem] ${c("text-[#03321b]/30", "text-white/30")}`
                        }`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className={`font-navigation text-[12px] font-bold uppercase tracking-[0.24em] transition-colors duration-700 ${c("text-[#7d6224]", "text-[#e2c77a]")}`}>
                        {part.time}
                      </span>
                    </span>
                    <h3
                      className={`mt-2 font-display font-medium leading-[1] tracking-[-0.045em] transition-[font-size,color] duration-500 motion-reduce:transition-none ${c("text-[#17251e]", "text-[#f5efe2]")} ${
                        isActive ? "text-[clamp(2.4rem,3.4vw,3.4rem)]" : "text-[1.75rem]"
                      }`}
                    >
                      {part.title}
                    </h3>
                    {/* Bukas lang ang detalye sa aktibong moment (grid-rows
                        0fr → 1fr), kaya mas siksik ang hanay. */}
                    <span
                      className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                        isActive ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <span className="overflow-hidden">
                        <span className={`block max-w-md pt-5 text-[17px] leading-8 transition-colors duration-700 ${c("text-[#3f4c45]", "text-white/75")}`}>{part.detail}</span>
                        {/* Pinupunan ang bakanteng espasyo sa ilalim ng moment ng
                            isang tunay na aksyon. Hindi napipindot kapag sarado. */}
                        <Link
                          href={`/clubhouse/${SPACE_FOR[part.time] ?? ""}`}
                          tabIndex={isActive ? 0 : -1}
                          onClick={(event) => event.stopPropagation()}
                          className={`mt-6 inline-flex items-center gap-2 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] underline-offset-[6px] transition hover:gap-3 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 ${c("text-[#2e5126] focus-visible:outline-[#2e5126]", "text-[#efd99b] focus-visible:outline-[#efd99b]")}`}
                        >
                          View the space
                          <span aria-hidden="true">→</span>
                        </Link>
                      </span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Kanan: ang nakadikit na larawan. Nakapatong ang tatlo; opacity
              lang ang nagbabago, kaya walang bagong download habang nag-i-scroll. */}
          <div>
            {/* HANGGANG GILID NG SCREEN SA KANAN (full-bleed). Nasa `.day-image-bleed`
                (globals.css) ang negatibong margin — ang layo ng hanay sa gilid
                ng viewport.
                Bilog lang ang kaliwang kanto. Ligtas sa scrollbar: `overflow-x:
                clip` ang body. */}
            <div className="sticky top-28 h-[calc(100svh-10rem)] min-h-[460px] overflow-hidden rounded-l-[1.8rem] bg-[#03321b] shadow-[0_30px_80px_-40px_rgba(3,50,27,0.55)] day-image-bleed">
              {CLUBHOUSE_DAY.map((part, index) => {
                const isActive = index === active;
                return (
                  <Image
                    key={part.time}
                    src={part.image}
                    alt={isActive ? `${part.title} at the CamSur Uptown clubhouse` : ""}
                    aria-hidden={!isActive}
                    fill
                    sizes="(min-width: 1280px) 720px, 58vw"
                    className={`object-cover transition-[opacity,transform] duration-[900ms] ease-out motion-reduce:transform-none motion-reduce:transition-opacity ${
                      isActive ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
                    }`}
                  />
                );
              })}
              {/* Chip sa itaas-kaliwa: ikinakabit ang larawan sa moment sa kaliwa
                  ("01 / 03 · Morning"). Mga indicator sa ibaba. */}
              <div className="pointer-events-none absolute left-6 top-6 rounded-full border border-white/20 bg-black/35 px-4 py-2 font-navigation text-[11px] font-bold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                <span className="text-[#efd99b]">{String(active + 1).padStart(2, "0")}</span>
                <span className="text-white/55"> / {String(CLUBHOUSE_DAY.length).padStart(2, "0")} · </span>
                {CLUBHOUSE_DAY[active].time}
              </div>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent,rgba(5,22,15,0.5))] p-7">
                <div className="flex gap-2" aria-hidden="true">
                  {CLUBHOUSE_DAY.map((part, index) => (
                    <span
                      key={part.time}
                      className={`h-1 rounded-full transition-all duration-500 ${index === active ? "w-10 bg-[#efd99b]" : "w-4 bg-white/45"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
