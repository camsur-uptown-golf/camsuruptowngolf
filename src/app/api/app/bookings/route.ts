import { NextResponse } from "next/server";
import { bearerToken, preflight } from "@/lib/app-auth";
import { memberFromSession } from "@/lib/members-db";
import { memberReservations, publicReservation } from "@/lib/reservations-db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** "My bookings" ng app — lahat ng tee time ng naka-sign-in na member. */
export async function GET(request: Request) {
  const member = await memberFromSession(bearerToken(request));
  if (!member) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const reservations = await memberReservations(member.id, member.email);
  return NextResponse.json({ reservations: reservations.map(publicReservation) });
}

export const OPTIONS = preflight;
