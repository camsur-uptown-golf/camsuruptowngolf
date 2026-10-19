import { NextResponse } from "next/server";
import { COURSE, LATE_START, occupiedSlots, startTimes, type Holes } from "@/lib/golf-booking";
import { nowInManila } from "@/lib/booking-server";
import { bookedSlots, villaVacancies } from "@/lib/reservations-db";
import { daysBetween, todayInManila } from "@/lib/weather";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Availability ng isang petsa: bawat oras ng simula sa Hole 1 at Hole 10,
 * at kung bakante pa. `GET /api/tee-times?date=YYYY-MM-DD&holes=18`.
 *
 * Hindi ibinabalik kung SINO ang nag-book — "booked" lang. Ang lumipas na
 * oras ngayong araw ay "past".
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const date = url.searchParams.get("date") ?? "";
  const holes = (Number(url.searchParams.get("holes")) === 9 ? 9 : 18) as Holes;
  const today = todayInManila();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return NextResponse.json({ error: "date" }, { status: 400 });
  const ahead = daysBetween(today, date);
  if (ahead < 0 || ahead > COURSE.bookAheadDays) return NextResponse.json({ error: "range" }, { status: 400 });

  const taken = new Set(bookedSlots(date).map((slot) => `${slot.tee}-${slot.time}`));
  const now = date === today ? nowInManila() : null;
  const times = startTimes(holes);

  /* Para sa 18 holes, kailangang bakante rin ang crossover sa kabilang tee. */
  const status = (tee: 1 | 10, time: string) => {
    if (now && time <= now) return "past";
    return occupiedSlots(tee, time, holes).some((slot) => taken.has(`${slot.tee}-${slot.time}`)) ? "booked" : "open";
  };

  return NextResponse.json({
    date,
    holes,
    lateStart: LATE_START,
    tees: {
      1: times.map((time) => ({ time, status: status(1, time) })),
      10: times.map((time) => ({ time, status: status(10, time) })),
    },
    villas: villaVacancies(date),
  });
}
