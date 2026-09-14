"use client";

import { useState } from "react";

/**
 * Newsletter sa footer.
 *
 * Hiwalay itong client component para manatiling server-rendered ang buong
 * Footer — ito lang ang bahaging may state.
 *
 * Dating `type="button"` na walang <form> at walang handler: wala talagang
 * nangyayari kapag pinindot. Nagpo-POST na ito sa /api/subscribe ngayon.
 */
export default function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setStatus("sending");
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(data.get("email") ?? ""),
          consent: data.get("consent") === "on",
        }),
      });

      if (response.ok) {
        setStatus("done");
        return;
      }
      const payload = (await response.json().catch(() => null)) as { error?: string } | null;
      setMessage(payload?.error ?? "Something went wrong. Please try again.");
      setStatus("error");
    } catch {
      setMessage("Could not reach the club. Please try again.");
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="mt-6 max-w-md rounded-2xl border border-[#c9a54e]/35 bg-[#c9a54e]/10 px-5 py-4 text-sm leading-6 text-[#f0dca0]">
        Thank you — you are on the list. Look out for course updates and club news.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-6 flex flex-col gap-2 sm:max-w-md sm:flex-row lg:flex-col xl:flex-row">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="Email address"
          aria-label="Email address"
          className="min-w-0 flex-1 rounded-full border border-white/15 bg-white/[0.035] px-5 py-3.5 text-sm text-white placeholder-white/35 outline-none transition focus:border-[#c9a54e]/65 focus:bg-white/[0.055]"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="shrink-0 rounded-full bg-[#e7d18d] px-6 py-3.5 text-xs font-bold uppercase tracking-[0.1em] text-[#0a2619] transition hover:bg-[#f3dfa0] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "sending" ? "Sending…" : "Subscribe"}
        </button>
      </div>

      <label className="mt-4 flex max-w-md gap-3 text-[11px] leading-5 text-white/42">
        {/* Kailangan ng `required`: ang pagsang-ayon ang batayan ng pag-iimbak
            ng email sa ilalim ng RA 10173, kaya hindi ito opsyonal. */}
        <input type="checkbox" name="consent" required className="mt-0.5 h-4 w-4 shrink-0 rounded accent-[#c9a54e]" />
        <span>
          I agree to receive news and offers from CamSur Uptown, and I have read the{" "}
          {/* TODO: ikabit sa totoong Privacy Policy kapag mayroon na. Hindi ito
              link ngayon dahil walang pahinang matuturo. */}
          <span className="text-white/80">Privacy Policy</span>.
        </span>
      </label>

      {status === "error" ? (
        <p role="alert" className="mt-3 max-w-md text-[11px] leading-5 text-[#f0b8a4]">
          {message}
        </p>
      ) : null}
    </form>
  );
}
