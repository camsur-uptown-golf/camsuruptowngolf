/**
 * Weather ng club — kasalukuyan, forecast kada araw, at karaniwang panahon
 * kada buwan. Lahat galing sa Open-Meteo: libre, walang API key, at may CORS
 * kaya kayang tawagin mula mismo sa browser.
 *
 * HANGGANG 16 NA ARAW LANG ANG FORECAST. Lampas doon ay walang matinong
 * hula, kaya ang ipinapakita ay ang KARANIWANG panahon sa buwang iyon mula
 * sa nakaraang limang taon (archive API). Dapat laging nakasulat sa UI na
 * "typical" iyon, hindi forecast.
 *
 * Iisang kuha lang ang forecast at ang climate kada page load (module-level
 * na promise), kahit ilang component pa ang humingi.
 */

/* San Jose, Pili, Camarines Sur — dito mismo ang club (hindi Naga). */
export const PILI = { lat: 13.584308, lon: 123.253267 } as const;

const TZ = "Asia%2FManila";

export const CURRENT_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${PILI.lat}&longitude=${PILI.lon}` +
  `&current=temperature_2m,weather_code&timezone=${TZ}`;

const FORECAST_URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${PILI.lat}&longitude=${PILI.lon}` +
  `&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max` +
  `&forecast_days=16&timezone=${TZ}`;

export const FORECAST_DAYS = 16;

export type WeatherKind = "sun" | "partly" | "cloud" | "rain" | "storm";

export function describeWeather(code: number): { label: string; kind: WeatherKind } {
  if (code === 0) return { label: "Clear", kind: "sun" };
  if (code === 1 || code === 2) return { label: "Partly cloudy", kind: "partly" };
  if (code === 3) return { label: "Cloudy", kind: "cloud" };
  if (code === 45 || code === 48) return { label: "Fog", kind: "cloud" };
  if (code >= 95) return { label: "Storm", kind: "storm" };
  if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82)) return { label: "Rain", kind: "rain" };
  if (code >= 71 && code <= 86) return { label: "Rain", kind: "rain" };
  return { label: "—", kind: "cloud" };
}

export type DayForecast = {
  date: string; // YYYY-MM-DD, oras sa Maynila
  code: number;
  maxC: number;
  minC: number;
  rainChance: number | null; // %
  rainMm: number;
  windKmh: number;
};

export type MonthClimate = {
  month: number; // 1–12
  rainyDayShare: number; // 0–1, araw na may ≥1mm na ulan
  avgMaxC: number;
  avgMinC: number;
  years: number;
};

/** Ngayon sa Maynila bilang YYYY-MM-DD, saanman ang bisita. */
export function todayInManila(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date());
}

/** Ilang araw mula `from` hanggang `to` (parehong YYYY-MM-DD). */
export function daysBetween(from: string, to: string): number {
  return Math.round((Date.parse(`${to}T00:00:00Z`) - Date.parse(`${from}T00:00:00Z`)) / 86_400_000);
}

/** Bawat petsa mula `start` hanggang `end`, kasama ang dalawa. */
export function dateRange(start: string, end: string, max = 31): string[] {
  const out: string[] = [];
  const t = Date.parse(`${start}T00:00:00Z`);
  const n = Math.min(daysBetween(start, end), max - 1);
  for (let i = 0; i <= n; i++) out.push(new Date(t + i * 86_400_000).toISOString().slice(0, 10));
  return out;
}

let forecastPromise: Promise<DayForecast[]> | null = null;

export function fetchForecast(): Promise<DayForecast[]> {
  if (!forecastPromise) {
    forecastPromise = fetch(FORECAST_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`forecast ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const d = data?.daily;
        if (!d || !Array.isArray(d.time)) throw new Error("forecast: walang daily");
        return (d.time as string[]).map((date, i) => ({
          date,
          code: Number(d.weather_code?.[i] ?? 3),
          maxC: Number(d.temperature_2m_max?.[i] ?? NaN),
          minC: Number(d.temperature_2m_min?.[i] ?? NaN),
          rainChance: d.precipitation_probability_max?.[i] ?? null,
          rainMm: Number(d.precipitation_sum?.[i] ?? 0),
          windKmh: Number(d.wind_speed_10m_max?.[i] ?? 0),
        }));
      })
      .catch((error) => {
        /* Pinapayagang subukan ulit sa susunod na hingi. */
        forecastPromise = null;
        throw error;
      });
  }
  return forecastPromise;
}

let climatePromise: Promise<MonthClimate[]> | null = null;

/** Karaniwang panahon kada buwan mula sa huling limang buong taon. */
export function fetchMonthlyClimate(): Promise<MonthClimate[]> {
  if (!climatePromise) {
    const lastYear = Number(todayInManila().slice(0, 4)) - 1;
    const firstYear = lastYear - 4;
    const url =
      `https://archive-api.open-meteo.com/v1/archive?latitude=${PILI.lat}&longitude=${PILI.lon}` +
      `&start_date=${firstYear}-01-01&end_date=${lastYear}-12-31` +
      `&daily=precipitation_sum,temperature_2m_max,temperature_2m_min&timezone=${TZ}`;
    climatePromise = fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error(`climate ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const d = data?.daily;
        if (!d || !Array.isArray(d.time)) throw new Error("climate: walang daily");
        const acc = Array.from({ length: 12 }, () => ({ days: 0, rainy: 0, max: 0, min: 0 }));
        (d.time as string[]).forEach((date, i) => {
          const rain = d.precipitation_sum?.[i];
          const max = d.temperature_2m_max?.[i];
          const min = d.temperature_2m_min?.[i];
          if (typeof rain !== "number" || typeof max !== "number" || typeof min !== "number") return;
          const m = acc[Number(date.slice(5, 7)) - 1];
          m.days += 1;
          if (rain >= 1) m.rainy += 1;
          m.max += max;
          m.min += min;
        });
        return acc.map((m, i) => ({
          month: i + 1,
          rainyDayShare: m.days ? m.rainy / m.days : 0,
          avgMaxC: m.days ? m.max / m.days : NaN,
          avgMinC: m.days ? m.min / m.days : NaN,
          years: lastYear - firstYear + 1,
        }));
      })
      .catch((error) => {
        climatePromise = null;
        throw error;
      });
  }
  return climatePromise;
}

/** Maikling paglalarawan ng tsansa ng ulan, para sa label sa ilalim ng %.
    Susi ang ibinabalik; nasa `weather-i18n.ts` ang teksto kada wika. */
export type RainVerdict = "likely" | "chance" | "slight" | "dry";

export function rainVerdict(chance: number | null, mm: number): RainVerdict {
  if (chance === null) return mm >= 1 ? "likely" : "dry";
  if (chance >= 70) return "likely";
  if (chance >= 40) return "chance";
  if (chance >= 20) return "slight";
  return "dry";
}
