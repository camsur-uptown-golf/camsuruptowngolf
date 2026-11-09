import type { AddonId, Holes, Tee } from '@site/golf-booking';

import { SITE_URL } from '@/lib/api';
import { getToken } from '@/lib/session';

/**
 * Ang tee-time booking ng website — pareho ang mga route na tinatawag ng
 * `TeeTimeBooking.tsx`, kaya pumapasok ang booking ng app sa iisang
 * `tee_reservations` na binabasa ng admin.
 */

export type ReserveInput = {
  date: string;
  holes: Holes;
  tee: Tee;
  time: string;
  players: number;
  playerNames: string[];
  addons: Partial<Record<AddonId, number>>;
  villa: string | null;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
};

export type ReserveResult =
  | { ok: true; code: string; checkoutUrl?: string }
  | { ok: false; error: string };

export type ReservationStatus = 'held' | 'confirmed' | 'expired' | 'cancelled';

export type Reservation = {
  code: string;
  status: ReservationStatus;
  date: string;
  tee: Tee;
  time: string;
  holes: Holes;
  playerNames: string[];
  addons: Partial<Record<AddonId, number>>;
  villaSlug: string | null;
  amountTotal: number;
  amountDeposit: number;
  holdExpiresAt: string;
};

/* Kasama ang token ng member, para maitala ang booking sa kanya ("My bookings"). */
async function post(path: string, body: unknown) {
  const token = await getToken();
  const response = await fetch(`${SITE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: JSON.stringify(body),
  });
  return (await response.json().catch(() => ({}))) as Record<string, unknown>;
}

/** `POST /api/tee-times/reserve` — ini-hold ang slot at (kung may PayMongo) gumagawa ng checkout. */
export async function reserveTeeTime(input: ReserveInput): Promise<ReserveResult> {
  try {
    const result = await post('/api/tee-times/reserve', input);
    if (result.ok && typeof result.code === 'string') {
      return {
        ok: true,
        code: result.code,
        checkoutUrl: typeof result.checkoutUrl === 'string' ? result.checkoutUrl : undefined,
      };
    }
    return { ok: false, error: typeof result.error === 'string' ? result.error : 'network' };
  } catch {
    return { ok: false, error: 'network' };
  }
}

/** `GET /api/tee-times/reservation?code=…` — ang nakikita sa /golf/book/[code]. */
export async function fetchReservation(code: string): Promise<{ reservation: Reservation; simulate: boolean } | null> {
  try {
    const response = await fetch(`${SITE_URL}/api/tee-times/reservation?code=${encodeURIComponent(code)}`, {
      headers: { Accept: 'application/json' },
    });
    if (!response.ok) return null;
    const body = (await response.json()) as { reservation: Reservation; simulate: boolean };
    return { reservation: body.reservation, simulate: Boolean(body.simulate) };
  } catch {
    return null;
  }
}

/**
 * Mga pindutan ng reservation na naka-hold pa (`ReservationActions.tsx`):
 * `/api/tee-times/pay` (bagong PayMongo checkout) o, sa test mode,
 * `/api/tee-times/simulate` (kumpirmado nang walang bayad).
 */
export async function continuePayment(code: string, simulate: boolean) {
  try {
    const result = await post(simulate ? '/api/tee-times/simulate' : '/api/tee-times/pay', { code });
    return {
      ok: Boolean(result.ok),
      checkoutUrl: typeof result.checkoutUrl === 'string' ? result.checkoutUrl : undefined,
    };
  } catch {
    return { ok: false, checkoutUrl: undefined };
  }
}
