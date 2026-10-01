"use client";

import { useId, useState, Fragment } from "react";

/**
 * Tabbed na impormasyon ng isang stay: DESCRIPTION · KEY FACTS · AMENITIES.
 *
 * Ipinapalit lang nito ang gitnang teksto ng kaliwang column ng stay card —
 * ang pangalan sa itaas at ang "Ask about availability" sa ibaba ay nasa
 * VillaDelReyStays pa rin. Isang tab lang ang nakikita kada oras; ang di-
 * aktibong nilalaman ay hindi ni-re-render, kaya walang epekto sa taas o sa
 * reveal animation (nasa panlabas na wrapper ang data-reveal).
 *
 * Ginto (#98782f) ang aktibong tab para tumugma sa mga label ng site (Setting,
 * Gallery, Highlights) — sinasadyang hindi ginaya ang lila ng reference dahil
 * berde-ginto-cream ang buong palette dito.
 */

type TabId = "description" | "keyFacts" | "amenities";

const TABS: { id: TabId; label: string }[] = [
  { id: "description", label: "Description" },
  { id: "keyFacts", label: "Key facts" },
  { id: "amenities", label: "Amenities" },
];

export default function StayInfoTabs({
  description,
  keyFacts,
  amenities,
}: {
  description: string;
  keyFacts: readonly string[];
  amenities: readonly string[];
}) {
  const uid = useId();
  const [active, setActive] = useState<TabId>("description");

  const list = active === "keyFacts" ? keyFacts : amenities;

  return (
    <div className="mt-8">
      <div
        role="tablist"
        aria-label="Room information"
        className="flex flex-wrap items-center gap-x-1.5 gap-y-2 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] sm:text-[11px] sm:tracking-[0.18em]"
      >
        {TABS.map((tab, index) => (
          <Fragment key={tab.id}>
            {index > 0 ? (
              <span aria-hidden="true" className="text-[#5d685f]/35">
                ·
              </span>
            ) : null}
            <button
              type="button"
              role="tab"
              id={`${uid}-tab-${tab.id}`}
              aria-selected={active === tab.id}
              aria-controls={`${uid}-panel`}
              onClick={() => setActive(tab.id)}
              className={`cursor-pointer rounded-full border px-3 py-2 transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98782f] ${
                active === tab.id
                  ? "border-[#98782f]/35 bg-[#98782f]/10 text-[#98782f] shadow-[inset_0_0_0_1px_rgba(152,120,47,0.05)]"
                  : "border-transparent text-[#5d685f]/55 hover:-translate-y-0.5 hover:border-[#98782f]/25 hover:bg-[#98782f]/[0.06] hover:text-[#7e6327]"
              }`}
            >
              {tab.label}
            </button>
          </Fragment>
        ))}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-tab-${active}`}
        className="mt-7"
      >
        {active === "description" ? (
          <p className="max-w-xl text-[clamp(1.05rem,1.25vw,1.3rem)] font-light leading-[1.7] tracking-[-0.018em] text-[#5d685f]">
            {description}
          </p>
        ) : (
          <ul
            className={`text-[13px] leading-7 text-[#5d685f] sm:text-sm ${
              list.length > 8 ? "grid grid-cols-2 gap-x-5 gap-y-3 sm:gap-x-8" : "grid gap-4"
            }`}
          >
            {list.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span
                  className="mt-[11px] size-1.5 shrink-0 rounded-full bg-[#98782f]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
