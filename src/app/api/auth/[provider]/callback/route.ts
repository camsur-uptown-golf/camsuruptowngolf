import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { findOrCreateOAuthMember } from "@/lib/members-db";
import { startMemberSession } from "@/lib/member-session";
import { OAUTH_COOKIE, exchangeCode, isProvider, siteOrigin, type Provider } from "@/lib/oauth";

export const runtime = "nodejs";

/**
 * Bumabalik dito ang Google (GET, `?code&state`) at ang Apple (POST na form,
 * `code`, `state`, at `user` sa unang login).
 *
 * Mga error, pabalik sa /members?auth_error=…:
 *   cancelled — pinindot ng bisita ang "Cancel" sa Google/Apple
 *   state     — luma o pekeng pagbalik (walang tugmang cookie)
 *   failed    — hindi naipalit ang code / walang email
 *   link      — may account na ang email pero hindi beripikado ng provider
 */
async function handle(request: Request, provider: string, params: URLSearchParams) {
  const back = (path: string) => NextResponse.redirect(`${siteOrigin(request)}${path}`, { status: 303 });
  const fail = (error: string) => back(`/members?auth_error=${error}#member-access`);
  if (!isProvider(provider)) return fail("invalid");

  const store = await cookies();
  const raw = store.get(OAUTH_COOKIE)?.value;
  store.delete(OAUTH_COOKIE);

  if (params.get("error")) return fail("cancelled");
  let saved: { provider: Provider; state: string; verifier: string } | null = null;
  try {
    saved = raw ? JSON.parse(raw) : null;
  } catch {
    saved = null;
  }
  const code = params.get("code");
  if (!saved || saved.provider !== provider || !code || params.get("state") !== saved.state) return fail("state");

  try {
    const profile = await exchangeCode(request, provider, code, saved.verifier, params.get("user"));
    const member = findOrCreateOAuthMember({ provider, ...profile });
    if (!member) return fail("link");
    await startMemberSession(member.id);
    return back("/members");
  } catch {
    return fail("failed");
  }
}

export async function GET(request: Request, ctx: RouteContext<"/api/auth/[provider]/callback">) {
  const { provider } = await ctx.params;
  return handle(request, provider, new URL(request.url).searchParams);
}

export async function POST(request: Request, ctx: RouteContext<"/api/auth/[provider]/callback">) {
  const { provider } = await ctx.params;
  const form = await request.formData();
  const params = new URLSearchParams();
  form.forEach((value, key) => {
    if (typeof value === "string") params.set(key, value);
  });
  return handle(request, provider, params);
}
