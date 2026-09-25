"use client";

import { useState } from "react";
import { CALL_WINDOWS, CLUB_PHONE } from "@/lib/site-content";

/**
 * "Request a call back" na form.
 *
 * Sa /api/callback ito nagpo-POST, at doon naman isinusulat sa lokal na
 * SQLite. Inuulit ng route ang bawat panuntunan dito — ang sinusuri sa
 * kliyente ay para lang sa kaginhawahan ng bisita.
 */
const FORM_ENDPOINT = "/api/callback";

const INTERESTS = [
  "Golf trip",
  "Stay and play package",
  "Corporate or group event",
  "Wedding or celebration",
  "Membership",
  "Something else",
] as const;

const TIMEFRAMES = [
  "Within the next month",
  "In one to three months",
  "In three to six months",
  "More than six months from now",
  "Not sure yet",
] as const;

const FIELD =
  "w-full border border-[#1f3f2e]/25 bg-white px-4 py-3 text-sm text-[#14271d] outline-none transition placeholder:text-[#9aa39d] focus:border-[#265136] focus:ring-2 focus:ring-[#265136]/20";
const LABEL = "block font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#14271d]";

function Required() {
  return <span className="ml-1.5 font-normal normal-case italic tracking-normal text-[#98782f]">(required)</span>;
}

export default function RequestCallback({ context }: { context?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [windowError, setWindowError] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    // Ang native na `required` ay hindi kayang ipilit ang "kahit isa sa
    // pangkat", kaya ang checkbox group lang ang sinusuri dito nang manu-mano.
    const windows = data.getAll("callWindow");
    if (windows.length === 0) {
      setWindowError(true);
      form.querySelector<HTMLInputElement>('input[name="callWindow"]')?.focus();
      return;
    }
    setWindowError(false);

    /* Ang mga susi dito ay dapat eksaktong tumugma sa inaasahan ng route. */
    const payload = {
      firstName: String(data.get("firstName") ?? ""),
      lastName: String(data.get("lastName") ?? ""),
      email: String(data.get("email") ?? ""),
      mobile: String(data.get("mobile") ?? ""),
      postalCode: String(data.get("postalCode") ?? ""),
      interest: String(data.get("interest") ?? ""),
      guests: Number(data.get("guests")),
      timeframe: String(data.get("timeframe") ?? ""),
      callWindows: windows.map(String),
      question: String(data.get("question") ?? ""),
      context: context ?? "",
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
        <p className="font-navigation text-[10px] font-bold uppercase tracking-[0.2em] text-[#98782f]">Thank you</p>
        <h3 className="mt-3 text-2xl font-medium tracking-[-0.035em] text-[#14271d]">Your request is on its way.</h3>
        <p className="mt-4 text-sm leading-7 text-[#5d685f]">
          The club will call you back within 48 hours, during the window you chose. You can also reach us directly.
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
    <form onSubmit={handleSubmit} noValidate={false} className="mx-auto max-w-3xl">
      <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label className={LABEL} htmlFor="rc-first">
            First name
            <Required />
          </label>
          <input id="rc-first" name="firstName" type="text" required autoComplete="given-name" className={`${FIELD} mt-2.5`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="rc-last">
            Last name
            <Required />
          </label>
          <input id="rc-last" name="lastName" type="text" required autoComplete="family-name" className={`${FIELD} mt-2.5`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="rc-email">
            Email
            <Required />
          </label>
          <input id="rc-email" name="email" type="email" required autoComplete="email" className={`${FIELD} mt-2.5`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="rc-postal">
            Postal code
          </label>
          <input id="rc-postal" name="postalCode" type="text" autoComplete="postal-code" className={`${FIELD} mt-2.5`} />
        </div>

        <div>
          <label className={LABEL} htmlFor="rc-interest">
            I am interested in
            <Required />
          </label>
          <select id="rc-interest" name="interest" required defaultValue={INTERESTS[0]} className={`${FIELD} mt-2.5`}>
            {INTERESTS.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className={LABEL} htmlFor="rc-guests">
            How many guests?
            <Required />
          </label>
          <input id="rc-guests" name="guests" type="number" min={1} max={100} required inputMode="numeric" className={`${FIELD} mt-2.5`} />
          <p className="mt-2 text-xs leading-5 text-[#8a938c]">Please enter a number from 1 to 100.</p>
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="rc-question">
            My specific question is…
          </label>
          <textarea id="rc-question" name="question" rows={4} className={`${FIELD} mt-2.5 resize-y`} />
        </div>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="rc-timeframe">
            When would you like to visit?
            <Required />
          </label>
          <select id="rc-timeframe" name="timeframe" required defaultValue="" className={`${FIELD} mt-2.5`}>
            <option value="" disabled>
              Select a timeframe
            </option>
            {TIMEFRAMES.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>

        <fieldset className="sm:col-span-2">
          <legend className={LABEL}>
            The best time to call me back is
            <Required />
          </legend>
          <div className="mt-3.5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {CALL_WINDOWS.map((option) => (
              <label key={option} className="flex cursor-pointer items-center gap-2.5 text-sm text-[#3f4c45]">
                <input
                  type="checkbox"
                  name="callWindow"
                  value={option}
                  onChange={() => setWindowError(false)}
                  className="h-4 w-4 shrink-0 accent-[#265136]"
                />
                {option}
              </label>
            ))}
          </div>
          <p className="mt-2 text-xs leading-5 text-[#8a938c]">Philippine time (PHT).</p>
          {windowError ? (
            <p role="alert" className="mt-2 text-xs font-semibold leading-5 text-[#a8492f]">
              Please choose at least one time window.
            </p>
          ) : null}
        </fieldset>

        <div className="sm:col-span-2">
          <label className={LABEL} htmlFor="rc-mobile">
            Mobile number
            <Required />
          </label>
          <input
            id="rc-mobile"
            name="mobile"
            type="tel"
            required
            autoComplete="tel"
            placeholder="Ex. +63 917 123 4567"
            className={`${FIELD} mt-2.5`}
          />
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
          {status === "sending" ? "Sending…" : "Submit"}
        </button>
      </div>
    </form>
  );
}
