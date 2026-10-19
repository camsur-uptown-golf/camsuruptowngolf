"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Tr from "@/components/Tr";
import { MEMBERSHIP_PLANS, formatPeso, type PlanId } from "@/lib/membership-plans";

/**
 * Ang tatlong membership plan bilang mga card (Birdie, Eagle, Albatross).
 *
 * Dalawang gamit:
 *   - Naka-login (`currentPlan` ay string o null): may "Choose" sa bawat card;
 *     ang kasalukuyang plan ay may tatak at may "Cancel plan".
 *   - Hindi naka-login (`signedIn={false}`): ang pindutan ay papunta sa
 *     Sign up card sa itaas ng pahina.
 *
 * Sa /api/members/plan ito nagpo-POST; `refresh()` para basahin ulit ng server
 * ang plan at ipakita ito sa account card.
 */

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" className="mt-0.5 h-4 w-4 shrink-0" fill="none" aria-hidden="true">
      <path d="m5 12.5 4.5 4.5L19 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function MembershipPlans({ signedIn, currentPlan = null }: { signedIn: boolean; currentPlan?: string | null }) {
  const router = useRouter();
  const [busy, setBusy] = useState<PlanId | "cancel" | null>(null);
  const [failed, setFailed] = useState(false);

  async function choose(plan: PlanId | null) {
    setBusy(plan ?? "cancel");
    setFailed(false);
    try {
      const response = await fetch("/api/members/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan }),
      });
      if (!response.ok) throw new Error(String(response.status));
      router.refresh();
    } catch {
      setFailed(true);
    }
    setBusy(null);
  }

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
        {MEMBERSHIP_PLANS.map((plan) => {
          const isCurrent = currentPlan === plan.id;
          const dark = plan.featured;
          return (
            <article
              key={plan.id}
              className={`relative flex flex-col border p-7 sm:p-8 ${
                dark ? "border-[#265136] bg-[#1f3f2e] text-white shadow-[0_24px_60px_rgba(20,39,29,0.22)]" : "border-[#1f3f2e]/12 bg-white text-[#14271d]"
              } ${isCurrent ? "ring-2 ring-[#d8b65b] ring-offset-2 ring-offset-[#f7f5ee]" : ""}`}
            >
              {dark ? (
                <span className="absolute -top-3 left-7 rounded-full bg-[#e7d18d] px-3 py-1 font-navigation text-[9px] font-bold uppercase tracking-[0.14em] text-[#14271d]">
                  Most popular
                </span>
              ) : null}
              <p className={`font-navigation text-[10px] font-bold uppercase tracking-[0.16em] ${dark ? "text-[#d8b65b]" : "text-[#98782f]"}`}>
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
                <span className={`text-sm ${dark ? "text-white/60" : "text-[#667269]"}`}>/ month</span>
              </p>

              <p className={`mt-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] ${dark ? "text-white/55" : "text-[#8a938c]"}`}>
                Every month you get
              </p>
              <ul className="mt-3 flex-1 space-y-2.5">
                {plan.benefits.map((benefit) => (
                  <li key={benefit} className={`flex gap-2.5 text-sm leading-6 ${dark ? "text-white/88" : "text-[#3f4c45]"}`}>
                    <span className={dark ? "text-[#e7d18d]" : "text-[#265136]"}>
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
                      dark ? "bg-[#e7d18d] text-[#14271d] hover:bg-[#f3dfa0]" : "border border-[#265136]/30 text-[#265136] hover:border-[#265136] hover:bg-[#265136] hover:text-white"
                    }`}
                  >
                    Sign up to join
                  </a>
                ) : isCurrent ? (
                  <div className="space-y-3 text-center">
                    <span
                      className={`inline-flex h-12 w-full items-center justify-center rounded-full border font-navigation text-[11px] font-bold uppercase tracking-[0.14em] ${
                        dark ? "border-[#e7d18d]/50 text-[#e7d18d]" : "border-[#265136]/30 text-[#265136]"
                      }`}
                    >
                      Your plan
                    </span>
                    <button
                      type="button"
                      disabled={busy !== null}
                      onClick={() => choose(null)}
                      className={`text-xs underline underline-offset-4 disabled:opacity-60 ${dark ? "text-white/60 hover:text-white" : "text-[#667269] hover:text-[#14271d]"}`}
                    >
                      {busy === "cancel" ? "Please wait…" : "Cancel plan"}
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={busy !== null}
                    onClick={() => choose(plan.id)}
                    className={`inline-flex h-12 w-full items-center justify-center rounded-full px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] transition disabled:cursor-not-allowed disabled:opacity-60 ${
                      dark ? "bg-[#e7d18d] text-[#14271d] hover:bg-[#f3dfa0]" : "bg-[#265136] text-[#f3dda0] hover:bg-[#1f3f2e]"
                    }`}
                  >
                    {busy === plan.id ? (
                      "Please wait…"
                    ) : currentPlan ? (
                      <span>
                        <Tr t="Switch to {0}" v={[<span key="n" translate="no">{plan.name}</span>]} />
                      </span>
                    ) : (
                      <span>
                        <Tr t="Choose {0}" v={[<span key="n" translate="no">{plan.name}</span>]} />
                      </span>
                    )}
                  </button>
                )}
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
      <p className="mx-auto mt-8 max-w-2xl text-center text-xs leading-6 text-[#8a938c]">
        Prices are in Philippine pesos, billed monthly. Choosing a plan sends your request to the club — the team will
        contact you to confirm and arrange payment. No charge is made online.
      </p>
    </div>
  );
}
