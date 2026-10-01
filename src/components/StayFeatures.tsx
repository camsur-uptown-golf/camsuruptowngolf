"use client";

import { useState } from "react";

/**
 * Highlights at Amenities sa isang row ng label. Default na nakikita ang
 * Highlights; naka-hide ang Amenities hangga't hindi pinipindot ang label nito.
 *
 * Toggle lang ito, hindi buong tab system: kung walang amenities ang stay
 * (Cabins/Cabana/Dwell), "Highlights" na label lang ang lalabas — kapareho ng
 * dating static na itsura. Ang Villa lang (may amenities) ang may switch.
 *
 * Panatilihin ang data-reveal sa MAGULANG na wrapper (nasa VillaDelReyStays),
 * hindi sa listahan dito: nagpapalit ang laman kapag pinindot, at ang
 * data-reveal ay itinatago ang elemento hangga't walang .is-in — kaya dito sa
 * loob, walang data-reveal para laging kita ang napiling listahan.
 */

const LABEL = "font-navigation text-[10px] font-bold uppercase tracking-[0.18em] transition-colors";

export default function StayFeatures({
  highlights,
  amenities,
}: {
  highlights: readonly string[];
  amenities?: readonly string[];
}) {
  const hasAmenities = !!amenities && amenities.length > 0;
  const [view, setView] = useState<"highlights" | "amenities">("highlights");
  const active = hasAmenities ? view : "highlights";
  const list = active === "amenities" && amenities ? amenities : highlights;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {hasAmenities ? (
          <>
            <button
              type="button"
              onClick={() => setView("highlights")}
              aria-pressed={active === "highlights"}
              className={`${LABEL} cursor-pointer border-b-2 pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98782f] ${
                active === "highlights"
                  ? "border-current text-[#98782f]"
                  : "border-transparent text-[#5d685f]/45 hover:text-[#98782f]/80"
              }`}
            >
              Highlights
            </button>
            <span aria-hidden="true" className="pb-1 text-[#5d685f]/30">
              ·
            </span>
            <button
              type="button"
              onClick={() => setView("amenities")}
              aria-pressed={active === "amenities"}
              className={`${LABEL} cursor-pointer border-b-2 pb-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#98782f] ${
                active === "amenities"
                  ? "border-current text-[#98782f]"
                  : "border-transparent text-[#5d685f]/45 hover:text-[#98782f]/80"
              }`}
            >
              Amenities
            </button>
          </>
        ) : (
          <p className={`${LABEL} text-[#98782f]`}>Highlights</p>
        )}
      </div>

      <ul
        className={`mt-4 text-sm text-[#5d685f] ${
          active === "amenities" ? "grid grid-cols-2 gap-x-6 gap-y-3" : "grid gap-3"
        }`}
      >
        {list.map((item) => (
          <li key={item} className="flex items-start gap-3">
            <span className="mt-[9px] size-1.5 shrink-0 rounded-full bg-[#98782f]" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
