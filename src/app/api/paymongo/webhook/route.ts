import { NextResponse } from "next/server";
import { verifyWebhook } from "@/lib/paymongo";
import { confirmMembershipPayment, getMembershipPaymentBySession } from "@/lib/membership-db";
import { emailMembershipPaid } from "@/lib/membership-emails";
import { confirmReservation, getReservationBySession } from "@/lib/reservations-db";

export const runtime = "nodejs";

/**
 * Webhook ng PayMongo — pangalawang daan ng kumpirmasyon, para makumpirma ang
 * bayad kahit hindi na bumalik sa site ang guest.
 *
 * Sa PayMongo dashboard: Developers → Webhooks → URL na
 * https://<domain>/api/paymongo/webhook, event `checkout_session.payment.paid`.
 * Ilagay ang `whsk_…` secret sa PAYMONGO_WEBHOOK_SECRET.
 */
export async function POST(request: Request) {
  const raw = await request.text();
  if (!verifyWebhook(raw, request.headers.get("paymongo-signature"))) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const event = JSON.parse(raw) as {
    data?: { attributes?: { type?: string; data?: { id?: string; attributes?: { payments?: { id: string }[] } } } };
  };
  const attributes = event.data?.attributes;
  if (attributes?.type === "checkout_session.payment.paid" && attributes.data?.id) {
    const paymentRef = attributes.data.attributes?.payments?.[0]?.id ?? "webhook";
    const reservation = await getReservationBySession(attributes.data.id);
    if (reservation) await confirmReservation(reservation.id, paymentRef);
    /* Kung hindi tee time, baka bayad sa membership. */
    const membership = reservation ? null : await getMembershipPaymentBySession(attributes.data.id);
    if (membership) {
      const paid = await confirmMembershipPayment(membership.id, paymentRef);
      if (paid) emailMembershipPaid(paid);
    }
  }
  /* Laging 200 kapag tunay ang pirma, para hindi paulit-ulit magpadala ang PayMongo. */
  return NextResponse.json({ ok: true });
}
