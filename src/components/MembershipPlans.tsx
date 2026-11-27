"use client";

import { useState } from "react";
import PaymentMethodPicker, { methodsNote } from "@/components/PaymentMethodPicker";
import Tr from "@/components/Tr";
import { BILLING_TERMS, MEMBERSHIP_PLANS, formatPeso, termPrice, type BillingTerm, type PlanId } from "@/lib/membership-plans";
import type { PaymentMethod } from "@/lib/payments";

/**
 * Ang tatlong membership plan bilang mga card (Birdie, Eagle, Albatross).
 *
 * Dalawang gamit:
 *   - Naka-login: pipili ng ilang buwan (1, 3, 12) at magbabayad sa PayMongo
 *     (GCash, Maya, GrabPay, card) o PayPal (/api/members/checkout). Ang aktibong plan
 *     ay may tatak at "Renew"; idinudugtong ang renewal pagkatapos ng
 *     kasalukuyang `planUntil`.
 *   - Hindi naka-login (`signedIn={false}`): ang pindutan ay papunta sa
 *     Sign up card sa itaas ng pahina.
 */

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MembershipPlans({
  signedIn,
  currentPlan = null,
  planActive = false,
  methods = [],
}: {
  signedIn: boolean;
  /** Mga paraan ng bayad na may susi; pipili ang member kapag dalawa. */
  methods?: PaymentMethod[];
  currentPlan?: string | null;
  /** Bayad pa ang `currentPlan` (hindi pa lumilipas ang `plan_until`). */
  planActive?: boolean;
}) {
  const [months, setMonths] = useState<BillingTerm>(1);
  const [busy, setBusy] = useState<PlanId | null>(null);
  const [failed, setFailed] = useState(false);
  const [method, setMethod] = useState<PaymentMethod>(methods[0] ?? "paymongo");

  async function pay(plan: PlanId) {
    setBusy(plan);
    setFailed(false);
    try {
      const response = await fetch("/api/members/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, months, method }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; url?: string };
      if (!response.ok || !result.ok || !result.url) throw new Error(String(response.status));
      /* Papunta sa PayMongo/PayPal (o, sa test mode, pabalik sa /members na bayad na). */
      window.location.assign(result.url);
      return;
    } catch {
      setFailed(true);
    }
    setBusy(null);
  }

  return (
    <div>
      {signedIn ? (
        <div className="mb-10 flex flex-col items-center gap-3">
          <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#7d6224]">Pay for</p>
          <div role="radiogroup" aria-label="How many months" className="inline-flex rounded-full border border-[#03321b]/15 bg-white p-1">
            {BILLING_TERMS.map((term) => (
              <button
                key={term}
                type="button"
                role="radio"
                aria-checked={months === term}
                onClick={() => setMonths(term)}
                className={`h-10 rounded-full px-5 font-navigation text-[11px] font-bold uppercase tracking-[0.12em] transition ${
                  months === term ? "bg-[#03321b] text-[#efd99b]" : "text-[#2e5126] hover:bg-[#03321b]/5"
                }`}
              >
                {term === 1 ? "1 month" : `${term} months`}
              </button>
            ))}
          </div>
          {methods.length > 1 ? (
            <>
              <p className="mt-3 font-navigation text-[11px] font-bold uppercase tracking-[0.16em] text-[#7d6224]">Pay with</p>
              <div className="w-full max-w-md">
                <PaymentMethodPicker methods={methods} value={method} onChange={setMethod} />
              </div>
            </>
          ) : null}
        </div>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {MEMBERSHIP_PLANS.map((plan) => {
          const isCurrent = currentPlan === plan.id && planActive;
          const dark = plan.featured;
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col border p-7 sm:p-8 ${
                dark ? "border-[#2e5126] bg-[#03321b] text-white shadow-[0_24px_60px_rgba(20,39,29,0.22)]" : "border-[#03321b]/12 bg-white text-[#03321b]"
              } ${isCurrent ? "ring-2 ring-[#e2c77a] ring-offset-2 ring-offset-[#f3ede1]" : ""}`}
            >
              {dark ? (
                <span className="absolute -top-3 left-7 rounded-full bg-[#e2c77a] px-3 py-1 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b]">
                  Most popular
                </span>
              ) : null}
              <p className={`font-navigation text-[11px] font-bold uppercase tracking-[0.16em] ${dark ? "text-[#e2c77a]" : "text-[#7d6224]"}`}>
                {plan.tier}
              </p>
              <h3 translate="no" className="mt-2 font-display text-[2.25rem] font-medium leading-none tracking-[-0.04em]">
                {plan.name}
              </h3>
              <p className={`mt-3 text-sm leading-6 ${dark ? "text-white/70" : "text-[#5d685f]"}`}>{plan.tagline}</p>

              <p className="mt-6 flex items-baseline gap-1.5">
                <span translate="no" className="font-navigation text-3xl font-semibold tabular-nums tracking-[-0.02em]">
                  {formatPeso(plan.pricePerMonth)}
                </span>
                <span className={`text-sm ${dark ? "text-white/60" : "text-[#5f6b63]"}`}>/ month</span>
              </p>
              {signedIn && months > 1 ? (
                <p className={`mt-1 text-sm tabular-nums ${dark ? "text-white/70" : "text-[#5d685f]"}`}>
                  {formatPeso(termPrice(plan, months))} for {months} months
                </p>
              ) : null}

              <p className={`mt-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] ${dark ? "text-white/55" : "text-[#5f6a62]"}`}>
                Every month you get
              </p>
              <ul className="mt-3 flex-1 space-y-2.5">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className={`flex gap-2.5 text-sm leading-6 ${dark ? "text-white/88" : "text-[#3f4c45]"}`}>
                    <span className={dark ? "text-[#e2c77a]" : "text-[#2e5126]"}>
                      <CheckIcon />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                {!signedIn ? (
                  <a
                    href="#member-access"
                    className={`inline-flex h-12 w-full items-center justify-center rounded-full px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] transition ${
                      dark ? "bg-[#e2c77a] text-[#03321b] hover:bg-[#efd99b]" : "border border-[#2e5126]/30 text-[#2e5126] hover:border-[#2e5126] hover:bg-[#2e5126] hover:text-white"
                    }`}
                  >
                    Sign up to join
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() => pay(plan.id)}
                    className={`inline-flex h-12 w-full items-center justify-center rounded-full px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      dark ? "bg-[#e2c77a] text-[#03321b] hover:bg-[#efd99b]" : "bg-[#2e5126] text-[#efd99b] hover:bg-[#03321b]"
                    }`}
                  >
                    {busy === plan.id ? (
                      "Please wait…"
                    ) : isCurrent ? (
                      <span>
                        <Tr t="Renew · {0}" v={[<span key="p" translate="no">{formatPeso(termPrice(plan, months))}</span>]} />
                      </span>
                    ) : (
                      <span>
                        <Tr t="Pay {0}" v={[<span key="p" translate="no">{formatPeso(termPrice(plan, months))}</span>]} />
                      </span>
                    )}
                  </button>
                )}
                {isCurrent ? (
                  <p className={`mt-3 text-center font-navigation text-[11px] font-bold uppercase tracking-[0.14em] ${dark ? "text-[#e2c77a]" : "text-[#2e5126]"}`}>
                    Your plan
                  </p>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>

      {failed ? (
        <p role="alert" className="mt-6 text-center text-sm text-[#a8492f]">
          Something went wrong. Please try again.
        </p>
      ) : null}
      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-6 text-[#5f6a62]">
        Prices are in Philippine pesos. {methodsNote(methods.length ? methods : ["paymongo"])} Your membership
        is active right after payment; renewing the same plan adds the months after your current end date.
      </p>
    </div>
  );
}
