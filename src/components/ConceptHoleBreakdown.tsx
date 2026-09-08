"use client";

import Image from "next/image";
import { useState } from "react";
import { HOLE_PROFILES, metresToYards } from "@/lib/course-holes";

type HoleMarker = {
  hole: number;
  left: string;
  top: string;
  startLeft: string;
  startTop: string;
};


const ROUTE_PATHS = [
  "M150 570 C95 500 105 435 155 380 C205 325 210 245 150 185 C105 140 112 88 155 48",
  "M145 570 C210 505 195 445 138 392 C82 340 95 270 165 225 C220 190 215 105 155 48",
  "M155 570 C115 520 92 460 130 410 C180 345 220 315 185 245 C155 185 95 140 145 48",
  "M150 570 C205 520 218 455 170 400 C120 342 90 290 130 230 C175 164 215 120 155 48",
];

const TREE_POINTS = [
  [64, 510], [88, 450], [58, 385], [92, 320], [65, 255], [95, 190], [78, 120],
  [236, 500], [213, 438], [240, 370], [210, 302], [238, 238], [208, 168], [230, 102],
] as const;

function HoleRouteDiagram({ hole }: { hole: number }) {
  const route = ROUTE_PATHS[(hole - 1) % ROUTE_PATHS.length];
  const shift = ((hole % 3) - 1) * 7;
  const sketchFilterId = `course-sketch-${hole}`;
  const paperFilterId = `paper-grain-${hole}`;

  return (
    <figure className="rounded-[2rem] border border-[#174630]/10 bg-[#fbfaf5] p-5 sm:p-8">
      <svg viewBox="0 0 300 620" className="mx-auto h-auto max-h-[620px] w-full max-w-[330px]" role="img" aria-label={`Top-down aerial sketch for Hole ${hole}`}>
        <defs>
          <filter id={sketchFilterId} x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="2" seed={hole} result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
          </filter>
          <filter id={paperFilterId} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" seed={hole + 20} result="grain" />
            <feColorMatrix in="grain" type="saturate" values="0" result="mono" />
            <feBlend in="SourceGraphic" in2="mono" mode="multiply" />
          </filter>
        </defs>
        <rect width="300" height="620" rx="24" fill="#fbfaf5" />
        <rect width="300" height="620" rx="24" fill="#efe9d8" opacity="0.12" filter={`url(#${paperFilterId})`} />
        <g filter={`url(#${sketchFilterId})`}>
          {TREE_POINTS.map(([x, y], index) => (
            <g key={`${x}-${y}`} transform={`translate(${x + (index % 2 ? shift : -shift)} ${y})`} opacity="0.82">
              <circle r="15" fill="#4d6d52" opacity="0.82" />
              <circle cx="-9" cy="7" r="10" fill="#7d9770" opacity="0.78" />
              <circle cx="9" cy="8" r="9" fill="#385b43" opacity="0.8" />
              <path d="M-13 3 Q0-15 14 4 M-10 11 Q0-5 12 12" fill="none" stroke="#244b36" strokeWidth="1.2" opacity="0.45" />
            </g>
          ))}
          <path d={route} fill="none" stroke="#dce4c5" strokeWidth="96" strokeLinecap="round" strokeLinejoin="round" opacity="0.74" />
          <path d={route} fill="none" stroke="#a9bf88" strokeWidth="66" strokeLinecap="round" strokeLinejoin="round" opacity="0.88" />
          <path d={route} fill="none" stroke="#738f67" strokeWidth="1.8" strokeDasharray="3 7" opacity="0.62" />
          <path d={route} fill="none" stroke="#f7f3df" strokeWidth="54" strokeLinecap="round" strokeDasharray="1 15" opacity="0.13" />
          <ellipse cx={105 + shift} cy="185" rx="24" ry="10" transform={`rotate(-24 ${105 + shift} 185)`} fill="#f2ead2" stroke="#c8b88d" strokeWidth="1.2" />
          <ellipse cx={202 - shift} cy="285" rx="20" ry="9" transform={`rotate(18 ${202 - shift} 285)`} fill="#f2ead2" stroke="#c8b88d" strokeWidth="1.2" />
          <ellipse cx="150" cy="48" rx="38" ry="28" fill="#88a874" stroke="#587956" strokeWidth="2" />
        </g>

        <circle cx="150" cy="570" r="14" fill="#1f7549" stroke="#ffffff" strokeWidth="5" />
        <circle cx="150" cy="570" r="4" fill="#ffffff" />
        <text x="150" y="607" textAnchor="middle" fill="#1f7549" fontSize="11" fontWeight="700" letterSpacing="2">GREEN TEE</text>

        <line x1="150" y1="60" x2="150" y2="14" stroke="#173326" strokeLinecap="round" strokeWidth="3" />
        <path d="M153 15 L202 29 L153 43 Z" fill="#ffffff" stroke="#173326" strokeLinejoin="round" strokeWidth="2" />
        <circle cx="150" cy="60" r="4" fill="#173326" />
        <circle cx="198" cy="19" r="15" fill="#173326" />
        <text x="198" y="23" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700">{hole}</text>
      </svg>
      <figcaption className="mt-3 text-center font-navigation text-[9px] font-bold uppercase tracking-[0.18em] text-[#98782f]">
        Hole {hole} · Top-down aerial sketch
      </figcaption>
    </figure>
  );
}

export default function ConceptHoleBreakdown({
  conceptTitle,
  holes,
  image,
  markers,
}: {
  conceptTitle: string;
  holes: readonly number[];
  image: string;
  markers: readonly HoleMarker[];
}) {
  const [selectedHole, setSelectedHole] = useState<number>(holes[0] ?? 1);
  const profile = HOLE_PROFILES[selectedHole];
  const marker = markers.find((item) => item.hole === selectedHole) ?? markers[0];
  const blueYards = metresToYards(profile.blueMetres);
  const forwardYards = metresToYards(profile.forwardMetres);

  return (
    <section id="hole-breakdown" className="bg-[#fbfaf7] py-20 text-[#18271f] sm:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[1.5rem] border border-[#b9994d]/30 bg-white shadow-[0_25px_80px_rgba(20,39,29,0.07)] sm:rounded-[2rem]">
          <div className="border-b border-[#174630]/12 px-5 pb-0 pt-10 text-center sm:px-10 sm:pt-12">
            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#98782f]">Every hole, clearly explained</p>
            <h2 className="mt-3 text-3xl font-medium tracking-[-0.045em] sm:text-4xl">{conceptTitle} Breakdown</h2>
            <div className="mt-8 flex flex-wrap justify-center gap-1" role="tablist" aria-label={`${conceptTitle} holes`}>
              {holes.map((hole) => (
                <button
                  key={hole}
                  type="button"
                  role="tab"
                  aria-selected={selectedHole === hole}
                  onClick={() => setSelectedHole(hole)}
                  className={`min-w-11 rounded-t-md px-4 py-3 font-navigation text-xs font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#b9994d] ${
                    selectedHole === hole ? "bg-[#173326] text-[#f3dda0] shadow-lg" : "text-[#68736d] hover:bg-[#f3f0e7] hover:text-[#173326]"
                  }`}
                >
                  {hole}
                </button>
              ))}
            </div>
          </div>

          <div key={selectedHole} role="tabpanel" className="grid gap-12 px-6 py-12 sm:px-10 sm:py-16 lg:grid-cols-[1.05fr_0.75fr] lg:gap-20 lg:px-14">
            <div>
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.22em] text-[#98782f]">Hole {selectedHole} · Concept design</p>
              <h3 className="mt-4 font-serif text-4xl leading-none tracking-[-0.045em] sm:text-5xl">{profile.name}</h3>
              <p className="mt-6 font-navigation text-xs font-bold uppercase tracking-[0.24em] text-[#173326]">Par {profile.par}</p>

              <div className="mt-5 grid max-w-xl gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-[#f4f1e8] p-4">
                  <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.18em] text-[#98782f]">Blue tees</p>
                  <p className="mt-2 text-lg font-semibold">{profile.blueMetres} m <span className="text-[#748078]">/ {blueYards} yd</span></p>
                </div>
                <div className="rounded-2xl bg-[#f4f1e8] p-4">
                  <p className="font-navigation text-[9px] font-bold uppercase tracking-[0.18em] text-[#98782f]">Forward tees</p>
                  <p className="mt-2 text-lg font-semibold">{profile.forwardMetres} m <span className="text-[#748078]">/ {forwardYards} yd</span></p>
                </div>
              </div>

              <div className="mt-7 h-px w-24 bg-[#c8a650]" />
              <p className="mt-7 max-w-2xl text-base leading-8 text-[#59665f] sm:text-lg sm:leading-9">{profile.description}</p>
              <p className="mt-4 text-sm leading-7 text-[#7b8580]">Distances and routing are provisional and remain subject to detailed course design.</p>

              <div className="mt-9 grid grid-cols-3 gap-3">
                {[marker?.startLeft ?? "25%", marker?.left ?? "50%", "75%"].map((position, index) => (
                  <div key={`${selectedHole}-${position}-${index}`} className="relative aspect-[4/3] overflow-hidden rounded-xl bg-[#d9dfd7]">
                    <Image
                      src={image}
                      alt={`Hole ${selectedHole} aerial detail ${index + 1}`}
                      fill
                      sizes="(max-width: 639px) 30vw, 180px"
                      className="object-cover transition duration-700 hover:scale-105"
                      style={{ objectPosition: `${position} ${index === 0 ? marker?.startTop ?? "50%" : index === 1 ? marker?.top ?? "50%" : "50%"}` }}
                    />
                  </div>
                ))}
              </div>

              <div className="relative mt-4 aspect-video overflow-hidden rounded-2xl bg-[#d9dfd7]">
                <Image
                  src={image}
                  alt={`Playing corridor for Hole ${selectedHole}`}
                  fill
                  sizes="(max-width: 1023px) 100vw, 650px"
                  className="object-cover"
                  style={{ objectPosition: `${marker?.left ?? "50%"} ${marker?.top ?? "50%"}` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071d13]/65 via-transparent to-transparent" />
                <p className="absolute bottom-5 left-5 font-navigation text-[10px] font-bold uppercase tracking-[0.18em] text-white">Hole {selectedHole} · Aerial corridor</p>
              </div>
            </div>

            <HoleRouteDiagram hole={selectedHole} />
          </div>

          <div className="space-y-3 border-t border-[#174630]/10 bg-[#fbfaf7] p-6 sm:p-10">
            <details className="group bg-[#f0efec] px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#3e4c45] [&::-webkit-details-marker]:hidden">
                Blue tee scorecard · Hole {selectedHole}<span className="text-lg text-[#98782f] transition group-open:rotate-45">+</span>
              </summary>
              <p className="pt-4 text-sm text-[#667169]">Par {profile.par} · {profile.blueMetres} metres · {blueYards} yards · Provisional concept distance</p>
            </details>
            <details className="group bg-[#f0efec] px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#3e4c45] [&::-webkit-details-marker]:hidden">
                Forward tee scorecard · Hole {selectedHole}<span className="text-lg text-[#98782f] transition group-open:rotate-45">+</span>
              </summary>
              <p className="pt-4 text-sm text-[#667169]">Par {profile.par} · {profile.forwardMetres} metres · {forwardYards} yards · Provisional concept distance</p>
            </details>
            <details className="group bg-[#f0efec] px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#3e4c45] [&::-webkit-details-marker]:hidden">
                View this hole on the concept map<span className="text-lg text-[#98782f] transition group-open:rotate-45">+</span>
              </summary>
              <a href="#aerial-study" className="mt-4 inline-flex rounded-full bg-[#173326] px-5 py-3 font-navigation text-[9px] font-bold uppercase tracking-[0.15em] text-white transition hover:bg-[#0d291c]">Open aerial study ↑</a>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
