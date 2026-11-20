import { NextResponse } from "next/server";
import { confirmMembershipPayment, getMembershipPayment } from "@/lib/membership-db";
import { emailMembershipPaid } from "@/lib/membership-emails";
import { siteOrigin } from "@/lib/oauth";
import { sessionPaid } from "@/lib/payments";

export const runtime = "nodejs";

/**
 * Pagbalik mula sa PayMongo o PayPal. Hindi pinagkakatiwalaan ang pagbalik
 * mismo: tinatanong ang provider kung bayad na talaga, saka lang ina-activate.
 * Kapag hindi pa (hal. naproseso pa), ang webhook ang tatapos nito.
 */
export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code") ?? "";
  const origin = siteOrigin(request);
  const payment = /^MB-[A-Z0-9]{10}$/.test(code) ? await getMembershipPayment(code) : null;
  if (!payment) return NextResponse.redirect(`${origin}/members#plans`, { status: 303 });

  if (payment.status === "pending" && payment.checkoutSessionId) {
    const paymentRef = await sessionPaid(payment.checkoutSessionId).catch(() => null);
    if (paymentRef) {
      const paid = await confirmMembershipPayment(payment.id, paymentRef);
      if (paid) emailMembershipPaid(paid);
    }
  }
  return NextResponse.redirect(`${origin}/members?paid=${payment.code}#plans`, { status: 303 });
}
