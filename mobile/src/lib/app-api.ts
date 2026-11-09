import { useFocusEffect } from 'expo-router';
import { useCallback, useState } from 'react';

import { SITE_URL } from '@/lib/api';
import type { Reservation } from '@/lib/booking-api';
import type { ClubImage } from '@/lib/club-images';
import { getToken } from '@/lib/session';

/**
 * Ang mga `/api/app/*` na para sa naka-sign-in na member (Bearer token):
 * ang "My bookings", ang pag-cancel ng hold, ang laman ng Home/Schedule
 * (weather, events, offers) at ang push token ng phone.
 */

async function authed(path: string, init: RequestInit = {}): Promise<Response> {
  const token = await getToken();
  return fetch(`${SITE_URL}${path}`, {
    ...init,
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });
}

async function authedJson<T>(path: string): Promise<T | null> {
  try {
    const response = await authed(path);
    return response.ok ? ((await response.json()) as T) : null;
  } catch {
    return null;
  }
}

/* ── My bookings ─────────────────────────────────────────────────────── */

export function fetchMyBookings() {
  return authedJson<{ reservations: Reservation[] }>('/api/app/bookings').then((body) => body?.reservations ?? null);
}

/** Kinakansela ang hold (hindi pa bayad). `false` kung bayad na o hindi sa member. */
export async function cancelHold(code: string): Promise<boolean> {
  try {
    const response = await authed('/api/app/bookings/cancel', { method: 'POST', body: JSON.stringify({ code }) });
    return response.ok;
  } catch {
    return false;
  }
}

/** Held o confirmed, at hindi pa lumilipas ang petsa. */
export const isUpcoming = (reservation: Reservation, today: string) =>
  (reservation.status === 'held' || reservation.status === 'confirmed') && reservation.date >= today;

/**
 * Ang mga booking ng member, kinukuha ulit tuwing bubuksan ang screen.
 * `null` habang naglo-load o kapag walang koneksyon.
 */
export function useMyBookings(): { bookings: Reservation[] | null; reload: () => Promise<void> } {
  const [bookings, setBookings] = useState<Reservation[] | null>(null);
  const reload = useCallback(async () => {
    const found = await fetchMyBookings();
    if (found) setBookings(found);
  }, []);
  useFocusEffect(
    useCallback(() => {
      reload();
    }, [reload]),
  );
  return { bookings, reload };
}

/* ── Club: weather, events, offers ───────────────────────────────────── */

export type ClubEvent = {
  id: number;
  date: string;
  /** `HH:MM`, 24-oras. */
  time: string;
  kind: 'Tournament' | 'Social' | 'Clinic';
  title: string;
  detail: string;
  image: ClubImage;
};

export type ClubOffer = {
  id: number;
  eyebrow: string;
  title: string;
  text: string;
  code: string;
  image: ClubImage;
  endsOn: string | null;
};

export type ClubFeed = {
  today: string;
  weather: { temperature: number; summary: string; kind: string } | null;
  events: ClubEvent[];
  offers: ClubOffer[];
};

/* Isang kopya para sa buong app: Home, Schedule at Offer ay iisang kuha. */
let lastFeed: ClubFeed | null = null;

export function useClubFeed(): ClubFeed | null {
  const [feed, setFeed] = useState<ClubFeed | null>(lastFeed);
  useFocusEffect(
    useCallback(() => {
      let alive = true;
      authedJson<ClubFeed>('/api/app/club').then((body) => {
        if (!body || !alive) return;
        lastFeed = body;
        setFeed(body);
      });
      return () => {
        alive = false;
      };
    }, []),
  );
  return feed;
}

/* ── Push token ──────────────────────────────────────────────────────── */

export async function registerPushToken(token: string, platform: string): Promise<void> {
  await authed('/api/app/push-token', { method: 'POST', body: JSON.stringify({ token, platform }) }).catch(() => undefined);
}

export async function unregisterPushToken(token: string): Promise<void> {
  await authed('/api/app/push-token', { method: 'DELETE', body: JSON.stringify({ token }) }).catch(() => undefined);
}
