import { NextResponse } from "next/server";
import { simulatePayments } from "@/lib/booking-server";
import { getReservation, publicReservation } from "@/lib/reservations-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Ang reservation para sa mobile app — `GET /api/tee-times/reservation?code=CU-…`.
 *
 * Kapareho ng ipinapakita ng /golf/book/[code]: ang code ang "susi" (10
 * random na titik). Sinadyang wala ang email at telepono ng guest — hindi
 * sila ipinapakita ng pahina, kaya hindi rin dito.
 */
export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";
  const reservation = /^CU-[A-Z0-9]{10}$/.test(code) ? await getReservation(code) : null;
  if (!reservation) return NextResponse.json({ ok: false, error: "not-found" }, { status: 404 });

  return NextResponse.json({
    ok: true,
    simulate: simulatePayments(),
    reservation: publicReservation(reservation),
  });
}
