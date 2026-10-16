import { cookies } from "next/headers";
import { SESSION_COOKIE, SESSION_DAYS, createSession, memberFromSession, type Member } from "@/lib/members-db";

/**
 * Cookie ng session ng miyembro — iisang lugar para sa mga opsyon nito.
 *
 * `httpOnly`: hindi ito nababasa ng JavaScript sa pahina, kaya hindi ito
 * makukuha ng anumang script na naisingit. `sameSite: "lax"`: hindi ito
 * ipinapadala sa mga POST mula sa ibang site (proteksyon sa CSRF), pero
 * gumagana pa rin ang karaniwang link papunta rito. `secure` sa production
 * lang, dahil HTTP ang localhost.
 */
export async function startMemberSession(memberId: number) {
  const { token, expiresAt } = createSession(memberId);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: expiresAt,
    maxAge: SESSION_DAYS * 86_400,
  });
}

export async function currentMember(): Promise<Member | null> {
  return memberFromSession((await cookies()).get(SESSION_COOKIE)?.value);
}

/* ---------- Limit sa maling pag-login ---------- */

/* Sa memorya lang, kada server process — sapat para pabagalin ang
   paghuhula ng password mula sa iisang lugar. Sa production na maraming
   instance ay dapat itong ilipat sa shared store. */
const WINDOW_MS = 15 * 60_000;
const MAX_FAILURES = 5;
const failures = new Map<string, { count: number; first: number }>();

export function isLockedOut(key: string): boolean {
  const entry = failures.get(key);
  if (!entry) return false;
  if (Date.now() - entry.first > WINDOW_MS) {
    failures.delete(key);
    return false;
  }
  return entry.count >= MAX_FAILURES;
}

export function recordFailure(key: string) {
  const entry = failures.get(key);
  if (!entry || Date.now() - entry.first > WINDOW_MS) failures.set(key, { count: 1, first: Date.now() });
  else entry.count += 1;
}

export function clearFailures(key: string) {
  failures.delete(key);
}
