import { NextResponse } from "next/server";
import { addSubscriber } from "@/lib/inquiries-db";

/* Kailangan ng `node:sqlite` ang Node runtime — hindi ito tumatakbo sa edge. */
export const runtime = "nodejs";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const raw = body as Record<string, unknown>;
  const email = typeof raw?.email === "string" ? raw.email.trim().slice(0, 160) : "";

  /* Sinasadyang maluwag ang hugis na hinahanap: ang mahigpit na regex ay mas
     madalas magmali sa totoong address kaysa makahuli ng peke. */
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  /* Kailangang tahasan ang pagsang-ayon — dito nakasalalay ang RA 10173. */
  if (raw?.consent !== true) {
    return NextResponse.json({ error: "Please tick the consent box." }, { status: 400 });
  }

  try {
    addSubscriber(email);
    /* Pareho ang sagot sa bago at sa dati nang naka-subscribe: sa gayon ay
       hindi masusubukan ng iba kung naka-subscribe ang isang address. */
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to add subscriber:", error);
    return NextResponse.json({ error: "Could not complete the subscription." }, { status: 500 });
  }
}
