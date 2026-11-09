import { NextResponse } from "next/server";
import { bearerToken, preflight, toAppMember } from "@/lib/app-auth";
import { authenticate, createSession, deleteSession } from "@/lib/members-db";
import { clearFailures, isLockedOut, recordFailure } from "@/lib/member-session";

export const runtime = "nodejs";

/**
 * Sign-in ng member app. Kapareho ng /api/members/login ang pagsusuri at ang
 * lock-out, pero token ang ibinabalik (hindi cookie): ang app ang nagtatabi
 * nito (SecureStore) at ipinapadala bilang Bearer.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "credentials" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 160) : "";
  const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  if (!email || !password) return NextResponse.json({ error: "credentials" }, { status: 400 });

  const key = `email:${email}`;
  if (isLockedOut(key)) return NextResponse.json({ error: "locked" }, { status: 429 });

  const member = await authenticate(email, password);
  if (!member) {
    recordFailure(key);
    return NextResponse.json({ error: "credentials" }, { status: 401 });
  }
  clearFailures(key);
  const { token } = await createSession(member.id);
  return NextResponse.json({ token, member: toAppMember(member) });
}

/** Sign out: binubura ang session ng token. */
export async function DELETE(request: Request) {
  await deleteSession(bearerToken(request));
  return NextResponse.json({ ok: true });
}

export const OPTIONS = preflight;
