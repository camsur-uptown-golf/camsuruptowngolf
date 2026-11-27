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
 * animation na kailangan. Pare-pareho ang basa ng bawat card: larawan → oras
 * → title → isang linya → "View the space". Nasa ILALIM ng larawan ang
 * teksto, hindi nakapatong, kaya malinis ang larawan at madaling basahin.
 *
 * Isang manipis na "sky line" sa itaas ng mga card — kulay ng madaling-araw
 * hanggang dapit-hapon — ang nagdudugtong sa tatlo bilang iisang araw.
 *
 * Cellphone/tablet: magkakasunod pababa ang tatlong card, at nakagitna ang
 * heading at ang teksto ng bawat card. Buong card ang napipindot (stretched link sa `<h3>`),
 * papunta sa kuwarto mismo.
 */

const SPACE_FOR: Record<string, string> = {
  Morning: "practice-bays",
  Afternoon: "members-lounge",
  Evening: "rooftop",
};

function DayIcon({ time }: { time: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      {time === "Morning" ? (
        <>
          <path d="M3 17h18M5 21h14M7 17a5 5 0 0 1 10 0M12 3v3M4.2 9.2l2.1 2.1M19.8 9.2l-2.1 2.1" />
          <path d="m9.5 5.5 2.5-2.5 2.5 2.5" />
        </>
      ) : time === "Afternoon" ? (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </>
      ) : (
        <>
          <path d="M20.5 14A8.5 8.5 0 0 1 10 3.5 8.5 8.5 0 1 0 20.5 14Z" />
          <path d="M18 2v4M16 4h4" />
        </>
      )}
    </svg>
  );
}

export default function HomeClubhouseDayCards() {
  const { t } = useTranslation();

  return (
    <section id="clubhouse-day" className="relative isolate bg-[#f3ede1] pb-10 pt-12 text-[#03321b] sm:pb-12 sm:pt-14 lg:pb-14 lg:pt-16">
      <div className="mx-auto max-w-[1600px] px-6 lg:px-8">
        <div className="flex flex-col items-center gap-5 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div>
            <p data-reveal="up" className="font-navigation text-xs font-semibold uppercase tracking-[0.24em] text-[#7d6224] sm:text-sm">
              {t("home.day.eyebrow")}
            </p>
            <h2
              data-reveal="up"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
              className="mt-3 text-[clamp(2.5rem,4.6vw,4.625rem)] font-medium leading-[0.98] tracking-[-0.045em] text-[#17251e]"
            >
              {t("home.day.title")}
            </h2>
            <p data-reveal="up" className="mx-auto mt-4 max-w-md text-[17px] font-normal leading-8 text-[#3f4c45] lg:mx-0">
              {t("home.day.intro")}
            </p>
          </div>
          {/* Kaparehong gold na pindutan ng "Find your stay" (HomeVillaDelRey),
              para iisa ang anyo ng pangunahing aksyon sa magkasunod na section. */}
          <Link
            href="/clubhouse"
            data-reveal="up"
            className="inline-flex h-12 shrink-0 items-center justify-center self-center rounded-full bg-[#e2c77a] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b] shadow-[0_14px_34px_rgba(152,120,47,0.14)] transition hover:-translate-y-0.5 hover:bg-[#efd99b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#98782f] lg:self-auto xl:text-[11px]"
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
                className={`flex h-11 w-11 items-center justify-center rounded-full border border-current bg-[#f3ede1] ring-4 ring-[#f3ede1] ${["text-[#98782f]", "text-[#a87528]", "text-[#0d2419]"][index] ?? "text-[#7d6224]"}`}
              >
                <DayIcon time={part.time} />
              </span>
            ))}
          </div>
        </div>

        <ol className="mt-10 flex flex-col gap-12 lg:mt-8 lg:grid lg:grid-cols-3 lg:gap-6 xl:gap-8">
          {CLUBHOUSE_DAY.map((part, index) => (
            <li
              key={part.time}
              data-reveal="up"
              style={{ "--reveal-delay": `${index * 90}ms` } as CSSProperties}
              className="group relative mx-auto w-full max-w-md text-center lg:mx-0 lg:max-w-none lg:text-left"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-[#03321b] shadow-[0_24px_60px_-36px_rgba(3,50,27,0.55)]">
                <Image
                  src={part.image}
                  alt={`${part.title} at the CamSur Uptown clubhouse`}
                  fill
                  sizes="(min-width: 1600px) 500px, (min-width: 1024px) 32vw, (min-width: 480px) 448px, 100vw"
                  className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
              </div>

              <p className="mt-6 font-navigation text-[11px] font-bold uppercase tracking-[0.22em] text-[#7d6224]">{part.time}</p>
              <h3 className="mt-2 font-display text-[clamp(1.75rem,2.2vw,2.25rem)] font-medium leading-[1.02] tracking-[-0.04em] text-[#17251e]">
                {/* Stretched link: ang `after` ang tumatakip sa buong card. */}
                <Link
                  href={`/clubhouse/${SPACE_FOR[part.time] ?? ""}`}
                  className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-[#2e5126]"
                >
                  {part.title}
                </Link>
              </h3>
              <p className="mx-auto mt-3 max-w-sm text-[15px] font-normal leading-7 text-[#3f4c45] lg:mx-0">{part.detail}</p>
              <span
                aria-hidden="true"
                className="mt-5 inline-flex items-center gap-2 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#2e5126] transition-all group-hover:gap-3"
              >
                View the space
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
