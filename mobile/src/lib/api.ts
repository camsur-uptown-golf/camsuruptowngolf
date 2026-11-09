import Constants from 'expo-constants';
import { openBrowserAsync } from 'expo-web-browser';

/**
 * Ang Next.js site (nasa labas ng `mobile/`) ang backend ng app — pareho
 * ang mga `/api/*` na tinatawag ng website at ng app.
 *
 * `EXPO_PUBLIC_API_URL` kung nakatakda (production o staging). Kung wala,
 * sa dev ay ang IP ng Mac na nagpapatakbo ng Expo, port 3000 — para gumana
 * rin sa totoong phone na naka-Expo Go, hindi lang sa simulator.
 */
function resolveSiteUrl() {
  const fromEnv = process.env.EXPO_PUBLIC_API_URL;
  if (fromEnv) return fromEnv.replace(/\/$/, '');

  const host = Constants.expoConfig?.hostUri?.split(':')[0];
  return `http://${host ?? 'localhost'}:3000`;
}

export const SITE_URL = resolveSiteUrl();

/** Larawan mula sa `public/` ng website, hal. `/villa-del-rey/stays/…jpg`. */
export function siteAsset(path: string) {
  return `${SITE_URL}${path}`;
}

/**
 * Binubuksan ang isang pahina ng website sa in-app browser — para sa mga
 * flow na wala pa sa app (bayad sa PayMongo, member login).
 */
export function openOnSite(path: string) {
  return openBrowserAsync(`${SITE_URL}${path}`);
}

export class ApiError extends Error {
  constructor(
    public status: number,
    public code: string,
  ) {
    super(`API ${status}: ${code}`);
  }
}

async function getJson<T>(path: string): Promise<T> {
  const response = await fetch(`${SITE_URL}${path}`, { headers: { Accept: 'application/json' } });
  const body = await response.json().catch(() => ({}));
  if (!response.ok) throw new ApiError(response.status, body?.error ?? 'unknown');
  return body as T;
}

/* ── Tee times — `GET /api/tee-times?date=YYYY-MM-DD&holes=18` ─────────── */

export type Holes = 9 | 18;
export type SlotStatus = 'open' | 'booked' | 'past';
export type TeeSlot = { time: string; status: SlotStatus };

export type TeeTimesResponse = {
  date: string;
  holes: Holes;
  lateStart: string;
  tees: { 1: TeeSlot[]; 10: TeeSlot[] };
  /** Walang PayMongo key at hindi production — kinukumpirma ang booking nang walang bayad. */
  testMode?: boolean;
};

export function fetchTeeTimes(date: string, holes: Holes) {
  return getJson<TeeTimesResponse>(`/api/tee-times?date=${date}&holes=${holes}`);
}
