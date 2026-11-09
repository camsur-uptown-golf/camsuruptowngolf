import { NextResponse } from "next/server";
import { bearerToken, preflight } from "@/lib/app-auth";
import { activeOffers, eventsBetween } from "@/lib/club-content-db";
import { memberFromSession } from "@/lib/members-db";
import { CURRENT_URL, describeWeather, todayInManila } from "@/lib/weather";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Weather = { temperature: number; summary: string; kind: string } | null;

/* Isang kuha sa Open-Meteo kada 10 minuto, gaano man karami ang nagbubukas ng app. */
const WEATHER_TTL = 10 * 60_000;
let weatherCache: { at: number; value: Weather } | null = null;

async function currentWeather(): Promise<Weather> {
  if (weatherCache && Date.now() - weatherCache.at < WEATHER_TTL) return weatherCache.value;
  try {
    const response = await fetch(CURRENT_URL, { signal: AbortSignal.timeout(4000) });
    if (!response.ok) throw new Error(`weather ${response.status}`);
    const data = (await response.json()) as { current?: { temperature_2m?: number; weather_code?: number } };
    const temperature = data.current?.temperature_2m;
    if (typeof temperature !== "number") throw new Error("weather: walang current");
    const { label, kind } = describeWeather(Number(data.current?.weather_code ?? 3));
    weatherCache = { at: Date.now(), value: { temperature: Math.round(temperature), summary: label, kind } };
  } catch {
    /* Walang weather sa Home kaysa maling weather; susubukan ulit makalipas ang isang minuto. */
    weatherCache = { at: Date.now() - WEATHER_TTL + 60_000, value: weatherCache?.value ?? null };
  }
  return weatherCache.value;
}

function addDays(iso: string, days: number) {
  return new Date(Date.parse(`${iso}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);
}

/**
 * Ang laman ng Home at Schedule ng app: weather sa Pili ngayon, mga event
 * mula sa simula ng buwang ito hanggang 90 araw, at ang mga bukas na offer.
 * Para sa members lang (may code ang mga offer).
 */
export async function GET(request: Request) {
  const member = await memberFromSession(bearerToken(request));
  if (!member) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const today = todayInManila();
  const [weather, events, offers] = await Promise.all([
    currentWeather(),
    eventsBetween(`${today.slice(0, 7)}-01`, addDays(today, 90)),
    activeOffers(today),
  ]);
  return NextResponse.json({ today, weather, events, offers });
}

export const OPTIONS = preflight;
