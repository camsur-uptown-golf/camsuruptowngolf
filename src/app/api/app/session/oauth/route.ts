import { NextResponse } from "next/server";
import { preflight, toAppMember } from "@/lib/app-auth";
import { createSession, redeemAppLoginCode } from "@/lib/members-db";

export const runtime = "nodejs";

/**
 * Huling hakbang ng "Continue with Google" sa member app: ang isang-beses na
 * `code` (galing sa deep link) at ang PKCE `verifier` (nasa app lang) →
 * session token, kapareho ng sagot ng `POST /api/app/session`.
 */
export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { code?: unknown; verifier?: unknown };
  const code = typeof body.code === "string" ? body.code : "";
  const verifier = typeof body.verifier === "string" ? body.verifier : "";
  if (!/^[A-Za-z0-9_-]{20,100}$/.test(code) || !/^[A-Za-z0-9_-]{43,128}$/.test(verifier)) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const member = await redeemAppLoginCode(code, verifier);
  if (!member) return NextResponse.json({ error: "expired" }, { status: 401 });
  const { token } = await createSession(member.id);
  return NextResponse.json({ token, member: toAppMember(member) });
}

export const OPTIONS = preflight;
