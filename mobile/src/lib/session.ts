import { requireOptionalNativeModule } from 'expo';
import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';

import { SITE_URL } from '@/lib/api';
import { readItem, removeItem, writeItem } from '@/lib/storage';

/**
 * Sign-in ng member app — `/api/app/session` at `/api/app/me` ng website.
 * Token (Bearer) ang session, nakatabi sa `storage.ts`.
 */
export type AppMember = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string | null;
  plan: string | null;
  since: string;
  /** Hal. `CUG · 2026 · 0042` — nasa member card at sa QR. */
  memberNumber: string;
};

export type SignInError = 'credentials' | 'locked' | 'network' | 'cancelled' | 'unavailable' | 'link' | 'failed';
export type SignInResult = { ok: true; member: AppMember } | { ok: false; error: SignInError };

const TOKEN_KEY = 'cu.session';

export const getToken = () => readItem(TOKEN_KEY);
export const setToken = (token: string) => writeItem(TOKEN_KEY, token);
export const clearToken = () => removeItem(TOKEN_KEY);

export async function signIn(email: string, password: string): Promise<SignInResult> {
  try {
    const response = await fetch(`${SITE_URL}/api/app/session`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const body = (await response.json().catch(() => ({}))) as { token?: string; member?: AppMember; error?: string };
    if (response.ok && body.token && body.member) {
      await setToken(body.token);
      return { ok: true, member: body.member };
    }
    return { ok: false, error: body.error === 'locked' ? 'locked' : 'credentials' };
  } catch {
    return { ok: false, error: 'network' };
  }
}

/* Wala ang `ExpoCrypto` sa ilang Expo Go / lumang build — at nagca-crash ang
   buong app kapag in-import lang ito. Kaya dito lang nilo-load, kung mayroon. */
type CryptoModule = typeof import('expo-crypto');
function loadCrypto(): CryptoModule | null {
  if (!requireOptionalNativeModule('ExpoCrypto')) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports -- sinasadya: hindi puwedeng `import` (nagca-crash kapag walang native module)
    return require('expo-crypto') as CryptoModule;
  } catch {
    return null;
  }
}
const Crypto = loadCrypto();

/** May "Continue with Google" ba sa app na ito (kailangan ng `ExpoCrypto` para sa PKCE). */
export const googleSignInAvailable = Crypto !== null;

const base64url = (base64: string) => base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

/**
 * "Continue with Google": ang website ang gumagawa ng Google sign-in (iisang
 * account at iisang Google client para sa website at app), sa in-app browser.
 * Sa dulo ay bumabalik ito sa app na may isang-beses na `code`, na ipinapalit
 * dito sa session token kasama ang PKCE `verifier` — ang app lang ang may
 * hawak niyon, kaya walang silbi ang code kung maagaw.
 */
export async function signInWithGoogle(): Promise<SignInResult> {
  if (!Crypto) return { ok: false, error: 'unavailable' };
  try {
    const verifier = base64url(btoa(String.fromCharCode(...Crypto.getRandomBytes(32))));
    const challenge = base64url(await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, verifier, { encoding: Crypto.CryptoEncoding.BASE64 }));
    const redirect = Linking.createURL('auth');
    const start = `${SITE_URL}/api/auth/google?app=${encodeURIComponent(redirect)}&challenge=${challenge}`;

    const result = await openAuthSessionAsync(start, redirect);
    if (result.type !== 'success') return { ok: false, error: 'cancelled' };
    const params = Linking.parse(result.url).queryParams ?? {};
    const code = typeof params.code === 'string' ? params.code : null;
    if (!code) {
      const error = params.error;
      return { ok: false, error: error === 'cancelled' || error === 'unavailable' || error === 'link' ? error : 'failed' };
    }

    const response = await fetch(`${SITE_URL}/api/app/session/oauth`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ code, verifier }),
    });
    const body = (await response.json().catch(() => ({}))) as { token?: string; member?: AppMember };
    if (!response.ok || !body.token || !body.member) return { ok: false, error: 'failed' };
    await setToken(body.token);
    return { ok: true, member: body.member };
  } catch {
    return { ok: false, error: 'network' };
  }
}

/** Ang naka-sign-in na member; `null` kung walang token o hindi na ito wasto. */
export async function fetchMe(): Promise<AppMember | null> {
  const token = await getToken();
  if (!token) return null;
  try {
    const response = await fetch(`${SITE_URL}/api/app/me`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/json' } });
    if (response.status === 401) {
      await clearToken();
      return null;
    }
    if (!response.ok) return null;
    const body = (await response.json()) as { member: AppMember };
    return body.member;
  } catch {
    return null;
  }
}

export async function signOut(): Promise<void> {
  const token = await getToken();
  await clearToken();
  if (!token) return;
  try {
    await fetch(`${SITE_URL}/api/app/session`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
  } catch {
    /* Wala nang token sa device — sapat na iyon para naka-sign-out ang app. */
  }
}
