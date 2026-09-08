"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import Image from "next/image";
import { HOLE_PROFILES, metresToYards } from "@/lib/course-holes";

/**
 * Interactive na routing plan.
 *
 * TODO (para sa club): tantiya ang mga coordinate sa ibaba — inilagay sila
 * sa gitna ng bawat nakikitang fairway corridor sa masterplan, hindi galing
 * sa sinukat na drawing. Kapag dumating ang opisyal na numbered routing,
 * ang array na ito lang ang kailangang ayusin; walang ibang bahagi ng
 * component ang nakadepende sa mga halagang ito.
 *
 * Ang x at y ay porsiyento ng lapad at taas ng larawan, kaya nananatili
 * silang tama kahit anong sukat ng screen.
 */
const HOLE_POSITIONS: Record<number, { x: number; y: number }> = {
  1: { x: 30, y: 27 },
  2: { x: 41, y: 24 },
  3: { x: 50, y: 26 },
  4: { x: 63, y: 16 },
  5: { x: 73, y: 13 },
  6: { x: 81, y: 20 },
  7: { x: 74, y: 25 },
  8: { x: 64, y: 27 },
  9: { x: 55, y: 34 },
  10: { x: 26, y: 36 },
  11: { x: 24, y: 47 },
  12: { x: 34, y: 44 },
  13: { x: 44, y: 43 },
  14: { x: 37, y: 57 },
  15: { x: 31, y: 68 },
  16: { x: 48, y: 70 },
  17: { x: 63, y: 70 },
  18: { x: 75, y: 58 },
};

const HOLE_NUMBERS = Object.keys(HOLE_POSITIONS).map(Number);

/* Ang plano ay iginuhit nang north-up, ang karaniwan sa mga site plan. */
function Compass() {
  return (
    <div
      className="pointer-events-none absolute right-3 top-3 h-16 w-16 sm:right-5 sm:top-5 sm:h-20 sm:w-20"
      aria-hidden="true"
    >
      <svg viewBox="0 0 80 80" className="h-full w-full">
        <circle cx="40" cy="40" r="27" fill="#fbfaf6" fillOpacity="0.82" stroke="#173b2a" strokeOpacity="0.16" />
        {/* North needle, filled so it reads at a glance */}
        <path d="M40 16 L45 40 L40 35 L35 40 Z" fill="#174630" />
        <path d="M40 64 L45 40 L40 45 L35 40 Z" fill="#173b2a" fillOpacity="0.28" />
        <text x="40" y="13" textAnchor="middle" className="fill-[#174630] text-[11px] font-bold">N</text>
        <text x="40" y="76" textAnchor="middle" className="fill-[#98782f] text-[9px] font-bold">S</text>
        <text x="72" y="44" textAnchor="middle" className="fill-[#98782f] text-[9px] font-bold">E</text>
        <text x="8" y="44" textAnchor="middle" className="fill-[#98782f] text-[9px] font-bold">W</text>
      </svg>
    </div>
  );
}

export default function CourseRoutingMap() {
  const [active, setActive] = useState<number | null>(null);
  const hole = active === null ? null : HOLE_PROFILES[active];

  const clear = (number: number) => setActive((current) => (current === number ? null : current));

  return (
    <section id="course-map" className="relative isolate overflow-hidden border-t border-[#173b2a]/10 bg-[#fbfaf6] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto grid w-full max-w-[1500px] items-center gap-12 px-6 sm:px-10 lg:grid-cols-[0.72fr_1.28fr] lg:gap-10 lg:px-12 xl:gap-16">
        <div className="max-w-xl lg:pl-4">
          <p data-reveal="up" className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">
            The landscape plan
          </p>
          <h2
            data-reveal="up"
            style={{ "--reveal-delay": "90ms" } as CSSProperties}
            className="mt-4 text-4xl font-medium leading-[0.98] tracking-[-0.05em] text-[#14271d] sm:text-5xl"
          >
            Eighteen holes. One revised footprint.
          </h2>
          <div className="mt-7 space-y-5 text-sm leading-7 text-[#5d685f] sm:text-base sm:leading-8">
            <p data-reveal="up" style={{ "--reveal-delay": "180ms" } as CSSProperties}>
              The course follows the centre parcel shown in the latest planning revision. Its 18 fairway corridors
              stay within the documented boundary and form one continuous journey from the opening tee to the home green.
            </p>
            <p data-reveal="up" style={{ "--reveal-delay": "270ms" } as CSSProperties}>
              Hover any hole on the plan to lift its measured length out of the drawing. One main lake and one compact
              pond carry the water strategy without overpowering the land.
            </p>
          </div>

          <dl
            data-reveal="up"
            style={{ "--reveal-delay": "360ms" } as CSSProperties}
            className="mt-8 grid grid-cols-3 border-y border-[#173b2a]/12 py-5 font-navigation"
          >
            <div>
              <dt className="text-lg font-semibold text-[#174630]">18</dt>
              <dd className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98782f]">Holes</dd>
            </div>
            <div className="border-l border-[#173b2a]/12 pl-5">
              <dt className="text-lg font-semibold text-[#174630]">54.23</dt>
              <dd className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98782f]">Hectares</dd>
            </div>
            <div className="border-l border-[#173b2a]/12 pl-5">
              <dt className="text-lg font-semibold text-[#174630]">2</dt>
              <dd className="mt-1 text-[9px] font-bold uppercase tracking-[0.13em] text-[#98782f]">Water features</dd>
            </div>
          </dl>

          {/* Ang panel ay laging nasa daloy at may nakalaang taas, kaya walang
              tumatalon na layout habang pumipili ng hole ang bisita. */}
          <div className="mt-8 min-h-[132px] border-t border-[#173b2a]/12 pt-6">
            <div
              key={active ?? "idle"}
              className="motion-safe:animate-[hole-lift_420ms_cubic-bezier(0.22,1,0.36,1)_both]"
            >
              {hole === null ? (
                <p className="text-sm leading-7 text-[#8a938c]">
                  Select a hole on the plan to see its name, par, and measured length from both tees.
                </p>
              ) : (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
                    Hole {String(active).padStart(2, "0")} · Par {hole.par}
                  </p>
                  <h3 className="mt-2 text-2xl font-medium tracking-[-0.04em] text-[#174630]">{hole.name}</h3>
                  <div className="mt-4 flex flex-wrap gap-x-8 gap-y-2 font-navigation">
                    <p className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">
                      {hole.blueMetres} m
                      <span className="ml-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#98782f]">
                        Blue · {metresToYards(hole.blueMetres)} yds
                      </span>
                    </p>
                    <p className="text-base font-semibold tracking-[-0.02em] text-[#14271d]">
                      {hole.forwardMetres} m
                      <span className="ml-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#98782f]">
                        Forward · {metresToYards(hole.forwardMetres)} yds
                      </span>
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <figure data-reveal="scale" className="relative mx-auto aspect-square w-full max-w-[920px]">
          <Image
            src="/golf/course-masterplan-revision-2026-course-only-v4.png"
            alt="Revised course-only landscape plan showing the complete 18-hole CamSur Uptown golf course and its water features"
            fill
            sizes="(max-width: 1023px) calc(100vw - 3rem), 60vw"
            className="object-contain"
          />

          <Compass />

          {HOLE_NUMBERS.map((number) => {
            const position = HOLE_POSITIONS[number];
            const isActive = active === number;
            const profile = HOLE_PROFILES[number];

            return (
              <button
                key={number}
                type="button"
                onMouseEnter={() => setActive(number)}
                onFocus={() => setActive(number)}
                onClick={() => setActive(number)}
                onMouseLeave={() => clear(number)}
                onBlur={() => clear(number)}
                aria-label={`Hole ${number}, ${profile.name}, par ${profile.par}, ${profile.blueMetres} metres`}
                aria-pressed={isActive}
                className="absolute z-10 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full font-navigation text-[10px] font-bold outline-none transition-[transform,background-color,box-shadow] duration-300 sm:h-8 sm:w-8 sm:text-[11px]"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  // Ang lift ay isinasama sa centring translate: kung
                  // ihihiwalay ito, mawawala ang pagkasentro sa coordinate.
                  transform: `translate(-50%, -50%) ${isActive ? "translateY(-7px) scale(1.28)" : ""}`,
                  backgroundColor: isActive ? "#174630" : "rgba(251,250,246,0.9)",
                  color: isActive ? "#f3e6bd" : "#174630",
                  boxShadow: isActive
                    ? "0 10px 20px rgba(7,29,19,0.45), 0 0 0 2px #e7d18d"
                    : "0 2px 6px rgba(7,29,19,0.28), 0 0 0 1px rgba(23,70,48,0.35)",
                }}
              >
                {number}
              </button>
            );
          })}

          <figcaption className="sr-only">
            Revised planning visualization showing the documented 18-hole central course footprint. Hole markers are
            positioned approximately; final measured routing remains subject to the approved course drawings.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
