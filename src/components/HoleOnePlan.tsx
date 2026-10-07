"use client";

import Image from "next/image";
import { useState } from "react";

const TEES = [
  { name: "Black", color: "#1c2520", x: 1448, y: 99 },
  { name: "Blue", color: "#285cce", x: 1322, y: 268 },
  { name: "White", color: "#ffffff", x: 1370, y: 198 },
  { name: "Yellow", color: "#f2d719", x: 1402, y: 166 },
  { name: "Red", color: "#d6322c", x: 1234, y: 376 },
] as const;

const HOLE_ONE_AREA = "M 1446 46 C 1498 78 1480 164 1426 241 C 1382 305 1322 376 1256 460 C 1189 553 1094 660 965 727 C 787 812 493 824 181 813 C 98 811 57 774 63 693 C 70 633 113 608 190 607 C 345 618 513 627 645 595 C 866 540 1020 448 1148 320 C 1270 196 1371 70 1446 46 Z";

export default function HoleOnePlan() {
  const [selectedTee, setSelectedTee] = useState<(typeof TEES)[number]["name"]>("Blue");

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.2em] text-[#98782f]">Hole plan · 01 / 18</p>
          <h2 className="mt-2 font-display text-[clamp(3.5rem,7vw,6.5rem)] leading-none tracking-[-0.06em] text-[#14271d]">No. 1</h2>
          <p className="mt-3 text-lg font-semibold text-[#265136]">Opening Fairway</p>
        </div>
        <p className="max-w-xl text-sm leading-7 text-[#667169] sm:text-base">
          Naka-highlight ang Hole 1 mula sa tees sa kanang itaas hanggang sa green sa kaliwa. Nasa background lang muna ang katabing holes para madaling sundan ang fairway.
        </p>
      </div>

      <figure className="overflow-hidden rounded-[1.25rem] border border-[#1f3f2e]/15 bg-[#d9e5bf] shadow-[0_24px_65px_rgba(20,45,32,0.12)] sm:rounded-[1.75rem]">
        <div className="relative aspect-[3/2] w-full">
          <Image
            src="/golf/course-01-detailed-plan-v1.png"
            alt="Top-down illustrated plan of Hole 1, with the lake above its curved fairway, the green at left and tee complexes at upper right"
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
          <svg
            viewBox="0 0 1536 1024"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label={`Highlighted Hole 1 from the ${selectedTee.toLowerCase()} tee at upper right to the green at lower left`}
          >
            <defs>
              <mask id="hole-one-focus-mask">
                <rect width="1536" height="1024" fill="white" />
                <path d={HOLE_ONE_AREA} fill="black" />
              </mask>
            </defs>
            <rect width="1536" height="1024" fill="#10291e" opacity="0.46" mask="url(#hole-one-focus-mask)" />
            <path d={HOLE_ONE_AREA} fill="#f2eeb8" opacity="0.07" />
            <g aria-hidden="true">
              <circle cx="824" cy="648" r="27" fill="#1f3f2e" opacity="0.92" />
              <text x="824" y="657" textAnchor="middle" fill="#ffffff" fontSize="27" fontWeight="700">1</text>
            </g>
            {TEES.map((tee) => (
              <g key={tee.name} aria-label={`Hole 1 ${tee.name.toLowerCase()} tee`}>
                <circle
                  cx={tee.x}
                  cy={tee.y}
                  r={tee.name === selectedTee ? 27 : 19}
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth={tee.name === selectedTee ? 8 : 5}
                  opacity="0.95"
                />
                <circle
                  cx={tee.x}
                  cy={tee.y}
                  r={tee.name === selectedTee ? 21 : 16}
                  fill={tee.color}
                  stroke="#1f3f2e"
                  strokeWidth="3"
                />
              </g>
            ))}
          </svg>
          <span className="absolute bottom-3 left-3 rounded-full bg-[#14271d]/90 px-3 py-1.5 font-navigation text-[9px] font-bold uppercase tracking-[0.12em] text-white shadow-sm sm:bottom-5 sm:left-5 sm:text-[10px]">
            Hole 1 · Tee colors ↗ · Green ←
          </span>
        </div>
        <figcaption className="border-t border-[#1f3f2e]/12 bg-[#fffefa] px-5 py-4 text-xs leading-5 text-[#536058] sm:px-7 sm:text-sm">
          Hole 1 is in focus; neighboring holes are muted for clarity. Tee locations and distances remain subject to survey and approval.
        </figcaption>
      </figure>

      <div className="mt-7 grid gap-7 rounded-[1.25rem] border border-[#1f3f2e]/12 bg-white p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_minmax(260px,0.42fr)] lg:items-center">
        <div>
          <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">Select tees</p>
          <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Hole 1 tee color">
            {TEES.map((tee) => (
              <button
                key={tee.name}
                type="button"
                aria-pressed={tee.name === selectedTee}
                onClick={() => setSelectedTee(tee.name)}
                className={`inline-flex min-h-11 items-center gap-2 rounded-full border px-4 font-navigation text-[11px] font-bold uppercase tracking-[0.1em] transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#285c91] ${tee.name === selectedTee ? "border-[#1f3f2e] bg-[#e9efe6] text-[#14271d]" : "border-[#1f3f2e]/15 bg-white text-[#536058] hover:border-[#1f3f2e]/50"}`}
              >
                <span className="h-3.5 w-3.5 rounded-full border border-[#1f3f2e]/40" style={{ backgroundColor: tee.color }} aria-hidden="true" />
                {tee.name}
              </button>
            ))}
          </div>
          <p className="mt-4 text-xs leading-5 text-[#667169]">Piliin ang kulay upang i-highlight ang tee marker nito sa mapa.</p>
        </div>
        <div className="border-t border-[#1f3f2e]/15 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-[#98782f]">{selectedTee} tee · Par 4</p>
          <p className="mt-2 font-display text-3xl text-[#14271d]">
            {selectedTee === "Blue" ? "411 m · 450 yd" : "Distance pending"}
          </p>
          <p className="mt-2 text-xs leading-5 text-[#667169]">
            {selectedTee === "Blue" ? "Existing concept distance; subject to final measurement." : "No confirmed yardage is available for this tee yet."}
          </p>
        </div>
      </div>
    </div>
  );
}
