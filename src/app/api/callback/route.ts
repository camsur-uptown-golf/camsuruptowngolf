import { NextResponse } from "next/server";
import { saveCallbackRequest, type CallbackInput } from "@/lib/inquiries-db";
import { CALL_WINDOWS } from "@/lib/site-content";

/* Kailangan ng `node:sqlite` ang Node runtime — hindi ito tumatakbo sa edge. */
export const runtime = "nodejs";

/**
 * Inuulit dito ang validation na nasa form.
 *
 * Hindi ito kalabisan: ang form ay pwedeng laktawan — sapat na ang isang
 * `curl` sa endpoint na ito. Ang sinusuri lang sa kliyente ay para sa
 * kaginhawahan; ito ang tunay na pintuan.
 */
function validate(body: unknown): { ok: true; data: CallbackInput } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Expected an object." };
  const raw = body as Record<string, unknown>;

  const text = (key: string, max: number) => {
    const value = typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
    return value.slice(0, max);
  };

  const firstName = text("firstName", 80);
  const lastName = text("lastName", 80);
  const email = text("email", 160);
  const mobile = text("mobile", 40);
  const interest = text("interest", 80);
  const timeframe = text("timeframe", 80);

  if (!firstName || !lastName) return { ok: false, error: "Name is required." };
  /* Sinasadyang maluwag: ang mahigpit na email regex ay mas madalas magmali
     sa totoong address kaysa makahuli ng peke. Ang mahalaga ay may hugis ito. */
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "A valid email is required." };
  if (!mobile) return { ok: false, error: "Mobile number is required." };
  if (!interest || !timeframe) return { ok: false, error: "Interest and timeframe are required." };

  const guests = Number(raw.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 100) {
    return { ok: false, error: "Guests must be a whole number from 1 to 100." };
  }

  /* Tanging ang apat na kilalang halaga ang tinatanggap, kaya hindi
     maisisingit ang kahit anong teksto sa hanay na ito. */
  const callWindows = Array.isArray(raw.callWindows)
    ? raw.callWindows.filter(
        (w): w is string => typeof w === "string" && (CALL_WINDOWS as readonly string[]).includes(w),
      )
    : [];
  if (callWindows.length === 0) return { ok: false, error: "Choose at least one call window." };

  return {
    ok: true,
    data: {
      firstName,
      lastName,
      email,
      mobile,
      postalCode: text("postalCode", 20) || undefined,
      interest,
      guests,
      timeframe,
      callWindows,
      question: text("question", 2000) || undefined,
      context: text("context", 120) || undefined,
    },
  };
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const result = validate(body);
  if (!result.ok) return NextResponse.json({ error: result.error }, { status: 400 });

  try {
    const id = saveCallbackRequest(result.data);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save callback request:", error);
    return NextResponse.json({ error: "Could not save the request." }, { status: 500 });
  }
}
