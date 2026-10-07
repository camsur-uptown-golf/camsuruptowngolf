"use client";

import { useState } from "react";
import { CLUB_PHONE } from "@/lib/site-content";

/**
 * "Ask about availability" na form para sa isang accommodation.
 *
 * Sa /api/availability ito nagpo-POST, at doon isinusulat sa lokal na SQLite.
 * Alam na ng page kung aling stay ito, kaya naka-pre-fill ang slug/title —
 * ipinapadala bilang hidden, ipinapakita bilang teksto. Isang preferred date
 * lang ang hinihingi, hindi check-in/check-out.
 */
const FORM_ENDPOINT = "/api/availability";

const FIELD =
  "w-full border border-[#1f3f2e]/25 bg-white px-4 py-3 text-sm text-[#14271d] outline-none transition placeholder:text-[#9aa39d] focus:border-[#265136] focus:ring-2 focus:ring-[#265136]/20";
const LABEL = "block font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#14271d]";

function Required() {
  return <span className="ml-1.5 font-normal normal-case italic tracking-normal text-[#d1af58]">(required)</span>;
}

/** Ngayon bilang YYYY-MM-DD (lokal) — `min` ng date input para walang nakaraan. */
function today() {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60_000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

export default function AvailabilityRequest({
  accommodationSlug,
  accommodationTitle,
}: {
  accommodationSlug: string;
  accommodationTitle: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    /* Ang mga susi dito ay dapat eksaktong tumugma sa inaasahan ng route. */
    const payload = {
      accommodationSlug,
      accommodationTitle,
      preferredDate: String(data.get("preferredDate") ?? ""),
      guests: Number(data.get("guests")),
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      mobile: String(data.get("mobile") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus("sending");
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      setStatus(response.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="mx-auto max-w-lg border border-[#1f3f2e]/15 bg-white p-8 text-center sm:p-10">
        <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#d1af58]">Thank you</p>
        <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-[#14271d]">
          Your availability request is on its way.
        </h3>
        <p className="mt-4 text-sm leading-7 text-[#5d685f]">
          The club will get back to you about {accommodationTitle} within 48 hours. You can also reach us directly.
        </p>
        <a
          href={CLUB_PHONE.href}
          className="mt-6 inline-flex h-11 items-center rounded-full border border-[#265136]/30 px-6 font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#265136] transition hover:border-[#265136] hover:bg-[#265136] hover:text-white"
        >
          {CLUB_PHONE.label}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
      <div className="mb-6 border border-[#1f3f2e]/15 bg-white/60 px-4 py-3">
        <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.14em] text-[#98782f]">Stay</p>
        <p className="mt-1 text-sm font-medium text-[#14271d]">{accommodationTitle}</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label className={LABEL} htmlFor="av-date">
            Preferred date
            <Required />
          </label>
          <input
            id="av-date"
            name="preferredDate"
            type="date"
            required
            min={today()}
            className={`${FIELD} mt-2.5`}
          />
        </div>

        <div>
          <label className={LABEL} htmlFor="av-guests">
            How many guests?
            <Required />
          </label>
          <input
            id="av-guests"
            name="guests"
            type="number"
            min={1}
            max={100}
            required
            inputMode="numeric"
            className={`${FIELD} mt-2.5`}
          />
          <p className="mt-2 text-xs leading-5 text-[#8a938c]">Please enter a number from 1 to 100.</p>
        </div>

        <div>
          <label className={LABEL} htmlFor="av-first">
            First name
            <Required />
          </label>
          <input id="av-first" name="firstName" type="text" required autoComplete="given-name" className={`${FIELD} mt-2.5`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="av-last">
            Last name
            <Required />
          </label>
          <input id="av-last" name="lastName" type="text" required autoComplete="family-name" className={`${FIELD} mt-2.5`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="av-email">
            Email
            <Required />
          </label>
          <input id="av-email" name="email" type="email" required autoComplete="email" className={`${FIELD} mt-2.5`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="av-mobile">
            Mobile number
            <Required />
          </label>
          <input
            id="av-mobile"
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            placeholder="Ex. +63 917 123 4567"
            className={`${FIELD} mt-2.5`}
          />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="av-message">
            Anything else we should know?
          </label>
          <textarea id="av-message" name="message" rows={4} className={`${FIELD} mt-2.5 resize-y`} />
        </div>
      </div>

      {status === "error" ? (
        <p role="alert" className="mt-6 text-sm leading-6 text-[#a8492f]">
          Something went wrong sending your request. Please call the club on {CLUB_PHONE.label}.
        </p>
      ) : null}

      <div className="mt-9 text-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-full bg-[#265136] px-8 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-white transition hover:-translate-y-0.5 hover:bg-[#1f3f2e] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Ask about availability"}
        </button>
      </div>
    </form>
  );
}
