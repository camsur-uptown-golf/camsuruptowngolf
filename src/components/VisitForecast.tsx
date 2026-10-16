"use client";

import { useState } from "react";
import ForecastDays from "@/components/ForecastDays";
import { dateRange, todayInManila } from "@/lib/weather";

/**
 * "Check the weather for your dates" sa Plan Your Visit na form.
 *
 * Opsyonal at PANG-BISITA LANG ito: walang `name` ang dalawang date input,
 * kaya hindi sila kasama sa ipinapadala sa /api/callback. Ang "When would
 * you like to visit?" pa rin ang sinasagot ng form; ito ay para lang makita
 * ng bisita kung uulan sa mga araw na balak niya.
 *
 * Hanggang 14 na araw ang ipinapakitang forecast kahit mas mahaba ang
 * pananatili — sapat iyon para sa karaniwang biyahe at hindi sumasabog ang
 * grid.
 */

const FIELD =
  "w-full border border-[#1f3f2e]/25 bg-white px-4 py-3 text-sm text-[#14271d] outline-none transition focus:border-[#265136] focus:ring-2 focus:ring-[#265136]/20";
const LABEL = "block font-navigation text-[11px] font-bold uppercase tracking-[0.12em] text-[#14271d]";

export default function VisitForecast() {
  const [arrival, setArrival] = useState("");
  const [departure, setDeparture] = useState("");
  const today = todayInManila();

  const end = departure && departure >= arrival ? departure : arrival;
  const dates = arrival ? dateRange(arrival, end, 14) : [];

  return (
    <div className="border border-[#1f3f2e]/12 bg-[#fbf8ef] p-5 sm:p-6">
      <p className={LABEL}>
        Check the weather for your dates
        <span className="ml-1.5 font-normal normal-case italic tracking-normal text-[#8a938c]">(optional)</span>
      </p>
      <p className="mt-1.5 text-xs leading-5 text-[#667269]">See whether rain is expected on the days you plan to visit.</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 sm:gap-x-8">
        <div>
          <label className="text-xs font-semibold text-[#3f4c45]" htmlFor="vf-arrival">
            Arriving
          </label>
          <input
            id="vf-arrival"
            type="date"
            min={today}
            value={arrival}
            onChange={(event) => setArrival(event.target.value)}
            className={`${FIELD} mt-1.5`}
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-[#3f4c45]" htmlFor="vf-departure">
            Leaving
          </label>
          <input
            id="vf-departure"
            type="date"
            min={arrival || today}
            value={departure}
            onChange={(event) => setDeparture(event.target.value)}
            className={`${FIELD} mt-1.5`}
          />
        </div>
      </div>

      {dates.length > 0 ? (
        <div className="mt-5">
          <ForecastDays dates={dates} />
        </div>
      ) : null}
    </div>
  );
}
