/**
 * Mga patakaran ng tee-time booking — iisang pinagmumulan para sa form, sa
 * API, at sa database.
 *
 * TEE TIME, HINDI KADA HOLE. Ang grupo (hanggang 4) ay nagsisimula sa Hole 1
 * (front nine) o Hole 10 (back nine) at nilalaro ang mga hole nang sunod-sunod.
 * PRIVATE ang bawat slot: isang booking lang kada petsa + tee + oras.
 *
 * CROSSOVER. Ang 18 holes na nagsimula sa Hole 1 nang 7:00 ay darating sa
 * Hole 10 pagkalipas ng `TURN_MINUTES` — kaya sinasakop din nito ang slot ng
 * Hole 10 sa oras na iyon (at baligtad para sa nagsimula sa Hole 10). Kung
 * hindi, may ibang grupong ilalagay doon at magbabanggaan sila sa course.
 *
 * HALIMBAWANG PRESYO ANG LAHAT — hindi pa inaprubahan ng club. Dito lang ang
 * palitan.
 *
 * Walang `node:` import dito, kaya nagagamit din ito sa browser.
 */

export type Tee = 1 | 10;
export type Holes = 9 | 18;

export const COURSE = {
  /** Oras ng course: 6:00 AM hanggang 6:00 PM. Dapat tapos ang bawat round
      bago magsara — kaya kinukuwenta ang huling simula mula rito. */
  firstTee: "06:00",
  closes: "18:00",
  intervalMinutes: 30,
  /** Fine-grained occupancy stays compatible with existing reservations. */
  lockIntervalMinutes: 10,
  /** Tagal mula sa unang tee hanggang sa kabilang tee (para sa crossover). */
  turnMinutes: 130,
  /** Tantiyang tagal ng laro, para sa "matatapos nang mga …". */
  durationMinutes: { 18: 270, 9: 130 } as Record<Holes, number>,
  maxPlayers: 4,
  /**
   * HAWAK NG GRUPO ANG KANILANG NINE habang naglalaro (kagustuhan ng club).
   * Ang Front nine nang 1:00 ay nagsasara ng Holes 1–9 mula 1:00 hanggang
   * ~3:10 — walang ibang grupo sa likod nila. Ang Full course ay nagsasara ng
   * unang nine, saka ng ikalawa pagdating nila roon.
   *
   * `false` = karaniwang golf course: ang oras lang ng simula (at ang
   * crossover) ang sarado, at sumusunod ang ibang grupo nang 30 minuto ang
   * pagitan. Mas maraming grupo kada araw (50+ kaysa ~5 kada nine).
   */
  exclusiveNines: true,
  bookAheadDays: 30,
  /** Gaano katagal naka-hold ang slot habang nagbabayad. */
  holdMinutes: 15,
  /** Bahagdan ng kabuuan na babayaran ngayon; ang natitira ay sa club. */
  depositRate: 0.3,
} as const;

/** Green fee kada manlalaro (PHP). */
export const GREEN_FEES: Record<Holes, number> = { 9: 2500, 18: 4500 };

export type AddonId = "caddie" | "cart" | "clubs" | "range";

export const ADDONS: readonly { id: AddonId; name: string; unit: string; price: number }[] = [
  { id: "caddie", name: "Caddie", unit: "per player", price: 800 },
  { id: "cart", name: "Golf cart", unit: "per cart (2 players)", price: 1800 },
  { id: "clubs", name: "Club rental", unit: "per set", price: 1500 },
  { id: "range", name: "Range bucket", unit: "per bucket", price: 300 },
];

/** Mga bahay sa Villa Del Rey na puwedeng i-book para sa gabi ng laro. */
export const VILLA_NIGHTS: readonly { slug: string; name: string; pricePerNight: number; units: number; sleeps: number }[] = [
  { slug: "villas", name: "Villas", pricePerNight: 9500, units: 4, sleeps: 4 },
  { slug: "dwell", name: "Dwell", pricePerNight: 7500, units: 4, sleeps: 2 },
  { slug: "cabins", name: "Cabins", pricePerNight: 6500, units: 6, sleeps: 2 },
  { slug: "cabana", name: "Cabana", pricePerNight: 4500, units: 6, sleeps: 2 },
];

/** Mula sa oras na ito, imumungkahi ang "Stay the night" (matatapos nang gabi). */
export const LATE_START = "13:00";

/* ---------- Oras ---------- */

export function toMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

export function toTime(minutes: number): string {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

/** "13:30" → "1:30 PM". */
export function formatTime(time: string): string {
  const minutes = toMinutes(time);
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  const suffix = h >= 12 ? "PM" : "AM";
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Huling simula na matatapos pa bago magsara ang course (18 holes: 1:30 PM,
    9 holes: 3:30 PM, kapag 6:00 PM ang sara). */
export function lastStart(holes: Holes): string {
  const latest = toMinutes(COURSE.closes) - COURSE.durationMinutes[holes];
  return toTime(Math.floor(latest / COURSE.intervalMinutes) * COURSE.intervalMinutes);
}

/** Lahat ng puwedeng oras ng simula para sa 9 o 18 holes. */
export function startTimes(holes: Holes): string[] {
  const out: string[] = [];
  for (let t = toMinutes(COURSE.firstTee); t <= toMinutes(lastStart(holes)); t += COURSE.intervalMinutes) {
    out.push(toTime(t));
  }
  return out;
}

/**
 * Ang mga "cell" na sinasakop ng isang booking: `tee` = aling nine (1 = Holes
 * 1–9, 10 = Holes 10–18), `time` = bawat 10-minutong bahagi ng oras.
 *
 * Kapag `exclusiveNines`: bawat cell mula sa simula hanggang sa matapos ang
 * nine — kaya walang ibang booking na puwedeng pumasok sa gitna. Sa 18 holes,
 * ang dalawang nine sa buong tagal ng round (~4½ oras).
 *
 * Kapag hindi: ang simula lang, at (sa 18 holes) ang crossover sa kabilang tee.
 */
export function occupiedSlots(tee: Tee, time: string, holes: Holes): { tee: Tee; time: string }[] {
  const start = toMinutes(time);
  const other: Tee = tee === 1 ? 10 : 1;
  const step = COURSE.lockIntervalMinutes;
  const snap = (minutes: number) => Math.round(minutes / step) * step;

  if (!COURSE.exclusiveNines) {
    const slots: { tee: Tee; time: string }[] = [{ tee, time }];
    if (holes === 18) slots.push({ tee: other, time: toTime(snap(start + COURSE.turnMinutes)) });
    return slots;
  }

  const cells = (nine: Tee, from: number, to: number) => {
    const out: { tee: Tee; time: string }[] = [];
    for (let t = snap(from); t < snap(to); t += step) out.push({ tee: nine, time: toTime(t) });
    return out;
  };
  if (holes === 9) return cells(tee, start, start + COURSE.durationMinutes[9]);
  /* Full course: SARADO ANG BUONG COURSE (dalawang nine) sa buong round,
     hindi lang ang nine na kinaroroonan nila. Dati ay nabubuksan ulit ang
     unang nine pagkalipat nila sa ikalawa (~2 oras) — mukhang 2 oras lang ang
     "buong course" na booking, kaya binago ayon sa gusto ng club. */
  const end = start + COURSE.durationMinutes[18];
  return [...cells(tee, start, end), ...cells(other, start, end)];
}

/* ---------- Presyo ---------- */

export type BookingSelection = {
  holes: Holes;
  players: number;
  addons: Partial<Record<AddonId, number>>;
  villa: string | null;
};

export type Quote = {
  lines: { label: string; amount: number }[];
  total: number;
  deposit: number;
  balance: number;
};

/** Ang pinakamarami sa bawat add-on para sa bilang ng manlalaro. */
export function addonMax(id: AddonId, players: number): number {
  if (id === "caddie") return players;
  if (id === "cart") return Math.ceil(players / 2);
  if (id === "clubs") return players;
  return 8;
}

export function quote(selection: BookingSelection): Quote {
  const lines: { label: string; amount: number }[] = [
    { label: `Green fees · ${selection.holes} holes × ${selection.players}`, amount: GREEN_FEES[selection.holes] * selection.players },
  ];
  for (const addon of ADDONS) {
    const qty = Math.min(selection.addons[addon.id] ?? 0, addonMax(addon.id, selection.players));
    if (qty > 0) lines.push({ label: `${addon.name} × ${qty}`, amount: addon.price * qty });
  }
  const villa = VILLA_NIGHTS.find((v) => v.slug === selection.villa);
  if (villa) lines.push({ label: `${villa.name} · 1 night`, amount: villa.pricePerNight });
  const total = lines.reduce((sum, line) => sum + line.amount, 0);
  const deposit = Math.round(total * COURSE.depositRate);
  return { lines, total, deposit, balance: total - deposit };
}
