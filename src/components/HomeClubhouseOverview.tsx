import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { CLUBHOUSE_FACTS, CLUBHOUSE_SPACES } from "@/lib/clubhouse";

const FEATURED_SPACE_IDS = new Set(["the-drum", "members-lounge", "rooftop"]);
const FEATURED_SPACES = CLUBHOUSE_SPACES.filter((space) => FEATURED_SPACE_IDS.has(space.id));

// The three headline numbers live inside the green panel now, not in a thin
// band of their own. Square metres carries the panel's footer line instead.
const PANEL_FACTS = CLUBHOUSE_FACTS.filter((fact) =>
  ["Levels + rooftop", "Main areas", "Member lockers"].includes(fact.label),
);
const AREA_FACT = CLUBHOUSE_FACTS.find((fact) => fact.label === "Square metres");

/** Stagger helper — reads back out in CSS as `transition-delay`. */
const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

function ArrowIcon({ className = "h-3.5 w-3.5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function HomeClubhouseOverview() {
  return (
    <section id="home-clubhouse" className="overflow-hidden bg-[#f7f5ee] py-16 text-[#14271d] sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
        {/* ── Header ─────────────────────────────────────────────────── */}
        <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-16">
          <div data-reveal="up">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[#c9a54e]" aria-hidden="true" />
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f] xl:text-[11px]">
                The estate
              </p>
            </div>
            <h2
              className="mt-4 max-w-2xl text-[clamp(2.7rem,5vw,5rem)] font-medium leading-[0.92] tracking-[-0.055em]"
              style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
            >
              The centre of club life.
            </h2>
          </div>

          <div data-reveal="up" style={delay(90)} className="lg:pb-3">
            <p className="max-w-xl text-sm leading-7 text-[#5d685f] sm:text-base sm:leading-8">
              Arrive, check in, warm up, and relax after your round—all in one place. The clubhouse brings together the golf shop, locker rooms, practice bays, lounges, and rooftop spaces.
            </p>
          </div>
        </div>

        <div data-reveal="up" style={delay(140)} className="mt-9 h-px w-full bg-gradient-to-r from-[#1f3f2e]/18 via-[#c9a54e]/45 to-transparent sm:mt-11" aria-hidden="true" />

        {/* ── Bento: cinematic aerial + the estate in numbers ─────────── */}
        <div className="mt-8 grid gap-4 lg:grid-cols-12">
          <Link
            href="/clubhouse"
            data-reveal="up"
            className="group relative block aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-[#1f3f2e] text-white sm:aspect-[16/9] lg:col-span-8 lg:aspect-auto lg:min-h-[560px]"
          >
            <Image
              src="/clubhouse/concept/aerial-heart-of-the-course.jpg"
              alt="Aerial concept view of the CamSur Uptown clubhouse beside the golf course"
              fill
              sizes="(max-width: 1023px) calc(100vw - 3rem), 760px"
              className="object-cover transition duration-700 group-hover:scale-[1.03]"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-[#06170f]/80 via-[#06170f]/10 to-black/10" aria-hidden="true" />
            <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-5 p-5 sm:p-7 lg:p-8">
              <span>
                <span className="block font-navigation text-[9px] font-bold uppercase tracking-[0.2em] text-[#e7d18d] sm:text-[10px]">
                  Clubhouse concept
                </span>
                <span
                  className="mt-2.5 block max-w-md text-2xl font-medium leading-[1.05] sm:text-3xl lg:text-[2.35rem]"
                  style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                >
                  Designed around arrival, play, and time together.
                </span>
              </span>
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/35 transition-colors duration-300 group-hover:border-[#e7d18d] group-hover:bg-[#e7d18d] group-hover:text-[#14271d] sm:flex">
                <ArrowIcon className="h-4 w-4" />
              </span>
            </span>
          </Link>

          {/* The estate, in numbers. Horizontal on mobile, stacked ledger on
              desktop — mirrors the featured cards' responsive flip. */}
          <div
            data-reveal="up"
            style={delay(120)}
            className="relative flex flex-col justify-between overflow-hidden rounded-[1.5rem] bg-[#1f3f2e] p-6 text-white sm:p-7 lg:col-span-4 lg:p-8"
          >
            <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c9a54e]/55 to-transparent" aria-hidden="true" />
            <div className="flex items-center justify-between">
              <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.22em] text-[#e7d18d] sm:text-[10px]">
                In numbers
              </p>
              <p className="font-navigation text-[9px] font-medium uppercase tracking-[0.18em] text-white/45">
                Concept
              </p>
            </div>

            <dl className="mt-7 grid grid-cols-3 gap-px lg:mt-0 lg:grid-cols-1">
              {PANEL_FACTS.map((fact, index) => (
                <div
                  key={fact.label}
                  className={`flex flex-col lg:flex-row lg:items-baseline lg:justify-between lg:gap-4 lg:py-5 ${
                    index > 0
                      ? "border-l border-white/12 pl-4 lg:border-l-0 lg:border-t lg:pl-0"
                      : "lg:pt-0"
                  }`}
                >
                  <dt
                    className="text-3xl font-medium leading-none text-[#e7d18d] sm:text-4xl lg:text-[2.6rem]"
                    style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                  >
                    {fact.value}
                  </dt>
                  <dd className="mt-2 font-navigation text-[8px] font-semibold uppercase leading-4 tracking-[0.12em] text-white/55 sm:text-[9px] lg:mt-0 lg:text-right lg:text-[10px]">
                    {fact.label}
                  </dd>
                </div>
              ))}
            </dl>

            {AREA_FACT ? (
              <p className="mt-7 border-t border-white/12 pt-4 font-navigation text-[9px] font-medium uppercase tracking-[0.14em] text-white/50 sm:text-[10px] lg:mt-0">
                {AREA_FACT.value} m² across three floors and a roof garden
              </p>
            ) : null}
          </div>
        </div>

        {/* ── Featured spaces ────────────────────────────────────────── */}
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {FEATURED_SPACES.map((space, index) => (
            <Link
              key={space.id}
              href={`/clubhouse/${space.id}`}
              data-reveal="up"
              style={delay(index * 90)}
              className="group relative aspect-[16/11] overflow-hidden rounded-[1.25rem] bg-[#1f3f2e] text-white sm:aspect-[4/5]"
            >
              <Image
                src={space.image}
                alt={space.imageAlt}
                fill
                sizes="(max-width: 639px) calc(100vw - 3rem), (max-width: 1023px) 30vw, 380px"
                className="object-cover transition duration-700 group-hover:scale-[1.05]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-[#06170f]/90 via-[#06170f]/20 to-transparent" aria-hidden="true" />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-5 sm:p-5">
                <span>
                  <span className="block font-navigation text-[8px] font-bold uppercase tracking-[0.18em] text-[#e7d18d] sm:text-[9px]">
                    {space.floor}
                  </span>
                  <span
                    className="mt-1.5 block text-xl font-medium leading-tight sm:text-2xl"
                    style={{ fontFamily: "var(--font-cormorant-garamond), Georgia, serif" }}
                  >
                    {space.name}
                  </span>
                </span>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 text-[#e7d18d] transition-all duration-300 group-hover:border-[#e7d18d] group-hover:bg-[#e7d18d] group-hover:text-[#14271d]" aria-hidden="true">
                  <ArrowIcon className="h-3.5 w-3.5" />
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
