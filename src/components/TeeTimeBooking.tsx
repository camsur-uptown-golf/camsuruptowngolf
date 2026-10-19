"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookingDatePicker from "@/components/BookingDatePicker";
import ForecastDays from "@/components/ForecastDays";
import Tr from "@/components/Tr";
import { lookup, useSiteStrings } from "@/i18n/site-strings";
import {
  ADDONS,
  COURSE,
  GREEN_FEES,
  LATE_START,
  VILLA_NIGHTS,
  addonMax,
  formatTime,
  quote,
  toMinutes,
  toTime,
  type AddonId,
  type Holes,
  type Tee,
} from "@/lib/golf-booking";
import { formatPeso } from "@/lib/membership-plans";

/**
 * Ang tee-time booking form — iisang pahina, sunod-sunod na hakbang:
 * petsa (kasama ang forecast) → round (9/18, Hole 1/10) → oras → manlalaro →
 * add-ons → gabi sa villa → contact → downpayment.
 *
 * Ang availability ay galing sa /api/tee-times kada palit ng petsa o round.
 * Ang presyong ipinapakita ay pareho ng kinukuwenta ng server (`quote()`),
 * pero ang server ang nasusunod.
 */

type Slot = { time: string; status: "open" | "booked" | "past" };
/** Isang oras sa listahan, kasama kung saang hole magsisimula ang grupo. */
type Choice = Slot & { tee: Tee };

/* ISANG TANONG LANG SA STEP 2: gaano karami ang lalaruin. Dating dalawang
   magkahiwalay na pili (18/9 at Hole 1/10) — nakalilito, dahil kailangang
   buuin ng bisita ang kombinasyon. Ngayon:
     - full  = 18 holes; ang system ang pumipili ng simula (Hole 1, o Hole 10
       kapag puno na ang Hole 1 sa oras na iyon)
     - front = Holes 1–9
     - back  = Holes 10–18 */
type Round = "full" | "front" | "back";
/** A compact summary of the nines included in the selected round. */
function RoundCoverage({ round }: { round: Round }) {
  return (
    <div className="mt-4 grid grid-cols-2 gap-3" role="group" aria-label="Holes included in your round">
      {([
        { id: "front", label: "Front nine", holes: "Holes 1–9" },
        { id: "back", label: "Back nine", holes: "Holes 10–18" },
      ] as const).map((nine) => {
        const included = round === "full" || round === nine.id;
        return (
          <div
            key={nine.id}
            className={`border p-3.5 transition-colors sm:p-4 ${included ? "border-[#265136] bg-[#265136] text-[#f7f5ee]" : "border-[#1f3f2e]/10 bg-[#1f3f2e]/[0.03] text-[#788279]"}`}
          >
            <div className="flex items-center gap-2">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className={`h-4 w-4 shrink-0 ${included ? "text-[#e7d18d]" : "text-[#9aa39d]"}`}>
                <path d="M6 21V3m0 0c4-3 8 3 12 0v10c-4 3-8-3-12 0M3 21h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.12em] sm:text-[11px]">{nine.label}</p>
            </div>
            <p className="mt-3 text-base font-medium tracking-[-0.02em] sm:text-lg">{nine.holes}</p>
            <p className={`mt-1.5 flex items-center gap-1.5 text-[11px] ${included ? "text-[#e7d18d]" : "text-[#8a938c]"}`}>
              {included ? <svg aria-hidden="true" viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5"><path d="m3 8 3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg> : null}
              {included ? "Included in your round" : "Not included"}
            </p>
          </div>
        );
      })}
    </div>
  );
}
type Availability = { tees: Record<"1" | "10", Slot[]>; villas: Record<string, number> };

const ERRORS: Record<string, string> = {
  taken: "Sorry — someone just booked that time. Please choose another.",
  "villa-full": "That villa was just booked for the night. Please choose another stay.",
  contact: "Please enter your name, a valid email, and your mobile number.",
  date: "Please choose a date within the next 30 days.",
  time: "That tee time is no longer available. Please choose another.",
  payments: "Online payment is not available right now. Please call the club to book.",
  invalid: "Something is missing. Please check your booking.",
  network: "Something went wrong. Please try again.",
};

const FIELD =
  "w-full border border-[#1f3f2e]/25 bg-white px-4 py-3 text-sm text-[#14271d] outline-none transition placeholder:text-[#9aa39d] focus:border-[#265136] focus:ring-2 focus:ring-[#265136]/20";
const STEP = "font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#98782f]";
const TITLE = "mt-2 text-xl font-medium tracking-[-0.03em] text-[#14271d]";

function addDays(date: string, days: number) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
}

function Toggle<T extends string | number>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string; hint?: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className={`grid gap-2 ${options.length === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
      {options.map((option) => (
        <button
          key={String(option.value)}
          type="button"
          aria-pressed={value === option.value}
          onClick={() => onChange(option.value)}
          className={`border px-4 py-3 text-left transition ${
            value === option.value ? "border-[#265136] bg-[#265136] text-white" : "border-[#1f3f2e]/20 bg-white text-[#14271d] hover:border-[#265136]"
          }`}
        >
          <span className="block text-sm font-semibold">{option.label}</span>
          {option.hint ? (
            <span className={`mt-0.5 block text-xs ${value === option.value ? "text-white/70" : "text-[#667269]"}`}>{option.hint}</span>
          ) : null}
        </button>
      ))}
    </div>
  );
}

function Stepper({ value, min, max, onChange, label }: { value: number; min: number; max: number; onChange: (v: number) => void; label: string }) {
  const button = "flex h-9 w-9 items-center justify-center border border-[#1f3f2e]/20 text-lg text-[#265136] transition hover:border-[#265136] disabled:opacity-30";
  return (
    <div className="flex items-center gap-2" role="group" aria-label={label}>
      <button type="button" className={button} disabled={value <= min} onClick={() => onChange(value - 1)} aria-label="Less">
        −
      </button>
      <span className="w-6 text-center text-sm font-semibold tabular-nums">{value}</span>
      <button type="button" className={button} disabled={value >= max} onClick={() => onChange(value + 1)} aria-label="More">
        +
      </button>
    </div>
  );
}

/* ISANG PAHINA, MGA CARD NA NAGSASARA. Dating "isang hakbang + Back/Next":
   para baguhin ang petsa ay kailangang bumalik at mag-Next ulit sa bawat
   hakbang. Ngayon: bukas ang kasalukuyang hakbang; ang tapos na ay isang
   linya ng napili + "Change"; ang pagbago ay bumabalik agad sa kinaroroonan
   mo. Ganito ang checkout ng Airbnb/Apple. */
type CardState = "open" | "done" | "todo";

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function StepCard({
  n,
  title,
  summary,
  state,
  onChange,
  children,
}: {
  n: number;
  title: string;
  summary?: React.ReactNode;
  state: CardState;
  onChange?: () => void;
  children?: React.ReactNode;
}) {
  return (
    <section
      id={`booking-step-${n}`}
      className={`scroll-mt-28 border bg-white transition ${
        state === "open" ? "border-[#265136]/40 shadow-[0_18px_44px_rgba(20,39,29,0.08)]" : "border-[#1f3f2e]/12"
      } ${state === "todo" ? "bg-white/50" : ""}`}
    >
      <header className="flex items-center gap-4 px-5 py-4 sm:px-6">
        <span
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
            state === "done" ? "bg-[#265136] text-[#f3dda0]" : state === "open" ? "border-2 border-[#265136] text-[#265136]" : "border border-[#1f3f2e]/20 text-[#9aa39d]"
          }`}
        >
          {state === "done" ? <CheckIcon /> : n}
        </span>
        <div className="min-w-0 flex-1">
          <h2 className={`text-base font-semibold tracking-[-0.01em] ${state === "todo" ? "text-[#9aa39d]" : "text-[#14271d]"}`}>{title}</h2>
          {state === "done" && summary ? <p className="mt-0.5 truncate text-sm text-[#667269]">{summary}</p> : null}
        </div>
        {state === "done" && onChange ? (
          <button
            type="button"
            onClick={onChange}
            className="shrink-0 rounded-full border border-[#265136]/25 px-4 py-1.5 text-xs font-semibold text-[#265136] transition hover:border-[#265136] hover:bg-[#265136] hover:text-white"
          >
            Change
          </button>
        ) : null}
      </header>
      {state === "open" ? <div className="border-t border-[#1f3f2e]/10 px-5 pb-6 pt-5 sm:px-6">{children}</div> : null}
    </section>
  );
}

export default function TeeTimeBooking({
  today,
  prefill,
  testMode = false,
}: {
  today: string;
  /** Walang PayMongo: confirmed agad ang booking, walang bayad. */
  testMode?: boolean;
  prefill: { name: string; email: string; phone: string } | null;
}) {
  const router = useRouter();
  const [date, setDate] = useState(today);
  /* `open` = ang nakabukas na card (null = lahat sarado, tapos na);
     `furthest` = pinakamalayong naabot — doon bumabalik pagkatapos ng Change. */
  const [open, setOpen] = useState<number | null>(1);
  const [furthest, setFurthest] = useState(1);
  /* Natapos na minsan ang lahat — mananatiling "done" ang huling card kahit
     may binabago sa itaas. */
  const [complete, setComplete] = useState(false);
  const dict = useSiteStrings();
  const tr = (text: string) => (dict && lookup(dict, text)) ?? text;
  const [round, setRound] = useState<Round>("full");
  const holes: Holes = round === "full" ? 18 : 9;
  const [time, setTime] = useState<string | null>(null);
  /* Kasama ang susi (petsa+round) ng availability, para "loading" kapag
     hindi pa ito tugma sa kasalukuyang pili — walang hiwalay na loading state. */
  const [loaded, setLoaded] = useState<{ key: string; data: Availability | null } | null>(null);
  const [refresh, setRefresh] = useState(0);
  const validDate = date >= today && date <= addDays(today, COURSE.bookAheadDays);
  const key = `${date}|${holes}|${refresh}`;
  const availability = loaded?.key === key ? loaded.data : null;
  const loading = validDate && loaded?.key !== key;
  const [players, setPlayers] = useState(2);
  const [names, setNames] = useState<string[]>([]);
  const [addons, setAddons] = useState<Partial<Record<AddonId, number>>>({});
  const [villa, setVilla] = useState<string | null>(null);
  const [contact, setContact] = useState(prefill ?? { name: "", email: "", phone: "" });
  const [status, setStatus] = useState<"idle" | "sending">("idle");
  const [error, setError] = useState<string | null>(null);

  /* Availability kada palit ng petsa o round. */
  useEffect(() => {
    let alive = true;
    if (!validDate) return;
    const current = `${date}|${holes}|${refresh}`;
    fetch(`/api/tee-times?date=${date}&holes=${holes}`, { cache: "no-store" })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => alive && setLoaded({ key: current, data }))
      .catch(() => alive && setLoaded({ key: current, data: null }));
    return () => {
      alive = false;
    };
  }, [date, holes, refresh, validDate]);

  /* Full course: bakante ang oras kapag bakante ang Hole 1 O ang Hole 10 sa
     oras na iyon — Hole 1 ang inuuna. Front/back nine: iisang tee lang. */
  const slots: Choice[] = useMemo(() => {
    if (!availability) return [];
    const front = availability.tees["1"];
    const back = availability.tees["10"];
    if (round === "front") return front.map((slot) => ({ ...slot, tee: 1 as Tee }));
    if (round === "back") return back.map((slot) => ({ ...slot, tee: 10 as Tee }));
    return front.map((slot, i) => {
      if (slot.status === "open") return { ...slot, tee: 1 as Tee };
      if (back[i]?.status === "open") return { ...back[i], tee: 10 as Tee };
      return { ...slot, tee: 1 as Tee };
    });
  }, [availability, round]);
  const selected = slots.find((slot) => slot.time === time && slot.status === "open") ?? null;
  const tee: Tee = selected?.tee ?? (round === "back" ? 10 : 1);
  const selectedOpen = selected !== null;
  const late = time !== null && time >= LATE_START;
  const price = useMemo(() => quote({ holes, players, addons, villa }), [holes, players, addons, villa]);
  const openCount = slots.filter((slot) => slot.status === "open").length;
  const canSubmit = validDate && selectedOpen && contact.name.trim() && contact.email.trim() && contact.phone.trim() && status === "idle";
  const STEPS = ["Date & tee time", "Players", "Add-ons", "Stay the night", "Your details"] as const;
  const contactReady = Boolean(contact.name.trim() && contact.email.trim() && contact.phone.trim());
  const stepReady = (n: number) => (n === 1 ? validDate && selectedOpen : n === 5 ? contactReady : true);
  const cardState = (n: number): CardState =>
    open === n ? "open" : n < furthest || (n === furthest && complete && stepReady(n)) ? "done" : "todo";

  function scrollTo(n: number) {
    window.setTimeout(() => document.getElementById(`booking-step-${n}`)?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }
  /** Bukas ang isang tapos na card para baguhin. */
  function goTo(n: number) {
    setOpen(n);
    scrollTo(n);
  }
  /** "Continue": isara ang card at buksan ang susunod na hindi pa tapos —
      o, kapag pagbabago lang ito, bumalik agad sa pinakamalayong naabot. */
  function proceed(n: number) {
    if (!stepReady(n)) return;
    /* Tapos na ang lahat at pagbabago lang ito → isara lahat, handa nang magbayad. */
    if (furthest === STEPS.length && n !== STEPS.length && stepReady(STEPS.length)) {
      setOpen(null);
      return;
    }
    const next = Math.max(furthest, n + 1);
    if (next > STEPS.length) {
      setFurthest(STEPS.length);
      setComplete(true);
      setOpen(null);
      return;
    }
    setFurthest(next);
    setOpen(next);
    scrollTo(next);
  }

  function changeRound(next: Round) {
    setError(null);
    setRound(next);
    setTime(null);
  }

  function changePlayers(next: number) {
    setPlayers(next);
    setAddons((current) =>
      Object.fromEntries(Object.entries(current).map(([id, qty]) => [id, Math.min(qty ?? 0, addonMax(id as AddonId, next))])),
    );
  }

  async function submit() {
    if (!canSubmit || !time) return;
    setStatus("sending");
    setError(null);
    try {
      const response = await fetch("/api/tee-times/reserve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date,
          holes,
          tee,
          time,
          players,
          playerNames: names.slice(0, players),
          addons,
          villa,
          contactName: contact.name,
          contactEmail: contact.email,
          contactPhone: contact.phone,
        }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; error?: string; code?: string; checkoutUrl?: string };
      if (result.ok && result.code) {
        if (result.checkoutUrl) window.location.assign(result.checkoutUrl);
        else router.push(`/golf/book/${result.code}`);
        return;
      }
      setError(result.error && ERRORS[result.error] ? result.error : "network");
      if (result.error === "taken" || result.error === "time") {
        setTime(null);
        setRefresh((value) => value + 1);
        goTo(1);
      }
    } catch {
      setError("network");
    }
    setStatus("idle");
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
      <div id="booking-steps" className="space-y-3">
        <StepCard
          n={1}
          title={STEPS[0]}
          state={cardState(1)}
          onChange={() => goTo(1)}
          summary={
            <span translate="no">
              {new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" })} · {tr(round === "full" ? "Full course" : round === "front" ? "Front nine" : "Back nine")}
              {selected ? ` · ${formatTime(selected.time)}` : ""}
            </span>
          }
        >
          <label id="booking-date-label" htmlFor="booking-date" className="mt-5 block text-sm font-semibold">Date of play</label>
          <BookingDatePicker
            id="booking-date"
            value={date}
            min={today}
            max={addDays(today, COURSE.bookAheadDays)}
            onChange={(next) => {
              setError(null);
              setDate(next);
              setTime(null);
              setVilla(null);
            }}
          />
          <div className="mt-4">
            <ForecastDays dates={[date]} />
          </div>
          <div className="mt-8 border-t border-[#1f3f2e]/10 pt-6">
          <h3 className={TITLE}>How much would you like to play?</h3>
          <div className="mt-4">
            <Toggle
              value={round}
              onChange={changeRound}
              options={[
                { value: "full", label: "Full course", hint: `Holes 1 to 18 · about 4½ hours · ${formatPeso(GREEN_FEES[18])} per player` },
                { value: "front", label: "Front nine", hint: `Holes 1 to 9 · about 2 hours · ${formatPeso(GREEN_FEES[9])} per player` },
                { value: "back", label: "Back nine", hint: `Holes 10 to 18 · about 2 hours · ${formatPeso(GREEN_FEES[9])} per player` },
              ]}
            />
            <RoundCoverage round={round} />
            <p className="mt-4 border-l-2 border-[#d8b65b] bg-white/60 px-3 py-2 text-xs leading-5 text-[#5d685f]">
              Only want a few holes, like Holes 1 to 5? Choose the Front nine — you can stop whenever you like. The
              9-hole rate applies.
            </p>
          </div>
          </div>
          <div className="mt-8 border-t border-[#1f3f2e]/10 pt-6">
          <h3 className={TITLE}>Choose a tee time</h3>
          <p className="mt-2 text-xs leading-5 text-[#667269]">
            Each tee time is private to your group. Only available tee times are shown below.
          </p>
          <div role="status" aria-live="polite" className="mt-4 border border-[#1f3f2e]/15 bg-white px-4 py-3 text-sm">
            {!validDate ? (
              <p className="text-[#a8492f]">Please choose a date within the next 30 days.</p>
            ) : loading ? (
              <p className="text-[#667269]">Checking availability…</p>
            ) : !availability ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="text-[#a8492f]">Availability could not be loaded.</p>
                <button type="button" onClick={() => setRefresh((value) => value + 1)} className="font-semibold text-[#265136] underline">Try again</button>
              </div>
            ) : openCount === 0 ? (
              <p className="text-[#a8492f]">No tee times available for this date and round. Choose another date or try a different round above.</p>
            ) : (
              <p className="font-semibold text-[#265136]">{openCount} tee times available for your selected round.</p>
            )}
          </div>
          {validDate && !loading && availability && openCount > 0 ? (
            <div className="mt-4 max-w-md">
              <div role="group" aria-label={tr("Choose a tee time")} className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {slots.filter((slot) => slot.status === "open").map((slot) => (
                  <button
                    key={slot.time}
                    type="button"
                    aria-pressed={time === slot.time}
                    onClick={() => { setTime(slot.time); setError(null); }}
                    className={`border px-3 py-3 text-center text-sm font-semibold transition ${time === slot.time ? "border-[#265136] bg-[#265136] text-white" : "border-[#1f3f2e]/20 bg-white text-[#265136] hover:border-[#265136]"}`}
                  >
                    <span translate="no">{formatTime(slot.time)}</span>
                    {round === "full" && slot.tee === 10 ? <span className="mt-1 block text-[10px] font-normal">Hole 10 start</span> : null}
                  </button>
                ))}
              </div>
              {selected ? (
                <p className="mt-3 border-l-2 border-[#265136] bg-white px-3 py-2 text-sm text-[#14271d]">
                  <Tr
                    t="Tee off at {0} from Hole {1}, finishing around {2}."
                    v={[
                      <span key="a" translate="no" className="font-semibold">{formatTime(selected.time)}</span>,
                      String(selected.tee),
                      <span key="b" translate="no" className="font-semibold">
                        {formatTime(toTime(toMinutes(selected.time) + COURSE.durationMinutes[holes]))}
                      </span>,
                    ]}
                  />
                </p>
              ) : null}
            </div>
          ) : null}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            {!stepReady(1) ? <p className="text-xs text-[#8a938c]">Choose a tee time to continue.</p> : null}
            <button
              type="button"
              disabled={!stepReady(1)}
              onClick={() => proceed(1)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#265136] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#f3dda0] transition hover:bg-[#1f3f2e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {1 < furthest ? "Done" : "Continue"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </StepCard>

        <StepCard
          n={2}
          title={STEPS[1]}
          state={cardState(2)}
          onChange={() => goTo(2)}
          summary={<Tr t="{0} players" v={[String(players)]} />}
        >
          <div className="mt-4 flex items-center justify-between gap-4 border border-[#1f3f2e]/12 bg-white px-4 py-3">
            <span className="text-sm text-[#3f4c45]">{`Up to ${COURSE.maxPlayers} players per tee time`}</span>
            <Stepper value={players} min={1} max={COURSE.maxPlayers} onChange={changePlayers} label="Players" />
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            {Array.from({ length: players }, (_, i) => (
              <input
                key={i}
                type="text"
                value={names[i] ?? ""}
                onChange={(event) => setNames((current) => Object.assign([...current], { [i]: event.target.value }))}
                placeholder={i === 0 ? "Player 1 (you)" : `Player ${i + 1} name (optional)`}
                className={FIELD}
              />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            {!stepReady(2) ? <p className="text-xs text-[#8a938c]"></p> : null}
            <button
              type="button"
              disabled={!stepReady(2)}
              onClick={() => proceed(2)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#265136] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#f3dda0] transition hover:bg-[#1f3f2e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {2 < furthest ? "Done" : "Continue"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </StepCard>

        <StepCard
          n={3}
          title={STEPS[2]}
          state={cardState(3)}
          onChange={() => goTo(3)}
          summary={
            ADDONS.some((addon) => (addons[addon.id] ?? 0) > 0)
              ? ADDONS.filter((addon) => (addons[addon.id] ?? 0) > 0)
                  .map((addon) => `${tr(addon.name)} × ${addons[addon.id]}`)
                  .join(", ")
              : tr("No add-ons")
          }
        >
          <div className="mt-4 divide-y divide-[#1f3f2e]/10 border border-[#1f3f2e]/12 bg-white">
            {ADDONS.map((addon) => (
              <div key={addon.id} className="flex items-center justify-between gap-4 px-4 py-3">
                <span>
                  <span className="block text-sm font-semibold text-[#14271d]">{addon.name}</span>
                  <span className="block text-xs text-[#667269]">
                    <span translate="no">{formatPeso(addon.price)}</span> {addon.unit}
                  </span>
                </span>
                <Stepper
                  value={addons[addon.id] ?? 0}
                  min={0}
                  max={addonMax(addon.id, players)}
                  onChange={(qty) => setAddons((current) => ({ ...current, [addon.id]: qty }))}
                  label={addon.name}
                />
              </div>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            {!stepReady(3) ? <p className="text-xs text-[#8a938c]"></p> : null}
            <button
              type="button"
              disabled={!stepReady(3)}
              onClick={() => proceed(3)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#265136] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#f3dda0] transition hover:bg-[#1f3f2e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {3 < furthest ? "Done" : "Continue"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </StepCard>

        <StepCard
          n={4}
          title={STEPS[3]}
          state={cardState(4)}
          onChange={() => goTo(4)}
          summary={villa ? <span translate="no">{VILLA_NIGHTS.find((v) => v.slug === villa)?.name}</span> : tr("No overnight stay")}
        >
          <p className="mt-2 text-xs leading-5 text-[#667269]">
            {late
              ? "Your round finishes late in the afternoon — rest by the course tonight instead of driving home."
              : "Make it a weekend: add a night by the course after your round."}
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {VILLA_NIGHTS.map((house) => {
              const left = availability?.villas[house.slug] ?? house.units;
              const selected = villa === house.slug;
              return (
                <button
                  key={house.slug}
                  type="button"
                  disabled={left === 0}
                  aria-pressed={selected}
                  onClick={() => setVilla(selected ? null : house.slug)}
                  className={`border px-4 py-3 text-left transition disabled:cursor-not-allowed disabled:opacity-50 ${
                    selected ? "border-[#265136] bg-[#265136] text-white" : "border-[#1f3f2e]/20 bg-white text-[#14271d] hover:border-[#265136]"
                  } ${late && !selected && left > 0 ? "ring-1 ring-[#d8b65b]/60" : ""}`}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span translate="no" className="text-sm font-semibold">
                      {house.name}
                    </span>
                    <span translate="no" className="text-sm font-semibold tabular-nums">
                      {formatPeso(house.pricePerNight)}
                    </span>
                  </span>
                  <span className={`mt-0.5 block text-xs ${selected ? "text-white/70" : "text-[#667269]"}`}>
                    {left === 0 ? (
                      "Fully booked tonight"
                    ) : (
                      <Tr t="Sleeps {0} · {1} left tonight" v={[String(house.sleeps), String(left)]} />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            {!stepReady(4) ? <p className="text-xs text-[#8a938c]"></p> : null}
            <button
              type="button"
              disabled={!stepReady(4)}
              onClick={() => proceed(4)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#265136] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#f3dda0] transition hover:bg-[#1f3f2e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {4 < furthest ? "Done" : "Continue"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </StepCard>

        <StepCard
          n={5}
          title={STEPS[4]}
          state={cardState(5)}
          onChange={() => goTo(5)}
          summary={<span translate="no">{[contact.name, contact.email].filter(Boolean).join(" · ")}</span>}
        >
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <input className={FIELD} placeholder="Full name" autoComplete="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
            <input className={FIELD} placeholder="Email" type="email" autoComplete="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
            <input className={FIELD} placeholder="Mobile number" type="tel" autoComplete="tel" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
            {!stepReady(5) ? <p className="text-xs text-[#8a938c]">Enter your name, email, and mobile number.</p> : null}
            <button
              type="button"
              disabled={!stepReady(5)}
              onClick={() => proceed(5)}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-[#265136] px-7 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#f3dda0] transition hover:bg-[#1f3f2e] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {5 < furthest ? "Done" : "Continue"} <span aria-hidden="true">→</span>
            </button>
          </div>
        </StepCard>
      </div>

      {/* Buod — dumidikit sa gilid sa desktop. */}
      <aside className="border border-[#1f3f2e]/12 bg-white p-6 lg:sticky lg:top-28">
        <div className="flex items-center justify-between gap-3">
          <p className={STEP}>Summary</p>
        </div>
        <dl className="mt-4 space-y-1.5 text-sm text-[#3f4c45]">
          <div className="flex justify-between gap-3">
            <dt>Date</dt>
            <dd translate="no" className="font-semibold text-[#14271d]">
              {new Date(`${date}T00:00:00Z`).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" })}
            </dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt>Tee time</dt>
            <dd translate="no" className="font-semibold text-[#14271d]">
              {selectedOpen && time ? `${formatTime(time)} · Hole ${tee}` : "—"}
            </dd>
          </div>
        </dl>
        <ul className="mt-4 space-y-1.5 border-t border-[#1f3f2e]/10 pt-4 text-sm">
          {price.lines.map((line) => (
            <li key={line.label} className="flex justify-between gap-3 text-[#3f4c45]">
              <span>{line.label}</span>
              <span translate="no" className="tabular-nums">
                {formatPeso(line.amount)}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-4 space-y-1.5 border-t border-[#1f3f2e]/10 pt-4 text-sm">
          <div className="flex justify-between gap-3 font-semibold text-[#14271d]">
            <span>Total</span>
            <span translate="no" className="tabular-nums">{formatPeso(price.total)}</span>
          </div>
          <div className="flex justify-between gap-3 text-[#265136]">
            <span>
              <Tr t="Downpayment today ({0}%)" v={[String(Math.round(COURSE.depositRate * 100))]} />
            </span>
            <span translate="no" className="font-semibold tabular-nums">{formatPeso(price.deposit)}</span>
          </div>
          <div className="flex justify-between gap-3 text-[#667269]">
            <span>Balance at the club</span>
            <span translate="no" className="tabular-nums">{formatPeso(price.balance)}</span>
          </div>
        </div>

        {error ? (
          <p role="alert" className="mt-4 border-l-2 border-[#a8492f] bg-[#a8492f]/[0.06] px-3 py-2 text-sm leading-6 text-[#a8492f]">
            {ERRORS[error]}
          </p>
        ) : null}

        <button
          type="button"
          onClick={submit}
          disabled={!canSubmit}
          className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-full bg-[#e7d18d] px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:bg-[#f3dfa0] disabled:cursor-not-allowed disabled:opacity-50"
        >
          {status === "sending" ? "Please wait…" : time && testMode ? (
            "Reserve tee time"
          ) : time ? (
            /* Nakabalot sa <span>: sa loob ng flex na pindutan ay nawawala ang
               espasyo sa gilid ng bawat piraso ("PAY₱2,700DOWNPAYMENT"). */
            <span>
              <Tr t="Pay {0} downpayment" v={[<span key="p" translate="no">{formatPeso(price.deposit)}</span>]} />
            </span>
          ) : (
            "Choose a tee time"
          )}
        </button>
        {!canSubmit && status === "idle" ? (
          <p className="mt-2 text-center text-xs text-[#8a938c]">
            {!selectedOpen ? "Choose your date and tee time first." : "Add your details to finish."}
          </p>
        ) : null}
        <p className="mt-3 text-[11px] leading-5 text-[#8a938c]">
          {testMode ? null : `Pay by GCash, Maya, GrabPay, or card. Your tee time is held for ${COURSE.holdMinutes} minutes while you pay.`}{" "}
          Free cancellation up to 48 hours before your tee time; the downpayment is kept for later cancellations or no-shows.
          Heavy rain? Your downpayment moves to a new date.
        </p>
      </aside>
    </div>
  );
}
