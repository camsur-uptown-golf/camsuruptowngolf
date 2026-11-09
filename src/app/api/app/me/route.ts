import { NextResponse } from "next/server";
import { bearerToken, preflight, toAppMember } from "@/lib/app-auth";
import { memberFromSession } from "@/lib/members-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Ang naka-sign-in na member ng app, mula sa Bearer token. */
export async function GET(request: Request) {
  const member = await memberFromSession(bearerToken(request));
  if (!member) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ member: toAppMember(member) });
}

export const OPTIONS = preflight;
