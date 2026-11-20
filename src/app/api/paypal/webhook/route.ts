import { NextResponse } from "next/server";
import { confirmMembershipPayment, getMembershipPaymentBySession } from "@/lib/membership-db";
import { emailMembershipPaid } from "@/lib/membership-emails";
import { paypalSessionId } from "@/lib/payments";
import { capturePaypalOrder, verifyPaypalWebhook } from "@/lib/paypal";
import { confirmReservation, getReservationBySession } from "@/lib/reservations-db";

export const runtime = "nodejs";

/**
 * Webhook ng PayPal — pangalawang daan ng kumpirmasyon, para hindi maiwan
 * ang bayad kapag isinara ng guest ang tab pagkatapos mag-approve.
 *
 *   - CHECKOUT.ORDER.APPROVED → kinukuha (capture) ang bayad, saka kinukumpirma.
 *   - PAYMENT.CAPTURE.COMPLETED → kinukumpirma (kung hindi pa).
 *
 * Sa developer.paypal.com: Apps & Credentials → ang app → Webhooks → Add
 * Webhook, URL na https://<domain>/api/paypal/webhook, ang dalawang event sa
 * itaas. Ilagay ang Webhook ID sa PAYPAL_WEBHOOK_ID.
 */
export async function POST(request: Request) {
  const raw = await request.text();
  let event: {
    event_type?: string;
    resource?: { id?: string; supplementary_data?: { related_ids?: { order_id?: string } } };
  };
  try {
    event = JSON.parse(raw);
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  if (!(await verifyPaypalWebhook(request.headers, event))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  const orderId =
    event.event_type === "CHECKOUT.ORDER.APPROVED"
      ? event.resource?.id
      : event.event_type === "PAYMENT.CAPTURE.COMPLETED"
        ? event.resource?.supplementary_data?.related_ids?.order_id
        : undefined;

  if (orderId) {
    const sessionId = paypalSessionId(orderId);
    const reservation = await getReservationBySession(sessionId);
    /* Kung hindi tee time, baka bayad sa membership. */
    const membership = reservation ? null : await getMembershipPaymentBySession(sessionId);
    if (reservation || membership) {
      const paymentRef = await capturePaypalOrder(orderId);
      if (paymentRef && reservation) await confirmReservation(reservation.id, paymentRef);
      if (paymentRef && membership) {
        const paid = await confirmMembershipPayment(membership.id, paymentRef);
        if (paid) emailMembershipPaid(paid);
      }
    }
  }
  /* Laging 200 kapag tunay ang pirma, para hindi paulit-ulit magpadala ang PayPal. */
  return NextResponse.json({ ok: true });
}
