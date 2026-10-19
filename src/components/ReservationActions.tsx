"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Mga pindutan sa pahina ng reservation na naka-hold pa:
 *   - "Complete downpayment" → bagong PayMongo checkout (/api/tee-times/pay)
 *   - TEST MODE: "Test payment" → kinukumpirma nang walang totoong bayad
 */
export default function ReservationActions({ code, simulate }: { code: string; simulate: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [failed, setFailed] = useState(false);

  async function go(path: string) {
    setBusy(true);
    setFailed(false);
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; checkoutUrl?: string; simulate?: boolean };
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
        return;
      }
      if (result.ok && !result.simulate) {
        router.refresh();
      } else if (!result.ok) {
        setFailed(true);
      }
    } catch {
      setFailed(true);
    }
    setBusy(false);
  }

  return (
    <div className="mt-6 space-y-3">
      {simulate ? (
        <>
          <button
            type="button"
            disabled={busy}
            onClick={() => go("/api/tee-times/simulate")}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#e7d18d] px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:bg-[#f3dfa0] disabled:opacity-60"
          >
            {busy ? "Please wait…" : "Test payment (no charge)"}
          </button>
          <p className="text-center text-[11px] leading-5 text-[#8a938c]">
            Test mode: PayMongo is not connected yet, so this button confirms the booking without a real payment. It
            only appears on localhost.
          </p>
        </>
      ) : (
        <button
          type="button"
          disabled={busy}
          onClick={() => go("/api/tee-times/pay")}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#e7d18d] px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#14271d] transition hover:bg-[#f3dfa0] disabled:opacity-60"
        >
          {busy ? "Please wait…" : "Complete downpayment"}
        </button>
      )}
      {failed ? (
        <p role="alert" className="text-center text-sm text-[#a8492f]">
          Something went wrong. Please try again.
        </p>
      ) : null}
    </div>
  );
}
