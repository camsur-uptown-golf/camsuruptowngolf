"use client";

import { useState } from "react";
import { CALL_WINDOWS, CLUB_PHONE } from "@/lib/site-content";
import { todayInManila } from "@/lib/weather";

/**
 * Maikling form para sa mga GRUPO at EVENT — ang tanging kailangang
 * kausapin ang club. Ang round at ang tuluyan ay nabo-book na online
 * (/golf/book, Villa Del Rey), kaya wala na rito ang mga iyon.
 *
 * Pitong tanong: pangalan, email, mobile, uri ng event, petsa, laki ng
 * grupo, mensahe. Sa /api/callback ito nagpo-POST gaya ng dati; ang petsa
 * ay ipinapasa bilang `timeframe` ("Preferred date: …"), at anumang oras
 * ang tawag (wala nang tanong na "best time to call").
 */

const TYPES = ["Corporate event", "Golf tournament", "Wedding or celebration", "Group golf trip", "Something else"] as const;

const FIELD =
  "w-full border border-[#1f3f2e]/25 bg-white px-4 py-3 text-sm text-[#14271d] outline-none transition placeholder:text-[#9aa39d] focus:border-[#265136] focus:ring-2 focus:ring-[#265136]/20";
const LABEL = "block font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#14271d]";

function addDays(date: string, days: number) {
  return new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
}

export default function GroupInquiry() {
  const today = todayInManila();
  const [date, setDate] = useState("");
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
          interest: value("type"),
          guests: Number(value("guests")),
          timeframe: date ? `Preferred date: ${date}` : "Not sure yet",
          question: value("message"),
          callWindows: [...CALL_WINDOWS],
          context: "Plan your visit · Group or event",
        }),
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
        <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-[#14271d]">Your request is on its way.</h3>
        <p className="mt-4 text-sm leading-7 text-[#5d685f]">The events team will get back to you within 48 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto grid max-w-3xl gap-5 sm:grid-cols-2 sm:gap-x-6">
      <div>
        <label className={LABEL} htmlFor="gi-first">
          First name
        </label>
        <input id="gi-first" name="firstName" type="text" required autoComplete="given-name" className={`${FIELD} mt-2.5`} />
      </div>
      <div>
        <label className={LABEL} htmlFor="gi-last">
          Last name
        </label>
        <input id="gi-last" name="lastName" type="text" required autoComplete="family-name" className={`${FIELD} mt-2.5`} />
      </div>
      <div>
        <label className={LABEL} htmlFor="gi-email">
          Email
        </label>
        <input id="gi-email" name="email" type="email" required autoComplete="email" className={`${FIELD} mt-2.5`} />
      </div>
      <div>
        <label className={LABEL} htmlFor="gi-mobile">
          Mobile number
        </label>
        <input id="gi-mobile" name="mobile" type="tel" required autoComplete="tel" placeholder="Ex. +63 917 123 4567" className={`${FIELD} mt-2.5`} />
      </div>
      <div>
        <label className={LABEL} htmlFor="gi-type">
          Type of event
        </label>
        <select id="gi-type" name="type" required defaultValue={TYPES[0]} className={`${FIELD} mt-2.5`}>
          {TYPES.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        <label className={LABEL} htmlFor="gi-guests">
          Group size
        </label>
        <input id="gi-guests" name="guests" type="number" min={1} max={100} required inputMode="numeric" placeholder="Ex. 24" className={`${FIELD} mt-2.5`} />
      </div>
      <div className="sm:col-span-2">
        <label className={LABEL} htmlFor="gi-date">
          Preferred date
          <span className="ml-1.5 font-normal normal-case italic tracking-normal text-[#8a938c]">(optional)</span>
        </label>
        {/* Karaniwang date field (hindi ang BookingDatePicker): opsyonal ito, at
            laging may napiling araw ang calendar na iyon — mukhang "ngayon"
            kahit wala pang pinili. */}
        <input
          id="gi-date"
          type="date"
          value={date}
          min={today}
          max={addDays(today, 365)}
          onChange={(event) => setDate(event.target.value)}
          className={`${FIELD} mt-2.5 max-w-xs`}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={LABEL} htmlFor="gi-message">
          Tell us about your event
        </label>
        <textarea
          id="gi-message"
          name="message"
          rows={4}
          placeholder="Ex. A company golf day for 24 players, with lunch and an awards dinner."
          className={`${FIELD} mt-2.5 resize-y`}
        />
      </div>

      {status === "error" ? (
        <p role="alert" className="text-sm leading-6 text-[#a8492f] sm:col-span-2">
          {`Something went wrong sending your request. Please call the club on ${CLUB_PHONE.label}.`}
        </p>
      ) : null}

      <div className="text-center sm:col-span-2">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex h-12 min-w-[190px] items-center justify-center rounded-full bg-[#e7d18d] px-8 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:-translate-y-0.5 hover:bg-[#f3dfa0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Send request"}
        </button>
      </div>
    </form>
  );
}
