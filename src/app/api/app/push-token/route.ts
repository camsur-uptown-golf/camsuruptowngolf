import { NextResponse } from "next/server";
import { bearerToken, preflight } from "@/lib/app-auth";
import { memberFromSession } from "@/lib/members-db";
import { deletePushToken, isExpoPushToken, savePushToken } from "@/lib/push";

export const runtime = "nodejs";

async function readToken(request: Request): Promise<{ token: string; platform: string }> {
  const body = (await request.json().catch(() => ({}))) as { token?: unknown; platform?: unknown };
  const token = typeof body.token === "string" ? body.token.trim() : "";
  const platform = body.platform === "ios" || body.platform === "android" ? body.platform : "other";
  return { token, platform };
}

/** Itinatala ang Expo push token ng phone para sa naka-sign-in na member. */
export async function POST(request: Request) {
  const member = await memberFromSession(bearerToken(request));
  if (!member) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const { token, platform } = await readToken(request);
  if (!isExpoPushToken(token)) return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  await savePushToken(member.id, token, platform);
  return NextResponse.json({ ok: true });
}

/** Sa pag-sign-out: wala nang push sa phone na ito. */
export async function DELETE(request: Request) {
  const member = await memberFromSession(bearerToken(request));
  if (!member) return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  const { token } = await readToken(request);
  if (isExpoPushToken(token)) await deletePushToken(token);
  return NextResponse.json({ ok: true });
}

export const OPTIONS = preflight;
