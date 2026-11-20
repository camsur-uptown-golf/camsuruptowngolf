"use client";

import type { PaymentMethod } from "@/lib/payments";

/**
 * Pagpili ng paraan ng bayad — lumalabas lang kapag dalawa ang may susi
 * (PayMongo at PayPal). Kapag iisa, wala itong ipinapakita.
 */

export const METHOD_LABELS: Record<PaymentMethod, { title: string; detail: string }> = {
  paymongo: { title: "GCash · Maya · Card", detail: "Also GrabPay, via PayMongo" },
  paypal: { title: "PayPal", detail: "PayPal balance or card" },
};

/** Maikling paliwanag sa ilalim ng pindutan, ayon sa mga paraang bukas. */
export function methodsNote(methods: PaymentMethod[]): string {
  const parts = methods.map((method) => (method === "paymongo" ? "GCash, Maya, GrabPay or card" : "PayPal"));
  return parts.length ? `Pay by ${parts.join(", or ")}.` : "";
}

export default function PaymentMethodPicker({
  methods,
  value,
  onChange,
  dark = false,
}: {
  methods: PaymentMethod[];
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  dark?: boolean;
}) {
  if (methods.length < 2) return null;
  return (
    <div role="radiogroup" aria-label="Payment method" className="grid grid-cols-2 gap-2">
      {methods.map((method) => {
        const selected = value === method;
        return (
          <button
            key={method}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(method)}
            className={`flex flex-col items-start rounded-xl border px-3 py-2.5 text-left transition ${
              selected
                ? "border-[#2e5126] bg-[#2e5126]/[0.06] ring-1 ring-[#2e5126]"
                : dark
                  ? "border-white/20 hover:border-white/50"
                  : "border-[#03321b]/15 bg-white hover:border-[#2e5126]/50"
            }`}
          >
            <span translate="no" className={`text-sm font-semibold ${dark && !selected ? "text-white" : "text-[#03321b]"}`}>
              {METHOD_LABELS[method].title}
            </span>
            <span className={`text-[11px] leading-4 ${dark && !selected ? "text-white/60" : "text-[#5f6a62]"}`}>{METHOD_LABELS[method].detail}</span>
          </button>
        );
      })}
    </div>
  );
}
