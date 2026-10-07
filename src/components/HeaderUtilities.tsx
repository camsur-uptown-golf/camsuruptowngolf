"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALE_LABELS, SWITCHER_LOCALES } from "@/i18n/config";
import { useTranslation } from "@/i18n/LanguageProvider";

/**
 * Maliliit na utility sa kanang bahagi ng header, katabi ng "Plan Your Visit":
 * live na weather sa Pili (icon + temp) at isang language selector.
 *
 * Client component dahil live ang weather (kinukuha sa Open-Meteo) at
 * interactive ang wika. Nakatago sa ibaba ng `xl` — masikip ang gitna doon
 * dahil malapad ang naka-sentrong nav pill, kaya sa mas malalaking screen lang
 * sila lumalabas, gaya ng icon ng CTA.
 */

/* San Jose, Pili, Camarines Sur — dito mismo ang club (hindi Naga). */
const PILI = { lat: 13.584308, lon: 123.253267 } as const;

/* Open-Meteo: libre, walang API key, may CORS kaya kayang tawagin sa browser. */
const WEATHER_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${PILI.lat}&longitude=${PILI.lon}` +
  `&current=temperature_2m,weather_code&timezone=Asia%2FManila`;

type Weather = { tempC: number; code: number };
type WeatherKind = "sun" | "partly" | "cloud" | "rain" | "storm";

function describeWeather(code: number): { label: string; kind: WeatherKind } {
  if (code === 0) return { label: "Clear", kind: "sun" };
  if (code === 1 || code === 2) return { label: "Partly cloudy", kind: "partly" };
  if (code === 3) return { label: "Cloudy", kind: "cloud" };
  if (code === 45 || code === 48) return { label: "Fog", kind: "cloud" };
  if (code >= 95) return { label: "Storm", kind: "storm" };
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { label: "Rain", kind: "rain" };
  if (code >= 71 && code <= 86) return { label: "Rain", kind: "rain" };
  return { label: "—", kind: "cloud" };
}

/* ---------- Icons (stroke-based, katugma ng header) ---------- */

function WeatherIcon({ kind, className = "h-4 w-4" }: { kind: WeatherKind; className?: string }) {
  if (kind === "sun") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (kind === "partly") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 2.5v1M2.5 8h1M4.4 4.4l.7.7M11.6 4.4l-.7.7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M9 17.5a3.2 3.2 0 0 1 .3-6.4 4 4 0 0 1 7.6.9 2.8 2.8 0 0 1-.4 5.5H9Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    );
  }
  if (kind === "rain" || kind === "storm") {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M7.5 14.5a3.5 3.5 0 0 1 .3-7 4.4 4.4 0 0 1 8.4 1 3 3 0 0 1-.4 6H7.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        {kind === "storm" ? (
          <path d="m12 15-1.5 3h2L11 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M9 17.5 8 20M12.5 17.5 11.5 20M16 17.5 15 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        )}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="M7 16.5a3.5 3.5 0 0 1 .3-7 4.4 4.4 0 0 1 8.4 1 3 3 0 0 1-.4 6H7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  );
}

function GlobeIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M3 12h18M12 3c2.5 2.5 2.5 15 0 18M12 3c-2.5 2.5-2.5 15 0 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ className = "h-3 w-3" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* ---------- Language selector ---------- */

/* Ang listahan ng wika at ang alaala nito ay nasa i18n na (config + provider).
   Dito lang ang pindutan; ang aktwal na pagpapalit ng wika ng buong site ay
   `setLocale` mula sa context. */
function LanguageSelector() {
  const { locale, setLocale, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("lang.select")}
        className="flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[11px] font-semibold uppercase tracking-[0.08em] transition-colors hover:bg-white/10"
      >
        <GlobeIcon />
        <span>{locale}</span>
        <ChevronIcon className={`${open ? "rotate-180" : ""} h-3 w-3 transition-transform`} />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-0 top-[calc(100%+8px)] z-[60] min-w-[136px] overflow-hidden rounded-xl border border-[#f3dda0]/15 bg-[#265136] py-1 text-white shadow-[0_18px_42px_rgba(6,26,17,0.4)]"
        >
          {SWITCHER_LOCALES.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={locale === code}
                onClick={() => {
                  setLocale(code);
                  setOpen(false);
                }}
                className={`${locale === code ? "text-[#f3dda0]" : "text-white/80"} flex w-full items-center justify-between gap-3 px-3 py-2 text-left text-xs font-medium transition-colors hover:bg-white/10`}
              >
                {LOCALE_LABELS[code]}
                <span className="text-[10px] font-semibold tracking-wide text-white/45">{code}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/* ---------- Weather (icon + temp, live) ---------- */

function WeatherNow() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(WEATHER_URL, { cache: "no-store" });
        if (!res.ok) return;
        const data = await res.json();
        const current = data?.current;
        if (alive && current && typeof current.temperature_2m === "number") {
          setWeather({ tempC: current.temperature_2m, code: Number(current.weather_code) });
        }
      } catch {
        /* offline o na-block — walang weather muna. */
      }
    };
    load();
    /* Kada 30 segundo — hindi realtime, pero sapat na madalas para mabilis
       mag-recover kapag minsan hindi naka-load ang unang kuha. Kapag pumalya
       ang isang refresh, pinapanatili ang huling alam na temp (hindi bina-
       blangko), kaya hindi ito basta nawawala. */
    const id = setInterval(load, 30 * 1000);
    return () => {
      alive = false;
      clearInterval(id);
    };
  }, []);

  const w = weather ? describeWeather(weather.code) : null;

  return (
    <span
      className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.08em]"
      title={weather ? `Pili — ${w?.label}, ${Math.round(weather.tempC)}°C` : "Pili weather"}
    >
      <WeatherIcon kind={w?.kind ?? "cloud"} />
      <span className="tabular-nums">{weather ? `${Math.round(weather.tempC)}°C` : "—°"}</span>
      <span className="sr-only">
        {weather ? `Pili weather, ${w?.label}, ${Math.round(weather.tempC)} degrees.` : "Loading Pili weather."}
      </span>
    </span>
  );
}

/* ---------- Cluster ---------- */

export default function HeaderUtilities() {
  return (
    <div className="flex items-center gap-2 text-[#f3dda0] drop-shadow-[0_1px_4px_rgba(0,0,0,0.45)] xl:gap-3">
      <WeatherNow />
      <span className="h-4 w-px bg-[#f3dda0]/25" aria-hidden="true" />
      <LanguageSelector />
    </div>
  );
}
