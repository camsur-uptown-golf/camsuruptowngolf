"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { METHOD_LABELS } from "@/components/PaymentMethodPicker";
import type { PaymentMethod } from "@/lib/payments";

/**
 * Mga pindutan sa pahina ng reservation na naka-hold pa:
 *   - "Complete downpayment" → bagong checkout (/api/tee-times/pay). Kapag
 *     may PayMongo at PayPal, tig-isang pindutan.
 *   - TEST MODE: "Test payment" → kinukumpirma nang walang totoong bayad
 */
export default function ReservationActions({
  code,
  simulate,
  methods = [],
}: {
  code: string;
  simulate: boolean;
  methods?: PaymentMethod[];
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  async function go(path: string, method?: PaymentMethod) {
    setBusy(method ?? path);
    setFailed(false);
    try {
      const response = await fetch(path, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, method }),
      });
      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; checkoutUrl?: string; simulate?: boolean };
      if (result.checkoutUrl) {
        window.location.assign(result.checkoutUrl);
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
    setBusy(null);
  }

  const button =
    "inline-flex h-12 w-full items-center justify-center rounded-full px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] transition disabled:opacity-60";

  return (
    <div className="mt-6 space-y-3">
      {simulate ? (
        <>
          <button
            type="button"
            disabled={busy !== null}
            onClick={() => go("/api/tee-times/simulate")}
            className="inline-flex h-12 w-full items-center justify-center rounded-full bg-[#e2c77a] px-6 font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#03321b] transition hover:bg-[#efd99b] disabled:opacity-60"
          >
            {busy ? "Please wait…" : "Test payment (no charge)"}
          </button>
          <p className="text-center text-[11px] leading-5 text-[#5f6a62]">
            Test mode: no payment provider is connected yet, so this button confirms the booking without a real payment. It
            only appears on localhost.
          </p>
        </>
      ) : methods.length > 1 ? (
        <>
          <p className="text-center font-navigation text-[11px] font-bold uppercase tracking-[0.14em] text-[#5f6a62]">Complete downpayment with</p>
          {methods.map((method, index) => (
            <button
              key={method}
              type="button"
              disabled={busy !== null}
              onClick={() => go("/api/tee-times/pay", method)}
              className={`${button} ${
                index === 0 ? "bg-[#e2c77a] text-[#03321b] hover:bg-[#efd99b]" : "border border-[#2e5126]/30 text-[#2e5126] hover:border-[#2e5126] hover:bg-[#2e5126] hover:text-white"
              }`}
            >
              {busy === method ? "Please wait…" : <span translate="no">{METHOD_LABELS[method].title}</span>}
            </button>
          ))}
        </>
      ) : (
        <button
          type="button"
          disabled={busy !== null}
          onClick={() => go("/api/tee-times/pay", methods[0])}
          className={`${button} bg-[#e2c77a] text-[#03321b] hover:bg-[#efd99b]`}
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
