import { NextResponse } from "next/server";
import { currentMember } from "@/lib/member-session";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Para sa header (Member's Login → avatar): sino ang naka-sign-in sa website,
 * mula sa session cookie. Pangalan at litrato lang — walang email o iba pa.
 * `{ member: null }` (hindi 401) kapag walang session, dahil karaniwan iyon.
 */
export async function GET() {
  const member = await currentMember();
  return NextResponse.json(
    { member: member ? { firstName: member.firstName, lastName: member.lastName, picture: member.picture } : null },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}
