import { NextResponse } from "next/server";
import { siteOrigin } from "@/lib/oauth";
import { sessionPaid } from "@/lib/payments";
import { confirmReservation, getReservation } from "@/lib/reservations-db";

export const runtime = "nodejs";

/**
 * Bumabalik dito ang guest mula sa PayMongo o PayPal pagkatapos magbayad. Hindi
 * pinagkakatiwalaan ang pagbalik mismo: tinatanong ang provider kung bayad na
 * talaga (sa PayPal, dito rin kinukuha ang bayad), saka lang kinukumpirma.
 */
export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";
  const reservation = await getReservation(code);
  const origin = siteOrigin(request);
  if (!reservation) return NextResponse.redirect(`${origin}/golf/book`, { status: 303 });

  if (reservation.status !== "confirmed" && reservation.paymentSessionId) {
    const paymentRef = await sessionPaid(reservation.paymentSessionId).catch(() => null);
    if (paymentRef) await confirmReservation(reservation.id, paymentRef);
  }
  return NextResponse.redirect(`${origin}/golf/book/${reservation.code}`, { status: 303 });
}
