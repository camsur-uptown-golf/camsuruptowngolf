import { SITE_URL } from '@/lib/api';
import type { AppMember } from '@/lib/session';

/* Eksaktong kopya ng `CALL_WINDOWS[0]` sa src/lib/site-content.ts — kasama ang
   en dash; eksaktong string ang tinatanggap ng route. */
const MORNING_WINDOW = '9:00 AM – 12:00 PM';

/**
 * Dining, practice bays, wellness at membership: wala pang booking system
 * ang club para sa mga ito, kaya request ang ipinapadala — sa parehong
 * `/api/callback` na ginagamit ng website. Lumalabas ito sa admin ng club,
 * at ang team ang nagkukumpirma sa telepono o email.
 */
export async function sendClubRequest(input: {
  member: AppMember;
  mobile: string;
  interest: string;
  timeframe: string;
  guests: number;
}): Promise<boolean> {
  try {
    const response = await fetch(`${SITE_URL}/api/callback`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        firstName: input.member.firstName,
        lastName: input.member.lastName,
        email: input.member.email,
        mobile: input.mobile,
        interest: input.interest.slice(0, 80),
        timeframe: input.timeframe.slice(0, 80),
        guests: Math.max(1, Math.min(100, Math.round(input.guests))),
        callWindows: [MORNING_WINDOW],
      }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
