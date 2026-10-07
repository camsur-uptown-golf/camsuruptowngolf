"use client";

import { useState } from "react";
import Image from "next/image";
import { HOLE_PROFILES } from "@/lib/course-holes";

/**
 * Buong 18-hole scorecard. Nakikita ang lahat ng tee colors, pero Black
 * back-tee distances lang ang ipinapakita dahil iyon lang ang kasalukuyang
 * kumpirmadong set ng yardages.
 */
const TEES = [
  { name: "Black", ratio: 1, color: "#111713", row: "#eef0ee" },
  { name: "Blue", ratio: null, color: "#285cce", row: "#eef2fb" },
  { name: "White", ratio: null, color: "#ffffff", row: "#ffffff" },
  { name: "Red", ratio: null, color: "#d6322c", row: "#fdf0ef" },
  { name: "Yellow", ratio: null, color: "#f2d719", row: "#fdfaea" },
] as const;

type Tee = (typeof TEES)[number];

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
 * Para sa Black back tee ay ang nakatalang `yards` ang ginagamit, hindi ang muling
 * pagku-kuwenta mula sa metres: may tatlong butas (1, 11, 13) na nagkakaiba
 * ng isang yarda kapag kinuwenta, at lalabas iyon bilang magkasalungat na
 * bilang sa scorecard at sa stat bar sa itaas ng pahina.
 */
const yardsFor = (hole: number, ratio: number | null) =>
  ratio === 1 ? HOLE_PROFILES[hole].yards : null;

const sum = (values: number[]) => values.reduce((total, value) => total + value, 0);
const sumKnown = (values: (number | null)[]) =>
  values.every((value): value is number => value !== null) ? sum(values) : null;

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
  tee,
  currentHole,
  runningLabel,
  closing,
}: {
  holes: number[];
  tee: Tee;
  currentHole?: number;
  runningLabel: string;
  closing?: { yards: number | null; par: number };
}) {
  const yards = holes.map((hole) => yardsFor(hole, tee.ratio));
  const pars = holes.map((hole) => HOLE_PROFILES[hole].par);
  const isCurrent = (hole: number) => hole === currentHole;

  /* Masikip ang padding nang sadya: 12 hanay ang back nine, at sa mas maluwag
     ay hindi kasya ang card sa hanay nito at lumilitaw ang scrollbar. */
  const cell = "px-1.5 py-2.5 text-center tabular-nums sm:px-2";
  const rowLabel = "sticky left-0 z-10 px-3 py-2.5 text-left font-navigation text-[10px] font-bold uppercase tracking-[0.12em]";

  return (
    <table className="w-full min-w-[520px] border-collapse text-sm">
      <thead>
        <tr className="bg-[#1f3f2e] text-white">
          <th scope="col" className={`${rowLabel} bg-[#1f3f2e]`}>
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
        <tr style={{ backgroundColor: tee.row }}>
          <th
            scope="row"
            style={{ backgroundColor: tee.row, boxShadow: `inset 3px 0 0 ${tee.color}` }}
            className={`${rowLabel} text-[#14271d]`}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full border border-[#1f3f2e]/45"
                style={{ backgroundColor: tee.color }}
                aria-hidden="true"
              />
              Yards
            </span>
          </th>
          {yards.map((value, index) => (
            <td key={holes[index]} className={`${cell} ${isCurrent(holes[index]) ? "bg-[#f1d98f]/45 font-semibold" : ""}`}>
              {value ?? ""}
            </td>
          ))}
          <td className={`${cell} font-semibold`}>{sumKnown(yards) ?? ""}</td>
          {closing ? (
            <td className={`${cell} font-semibold`}>
              {closing.yards !== null && sumKnown(yards) !== null ? closing.yards + (sumKnown(yards) ?? 0) : ""}
            </td>
          ) : null}
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

export default function Scorecard({
  currentHole,
  photoSrc,
  photoOrientation,
  photoWidth,
  photoHeight,
}: {
  currentHole?: number;
  photoSrc: string;
  photoOrientation: "landscape" | "portrait";
  photoWidth: number;
  photoHeight: number;
}) {
  const landscapePlan = photoOrientation === "landscape";
  const holeOne = currentHole === 1;
  const [teeIndex, setTeeIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const tee = TEES[teeIndex] ?? TEES[0];
  const currentProfile = currentHole ? HOLE_PROFILES[currentHole] : undefined;
  const frontYards = sumKnown(FRONT_NINE.map((hole) => yardsFor(hole, tee.ratio)));
  const frontPar = sum(FRONT_NINE.map((hole) => HOLE_PROFILES[hole].par));

  return (
    <div className={`grid gap-8 lg:items-start lg:gap-10 ${landscapePlan ? "lg:grid-cols-[400px_minmax(0,1fr)] xl:grid-cols-[520px_minmax(0,1fr)]" : holeOne ? "lg:grid-cols-[300px_minmax(0,1fr)] xl:grid-cols-[420px_minmax(0,1fr)]" : "lg:grid-cols-[280px_minmax(0,1fr)] xl:grid-cols-[340px_minmax(0,1fr)]"}`}>
      <figure className={`mx-auto w-full lg:mx-0 lg:sticky lg:top-28 ${landscapePlan ? "max-w-[720px]" : holeOne ? "max-w-[420px]" : "max-w-[340px]"}`}>
        <div
          className="relative w-full overflow-hidden border border-[#1f3f2e]/12 bg-white"
          style={{ aspectRatio: photoWidth / photoHeight }}
        >
          <Image
            src={photoSrc}
            alt={currentHole ? `CamSur Uptown course masterplan with Hole ${currentHole} highlighted` : "CamSur Uptown golf course masterplan"}
            fill
            sizes={landscapePlan ? "(max-width: 1023px) min(100vw - 3rem, 720px), 520px" : "(max-width: 1023px) min(100vw - 3rem, 420px), 420px"}
            className="object-contain"
          />
        </div>
        <figcaption className="mt-3 flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-center font-navigation uppercase lg:justify-start lg:text-left">
          <span className="text-[10px] font-bold tracking-[0.16em] text-[#98782f]">
            {currentHole ? `Hole ${String(currentHole).padStart(2, "0")} · Official course masterplan` : "Official course masterplan"}
          </span>
          {currentProfile ? (
            <span className="text-sm font-bold tracking-[0.08em] text-[#14271d]">
              {currentProfile.blueMetres} m · Black tee
            </span>
          ) : null}
        </figcaption>
      </figure>

      {/* min-w-0: kung wala ito, lumalaki ang grid column hanggang sa
          min-w ng talahanayan (560px) at naputol ang card sa telepono. */}
      <div className="min-w-0">
      <div className="relative max-w-md">
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          aria-expanded={open}
          aria-haspopup="listbox"
          className="flex w-full items-center justify-between gap-3 border border-[#1f3f2e]/15 bg-white px-5 py-3.5 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#14271d] transition-colors hover:border-[#1f3f2e]/35"
        >
          <span className="inline-flex items-center gap-2">
            Select tees
            <span className="h-3 w-3 rounded-full border border-[#1f3f2e]/45" style={{ backgroundColor: tee.color }} aria-hidden="true" />
            <span className="text-[#98782f]">{tee.name}</span>
          </span>
          <ChevronIcon open={open} />
        </button>

        {open ? (
          <ul
            role="listbox"
            aria-label="Select tees"
            className="absolute inset-x-0 top-full z-20 border border-t-0 border-[#1f3f2e]/15 bg-white shadow-[0_18px_44px_rgba(20,45,32,0.14)]"
          >
            {TEES.map((option, index) => (
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
                    <span className="h-3.5 w-3.5 rounded-full border border-[#1f3f2e]/45" style={{ backgroundColor: option.color }} aria-hidden="true" />
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
        <div className="overflow-x-auto border border-[#1f3f2e]/12">
          <Nine holes={FRONT_NINE} tee={tee} currentHole={currentHole} runningLabel="Out" />
        </div>
        <div className="overflow-x-auto border border-[#1f3f2e]/12">
          <Nine
            holes={BACK_NINE}
            tee={tee}
            currentHole={currentHole}
            runningLabel="In"
            closing={{ yards: frontYards, par: frontPar }}
          />
        </div>
      </div>

        <p className="mt-4 font-navigation text-[10px] font-medium uppercase tracking-[0.14em] text-[#8a938c]">
          Black tee distances only · Other tee distances to be confirmed
        </p>
      </div>
    </div>
  );
}
