"use client";

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/i18n/LanguageProvider";
import { CLUBHOUSE_DAY } from "@/lib/clubhouse";

/**
 * "Your day at the club." — bersyong TATLONG PANTAY NA MOMENT (option B).
 * Kahalili ng scroll story sa `HomeClubhouseDay.tsx` (option C), na naiwan pa
 * rin; ang import sa `app/page.tsx` ang pumipili kung alin.
 *
 * Nakikita nang sabay ang buong araw (Umaga → Hapon → Gabi), walang pindot o
 * animation na kailangan. Pare-pareho ang basa ng bawat card: larawan → numero
 * at oras → title → isang linya → "View the space". Nasa ILALIM ng larawan ang
 * teksto, hindi nakapatong, kaya malinis ang larawan at madaling basahin.
 *
 * Isang manipis na "sky line" sa itaas ng mga card — kulay ng madaling-araw
 * hanggang dapit-hapon — ang nagdudugtong sa tatlo bilang iisang araw.
 *
 * Cellphone: swipeable na hanay na sumisilip ang kasunod na card (scroll-snap,
 * walang JavaScript). Buong card ang napipindot (stretched link sa `<h3>`),
 * papunta sa kuwarto mismo.
 */

const SPACE_FOR: Record<string, string> = {
  Morning: "practice-bays",
  Afternoon: "members-lounge",
  Evening: "rooftop",
};

export default function HomeClubhouseDayCards() {
  const { t } = useTranslation();

  return (
    <section id="clubhouse-day" className="relative isolate bg-[#f3ede1] pb-14 pt-14 text-[#03321b] sm:pb-16 sm:pt-20 lg:pb-24 lg:pt-28">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p data-reveal="up" className="font-navigation text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7d6224] sm:text-xs">
              {t("home.day.eyebrow")}
            </p>
            <h2
              data-reveal="up"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              className="mt-3 text-[clamp(2.25rem,4vw,4rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]"
            >
              {t("home.day.title")}
            </h2>
            <p data-reveal="up" className="mt-4 max-w-md text-[17px] leading-8 text-[#3f4c45]">
              {t("home.day.intro")}
            </p>
          </div>
          {/* Kaparehong gold na pindutan ng "Find your stay" (HomeVillaDelRey),
              para iisa ang anyo ng pangunahing aksyon sa magkasunod na section. */}
          <Link
            href="/clubhouse"
            data-reveal="up"
            className="inline-flex h-12 shrink-0 items-center justify-center self-start rounded-full bg-[#e2c77a] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b] shadow-[0_14px_34px_rgba(152,120,47,0.14)] transition hover:-translate-y-0.5 hover:bg-[#efd99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] sm:self-auto xl:text-[11px]"
          >
            {t("home.day.cta")}
          </Link>
        </div>

      </div>

      {/* Iisang lapad (1600px) ang heading at ang grid, para magkahanay ang
          kaliwang gilid ng title at ng larawan, at ang pindutan sa kanang gilid.
          Magkaiba sila dati (1280 at 1600) at lumulutang ang title. */}
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
        {/* Sky line: isang araw, mula madaling-araw hanggang dapit-hapon. Desktop
            lang — doon magkakatabi ang tatlo sa ilalim nito. */}
        <div aria-hidden="true" className="relative mt-12 hidden lg:block">
          <span className="block h-[3px] rounded-full bg-[linear-gradient(90deg,#e8d39b_0%,#d9a95a_50%,#0d2419_100%)] opacity-80" />
          <div className="absolute inset-x-0 top-1/2 grid -translate-y-1/2 grid-cols-3 gap-8">
            {CLUBHOUSE_DAY.map((part, index) => (
              <span
                key={part.time}
                className={`block h-3 w-3 rounded-full border-2 border-[#f3ede1] ${["bg-[#e8d39b]", "bg-[#d9a95a]", "bg-[#0d2419]"][index] ?? "bg-[#7d6224]"}`}
              />
            ))}
          </div>
        </div>

        <ol className="-mx-6 mt-10 flex snap-x snap-mandatory scroll-px-6 gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] lg:mx-0 lg:mt-8 lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8 lg:overflow-visible lg:px-0 lg:pb-0 [&::-webkit-scrollbar]:hidden">
          {CLUBHOUSE_DAY.map((part, index) => (
            <li
              key={part.time}
              data-reveal="up"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="group relative w-[82%] shrink-0 snap-start sm:w-[60%] lg:w-auto"
            >
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] bg-[#03321b] shadow-[0_24px_60px_-36px_rgba(3,50,27,0.55)]">
                <Image
                  src={part.image}
                  alt={`${part.title} at the CamSur Uptown clubhouse`}
                  fill
                  sizes="(min-width: 1600px) 500px, (min-width: 1024px) 32vw, 82vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>

              <p className="mt-6 flex items-baseline gap-3">
                <span aria-hidden="true" className="font-display text-[2.75rem] font-light leading-none tracking-[-0.04em] text-[#7d6224]/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-navigation text-[11px] font-bold uppercase tracking-[0.22em] text-[#7d6224]">{part.time}</span>
              </p>
              <h3 className="mt-2 font-display text-[clamp(1.75rem,2.2vw,2.25rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#17251e]">
                {/* Stretched link: ang `after` ang tumatakip sa buong card. */}
                <Link
                  href={`/clubhouse/${SPACE_FOR[part.time] ?? ""}`}
                  className="after:absolute after:inset-0 after:rounded-[1.4rem] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[#2e5126]"
                >
                  {part.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-sm text-[15px] leading-7 text-[#3f4c45]">{part.detail}</p>
              <span
                aria-hidden="true"
                className="mt-5 inline-flex items-center gap-2 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#2e5126] transition-all group-hover:gap-3"
              >
                View the space
                <span>→</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
