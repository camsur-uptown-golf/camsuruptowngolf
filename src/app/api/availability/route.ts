import { NextResponse } from "next/server";
import { saveAvailabilityRequest, type AvailabilityInput } from "@/lib/inquiries-db";

/* Kailangan ng `node:sqlite` ang Node runtime — hindi ito tumatakbo sa edge. */
export const runtime = "nodejs";

/**
 * Inuulit dito ang validation na nasa form — gaya ng callback route.
 *
 * Pwedeng laktawan ang form at diretsong `curl` sa endpoint, kaya ito ang
 * tunay na pintuan; ang sa kliyente ay para lang sa kaginhawahan.
 */
function validate(body: unknown): { ok: true; data: AvailabilityInput } | { ok: false; error: string } {
  if (typeof body !== "object" || body === null) return { ok: false, error: "Expected an object." };
  const raw = body as Record<string, unknown>;

  const text = (key: string, max: number) => {
    const value = typeof raw[key] === "string" ? (raw[key] as string).trim() : "";
    return value.slice(0, max);
  };

  const accommodationSlug = text("accommodationSlug", 120);
  const accommodationTitle = text("accommodationTitle", 160);
  const preferredDate = text("preferredDate", 10);
  const firstName = text("firstName", 80);
  const lastName = text("lastName", 80);
  const email = text("email", 160);
  const mobile = text("mobile", 40);

  if (!accommodationSlug || !accommodationTitle) {
    return { ok: false, error: "Missing accommodation." };
  }

  /* Hugis muna (YYYY-MM-DD), tapos totoong petsa nga ba — pinipigil nito ang
     tulad ng 2026-13-40 na pumasa sa regex. */
  if (!/^\d{4}-\d{2}-\d{2}$/.test(preferredDate) || Number.isNaN(Date.parse(preferredDate))) {
    return { ok: false, error: "A valid preferred date is required." };
  }

  if (!firstName || !lastName) return { ok: false, error: "Name is required." };
  /* Sinasadyang maluwag: ang mahigpit na email regex ay mas madalas magmali
     sa totoong address kaysa makahuli ng peke. Ang mahalaga ay may hugis ito. */
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: "A valid email is required." };
  if (!mobile) return { ok: false, error: "Mobile number is required." };

  const guests = Number(raw.guests);
  if (!Number.isInteger(guests) || guests < 1 || guests > 100) {
    return { ok: false, error: "Guests must be a whole number from 1 to 100." };
  }

  return {
    ok: true,
    data: {
      accommodationSlug,
      accommodationTitle,
      preferredDate,
      guests,
      firstName,
      lastName,
      email,
      mobile,
      message: text("message", 2000) || undefined,
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
    const id = saveAvailabilityRequest(result.data);
    return NextResponse.json({ id }, { status: 201 });
  } catch (error) {
    console.error("Failed to save availability request:", error);
    return NextResponse.json({ error: "Could not save the request." }, { status: 500 });
  }
}
