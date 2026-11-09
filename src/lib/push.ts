import type { Client } from "@libsql/client";
import { after } from "next/server";
import { db } from "@/lib/db";
import type { Reservation } from "@/lib/reservations-db";

/**
 * Push notifications ng member app, sa pamamagitan ng Expo push service
 * (https://exp.host) — walang sariling susi ng Apple/Google na kailangan dito;
 * ang Expo ang naghahatid sa APNs at FCM.
 *
 * Ang bawat phone na naka-sign-in ay may hilera sa `app_push_tokens`. Iisang
 * token, iisang member: kapag nag-sign-in ang iba sa parehong phone, sa kanya
 * na ang token. Binubura ang token kapag sinabi ng Expo na hindi na ito
 * rehistrado (na-uninstall ang app).
 *
 * Ang admin (admin-camsuruptowngolf) ay nagpapadala rin dito para sa mga
 * bagong event at offer — kapareho ng schema sa ibaba ang inaasahan nito.
 */

const SCHEMA = `CREATE TABLE IF NOT EXISTS app_push_tokens (
  token       TEXT    PRIMARY KEY,
  member_id   INTEGER NOT NULL,
  platform    TEXT    NOT NULL,
  updated_at  TEXT    NOT NULL
)`;

let ready: Promise<void> | null = null;

async function connection(): Promise<Client> {
  const client = db("members");
  ready ??= client
    .batch([SCHEMA, "CREATE INDEX IF NOT EXISTS app_push_tokens_member ON app_push_tokens(member_id)"], "write")
    .then(() => undefined)
    .catch((error) => {
      ready = null;
      throw error;
    });
  await ready;
  return client;
}

/** Hugis ng Expo push token: `ExponentPushToken[…]` o `ExpoPushToken[…]`. */
export const isExpoPushToken = (token: string) => /^Expo(nent)?PushToken\[[A-Za-z0-9_-]{10,}\]$/.test(token);

export async function savePushToken(memberId: number, token: string, platform: string): Promise<void> {
  const client = await connection();
  await client.execute({
    sql: `INSERT INTO app_push_tokens (token, member_id, platform, updated_at) VALUES (?, ?, ?, ?)
          ON CONFLICT(token) DO UPDATE SET member_id = excluded.member_id, platform = excluded.platform, updated_at = excluded.updated_at`,
    args: [token, memberId, platform, new Date().toISOString()],
  });
}

export async function deletePushToken(token: string): Promise<void> {
  const client = await connection();
  await client.execute({ sql: "DELETE FROM app_push_tokens WHERE token = ?", args: [token] });
}

type PushMessage = { title: string; body: string; url?: string };

/** Ipinapadala sa bawat phone ng member. Hindi kailanman nagtatapon ng error. */
export async function sendToMember(memberId: number, message: PushMessage): Promise<void> {
  try {
    const client = await connection();
    const result = await client.execute({ sql: "SELECT token FROM app_push_tokens WHERE member_id = ?", args: [memberId] });
    await sendPush(result.rows.map((row) => String(row.token)), message);
  } catch (error) {
    console.warn("[push] hindi naipadala:", error instanceof Error ? error.message : error);
  }
}

async function sendPush(tokens: string[], message: PushMessage): Promise<void> {
  if (tokens.length === 0) return;
  const response = await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(
      tokens.map((to) => ({ to, title: message.title, body: message.body, sound: "default", data: message.url ? { url: message.url } : {} })),
    ),
  });
  if (!response.ok) throw new Error(`expo push ${response.status}`);
  const body = (await response.json().catch(() => ({}))) as { data?: { status?: string; details?: { error?: string } }[] };
  /* Na-uninstall ang app o pinalitan ang token: alisin para hindi na subukan. */
  const gone = (body.data ?? []).flatMap((ticket, i) => (ticket.details?.error === "DeviceNotRegistered" ? [tokens[i]] : []));
  await Promise.all(gone.map(deletePushToken));
}

function shortDate(date: string) {
  return new Date(`${date}T00:00:00+08:00`).toLocaleDateString("en-PH", { weekday: "short", day: "numeric", month: "short", timeZone: "Asia/Manila" });
}

function clock(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

/**
 * "Booking confirmed" sa phone, pagkatapos mabayaran ang downpayment.
 * `after()`: ipinapadala pagkatapos ng sagot ng route — hindi bumabagal ang
 * kumpirmasyon, at hindi ito napuputol sa Vercel gaya ng karaniwang
 * hindi-hinihintay na promise.
 */
export function notifyConfirmed(reservation: Reservation): void {
  const memberId = reservation.memberId;
  if (memberId == null) return;
  const send = () =>
    sendToMember(memberId, {
      title: "You’re on the tee",
      body: `Championship ${reservation.holes} · ${shortDate(reservation.date)} · ${clock(reservation.time)}. Reference ${reservation.code}.`,
      url: `/booking/${reservation.code}`,
    });
  try {
    after(send);
  } catch {
    /* Sa labas ng request (hal. script): ipadala na lang nang hindi hinihintay. */
    void send();
  }
}
