import { createPayment, paymentMethods, type PaymentMethod } from "@/lib/payments";
import { attachPaymentSession, type Reservation } from "@/lib/reservations-db";
import { formatTime } from "@/lib/golf-booking";
import { siteOrigin } from "@/lib/oauth";

/**
 * Mga pinagsasaluhan ng mga booking route.
 *
 * TEST MODE: kapag walang PayMongo AT walang PayPal na susi, at hindi production, walang
 * totoong checkout — sa halip ay may "Test payment" na pindutan sa pahina ng
 * reservation (/api/tee-times/simulate). Sa production na walang susi, hindi
 * puwedeng magbayad, at sinasabi iyon sa guest.
 */

export function simulatePayments(): boolean {
  return paymentMethods().length === 0 && process.env.NODE_ENV !== "production";
}

/** Oras ngayon sa Maynila bilang "HH:MM". */
export function nowInManila(): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone: "Asia/Manila", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(
    new Date(),
  );
}

/** Gumagawa ng checkout (PayMongo o PayPal) para sa downpayment ng reservation. */
export async function startDownpayment(request: Request, reservation: Reservation, method: PaymentMethod): Promise<string> {
  const origin = siteOrigin(request);
  const checkout = await createPayment(method, {
    amount: reservation.amountDeposit,
    name: `Tee time downpayment · ${reservation.code}`,
    description: `${reservation.holes} holes · ${reservation.date} · ${formatTime(reservation.time)} · Hole ${reservation.tee} start · ${reservation.players} player(s)`,
    reference: reservation.code,
    customer: { name: reservation.contactName, email: reservation.contactEmail, phone: reservation.contactPhone },
    successUrl: `${origin}/api/tee-times/return?code=${reservation.code}`,
    cancelUrl: `${origin}/golf/book/${reservation.code}`,
  });
  await attachPaymentSession(reservation.id, checkout.sessionId);
  return checkout.url;
}
