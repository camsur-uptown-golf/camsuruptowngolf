"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LOCALE_LABELS, SWITCHER_LOCALES } from "@/i18n/config";
import { useTranslation } from "@/i18n/LanguageProvider";
import ForecastDays from "@/components/ForecastDays";
import WeatherIcon from "@/components/WeatherIcon";
import { CURRENT_URL, dateRange, describeWeather, todayInManila } from "@/lib/weather";
import { weatherPhrases } from "@/lib/weather-i18n";

/**
 * Maliliit na utility na nakadikit sa kanang gilid ng screen:
 * live na weather sa Pili (icon + temp), isang language selector, at ang
 * Member's Login.
 *
 * Client component dahil live ang weather (kinukuha sa Open-Meteo, tingnan
 * ang `lib/weather.ts`) at interactive ang wika. Pindutan din ang weather:
 * ipinapakita nito ang forecast ng susunod na pitong araw.
 */

type Weather = { tempC: number; code: number };

/* ---------- Icons (stroke-based, katugma ng header) ---------- */

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

function UserIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <circle cx="12" cy="8" r="3.5" stroke="currentColor" strokeWidth="1.6" />
      <path d="M5 20a7 7 0 0 1 14 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Member's login ---------- */

/* Wala pang member portal, kaya sa /members muna ito tumuturo — isang
   placeholder na may paraan para makausap ang club. */
function MemberLogin() {
  const { t } = useTranslation();
  return (
    <Link
      href="/members"
      className="flex w-full flex-col items-center gap-1 px-2.5 py-3.5 text-[9px] font-semibold uppercase leading-tight tracking-[0.08em] transition-colors hover:text-[#f8e9b7] text-center"
    >
      <UserIcon className="h-5 w-5" />
      <span>{t("action.memberLogin")}</span>
    </Link>
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
        className={`${open ? "text-[#f8e9b7]" : ""} flex w-full flex-col items-center gap-1 px-2.5 py-3.5 text-[9px] font-semibold uppercase leading-tight tracking-[0.08em] transition-colors hover:text-[#f8e9b7]`}
      >
        <GlobeIcon className="h-5 w-5" />
        <span className="flex items-center gap-0.5">
          {locale}
          <ChevronIcon className={`${open ? "rotate-90" : ""} h-2.5 w-2.5 transition-transform`} />
        </span>
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute right-[calc(100%+10px)] top-1/2 z-[60] -translate-y-1/2 min-w-[136px] overflow-hidden rounded-xl border border-white/15 bg-black/75 py-1 normal-case tracking-normal text-white shadow-[0_18px_42px_rgba(0,0,0,0.4)] backdrop-blur-md [text-shadow:none]"
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

/* Pindutan na ang weather: pinindot, lumalabas sa kaliwa ang forecast ng
   susunod na pitong araw (`ForecastDays`, dark tone). Sa unang pindot pa
   lang kinukuha ang mga petsa para walang hydration mismatch sa "ngayon". */
function WeatherNow() {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [open, setOpen] = useState(false);
  const [week, setWeek] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  function toggle() {
    if (week.length === 0) {
      const start = todayInManila();
      const end = new Date(Date.parse(`${start}T00:00:00Z`) + 6 * 86_400_000).toISOString().slice(0, 10);
      setWeek(dateRange(start, end));
    }
    setOpen((v) => !v);
  }

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const res = await fetch(CURRENT_URL, { cache: "no-store" });
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
  /* Ang lagay ng langit ngayon ("Cloudy", "Maulap", "흐림"…) sa ilalim ng
     temperatura — sariling salin, kaya naka-`translate="no"`. */
  const { locale } = useTranslation();
  const sky = w ? (weatherPhrases(locale).sky[w.label as keyof ReturnType<typeof weatherPhrases>["sky"]] ?? w.label) : "";

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="weather-forecast"
        className={`${open ? "text-[#f8e9b7]" : ""} flex w-full flex-col items-center gap-1 px-2.5 py-3.5 text-[10px] font-semibold uppercase leading-tight tracking-[0.08em] transition-colors hover:text-[#f8e9b7]`}
        title={weather ? `Pili — ${w?.label}, ${Math.round(weather.tempC)}°C` : "Pili weather"}
      >
        <WeatherIcon kind={w?.kind ?? "cloud"} className="h-5 w-5" />
        <span className="tabular-nums">{weather ? `${Math.round(weather.tempC)}°C` : "—°"}</span>
        <span translate="no" className="min-h-[10px] text-[8px] leading-tight tracking-[0.1em] opacity-75">{sky}</span>
        <span className="sr-only">
          {weather ? `Pili weather, ${w?.label}, ${Math.round(weather.tempC)} degrees. ` : "Loading Pili weather. "}
          Show the 7-day forecast.
        </span>
      </button>
      {open ? (
        <div
          id="weather-forecast"
          className="absolute right-[calc(100%+10px)] top-1/2 z-[60] w-[300px] -translate-y-1/2 rounded-xl border border-white/15 bg-black/75 p-3 normal-case tracking-normal text-white shadow-[0_18px_42px_rgba(0,0,0,0.4)] backdrop-blur-md [text-shadow:none]"
        >
          <p className="mb-2 px-1 font-navigation text-[10px] font-bold uppercase tracking-[0.16em] text-[#f3dda0]">Next 7 days at the club</p>
          {week.length > 0 ? <ForecastDays dates={week} tone="dark" /> : null}
        </div>
      ) : null}
    </div>
  );
}

/* ---------- Cluster ---------- */

/* STICKY SA KANANG GILID NG SCREEN, GITNA PATAYO. Nakadikit ito sa gilid
   (`right-0`, bilog lang ang kaliwang kanto) at laging nakikita kahit
   naka-scroll. HINDI BERDE ang background — ayaw ng club ng berdeng
   pill dito. Madilim at malinaw na salamin (`bg-black/30` + blur) ito
   para mabasa pa rin ang gintong teksto kahit sa mapuputing section. `z-40`:
   nasa ilalim ito ng mega menu at ng mobile menu. Nakatago sa ibaba ng `lg`
   — doon ay masyadong makitid ang screen at may sariling menu ang
   cellphone.

   BUKAS AGAD. Nakikita na ang tatlo pagka-load ng pahina; ang arrow sa
   itaas ang nagsasara at nagbubukas. Naaalala ang pili sa localStorage
   (`cu-utilities`), kaya kapag isinara ng bisita ay sarado pa rin ito sa
   susunod na pahina at pagbisita. Bukas ang default sa server render at
   unang client render (walang hydration mismatch); pagka-mount saka
   binabasa ang naalalang pili.

   Hindi na ito sumasara sa click sa labas: bukas ito bilang default, kaya
   halos bawat click sa pahina ay magsasara rito. Ang mga popover sa loob
   (weather, wika) ay may sariling pagsara sa click sa labas.

   Laging naka-mount ang tatlo (`hidden` lang kapag sarado) para hindi
   mawala ang huling temperatura. */
const UTILITIES_KEY = "cu-utilities";

export default function HeaderUtilities() {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(UTILITIES_KEY);
    } catch {
      /* walang storage (private mode) — bukas na lang palagi. */
    }
    if (saved !== "closed") return;
    /* Pagkatapos ng hydration, gaya ng LanguageProvider. */
    const timer = window.setTimeout(() => setOpen(false), 0);
    return () => window.clearTimeout(timer);
  }, []);

  function toggle() {
    setOpen((current) => {
      const next = !current;
      try {
        localStorage.setItem(UTILITIES_KEY, next ? "open" : "closed");
      } catch {
        /* walang storage — sa pahinang ito lang ang pili. */
      }
      return next;
    });
  }

  return (
    <aside
      aria-label="Club utilities"
      className={`${open ? "w-[112px]" : "w-11"} fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-stretch rounded-l-2xl border border-r-0 border-white/15 bg-black/30 text-[#f3dda0] shadow-[0_12px_35px_rgba(0,0,0,0.2)] backdrop-blur-md transition-[width] duration-200 [text-shadow:0_1px_6px_rgba(0,0,0,0.45)] lg:flex`}
    >
      <button
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-controls="club-utilities"
        aria-label={open ? "Hide club utilities" : "Show club utilities"}
        className="flex w-full items-center justify-center py-3.5 transition-colors hover:text-[#f8e9b7]"
      >
        <ChevronIcon className={`${open ? "-rotate-90" : "rotate-90"} h-4 w-4 transition-transform`} />
      </button>
      <div id="club-utilities" className={`${open ? "flex" : "hidden"} flex-col items-stretch divide-y divide-[#f3dda0]/15 border-t border-[#f3dda0]/15`}>
        <WeatherNow />
        <LanguageSelector />
        <MemberLogin />
      </div>
    </aside>
  );
}

/* ---------- Pang-cellphone ---------- */

/**
 * Ang tatlong utility sa loob ng mobile menu (nakatago ang side bar sa ibaba
 * ng `lg`): weather ngayon, wika, at Member's Login — magkakatabi sa isang
 * hilera sa itaas ng "Plan Your Visit".
 */
export function MobileUtilities({ onNavigate }: { onNavigate?: () => void }) {
  const { locale, setLocale, t } = useTranslation();
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    let alive = true;
    fetch(CURRENT_URL, { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        const current = data?.current;
        if (alive && current && typeof current.temperature_2m === "number") {
          setWeather({ tempC: current.temperature_2m, code: Number(current.weather_code) });
        }
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  const w = weather ? describeWeather(weather.code) : null;
  const sky = w ? (weatherPhrases(locale).sky[w.label as keyof ReturnType<typeof weatherPhrases>["sky"]] ?? w.label) : "";
  const tile = "flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/12 bg-white/[0.06] px-2 py-2 text-center text-[#f3dda0]";

  return (
    <div className="mt-3 grid grid-cols-3 gap-2">
      <div className={tile} title="Pili weather">
        <WeatherIcon kind={w?.kind ?? "cloud"} className="h-5 w-5" />
        <span translate="no" className="text-[11px] font-semibold leading-tight tabular-nums">
          {weather ? `${Math.round(weather.tempC)}°C` : "—°"}
          {sky ? <span className="block text-[10px] font-medium uppercase tracking-[0.08em] text-white/60">{sky}</span> : null}
        </span>
      </div>
      <label className={`${tile} relative cursor-pointer`}>
        <GlobeIcon className="h-5 w-5" />
        <span className="text-[11px] font-semibold uppercase tracking-[0.08em]">{locale}</span>
        <select
          aria-label={t("lang.select")}
          value={locale}
          onChange={(event) => setLocale(event.target.value as typeof locale)}
          className="absolute inset-0 cursor-pointer opacity-0"
        >
          {SWITCHER_LOCALES.map((code) => (
            <option key={code} value={code}>
              {LOCALE_LABELS[code]}
            </option>
          ))}
        </select>
      </label>
      <Link href="/members" onClick={onNavigate} className={`${tile} transition hover:border-[#f3dda0]/50`}>
        <UserIcon className="h-5 w-5" />
        <span className="text-[10px] font-semibold uppercase leading-tight tracking-[0.06em]">{t("action.memberLogin")}</span>
      </Link>
    </div>
  );
}
