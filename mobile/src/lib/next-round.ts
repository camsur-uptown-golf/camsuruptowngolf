import { useEffect } from 'react';

import { isUpcoming, useMyBookings } from '@/lib/app-api';
import type { Reservation } from '@/lib/booking-api';
import { todayInManila } from '@/lib/dates';
import { scheduleRoundReminders } from '@/lib/notifications';

/**
 * Ang mga booking ng member mula sa server (`/api/app/bookings`), hinati sa
 * paparating at nakaraan. Tuwing makukuha ang listahan, itinutugma rin ang
 * mga paalala ng tee time sa phone.
 */
export function useRounds(): { upcoming: Reservation[]; past: Reservation[]; loading: boolean; reload: () => Promise<void> } {
  const { bookings, reload } = useMyBookings();
  const today = todayInManila();

  useEffect(() => {
    if (bookings) scheduleRoundReminders(bookings);
  }, [bookings]);

  const all = bookings ?? [];
  /* Mula sa server: pinakabago muna. Ang paparating ay pinakamalapit muna. */
  const upcoming = all.filter((b) => isUpcoming(b, today)).reverse();
  const past = all.filter((b) => !isUpcoming(b, today));
  return { upcoming, past, loading: bookings === null, reload };
}

/** Ang pinakamalapit na paparating na round (held o confirmed), o `null`. */
export function useNextRound(): { round: Reservation | null; loading: boolean } {
  const { upcoming, loading } = useRounds();
  return { round: upcoming[0] ?? null, loading };
}
