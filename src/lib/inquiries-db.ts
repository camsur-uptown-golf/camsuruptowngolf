import type { Client } from "@libsql/client";
import { db } from "@/lib/db";

/**
 * Database ng site: mga "request a call back", "ask about availability" at
 * mga newsletter subscriber.
 *
 * Turso (libsql) kapag may TURSO_DATABASE_URL — iisa ang database ng
 * website, mobile app at admin — kung wala, ang lokal na
 * `data/camsuruptown.sqlite` (tingnan ang `db.ts`). Node runtime lang ito,
 * kaya `export const runtime = "nodejs"` ang route na tumatawag dito.
 */

export type CallbackInput = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  postalCode?: string;
  interest: string;
  guests: number;
  timeframe: string;
  callWindows: string[];
  question?: string;
  context?: string;
};

export type CallbackRow = CallbackInput & {
  id: number;
  createdAt: string;
  status: string;
};

/**
 * "Ask about availability" mula sa isang accommodation page.
 *
 * Kusang alam ng page kung aling stay ang tinitingnan, kaya naka-pre-fill
 * ang slug/title — hindi ito pinipili ng bisita. Isang `preferredDate` lang
 * (YYYY-MM-DD mula sa `<input type="date">`), hindi check-in/check-out.
 */
export type AvailabilityInput = {
  accommodationSlug: string;
  accommodationTitle: string;
  preferredDate: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  message?: string;
};

/**
 * Module-level, kaya nagre-reset sa bawat hot reload.
 *
 * Mahalaga ito: nabubuhay ang client sa hot reload (nasa globalThis, sa
 * `db.ts`), kaya kung sa paggawa lang ng client tatakbo ang schema ay HINDI
 * mailalapat ang bagong talahanayan hangga't hindi ni-restart ang server — at
 * tahimik na palpak ang bawat insert doon. Sa pagkakabukod nito, tumatakbo
 * ang schema pagkatapos ng bawat pagbabago sa code.
 */
let ready: Promise<void> | null = null;

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS callback_requests (
    id           INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at   TEXT    NOT NULL,
    first_name   TEXT    NOT NULL,
    last_name    TEXT    NOT NULL,
    email        TEXT    NOT NULL,
    mobile       TEXT    NOT NULL,
    postal_code  TEXT,
    interest     TEXT    NOT NULL,
    guests       INTEGER NOT NULL,
    timeframe    TEXT    NOT NULL,
    call_windows TEXT    NOT NULL,
    question     TEXT,
    context      TEXT,
    status       TEXT    NOT NULL DEFAULT 'new'
  )`,
  `CREATE INDEX IF NOT EXISTS idx_callback_created
    ON callback_requests (created_at DESC)`,
  `CREATE TABLE IF NOT EXISTS subscribers (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at TEXT    NOT NULL,
    email      TEXT    NOT NULL UNIQUE,
    consented  INTEGER NOT NULL DEFAULT 1
  )`,
  `CREATE TABLE IF NOT EXISTS availability_requests (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at          TEXT    NOT NULL,
    accommodation_slug  TEXT    NOT NULL,
    accommodation_title TEXT    NOT NULL,
    preferred_date      TEXT    NOT NULL,
    guests              INTEGER NOT NULL,
    first_name          TEXT    NOT NULL,
    last_name           TEXT    NOT NULL,
    email               TEXT    NOT NULL,
    mobile              TEXT    NOT NULL,
    message             TEXT,
    status              TEXT    NOT NULL DEFAULT 'new'
  )`,
  `CREATE INDEX IF NOT EXISTS idx_availability_created
    ON availability_requests (created_at DESC)`,
];

async function connection(): Promise<Client> {
  const client = db("inquiries");
  ready ??= client.batch(SCHEMA, "write").then(
    () => undefined,
    (error) => {
      ready = null;
      throw error;
    },
  );
  await ready;
  return client;
}

export async function saveCallbackRequest(input: CallbackInput): Promise<number> {
  const result = await (await connection()).execute({
    sql: `INSERT INTO callback_requests
            (created_at, first_name, last_name, email, mobile, postal_code,
             interest, guests, timeframe, call_windows, question, context)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      new Date().toISOString(),
      input.firstName,
      input.lastName,
      input.email,
      input.mobile,
      input.postalCode ?? null,
      input.interest,
      input.guests,
      input.timeframe,
      /* Iniimbak bilang isang string: hindi sulit ang hiwalay na talahanayan
         para sa apat na posibleng halaga. */
      input.callWindows.join(", "),
      input.question ?? null,
      input.context ?? null,
    ],
  });

  return Number(result.lastInsertRowid);
}

export async function saveAvailabilityRequest(input: AvailabilityInput): Promise<number> {
  const result = await (await connection()).execute({
    sql: `INSERT INTO availability_requests
            (created_at, accommodation_slug, accommodation_title, preferred_date,
             guests, first_name, last_name, email, mobile, message)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      new Date().toISOString(),
      input.accommodationSlug,
      input.accommodationTitle,
      input.preferredDate,
      input.guests,
      input.firstName,
      input.lastName,
      input.email,
      input.mobile,
      input.message ?? null,
    ],
  });

  return Number(result.lastInsertRowid);
}

/**
 * Nagdaragdag ng subscriber. `true` kung bago, `false` kung naka-subscribe na.
 *
 * Ang UNIQUE sa email ang humahawak sa duplicate: ang ON CONFLICT DO NOTHING
 * ay tahimik na hindi magpapasok ulit sa halip na magtapon ng error. Sa
 * nagpasa, pareho lang ang hitsura — sinasabi pa rin nating salamat.
 */
export async function addSubscriber(email: string): Promise<boolean> {
  const result = await (await connection()).execute({
    sql: `INSERT INTO subscribers (created_at, email, consented)
          VALUES (?, ?, 1)
          ON CONFLICT (email) DO NOTHING`,
    args: [new Date().toISOString(), email.toLowerCase()],
  });

  return result.rowsAffected > 0;
}

export async function listCallbackRequests(limit = 100): Promise<CallbackRow[]> {
  const { rows } = await (await connection()).execute({
    sql: `SELECT id, created_at, first_name, last_name, email, mobile, postal_code,
                 interest, guests, timeframe, call_windows, question, context, status
            FROM callback_requests
           ORDER BY created_at DESC
           LIMIT ?`,
    args: [limit],
  });

  return rows.map((row) => ({
    id: Number(row.id),
    createdAt: String(row.created_at),
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    email: String(row.email),
    mobile: String(row.mobile),
    postalCode: row.postal_code ? String(row.postal_code) : undefined,
    interest: String(row.interest),
    guests: Number(row.guests),
    timeframe: String(row.timeframe),
    callWindows: String(row.call_windows).split(", ").filter(Boolean),
    question: row.question ? String(row.question) : undefined,
    context: row.context ? String(row.context) : undefined,
    status: String(row.status),
  }));
}
