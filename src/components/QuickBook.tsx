"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import BookingDatePicker from "@/components/BookingDatePicker";
import { COURSE } from "@/lib/golf-booking";
import { todayInManila } from "@/lib/weather";

/**
 * Quick-book sa hero ng /plan-your-visit: petsa · round · manlalaro →
 * "Find tee times". Diretso sa /golf/book na may napunang pili (?date=…).
 *
 * KAPAREHONG ANYO NG /golf/book: ang parehong BookingDatePicker (calendar),
 * mga parisukat na pindutan na berde kapag napili para sa round, at ang
 * − 2 + na stepper para sa manlalaro.
 */

type Round = "full" | "front" | "back";
const ROUNDS: { value: Round; label: string; hint: string }[] = [
  { value: "full", label: "Full course", hint: "Holes 1–18" },
  { value: "front", label: "Front nine", hint: "Holes 1–9" },
  { value: "back", label: "Back nine", hint: "Holes 10–18" },
];

const LABEL = "mb-2 block font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#667269]";

function addDays(date: string, days: number) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
}

export default function QuickBook() {
  const router = useRouter();
  const today = todayInManila();
  const [date, setDate] = useState(addDays(today, 1));
  const [round, setRound] = useState<Round>("full");
  const [players, setPlayers] = useState(2);
  const step = "flex h-[46px] w-11 items-center justify-center border border-[#1f3f2e]/25 bg-white text-lg text-[#265136] transition hover:border-[#265136] disabled:opacity-30";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        router.push(`/golf/book?date=${date}&round=${round}&players=${players}`);
      }}
      className="grid gap-5 border border-[#1f3f2e]/12 bg-[#f7f5ee] p-5 text-[#14271d] shadow-[0_24px_60px_rgba(0,0,0,0.3)] sm:p-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.7fr)_auto_auto] lg:items-end lg:gap-4"
    >
      <div>
        <span id="qb-date-label" className={LABEL}>
          Date of play
        </span>
        <BookingDatePicker id="qb-date" compact value={date} min={today} max={addDays(today, COURSE.bookAheadDays)} onChange={setDate} />
      </div>

      <div role="radiogroup" aria-label="Round">
        <span className={LABEL}>Round</span>
        <div className="grid grid-cols-3 gap-2">
          {ROUNDS.map((option) => {
            const selected = round === option.value;
            return (
              <button
                key={option.value}
                type="button"
                role="radio"
                aria-checked={selected}
                onClick={() => setRound(option.value)}
                className={`flex h-[46px] flex-col justify-center border px-3 text-left transition ${
                  selected ? "border-[#265136] bg-[#265136] text-white" : "border-[#1f3f2e]/20 bg-white text-[#14271d] hover:border-[#265136]"
                }`}
              >
                <span className="block text-[13px] font-semibold leading-4">{option.label}</span>
                <span className={`mt-0.5 block text-[11px] leading-3 ${selected ? "text-white/70" : "text-[#667269]"}`}>{option.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <span className={LABEL}>Players</span>
        <div className="flex items-center" role="group" aria-label="Players">
          <button type="button" className={step} disabled={players <= 1} onClick={() => setPlayers(players - 1)} aria-label="Less">
            −
          </button>
          <span className="flex h-[46px] w-12 items-center justify-center border-y border-[#1f3f2e]/25 bg-white text-sm font-semibold tabular-nums">
            {players}
          </span>
          <button type="button" className={step} disabled={players >= COURSE.maxPlayers} onClick={() => setPlayers(players + 1)} aria-label="More">
            +
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="inline-flex h-[46px] items-center justify-center rounded-full bg-[#265136] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#f3dda0] transition hover:bg-[#1f3f2e]"
      >
        Find tee times
      </button>
    </form>
  );
}
