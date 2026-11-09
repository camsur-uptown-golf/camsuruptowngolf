"use client";

import { useState } from "react";
import { revealConfirmation } from "@/lib/reveal-confirmation";
import Link from "next/link";
import { CALL_WINDOWS, CLUB_PHONE } from "@/lib/site-content";

/**
 * Maikling "Ask a question" na form — para sa mga pahinang tanong lang ang
 * dala ng bisita (hal. bawat hole), hindi buong pagpaplano ng biyahe.
 *
 * Apat na tanong lang: pangalan, email, mobile, at ang tanong. Sa parehong
 * /api/callback ito nagpo-POST gaya ng buong RequestCallback; ang mga field
 * na hinihingi ng route pero walang saysay dito ay pinupunan ng ligtas na
 * default ("Something else", "Not sure yet", 1 guest, anumang oras). Ang
 * `context` ang nagsasabi sa admin kung saang pahina galing ang tanong.
 */

const FIELD =
  "w-full border border-[#03321b]/25 bg-white px-4 py-3 text-sm text-[#03321b] outline-none transition placeholder:text-[#9aa39d] focus:border-[#2e5126] focus:ring-2 focus:ring-[#2e5126]/20";
const LABEL = "block font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#03321b]";

export default function QuickQuestion({ context }: { context: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const value = (key: string) => String(data.get(key) ?? "").trim();

    setStatus("sending");
    try {
      const response = await fetch("/api/callback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: value("firstName"),
          lastName: value("lastName"),
          email: value("email"),
          mobile: value("mobile"),
          question: value("question"),
          interest: "Something else",
          timeframe: "Not sure yet",
          guests: 1,
          callWindows: [...CALL_WINDOWS],
          context: `Question · ${context}`,
        }),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div ref={revealConfirmation} role="status" tabIndex={-1} className="mx-auto max-w-lg outline-none border border-[#03321b]/15 bg-white p-8 text-center">
        <p className="font-navigation text-[11px] font-bold uppercase tracking-[0.2em] text-[#d1af58]">Thank you</p>
        <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-[#03321b]">Your question is on its way.</h3>
        <p className="mt-3 text-sm leading-7 text-[#5d685f]">The club will get back to you within 48 hours.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2 sm:gap-x-6">
        <div>
          <label className={LABEL} htmlFor="qq-first">
            First name
          </label>
          <input id="qq-first" name="firstName" type="text" required autoComplete="given-name" className={`${FIELD} mt-2.5`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="qq-last">
            Last name
          </label>
          <input id="qq-last" name="lastName" type="text" required autoComplete="family-name" className={`${FIELD} mt-2.5`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="qq-email">
            Email
          </label>
          <input id="qq-email" name="email" type="email" required autoComplete="email" className={`${FIELD} mt-2.5`} />
        </div>
        <div>
          <label className={LABEL} htmlFor="qq-mobile">
            Mobile number
          </label>
          <input
            id="qq-mobile"
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            placeholder="Ex. +63 917 123 4567"
            className={`${FIELD} mt-2.5`}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="qq-question">
            Your question
          </label>
          <textarea id="qq-question" name="question" rows={3} required className={`${FIELD} mt-2.5 resize-y`} />
        </div>

        {status === "error" ? (
          <p role="alert" className="text-sm leading-6 text-[#a8492f] sm:col-span-2">
            {`Something went wrong sending your question. Please call the club on ${CLUB_PHONE.label}.`}
          </p>
        ) : null}

        <div className="flex flex-wrap items-center justify-between gap-4 sm:col-span-2">
          <p className="text-sm text-[#5d685f]">
            Ready to play?{" "}
            <Link href="/golf/book" className="font-semibold text-[#2e5126] underline underline-offset-4 hover:text-[#03321b]">
              Reserve your round
            </Link>
          </p>
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex h-12 min-w-[170px] items-center justify-center rounded-full bg-[#e2c77a] px-8 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b] transition hover:-translate-y-0.5 hover:bg-[#efd99b] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending…" : "Send question"}
          </button>
        </div>
      </form>
    </div>
  );
}
