"use client";

import { useEffect, useState } from "react";
import WeatherIcon from "@/components/WeatherIcon";
import { useTranslation } from "@/i18n/LanguageProvider";
import { weatherIntlLocale, weatherPhrases } from "@/lib/weather-i18n";
import {
  type DayForecast,
  type MonthClimate,
  daysBetween,
  describeWeather,
  fetchForecast,
  fetchMonthlyClimate,
  rainVerdict,
  todayInManila,
} from "@/lib/weather";

/**
 * Forecast para sa mga partikular na petsa — kung uulan ba sa araw ng
 * pagbisita.
 *
 * Bawat petsang nasa loob ng 16 na araw ay may sariling card (tsansa ng
 * ulan, langit, init). Ang lampas doon ay hindi na hinuhulaan: ipinapakita
 * ang KARANIWANG panahon sa buwang iyon, na malinaw na naka-label na
 * "typical", para walang mag-akalang forecast iyon.
 *
 * `tone`: "light" sa mga form (krema na background), "dark" sa side bar.
 *
 * SARILI NITO ANG SALIN (`weather-i18n.ts` + Intl para sa araw at buwan),
 * kaya naka-`translate="no"` ito — hindi ito ginagalaw ng DomTranslator.
 */

function formatDay(date: string, lang: string) {
  const d = new Date(`${date}T00:00:00Z`);
  return {
    weekday: d.toLocaleDateString(lang, { weekday: "short", timeZone: "UTC" }),
    day: d.toLocaleDateString(lang, { month: "short", day: "numeric", timeZone: "UTC" }),
  };
}

function monthName(month: number, lang: string) {
  return new Date(Date.UTC(2000, month - 1, 1)).toLocaleDateString(lang, { month: "long", timeZone: "UTC" });
}

export default function ForecastDays({ dates, tone = "light" }: { dates: string[]; tone?: "light" | "dark" }) {
  const [forecast, setForecast] = useState<DayForecast[] | null>(null);
  const [climate, setClimate] = useState<MonthClimate[] | null>(null);
  const [failed, setFailed] = useState(false);
  const { locale } = useTranslation();
  const p = weatherPhrases(locale);
  const lang = weatherIntlLocale(locale);

  const today = todayInManila();
  const upcoming = dates.filter((date) => daysBetween(today, date) >= 0);
  const lastForecastDate = forecast?.at(-1)?.date;
  const beyond = upcoming.filter((date) => (lastForecastDate ? date > lastForecastDate : daysBetween(today, date) >= 16));
  const needsClimate = beyond.length > 0;

  useEffect(() => {
    let alive = true;
    fetchForecast()
      .then((data) => alive && setForecast(data))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!needsClimate || climate) return;
    let alive = true;
    fetchMonthlyClimate()
      .then((data) => alive && setClimate(data))
      .catch(() => {
        /* Walang typical na datos — ang paalala na lang ang lalabas. */
      });
    return () => {
      alive = false;
    };
  }, [needsClimate, climate]);

  if (upcoming.length === 0) return null;

  const dark = tone === "dark";
  const muted = dark ? "text-white/60" : "text-[#667269]";
  const card = dark ? "border-white/12 bg-white/[0.06]" : "border-[#1f3f2e]/12 bg-white";
  const strong = dark ? "text-white" : "text-[#14271d]";
  const accent = dark ? "text-[#f3dda0]" : "text-[#265136]";

  const byDate = new Map(forecast?.map((day) => [day.date, day]) ?? []);
  const forecastDays = upcoming.map((date) => byDate.get(date)).filter((day): day is DayForecast => Boolean(day));
  /* Pahalang na hilera kada araw: sa side bar, at kapag iisang petsa lang
     (masyadong makitid ang 7-column na grid para sa isang card). */
  const row = dark || forecastDays.length === 1;
  const beyondMonths = [...new Set(beyond.map((date) => Number(date.slice(5, 7))))];

  if (failed && beyondMonths.length === 0) {
    return (
      <p translate="no" className={`text-xs leading-5 ${muted}`}>
        {p.unavailable}
      </p>
    );
  }

  return (
    <div translate="no" className="space-y-3" aria-live="polite">
      {!forecast && !failed ? <p className={`text-xs leading-5 ${muted}`}>{p.loading}</p> : null}

      {forecastDays.length > 0 ? (
        <ul className={`grid gap-2 ${row ? "grid-cols-1" : "grid-cols-2 sm:grid-cols-4 lg:grid-cols-7"}`}>
          {forecastDays.map((day) => {
            const { label, kind } = describeWeather(day.code);
            const { weekday, day: dayLabel } = formatDay(day.date, lang);
            const rainy = (day.rainChance ?? 0) >= 40 || kind === "rain" || kind === "storm";
            return (
              <li
                key={day.date}
                className={`border ${card} ${row ? "flex items-center gap-3 px-3 py-2" : "flex flex-col items-center gap-1 px-2 py-3 text-center"} ${dark ? "rounded-lg" : ""}`}
                title={`${p.sky[label as keyof typeof p.sky] ?? label}, ${Math.round(day.minC)}–${Math.round(day.maxC)}°C, ${Math.round(day.rainMm)} mm rain, wind up to ${Math.round(day.windKmh)} km/h`}
              >
                <span className={`${row ? "w-14 shrink-0" : ""} leading-tight`}>
                  <span className={`block text-[10px] font-bold uppercase tracking-[0.12em] ${muted}`}>{weekday}</span>
                  <span className={`block text-xs font-semibold ${strong}`}>{dayLabel}</span>
                </span>
                <WeatherIcon kind={kind} className={`h-6 w-6 shrink-0 ${rainy ? (dark ? "text-[#9cc7e6]" : "text-[#3f7aa8]") : accent}`} />
                <span className={`${row ? "min-w-0 flex-1" : ""} leading-tight`}>
                  <span className={`block text-xs font-semibold ${strong}`}>
                    {day.rainChance !== null ? p.rain(day.rainChance) : (p.sky[label as keyof typeof p.sky] ?? label)}
                  </span>
                  <span className={`block text-[10px] ${muted}`}>{p.verdict[rainVerdict(day.rainChance, day.rainMm)]}</span>
                </span>
                <span className={`text-[11px] tabular-nums ${muted}`}>
                  {Math.round(day.maxC)}° / {Math.round(day.minC)}°
                </span>
              </li>
            );
          })}
        </ul>
      ) : null}

      {beyondMonths.length > 0 ? (
        <div className={`border ${card} px-4 py-3 text-xs leading-5 ${muted}`}>
          <p className={`font-semibold ${strong}`}>{p.beyond(forecastDays.length > 0)}</p>
          {climate
            ? beyondMonths.map((month) => {
                const c = climate[month - 1];
                return (
                  <p key={month} className="mt-1">
                    {p.typical(monthName(month, lang), Math.round(c.rainyDayShare * 100), Math.round(c.avgMinC), Math.round(c.avgMaxC), c.years)}
                  </p>
                );
              })
            : null}
          <p className="mt-1">{p.checkBack}</p>
        </div>
      ) : null}

      <p className={`text-[10px] leading-4 ${muted}`}>{p.footnote}</p>
    </div>
  );
}
