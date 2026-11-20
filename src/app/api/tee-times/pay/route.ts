import { NextResponse } from "next/server";
import { simulatePayments, startDownpayment } from "@/lib/booking-server";
import { pickMethod } from "@/lib/payments";
import { getReservation } from "@/lib/reservations-db";

export const runtime = "nodejs";

/**
 * "Complete downpayment" sa pahina ng reservation — bagong checkout para sa
 * reservation na naka-hold pa (hal. isinara ng guest ang checkout page).
 * `{ code, method }` — method: "paymongo" | "paypal" (default ang una na may susi).
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { code?: string; method?: string };
  const reservation = await getReservation(String(body.code ?? ""));
  if (!reservation || reservation.status !== "held") return NextResponse.json({ ok: false, error: "state" }, { status: 409 });
  if (simulatePayments()) return NextResponse.json({ ok: true, simulate: true });
  const method = pickMethod(body.method);
  if (!method) return NextResponse.json({ ok: false, error: "payments" }, { status: 503 });
  try {
    return NextResponse.json({ ok: true, checkoutUrl: await startDownpayment(request, reservation, method) });
  } catch {
    return NextResponse.json({ ok: false, error: "payments" }, { status: 502 });
  }
}
