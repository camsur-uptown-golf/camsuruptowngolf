import { NextResponse } from "next/server";
import { setMemberPlan } from "@/lib/members-db";
import { currentMember } from "@/lib/member-session";
import { findPlan } from "@/lib/membership-plans";

/* Kailangan ng `node:sqlite` ang Node runtime — hindi ito tumatakbo sa edge. */
export const runtime = "nodejs";

/**
 * Pagpili, pagpapalit, o pag-alis ng membership plan ng naka-login na miyembro.
 *
 * `{ plan: "birdie" | "eagle" | "albatross" }` para pumili; `{ plan: null }`
 * para alisin. WALA PANG BAYAD dito — itinatala lang ang pili, at ang club ang
 * kumukumpirma sa miyembro. Kapag may payment na, dito iyon idudugtong.
 */
export async function POST(request: Request) {
  const member = await currentMember();
  if (!member) return NextResponse.json({ ok: false, error: "auth" }, { status: 401 });

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }

  if (body.plan === null) {
    setMemberPlan(member.id, null);
    return NextResponse.json({ ok: true });
  }
  const plan = findPlan(typeof body.plan === "string" ? body.plan : null);
  if (!plan) return NextResponse.json({ ok: false, error: "plan" }, { status: 400 });

  setMemberPlan(member.id, plan.id);
  return NextResponse.json({ ok: true });
}
