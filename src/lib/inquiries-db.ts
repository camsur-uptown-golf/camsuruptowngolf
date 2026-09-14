import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * Lokal na SQLite ng site: mga "request a call back" at mga newsletter
 * subscriber.
 *
 * Ginagamit ang `node:sqlite` na kasama na ng Node 22.5+ — walang npm
 * package, walang native build. Node runtime lang ito, kaya kailangang
 * `export const runtime = "nodejs"` ang route na tumatawag dito.
 *
 * TODO bago i-deploy: lokal na file ito, kaya nawawala kapag nag-deploy sa
 * serverless (read-only at panandalian ang filesystem doon). Kapag oras na,
 * palitan ang DB_FILE ng hosted Postgres — ang mga function sa ibaba ang
 * tanging kailangang baguhin.
 */

const DB_FILE = path.join(process.cwd(), "data", "camsuruptown.sqlite");

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

/* Sa dev ay pinapatakbo ulit ng hot reload ang module, kaya kung walang
   cache ay maiipon ang bukas na handle sa parehong file. */
const globalCache = globalThis as unknown as { __inquiriesDb?: DatabaseSync };

/**
 * Module-level, kaya nagre-reset sa bawat hot reload.
 *
 * Mahalaga ito: nasa globalThis ang connection at nabubuhay iyon sa hot
 * reload, kaya kung sa paggawa lang ng connection tatakbo ang schema ay
 * HINDI mailalapat ang bagong talahanayan hangga't hindi ni-restart ang
 * server — at tahimik na palpak ang bawat insert doon. Sa pagkakabukod nito,
 * tumatakbo ang schema pagkatapos ng bawat pagbabago sa code.
 */
let schemaApplied = false;

function applySchema(connection: DatabaseSync) {
  connection.exec(`
    CREATE TABLE IF NOT EXISTS callback_requests (
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
    );
    CREATE INDEX IF NOT EXISTS idx_callback_created
      ON callback_requests (created_at DESC);

    CREATE TABLE IF NOT EXISTS subscribers (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      created_at TEXT    NOT NULL,
      email      TEXT    NOT NULL UNIQUE,
      consented  INTEGER NOT NULL DEFAULT 1
    );
  `);
}

function db() {
  if (!globalCache.__inquiriesDb) {
    mkdirSync(path.dirname(DB_FILE), { recursive: true });
    globalCache.__inquiriesDb = new DatabaseSync(DB_FILE);
  }

  if (!schemaApplied) {
    applySchema(globalCache.__inquiriesDb);
    schemaApplied = true;
  }

  return globalCache.__inquiriesDb;
}

export function saveCallbackRequest(input: CallbackInput) {
  const result = db()
    .prepare(
      `INSERT INTO callback_requests
        (created_at, first_name, last_name, email, mobile, postal_code,
         interest, guests, timeframe, call_windows, question, context)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(
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
    );

  return Number(result.lastInsertRowid);
}

/**
 * Nagdaragdag ng subscriber. `true` kung bago, `false` kung naka-subscribe na.
 *
 * Ang UNIQUE sa email ang humahawak sa duplicate: ang ON CONFLICT DO NOTHING
 * ay tahimik na hindi magpapasok ulit sa halip na magtapon ng error. Sa
 * nagpasa, pareho lang ang hitsura — sinasabi pa rin nating salamat.
 */
export function addSubscriber(email: string) {
  const result = db()
    .prepare(
      `INSERT INTO subscribers (created_at, email, consented)
       VALUES (?, ?, 1)
       ON CONFLICT (email) DO NOTHING`,
    )
    .run(new Date().toISOString(), email.toLowerCase());

  return Number(result.changes) > 0;
}

export function listCallbackRequests(limit = 100): CallbackRow[] {
  const rows = db()
    .prepare(
      `SELECT id, created_at, first_name, last_name, email, mobile, postal_code,
              interest, guests, timeframe, call_windows, question, context, status
         FROM callback_requests
        ORDER BY created_at DESC
        LIMIT ?`,
    )
    .all(limit) as Record<string, string | number | null>[];

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
