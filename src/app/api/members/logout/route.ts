import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SESSION_COOKIE, deleteSession } from "@/lib/members-db";

/* Kailangan ng `@libsql/client` ang Node runtime — hindi ito tumatakbo sa edge. */
export const runtime = "nodejs";

/** Binubura ang session sa database at ang cookie sa browser. */
export async function POST() {
  const store = await cookies();
  await deleteSession(store.get(SESSION_COOKIE)?.value);
  store.delete(SESSION_COOKIE);
  return NextResponse.json({ ok: true });
}
