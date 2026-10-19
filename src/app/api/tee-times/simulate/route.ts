import { NextResponse } from "next/server";
import { simulatePayments } from "@/lib/booking-server";
import { confirmReservation, getReservation } from "@/lib/reservations-db";

export const runtime = "nodejs";

/**
 * TEST MODE LANG: kinukumpirma ang reservation na parang nabayaran. Gumagana
 * lang kapag walang PayMongo key at hindi production — sa production ay 404.
 */
export async function POST(request: Request) {
  if (!simulatePayments()) return NextResponse.json({ ok: false }, { status: 404 });
  const body = (await request.json().catch(() => ({}))) as { code?: string };
  const reservation = getReservation(String(body.code ?? ""));
  if (!reservation || reservation.status !== "held") return NextResponse.json({ ok: false, error: "state" }, { status: 409 });
  const ok = confirmReservation(reservation.id, "TEST-PAYMENT");
  return NextResponse.json({ ok }, { status: ok ? 200 : 409 });
}
