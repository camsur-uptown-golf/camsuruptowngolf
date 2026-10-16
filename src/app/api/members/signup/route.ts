import { NextResponse } from "next/server";
import { createMember } from "@/lib/members-db";
import { startMemberSession } from "@/lib/member-session";

/* Kailangan ng `node:sqlite` ang Node runtime — hindi ito tumatakbo sa edge. */
export const runtime = "nodejs";

/**
 * Bagong account ng miyembro. Inuulit dito ang bawat panuntunan ng form —
 * ito ang tunay na pintuan, hindi ang form.
 *
 * Mga error code (hindi teksto) ang ibinabalik, para ang form ang pumili ng
 * mensahe sa wika ng bisita.
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid" }, { status: 400 });
  }
  const text = (key: string, max: number) => (typeof body[key] === "string" ? (body[key] as string).trim().slice(0, max) : "");

  const firstName = text("firstName", 80);
  const lastName = text("lastName", 80);
  const email = text("email", 160).toLowerCase();
  const mobile = text("mobile", 40);
  const password = typeof body.password === "string" ? body.password : "";

  if (!firstName || !lastName) return NextResponse.json({ ok: false, error: "name" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: "email" }, { status: 400 });
  /* 8 pataas, may titik at numero. 200 ang kisame para hindi maipadala ang
     napakahabang teksto na magpapabagal sa scrypt. */
  if (password.length < 8 || password.length > 200 || !/[A-Za-z]/.test(password) || !/\d/.test(password)) {
    return NextResponse.json({ ok: false, error: "password" }, { status: 400 });
  }
  if (body.terms !== true) return NextResponse.json({ ok: false, error: "terms" }, { status: 400 });

  const member = createMember({ firstName, lastName, email, mobile: mobile || undefined, password });
  if (!member) return NextResponse.json({ ok: false, error: "exists" }, { status: 409 });

  await startMemberSession(member.id);
  return NextResponse.json({ ok: true });
}
