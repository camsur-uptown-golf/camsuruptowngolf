import { NextResponse } from "next/server";
import { authenticate } from "@/lib/members-db";
import { clearFailures, isLockedOut, recordFailure, startMemberSession } from "@/lib/member-session";

/* Kailangan ng `node:sqlite` ang Node runtime — hindi ito tumatakbo sa edge. */
export const runtime = "nodejs";

/**
 * Pag-login ng miyembro.
 *
 * Iisang sagot ("credentials") kapag mali ang email O ang password — hindi
 * sinasabi kung alin, para hindi magamit ang form sa paghahanap ng mga
 * email na may account. Pagkatapos ng limang mali sa loob ng 15 minuto ay
 * pansamantalang sarado ang email na iyon ("locked").
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase().slice(0, 160) : "";
  const password = typeof body.password === "string" ? body.password.slice(0, 200) : "";
  if (!email || !password) return NextResponse.json({ ok: false, error: "credentials" }, { status: 400 });

  const key = `email:${email}`;
  if (isLockedOut(key)) return NextResponse.json({ ok: false, error: "locked" }, { status: 429 });

  const member = authenticate(email, password);
  if (!member) {
    recordFailure(key);
    return NextResponse.json({ ok: false, error: "credentials" }, { status: 401 });
  }

  clearFailures(key);
  await startMemberSession(member.id);
  return NextResponse.json({ ok: true });
}
