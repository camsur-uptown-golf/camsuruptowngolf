import { createHash, createPrivateKey, randomBytes, sign } from "node:crypto";

/**
 * "Continue with Google" at "Continue with Apple" — OAuth 2.0 / OpenID Connect,
 * walang dagdag na npm package.
 *
 * DALOY:
 *   1. /api/auth/<provider>  → gumagawa ng `state` (laban sa CSRF) at PKCE
 *      verifier, iniimbak sa panandaliang httpOnly cookie, at nire-redirect ang
 *      bisita sa Google/Apple.
 *   2. /api/auth/<provider>/callback → sinusuri ang `state`, ipinapalit ang
 *      `code` sa token (server-to-server), binabasa ang email/pangalan mula sa
 *      `id_token`, saka hinahanap o ginagawa ang miyembro at binubuksan ang
 *      session — gaya ng karaniwang login.
 *
 * Hindi na sinusuri ang pirma ng `id_token`: direkta itong galing sa token
 * endpoint ng Google/Apple sa TLS, na pinapayagan ng OpenID Connect (§3.1.3.7).
 *
 * KAILANGAN NG MGA SUSI (sa `.env.local`, tingnan ang `.env.example`). Hangga't
 * wala, `configured()` ay false at ang pindutan ay nagpapakita lang ng "not
 * available yet" — walang nasisira.
 *
 * APPLE: HTTPS at rehistradong domain ang hinihingi ng Apple — hindi ito
 * gagana sa localhost. Sa production domain lang ito masusubukan.
 */

export type Provider = "google" | "apple";

export const OAUTH_COOKIE = "cu-oauth";

type Config = {
  authorizeUrl: string;
  tokenUrl: string;
  clientId: string;
  scope: string;
  clientSecret: () => string;
};

function env(name: string) {
  return process.env[name]?.trim() || "";
}

function appleClientSecret(): string {
  /* Ang "client secret" ng Apple ay JWT na nilagdaan (ES256) ng .p8 na susi. */
  const header = { alg: "ES256", kid: env("APPLE_KEY_ID") };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    iss: env("APPLE_TEAM_ID"),
    iat: now,
    exp: now + 300,
    aud: "https://appleid.apple.com",
    sub: env("APPLE_CLIENT_ID"),
  };
  const b64 = (value: object) => Buffer.from(JSON.stringify(value)).toString("base64url");
  const data = `${b64(header)}.${b64(payload)}`;
  const key = createPrivateKey(env("APPLE_PRIVATE_KEY").replace(/\\n/g, "\n"));
  const signature = sign("sha256", Buffer.from(data), { key, dsaEncoding: "ieee-p1363" });
  return `${data}.${signature.toString("base64url")}`;
}

const CONFIG: Record<Provider, () => Config> = {
  google: () => ({
    authorizeUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    clientId: env("GOOGLE_CLIENT_ID"),
    scope: "openid email profile",
    clientSecret: () => env("GOOGLE_CLIENT_SECRET"),
  }),
  apple: () => ({
    authorizeUrl: "https://appleid.apple.com/auth/authorize",
    tokenUrl: "https://appleid.apple.com/auth/token",
    clientId: env("APPLE_CLIENT_ID"),
    scope: "name email",
    clientSecret: appleClientSecret,
  }),
};

export function isProvider(value: string): value is Provider {
  return value === "google" || value === "apple";
}

export function configured(provider: Provider): boolean {
  if (provider === "google") return Boolean(env("GOOGLE_CLIENT_ID") && env("GOOGLE_CLIENT_SECRET"));
  return Boolean(env("APPLE_CLIENT_ID") && env("APPLE_TEAM_ID") && env("APPLE_KEY_ID") && env("APPLE_PRIVATE_KEY"));
}

/** Ang pinagmulang URL ng site — SITE_URL kung nakatakda, kung hindi ay ang sa request. */
export function siteOrigin(request: Request): string {
  return env("SITE_URL").replace(/\/$/, "") || new URL(request.url).origin;
}

export function callbackUrl(request: Request, provider: Provider) {
  return `${siteOrigin(request)}/api/auth/${provider}/callback`;
}

/** Simula ng login: ang URL ng Google/Apple, at ang ilalagay sa cookie. */
export function startAuthorization(request: Request, provider: Provider) {
  const config = CONFIG[provider]();
  const state = randomBytes(24).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const url = new URL(config.authorizeUrl);
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("redirect_uri", callbackUrl(request, provider));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("scope", config.scope);
  url.searchParams.set("state", state);
  if (provider === "google") {
    url.searchParams.set("code_challenge", challenge);
    url.searchParams.set("code_challenge_method", "S256");
    url.searchParams.set("prompt", "select_account");
  } else {
    /* Hinihingi ng Apple ang form_post kapag may hiniling na `name`/`email`. */
    url.searchParams.set("response_mode", "form_post");
  }
  return { url: url.toString(), cookie: JSON.stringify({ provider, state, verifier }) };
}

export type OAuthProfile = {
  sub: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
};

function decodeJwtPayload(token: string): Record<string, unknown> {
  const part = token.split(".")[1];
  if (!part) throw new Error("id_token: walang laman");
  return JSON.parse(Buffer.from(part, "base64url").toString("utf8"));
}

/** Ipinapalit ang `code` sa token at kinukuha ang profile ng bisita. */
export async function exchangeCode(
  request: Request,
  provider: Provider,
  code: string,
  verifier: string,
  appleUser?: string | null,
): Promise<OAuthProfile> {
  const config = CONFIG[provider]();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: callbackUrl(request, provider),
    client_id: config.clientId,
    client_secret: config.clientSecret(),
  });
  if (provider === "google") body.set("code_verifier", verifier);

  const response = await fetch(config.tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  if (!response.ok) throw new Error(`token ${response.status}`);
  const tokens = (await response.json()) as { id_token?: string };
  if (!tokens.id_token) throw new Error("walang id_token");
  const claims = decodeJwtPayload(tokens.id_token);

  const expectedIssuer = provider === "google" ? ["https://accounts.google.com", "accounts.google.com"] : ["https://appleid.apple.com"];
  const audience = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (!expectedIssuer.includes(String(claims.iss)) || !audience.includes(config.clientId)) {
    throw new Error("id_token: maling issuer o audience");
  }

  let firstName = typeof claims.given_name === "string" ? claims.given_name : "";
  let lastName = typeof claims.family_name === "string" ? claims.family_name : "";
  /* Sa Apple, ang pangalan ay ipinapadala lang sa UNANG pag-login, sa `user`. */
  if (provider === "apple" && appleUser) {
    try {
      const user = JSON.parse(appleUser) as { name?: { firstName?: string; lastName?: string } };
      firstName = user.name?.firstName ?? firstName;
      lastName = user.name?.lastName ?? lastName;
    } catch {
      /* walang pangalan — gagamitin ang bahagi ng email sa ibaba. */
    }
  }

  const email = String(claims.email ?? "").toLowerCase();
  const verified = claims.email_verified === true || claims.email_verified === "true";
  if (!email) throw new Error("walang email");
  return {
    sub: String(claims.sub),
    email,
    emailVerified: verified,
    firstName: firstName || email.split("@")[0],
    lastName,
  };
}
