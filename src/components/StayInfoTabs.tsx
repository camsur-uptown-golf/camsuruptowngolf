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
    <div className="mt-7">
      <div
        role="tablist"
        aria-label="Room information"
        className="flex flex-wrap items-center gap-x-3 gap-y-2 font-navigation text-[10px] font-bold uppercase tracking-[0.18em] xl:text-[11px]"
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
              className={`transition-colors ${
                active === tab.id
                  ? "text-[#98782f]"
                  : "text-[#5d685f]/50 hover:text-[#98782f]/80"
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
        className="mt-6"
      >
        {active === "description" ? (
          <p className="max-w-xl text-sm leading-7 text-[#5d685f] sm:text-base sm:leading-8">
            {description}
          </p>
        ) : (
          <ul
            className={`text-sm text-[#5d685f] ${
              list.length > 8 ? "grid gap-x-8 gap-y-3 sm:grid-cols-2" : "grid gap-3"
            }`}
          >
            {list.map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span
                  className="size-1.5 shrink-0 rounded-full bg-[#98782f]"
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
