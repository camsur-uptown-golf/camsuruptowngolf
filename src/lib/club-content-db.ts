import type { Client, Row } from "@libsql/client";
import { db } from "@/lib/db";

/**
 * Mga event (club calendar) at members' offer ng member app.
 *
 * Ang staff ang naglalagay nito sa admin (admin-camsuruptowngolf → Events &
 * offers); binabasa lang dito para sa `/api/app/club`. Walang laman ang
 * dalawang table hangga't walang inilalagay ang club — walang sample.
 *
 * KAPAREHO ng `admin-camsuruptowngolf/src/lib/club-content.ts` ang SCHEMA;
 * pareho silang gumagawa ng table kung wala pa, kaya baguhin nang sabay.
 *
 * `image`: susi ng larawang kasama na sa app (`mobile/src/lib/club-images.ts`)
 * — walang upload, kaya laging mabilis at maayos ang kuha ng larawan.
 */

export const EVENT_KINDS = ["Tournament", "Social", "Clinic"] as const;
export const CONTENT_IMAGES = ["tournament", "social", "lounge", "pool", "practice", "sky-bar", "course"] as const;

export type ClubEvent = {
  id: number;
  date: string; // YYYY-MM-DD
  time: string; // HH:MM, 24-oras
  kind: (typeof EVENT_KINDS)[number];
  title: string;
  detail: string;
  image: (typeof CONTENT_IMAGES)[number];
};

export type ClubOffer = {
  id: number;
  eyebrow: string;
  title: string;
  text: string;
  code: string;
  image: (typeof CONTENT_IMAGES)[number];
  endsOn: string | null; // YYYY-MM-DD, kasama ang araw na iyon
};

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS club_events (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    date        TEXT    NOT NULL,
    time        TEXT    NOT NULL,
    kind        TEXT    NOT NULL,
    title       TEXT    NOT NULL,
    detail      TEXT    NOT NULL,
    image       TEXT    NOT NULL,
    created_at  TEXT    NOT NULL
  )`,
  "CREATE INDEX IF NOT EXISTS club_events_date ON club_events(date)",
  `CREATE TABLE IF NOT EXISTS club_offers (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    eyebrow     TEXT    NOT NULL,
    title       TEXT    NOT NULL,
    text        TEXT    NOT NULL,
    code        TEXT    NOT NULL,
    image       TEXT    NOT NULL,
    ends_on     TEXT,
    created_at  TEXT    NOT NULL
  )`,
];

let ready: Promise<void> | null = null;

async function connection(): Promise<Client> {
  const client = db("inquiries");
  ready ??= client
    .batch(SCHEMA, "write")
    .then(() => undefined)
    .catch((error) => {
      ready = null;
      throw error;
    });
  await ready;
  return client;
}

const pick = <T extends readonly string[]>(list: T, value: unknown, fallback: T[number]): T[number] =>
  (list as readonly string[]).includes(String(value)) ? (String(value) as T[number]) : fallback;

function toEvent(row: Row): ClubEvent {
  return {
    id: Number(row.id),
    date: String(row.date),
    time: String(row.time),
    kind: pick(EVENT_KINDS, row.kind, "Social"),
    title: String(row.title),
    detail: String(row.detail),
    image: pick(CONTENT_IMAGES, row.image, "course"),
  };
}

function toOffer(row: Row): ClubOffer {
  return {
    id: Number(row.id),
    eyebrow: String(row.eyebrow),
    title: String(row.title),
    text: String(row.text),
    code: String(row.code),
    image: pick(CONTENT_IMAGES, row.image, "course"),
    endsOn: row.ends_on == null ? null : String(row.ends_on),
  };
}

/** Mga event mula `from` hanggang `to` (YYYY-MM-DD, kasama ang dalawa). */
export async function eventsBetween(from: string, to: string): Promise<ClubEvent[]> {
  const client = await connection();
  const result = await client.execute({
    sql: "SELECT * FROM club_events WHERE date BETWEEN ? AND ? ORDER BY date, time LIMIT 200",
    args: [from, to],
  });
  return result.rows.map(toEvent);
}

/** Mga offer na hindi pa tapos sa `today`, pinakabago muna. */
export async function activeOffers(today: string): Promise<ClubOffer[]> {
  const client = await connection();
  const result = await client.execute({
    sql: "SELECT * FROM club_offers WHERE ends_on IS NULL OR ends_on >= ? ORDER BY id DESC LIMIT 20",
    args: [today],
  });
  return result.rows.map(toOffer);
}
