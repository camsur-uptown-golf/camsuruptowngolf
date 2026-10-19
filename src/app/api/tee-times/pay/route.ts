import { NextResponse } from "next/server";
import { simulatePayments, startDownpayment } from "@/lib/booking-server";
import { paymongoConfigured } from "@/lib/paymongo";
import { getReservation } from "@/lib/reservations-db";

export const runtime = "nodejs";

/**
 * "Complete downpayment" sa pahina ng reservation — bagong checkout para sa
 * reservation na naka-hold pa (hal. isinara ng guest ang PayMongo page).
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { code?: string };
  const reservation = getReservation(String(body.code ?? ""));
  if (!reservation || reservation.status !== "held") return NextResponse.json({ ok: false, error: "state" }, { status: 409 });
  if (simulatePayments()) return NextResponse.json({ ok: true, simulate: true });
  if (!paymongoConfigured()) return NextResponse.json({ ok: false, error: "payments" }, { status: 503 });
  try {
    return NextResponse.json({ ok: true, checkoutUrl: await startDownpayment(request, reservation) });
  } catch {
    return NextResponse.json({ ok: false, error: "payments" }, { status: 502 });
  }
}
