import { NextResponse } from "next/server";
import { requestMember } from "@/lib/app-auth";
import { simulatePayments } from "@/lib/booking-server";
import { attachMembershipCheckout, confirmMembershipPayment, createPendingPayment } from "@/lib/membership-db";
import { emailMembershipPaid } from "@/lib/membership-emails";
import { findPlan, isBillingTerm, termPrice } from "@/lib/membership-plans";
import { siteOrigin } from "@/lib/oauth";
import { createPayment, pickMethod } from "@/lib/payments";

export const runtime = "nodejs";

/**
 * Bayad sa membership: `{ plan, months, method }` → PayMongo checkout (GCash,
 * Maya, GrabPay, card) o PayPal — `method`: "paymongo" | "paypal". Ang presyo
 * ay kinukuwenta DITO mula sa membership-plans.ts, hindi mula sa browser.
 *
 * Sagot: `{ ok: true, url }` — ang checkout, o (TEST MODE: walang
 * PayMongo/PayPal key at hindi production) diretso sa /members na bayad na.
 * Mga error: auth, plan, payments, failed.
 */
export async function POST(request: Request) {
  const member = await requestMember(request);
  if (!member) return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });

  const body = (await request.json().catch(() => ({}))) as { plan?: unknown; months?: unknown; method?: unknown };
  const plan = findPlan(typeof body.plan === "string" ? body.plan : null);
  const months = Number(body.months);
  if (!plan || !isBillingTerm(months)) return NextResponse.json({ ok: false, error: "plan" }, { status: 400 });

  const origin = siteOrigin(request);
  const amount = termPrice(plan, months);

  if (simulatePayments()) {
    const payment = await createPendingPayment({ memberId: member.id, plan: plan.id, months, amount, source: "test" });
    const paid = await confirmMembershipPayment(payment.id, "TEST-PAYMENT");
    if (paid) emailMembershipPaid(paid);
    return NextResponse.json({ ok: true, url: `${origin}/members?paid=${payment.code}#plans` });
  }
  const method = pickMethod(body.method);
  if (!method) return NextResponse.json({ ok: false, error: "payments" }, { status: 503 });

  const payment = await createPendingPayment({ memberId: member.id, plan: plan.id, months, amount, source: method });
  try {
    const checkout = await createPayment(method, {
      amount,
      name: `${plan.name} membership · ${months} ${months === 1 ? "month" : "months"}`,
      description: `CamSur Uptown Golf ${plan.name} membership`,
      reference: payment.code,
      customer: { name: `${member.firstName} ${member.lastName}`.trim(), email: member.email, phone: member.mobile ?? "" },
      successUrl: `${origin}/api/members/checkout/return?code=${payment.code}`,
      cancelUrl: `${origin}/members#plans`,
    });
    await attachMembershipCheckout(payment.id, checkout.sessionId);
    return NextResponse.json({ ok: true, url: checkout.url });
  } catch (error) {
    console.warn("[membership] checkout:", error instanceof Error ? error.message : error);
    return NextResponse.json({ ok: false, error: "failed" }, { status: 502 });
  }
}
