import { NextResponse } from "next/server";
import { bearerToken, preflight } from "@/lib/app-auth";
import { memberFromSession } from "@/lib/members-db";
import { cancelHeldReservation } from "@/lib/reservations-db";

export const runtime = "nodejs";

/**
 * Kinakansela ng member ang sarili niyang hold (hindi pa bayad). Ang
 * confirmed ay `not-held`: request sa club ang ipinapadala ng app para doon,
 * dahil ang staff ang nagre-refund ng downpayment.
 */
export async function POST(request: Request) {
  const member = await memberFromSession(bearerToken(request));
  if (!member) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const body = (await request.json().catch(() => ({}))) as { code?: unknown };
  const code = typeof body.code === "string" ? body.code : "";
  if (!/^CU-[A-Z0-9]{10}$/.test(code)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  const cancelled = await cancelHeldReservation(code, member.id, member.email);
  if (!cancelled) return NextResponse.json({ ok: false, error: "not-held" }, { status: 409 });
  return NextResponse.json({ ok: true });
}

export const OPTIONS = preflight;
