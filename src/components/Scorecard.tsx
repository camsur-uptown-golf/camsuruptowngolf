"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { HOLE_PROFILES, metresToYards } from "@/lib/course-holes";

/**
 * Buong 18-hole scorecard na may tee selector.
 *
 * TODO (para sa club): ang Blue lang ang totoong datos — galing iyon sa
 * `blueMetres` sa course-holes.ts. Ang White, Green, Red, at Yellow ay
 * hinango mula sa Blue sa pamamagitan ng ratio, at ang HCP ay heuristic
 * lamang. Pansamantala silang lahat hanggang maibigay ang opisyal na
 * scorecard ng club. Kapag dumating iyon, ilagay ang bawat tee bilang
 * sariling hanay sa HOLE_PROFILES at alisin ang mga ratio dito.
 */
const TEES = [
  { name: "Blue", ratio: 1 },
  { name: "White", ratio: 0.93 },
  { name: "Green", ratio: 0.86 },
  { name: "Red", ratio: 0.79 },
  { name: "Yellow", ratio: 0.72 },
] as const;

const HOLE_ONE_TEES = [
  { name: "Yellow", ratio: null, color: "#f2d719", x: 1402, y: 166 },
  { name: "White", ratio: null, color: "#ffffff", x: 1370, y: 198 },
  { name: "Blue", ratio: 1, color: "#285cce", x: 1322, y: 268 },
  { name: "Red", ratio: null, color: "#d6322c", x: 1234, y: 376 },
] as const;

// Mga black na punto sa magkabilang dulo ng course plan; hindi tee choices.
const HOLE_ONE_BLACK_POINTS = [
  { x: 1448, y: 99, radius: 12 },
  { x: 191, y: 715, radius: 9 },
] as const;

const HOLES = Array.from({ length: 18 }, (_, index) => index + 1);
const FRONT_NINE = HOLES.slice(0, 9);
const BACK_NINE = HOLES.slice(9);

/**
 * Stroke index: mas malayo ang butas kaysa sa inaasahan ng par nito, mas
 * mababa ang ibinibigay na bilang. Tinitiyak ng ranking na isang beses
 * lang gamitin ang bawat numero mula 1 hanggang 18.
 */
const STROKE_INDEX: Record<number, number> = (() => {
  const relativeLength = (hole: number) =>
    HOLE_PROFILES[hole].blueMetres - HOLE_PROFILES[hole].par * 100;

  const hardestFirst = [...HOLES].sort((a, b) => relativeLength(b) - relativeLength(a));
  return Object.fromEntries(hardestFirst.map((hole, index) => [hole, index + 1]));
})();

/**
 * Para sa Blue ay ang nakatalang `yards` ang ginagamit, hindi ang muling
 * pagku-kuwenta mula sa metres: may tatlong butas (1, 11, 13) na nagkakaiba
 * ng isang yarda kapag kinuwenta, at lalabas iyon bilang magkasalungat na
 * bilang sa scorecard at sa stat bar sa itaas ng pahina.
 */
const yardsFor = (hole: number, ratio: number | null) =>
  ratio === null
    ? null
    : ratio === 1
    ? HOLE_PROFILES[hole].yards
    : metresToYards(Math.round(HOLE_PROFILES[hole].blueMetres * ratio));

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
const sumKnown = (values: (number | null)[]) => values.every((value): value is number => value !== null) ? sum(values) : null;

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
      fill="none"
      aria-hidden="true"
    >
      <path d="m5 9 7 7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Isang siyam na butas. Ang `closing` ang nagdaragdag ng TOTAL na hanay. */
function Nine({
  holes,
  teeName,
  ratio,
  currentHole,
  runningLabel,
  closing,
}: {
  holes: number[];
  teeName: string;
  ratio: number | null;
  currentHole?: number;
  runningLabel: string;
  closing?: { yards: number | null; par: number };
}) {
  const yards = holes.map((hole) => yardsFor(hole, ratio));
  const pars = holes.map((hole) => HOLE_PROFILES[hole].par);
  const isCurrent = (hole: number) => hole === currentHole;

  /* Masikip ang padding nang sadya: 12 hanay ang back nine, at sa mas maluwag
     ay hindi kasya ang card sa hanay nito at lumilitaw ang scrollbar. */
  const cell = "px-1.5 py-2.5 text-center tabular-nums sm:px-2";
  const rowLabel = "sticky left-0 z-10 px-3 py-2.5 text-left font-navigation text-[10px] font-bold uppercase tracking-[0.12em]";

  return (
    <table className="w-full min-w-[520px] border-collapse text-sm">
      <thead>
        <tr className="bg-[#254936] text-white">
          <th scope="col" className={`${rowLabel} bg-[#254936]`}>
            Hole
          </th>
          {holes.map((hole) => (
            <th
              key={hole}
              scope="col"
              className={`${cell} font-navigation text-[11px] font-bold ${isCurrent(hole) ? "bg-[#f1d98f] text-[#0b281b]" : ""}`}
            >
              {hole}
            </th>
          ))}
          <th scope="col" className={`${cell} font-navigation text-[11px] font-bold`}>
            {runningLabel}
          </th>
          {closing ? (
            <th scope="col" className={`${cell} font-navigation text-[11px] font-bold`}>
              Total
            </th>
          ) : null}
        </tr>
      </thead>
      <tbody className="text-[#14271d]">
        <tr className="bg-white">
          <th scope="row" className={`${rowLabel} bg-white text-[#4f5d55]`}>
            {teeName}
          </th>
          {yards.map((value, index) => (
            <td key={holes[index]} className={`${cell} ${isCurrent(holes[index]) ? "bg-[#f1d98f]/45 font-semibold" : ""}`}>
              {value ?? "—"}
            </td>
          ))}
          <td className={`${cell} font-semibold`}>{sumKnown(yards) ?? "—"}</td>
          {closing ? <td className={`${cell} font-semibold`}>{closing.yards !== null && sumKnown(yards) !== null ? closing.yards + (sumKnown(yards) ?? 0) : "—"}</td> : null}
        </tr>
        <tr className="bg-[#f7f5ee]">
          <th scope="row" className={`${rowLabel} bg-[#f7f5ee] text-[#4f5d55]`}>
            Par
          </th>
          {pars.map((value, index) => (
            <td key={holes[index]} className={`${cell} ${isCurrent(holes[index]) ? "bg-[#f1d98f]/45 font-semibold" : ""}`}>
              {value}
            </td>
          ))}
          <td className={`${cell} font-semibold`}>{sum(pars)}</td>
          {closing ? <td className={`${cell} font-semibold`}>{closing.par + sum(pars)}</td> : null}
        </tr>
        <tr className="bg-white">
          <th scope="row" className={`${rowLabel} bg-white text-[#4f5d55]`}>
            Hcp
          </th>
          {holes.map((hole) => (
            <td key={hole} className={`${cell} text-[#667169] ${isCurrent(hole) ? "bg-[#f1d98f]/45 font-semibold" : ""}`}>
              {STROKE_INDEX[hole]}
            </td>
          ))}
          <td className={cell} />
          {closing ? <td className={cell} /> : null}
        </tr>
      </tbody>
    </table>
  );
}

export default function Scorecard({ currentHole, photoSrc }: { currentHole?: number; photoSrc: string }) {
  const holeOne = currentHole === 1;
  const teeOptions = holeOne ? HOLE_ONE_TEES : TEES;
  const [teeIndex, setTeeIndex] = useState(holeOne ? 2 : 0);
  const [open, setOpen] = useState(false);
  const selectorRef = useRef<HTMLDivElement>(null);
  const tee = teeOptions[teeIndex] ?? teeOptions[0];

  useEffect(() => {
    if (!open) return;

    const closeOnOutside = (event: PointerEvent) => {
      if (selectorRef.current && !selectorRef.current.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutside);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutside);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  const frontYards = sumKnown(FRONT_NINE.map((hole) => yardsFor(hole, tee.ratio)));
  const frontPar = sum(FRONT_NINE.map((hole) => HOLE_PROFILES[hole].par));

  return (
    <div className={`grid gap-8 lg:items-start lg:gap-10 ${holeOne ? "lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)]" : "lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]"}`}>
      <figure className={`mx-auto w-full lg:mx-0 lg:sticky lg:top-28 ${holeOne ? "max-w-[420px]" : "max-w-[340px]"}`}>
        {holeOne ? (
          <div className="relative aspect-[3/2] w-full overflow-hidden border border-[#173b2a]/12 bg-[#d9e2d2]">
            <Image
              src="/golf/course-01-detailed-plan-v1.png"
              alt="Top-down plan of Hole 1, with the lake, four colored tee positions, and black points at each end"
              fill
              sizes="(max-width: 1023px) min(100vw - 3rem, 450px), 450px"
              className="object-cover"
            />
            <svg viewBox="0 0 1536 1024" className="absolute inset-0 h-full w-full" role="img" aria-label="Hole 1 tee positions: yellow, white, blue, and red, with two black end points; no route line">
              {HOLE_ONE_BLACK_POINTS.map((point) => (
                <circle key={`${point.x}-${point.y}`} cx={point.x} cy={point.y} r={point.radius} fill="#050706" />
              ))}
              {HOLE_ONE_TEES.map((marker) => (
                <g key={marker.name}>
                  <circle cx={marker.x} cy={marker.y} r={marker.name === tee.name ? 23 : 18} fill="#ffffff" opacity="0.96" />
                  <circle cx={marker.x} cy={marker.y} r={marker.name === tee.name ? 17 : 13} fill={marker.color} stroke="#18392b" strokeWidth="3" />
                </g>
              ))}
            </svg>
          </div>
        ) : (
          <div className="relative aspect-[8/5] w-full overflow-hidden border border-[#173b2a]/12 bg-[#d9e2d2]">
            <Image
              src={photoSrc}
              alt={currentHole ? `Aerial course view of CamSur Uptown Hole ${currentHole}` : "Aerial view of the CamSur Uptown golf course"}
              fill
              sizes="(max-width: 1023px) min(100vw - 3rem, 360px), 360px"
              className="object-cover"
            />
          </div>
        )}
        <figcaption className="mt-3 text-center font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f] lg:text-left">
          {holeOne ? "Hole 01 · Tee positions" : currentHole ? `Hole ${String(currentHole).padStart(2, "0")} · Course view` : "Course view"}
        </figcaption>
      </figure>

      {/* min-w-0: kung wala ito, lumalaki ang grid column hanggang sa
          min-w ng talahanayan (560px) at naputol ang card sa telepono. */}
      <div className="min-w-0">
      <div ref={selectorRef} className="relative max-w-md">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex w-full items-center justify-between gap-3 border border-[#173b2a]/15 bg-white px-5 py-3.5 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#14271d] transition-colors hover:border-[#173b2a]/35"
        >
          <span className="inline-flex items-center gap-2">
            Select tees
            {holeOne ? <span className="h-3 w-3 rounded-full border border-[#173b2a]/45" style={{ backgroundColor: HOLE_ONE_TEES[teeIndex]?.color }} aria-hidden="true" /> : null}
            <span className="text-[#98782f]">{tee.name}</span>
          </span>
          <ChevronIcon open={open} />
        </button>

        {open ? (
          <ul
            role="listbox"
            aria-label="Select tees"
            className="absolute inset-x-0 top-full z-20 border border-t-0 border-[#173b2a]/15 bg-white shadow-[0_18px_44px_rgba(20,45,32,0.14)]"
          >
            {teeOptions.map((option, index) => (
              <li key={option.name} role="option" aria-selected={index === teeIndex}>
                <button
                  type="button"
                  onClick={() => {
                    setTeeIndex(index);
                    setOpen(false);
                  }}
                  className={`${index === teeIndex ? "bg-[#f1d98f]/40 text-[#0b281b]" : "text-[#14271d] hover:bg-[#f7f5ee]"} block w-full px-5 py-3 text-left font-navigation text-[11px] font-bold uppercase tracking-[0.16em] transition-colors`}
                >
                  <span className="inline-flex items-center gap-3">
                    {holeOne ? <span className="h-3.5 w-3.5 rounded-full border border-[#173b2a]/45" style={{ backgroundColor: HOLE_ONE_TEES[index].color }} aria-hidden="true" /> : null}
                    {option.name}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {/* Dalawang hiwalay na siyam, gaya ng nakalimbag na scorecard — sa isang
          talahanayan na 18 na hanay ay masyadong makipot ang bawat hanay. */}
      <div className="mt-7 space-y-4">
        <div className="overflow-x-auto border border-[#173b2a]/12">
          <Nine holes={FRONT_NINE} teeName={tee.name} ratio={tee.ratio} currentHole={currentHole} runningLabel="Out" />
        </div>
        <div className="overflow-x-auto border border-[#173b2a]/12">
          <Nine
            holes={BACK_NINE}
            teeName={tee.name}
            ratio={tee.ratio}
            currentHole={currentHole}
            runningLabel="In"
            closing={{ yards: frontYards, par: frontPar }}
          />
        </div>
      </div>

        <p className="mt-4 font-navigation text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a938c]">
          {holeOne ? "Blue concept distance only · Other tee distances pending survey" : "Distances in yards · Provisional concept values"}
        </p>
      </div>
    </div>
  );
}
