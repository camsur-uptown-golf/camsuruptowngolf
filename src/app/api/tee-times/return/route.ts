import { NextResponse } from "next/server";
import { siteOrigin } from "@/lib/oauth";
import { checkoutPaid } from "@/lib/paymongo";
import { confirmReservation, getReservation } from "@/lib/reservations-db";

export const runtime = "nodejs";

/**
 * Bumabalik dito ang guest mula sa PayMongo pagkatapos magbayad. Hindi
 * pinagkakatiwalaan ang pagbalik mismo: tinatanong ang PayMongo kung bayad na
 * talaga ang checkout session, saka lang kinukumpirma.
 */
export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";
  const reservation = getReservation(code);
  const origin = siteOrigin(request);
  if (!reservation) return NextResponse.redirect(`${origin}/golf/book`, { status: 303 });

  if (reservation.status !== "confirmed" && reservation.paymentSessionId) {
    const paymentRef = await checkoutPaid(reservation.paymentSessionId).catch(() => null);
    if (paymentRef) confirmReservation(reservation.id, paymentRef);
  }
  return NextResponse.redirect(`${origin}/golf/book/${reservation.code}`, { status: 303 });
}
