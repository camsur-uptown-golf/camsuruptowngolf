import { NextResponse } from "next/server";
import { ADDONS, COURSE, VILLA_NIGHTS, addonMax, quote, startTimes, type AddonId, type Holes, type Tee } from "@/lib/golf-booking";
import { nowInManila, simulatePayments, startDownpayment } from "@/lib/booking-server";
import { currentMember } from "@/lib/member-session";
import { paymongoConfigured } from "@/lib/paymongo";
import { confirmReservation, createHeldReservation } from "@/lib/reservations-db";
import { daysBetween, todayInManila } from "@/lib/weather";

export const runtime = "nodejs";

/**
 * Bagong reservation: sinusuri ang lahat, ini-hold ang slot, at gumagawa ng
 * PayMongo checkout para sa downpayment.
 *
 * Ang presyo ay kinukuwenta DITO, hindi tinatanggap mula sa browser — kung
 * hindi, puwedeng magpadala ang kahit sino ng ₱1 na "kabuuan".
 *
 * Sagot: `{ ok, code, checkoutUrl? , simulate? }` o `{ ok:false, error }`.
 * Mga error: invalid, date, time, taken, villa-full, contact, payments.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const text = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

  const date = text(body.date, 10);
  const holes = (Number(body.holes) === 9 ? 9 : 18) as Holes;
  const tee = (Number(body.tee) === 10 ? 10 : 1) as Tee;
  const time = text(body.time, 5);
  const players = Number(body.players);

  const today = todayInManila();
  const ahead = /^\d{4}-\d{2}-\d{2}$/.test(date) ? daysBetween(today, date) : -1;
  if (ahead < 0 || ahead > COURSE.bookAheadDays) return NextResponse.json({ ok: false, error: "date" }, { status: 400 });
  if (!startTimes(holes).includes(time) || (date === today && time <= nowInManila())) {
    return NextResponse.json({ ok: false, error: "time" }, { status: 400 });
  }
  if (!Number.isInteger(players) || players < 1 || players > COURSE.maxPlayers) {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  const contactName = text(body.contactName, 120);
  const contactEmail = text(body.contactEmail, 160).toLowerCase();
  const contactPhone = text(body.contactPhone, 40);
  if (!contactName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactEmail) || !contactPhone) {
    return NextResponse.json({ ok: false, error: "contact" }, { status: 400 });
  }
  const names = Array.isArray(body.playerNames) ? body.playerNames : [];
  const playerNames = Array.from({ length: players }, (_, i) => text(names[i], 80) || (i === 0 ? contactName : `Player ${i + 1}`));

  const rawAddons = (typeof body.addons === "object" && body.addons !== null ? body.addons : {}) as Record<string, unknown>;
  const addons: Partial<Record<AddonId, number>> = {};
  for (const addon of ADDONS) {
    const qty = Math.floor(Number(rawAddons[addon.id]) || 0);
    if (qty > 0) addons[addon.id] = Math.min(qty, addonMax(addon.id, players));
  }
  const villaSlug = VILLA_NIGHTS.some((v) => v.slug === body.villa) ? String(body.villa) : null;

  if (!paymongoConfigured() && !simulatePayments()) {
    return NextResponse.json({ ok: false, error: "payments" }, { status: 503 });
  }

  const price = quote({ holes, players, addons, villa: villaSlug });
  const member = await currentMember();
  const result = createHeldReservation({
    date,
    tee,
    time,
    holes,
    players,
    playerNames,
    contactName,
    contactEmail,
    contactPhone,
    memberId: member?.id ?? null,
    addons,
    villaSlug,
    amountTotal: price.total,
    amountDeposit: price.deposit,
  });
  if (!result.ok) return NextResponse.json({ ok: false, error: result.error }, { status: 409 });

  /* TEST MODE (walang PayMongo key, hindi production): confirmed agad, walang bayad. */
  if (simulatePayments()) {
    confirmReservation(result.reservation.id, "TEST-PAYMENT");
    return NextResponse.json({ ok: true, code: result.reservation.code });
  }
  try {
    const checkoutUrl = await startDownpayment(request, result.reservation);
    return NextResponse.json({ ok: true, code: result.reservation.code, checkoutUrl });
  } catch {
    /* Naka-hold pa rin ang slot — puwedeng subukan ulit sa pahina ng reservation. */
    return NextResponse.json({ ok: true, code: result.reservation.code });
  }
}
