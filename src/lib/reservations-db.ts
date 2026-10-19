import { DatabaseSync } from "node:sqlite";
import { randomBytes } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";
import { COURSE, VILLA_NIGHTS, occupiedSlots, type AddonId, type Holes, type Tee } from "@/lib/golf-booking";

/**
 * Mga tee-time reservation at ang kasamang gabi sa Villa Del Rey.
 *
 * WALANG DOBLENG BOOKING. Ang bawat sinasakop na slot (kasama ang crossover)
 * ay isang hilera sa `tee_locks` na may PRIMARY KEY (date, tee, time); ang
 * bawat villa unit sa isang gabi ay hilera sa `villa_locks`. Kapag sabay na
 * nag-book ang dalawa, ang database mismo ang tumatanggi sa pangalawa — hindi
 * umaasa sa pagsusuri bago mag-insert.
 *
 * HOLD. Ang bagong reservation ay `held` sa `COURSE.holdMinutes` habang
 * nagbabayad ng downpayment. Kapag hindi nabayaran, nagiging `expired` ito at
 * binubura ang mga lock — bukas ulit ang slot. `confirmed` kapag bayad na.
 *
 * TODO bago i-deploy: lokal na SQLite ito. Sa Vercel ay kailangan ng hosted
 * database (Postgres) — lalo na rito, dahil may pera at may sabayang booking.
 */

const DB_FILE = path.join(process.cwd(), "data", "reservations.sqlite");

export type ReservationStatus = "held" | "confirmed" | "expired" | "cancelled";

export type Reservation = {
  id: number;
  code: string;
  createdAt: string;
  date: string;
  tee: Tee;
  time: string;
  holes: Holes;
  players: number;
  playerNames: string[];
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  memberId: number | null;
  addons: Partial<Record<AddonId, number>>;
  villaSlug: string | null;
  amountTotal: number;
  amountDeposit: number;
  status: ReservationStatus;
  holdExpiresAt: string;
  paymentSessionId: string | null;
  paymentRef: string | null;
  paidAt: string | null;
};

export type NewReservation = Omit<
  Reservation,
  "id" | "code" | "createdAt" | "status" | "holdExpiresAt" | "paymentSessionId" | "paymentRef" | "paidAt"
>;

const globalCache = globalThis as unknown as { __reservationsDb?: DatabaseSync };
let schemaApplied = false;

function db() {
  if (!globalCache.__reservationsDb) {
    mkdirSync(path.dirname(DB_FILE), { recursive: true });
    globalCache.__reservationsDb = new DatabaseSync(DB_FILE);
    globalCache.__reservationsDb.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON; PRAGMA busy_timeout = 5000;");
  }
  const connection = globalCache.__reservationsDb;
  if (!schemaApplied) {
    connection.exec(`
      CREATE TABLE IF NOT EXISTS tee_reservations (
        id                 INTEGER PRIMARY KEY AUTOINCREMENT,
        code               TEXT    NOT NULL UNIQUE,
        created_at         TEXT    NOT NULL,
        date               TEXT    NOT NULL,
        tee                INTEGER NOT NULL,
        time               TEXT    NOT NULL,
        holes              INTEGER NOT NULL,
        players            INTEGER NOT NULL,
        player_names       TEXT    NOT NULL,
        contact_name       TEXT    NOT NULL,
        contact_email      TEXT    NOT NULL,
        contact_phone      TEXT    NOT NULL,
        member_id          INTEGER,
        addons             TEXT    NOT NULL,
        villa_slug         TEXT,
        amount_total       INTEGER NOT NULL,
        amount_deposit     INTEGER NOT NULL,
        status             TEXT    NOT NULL,
        hold_expires_at    TEXT    NOT NULL,
        payment_session_id TEXT,
        payment_ref        TEXT,
        paid_at            TEXT
      );
      CREATE INDEX IF NOT EXISTS tee_reservations_date ON tee_reservations(date);
      CREATE TABLE IF NOT EXISTS tee_locks (
        date           TEXT    NOT NULL,
        tee            INTEGER NOT NULL,
        time           TEXT    NOT NULL,
        reservation_id INTEGER NOT NULL REFERENCES tee_reservations(id) ON DELETE CASCADE,
        PRIMARY KEY (date, tee, time)
      );
      CREATE TABLE IF NOT EXISTS villa_locks (
        night          TEXT    NOT NULL,
        house_slug     TEXT    NOT NULL,
        unit           INTEGER NOT NULL,
        reservation_id INTEGER NOT NULL REFERENCES tee_reservations(id) ON DELETE CASCADE,
        PRIMARY KEY (night, house_slug, unit)
      );
      CREATE TABLE IF NOT EXISTS booking_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL);
    `);
    rebuildLocksIfRuleChanged(connection);
    schemaApplied = true;
  }
  return connection;
}

type Row = {
  id: number;
  code: string;
  created_at: string;
  date: string;
  tee: number;
  time: string;
  holes: number;
  players: number;
  player_names: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string;
  member_id: number | null;
  addons: string;
  villa_slug: string | null;
  amount_total: number;
  amount_deposit: number;
  status: ReservationStatus;
  hold_expires_at: string;
  payment_session_id: string | null;
  payment_ref: string | null;
  paid_at: string | null;
};

function toReservation(row: Row): Reservation {
  return {
    id: row.id,
    code: row.code,
    createdAt: row.created_at,
    date: row.date,
    tee: row.tee as Tee,
    time: row.time,
    holes: row.holes as Holes,
    players: row.players,
    playerNames: JSON.parse(row.player_names),
    contactName: row.contact_name,
    contactEmail: row.contact_email,
    contactPhone: row.contact_phone,
    memberId: row.member_id,
    addons: JSON.parse(row.addons),
    villaSlug: row.villa_slug,
    amountTotal: row.amount_total,
    amountDeposit: row.amount_deposit,
    status: row.status,
    holdExpiresAt: row.hold_expires_at,
    paymentSessionId: row.payment_session_id,
    paymentRef: row.payment_ref,
    paidAt: row.paid_at,
  };
}

/**
 * Kapag nagbago ang patakaran ng pagsakop (`exclusiveNines`, tagal ng nine),
 * binubuo ulit ang `tee_locks` mula sa mga aktibong reservation — kung hindi,
 * ang mga lumang booking ay may lumang hugis ng lock at may makakapasok sa
 * oras nila. Mas naunang booking ang nauuna kapag nagbanggaan.
 */
function rebuildLocksIfRuleChanged(connection: DatabaseSync) {
  /* `version`: itaas kapag binago ang LOHIKA ng occupiedSlots (hindi lang ang
     mga setting), para mabuo ulit ang mga lock ng lumang booking. */
  const rule = JSON.stringify({
    version: 2,
    exclusive: COURSE.exclusiveNines,
    turn: COURSE.turnMinutes,
    duration: COURSE.durationMinutes,
    step: COURSE.lockIntervalMinutes,
  });
  const saved = connection.prepare("SELECT value FROM booking_meta WHERE key = 'lock_rule'").get() as { value: string } | undefined;
  if (saved?.value === rule) return;
  connection.exec("BEGIN IMMEDIATE");
  try {
    connection.exec("DELETE FROM tee_locks");
    const active = connection
      .prepare("SELECT id, date, tee, time, holes FROM tee_reservations WHERE status IN ('held','confirmed') ORDER BY id")
      .all() as { id: number; date: string; tee: number; time: string; holes: number }[];
    const lock = connection.prepare("INSERT OR IGNORE INTO tee_locks (date, tee, time, reservation_id) VALUES (?, ?, ?, ?)");
    for (const row of active) {
      for (const slot of occupiedSlots(row.tee as Tee, row.time, row.holes as Holes)) lock.run(row.date, slot.tee, slot.time, row.id);
    }
    connection.prepare("INSERT INTO booking_meta (key, value) VALUES ('lock_rule', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(rule);
    connection.exec("COMMIT");
  } catch (error) {
    connection.exec("ROLLBACK");
    throw error;
  }
}

/** Lumipas na ang hold nang hindi nabayaran → `expired`, at buksan ulit ang slot. */
function releaseExpired(connection: DatabaseSync) {
  const now = new Date().toISOString();
  connection
    .prepare("UPDATE tee_reservations SET status = 'expired' WHERE status = 'held' AND hold_expires_at < ?")
    .run(now);
  connection.exec(`
    DELETE FROM tee_locks WHERE reservation_id IN (SELECT id FROM tee_reservations WHERE status IN ('expired','cancelled'));
    DELETE FROM villa_locks WHERE reservation_id IN (SELECT id FROM tee_reservations WHERE status IN ('expired','cancelled'));
  `);
}

/** Mga sinasakop na slot sa isang petsa (held o confirmed). */
export function bookedSlots(date: string): { tee: Tee; time: string }[] {
  const connection = db();
  releaseExpired(connection);
  return (connection.prepare("SELECT tee, time FROM tee_locks WHERE date = ?").all(date) as { tee: number; time: string }[]).map(
    (row) => ({ tee: row.tee as Tee, time: row.time }),
  );
}

/** Ilang unit pa ang bakante kada bahay para sa gabi ng `night`. */
export function villaVacancies(night: string): Record<string, number> {
  const connection = db();
  releaseExpired(connection);
  const taken = connection
    .prepare("SELECT house_slug, COUNT(*) AS n FROM villa_locks WHERE night = ? GROUP BY house_slug")
    .all(night) as { house_slug: string; n: number }[];
  const used = new Map(taken.map((row) => [row.house_slug, row.n]));
  return Object.fromEntries(VILLA_NIGHTS.map((v) => [v.slug, Math.max(0, v.units - (used.get(v.slug) ?? 0))]));
}

function newCode() {
  /* Walang 0/O/1/I para madaling basahin sa telepono. */
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(10);
  return "CU-" + Array.from(bytes, (b) => alphabet[b % alphabet.length]).join("");
}

export type CreateResult = { ok: true; reservation: Reservation } | { ok: false; error: "taken" | "villa-full" };

/**
 * Bagong reservation na naka-hold, kasama ang mga lock — lahat o wala
 * (iisang transaction). Kapag naunahan na ang slot o puno ang villa,
 * walang naiiwang kalahating reservation.
 */
export function createHeldReservation(input: NewReservation): CreateResult {
  const connection = db();
  const now = new Date();
  const holdExpiresAt = new Date(now.getTime() + COURSE.holdMinutes * 60_000).toISOString();
  connection.exec("BEGIN IMMEDIATE");
  try {
    releaseExpired(connection);
    const code = newCode();
    const result = connection
      .prepare(
        `INSERT INTO tee_reservations
          (code, created_at, date, tee, time, holes, players, player_names, contact_name, contact_email, contact_phone,
           member_id, addons, villa_slug, amount_total, amount_deposit, status, hold_expires_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'held', ?)`,
      )
      .run(
        code,
        now.toISOString(),
        input.date,
        input.tee,
        input.time,
        input.holes,
        input.players,
        JSON.stringify(input.playerNames),
        input.contactName,
        input.contactEmail,
        input.contactPhone,
        input.memberId,
        JSON.stringify(input.addons),
        input.villaSlug,
        input.amountTotal,
        input.amountDeposit,
        holdExpiresAt,
      );
    const id = Number(result.lastInsertRowid);

    const lock = connection.prepare("INSERT INTO tee_locks (date, tee, time, reservation_id) VALUES (?, ?, ?, ?)");
    for (const slot of occupiedSlots(input.tee, input.time, input.holes)) {
      try {
        lock.run(input.date, slot.tee, slot.time, id);
      } catch {
        connection.exec("ROLLBACK");
        return { ok: false, error: "taken" };
      }
    }

    if (input.villaSlug) {
      const house = VILLA_NIGHTS.find((v) => v.slug === input.villaSlug);
      const used = new Set(
        (connection.prepare("SELECT unit FROM villa_locks WHERE night = ? AND house_slug = ?").all(input.date, input.villaSlug) as {
          unit: number;
        }[]).map((row) => row.unit),
      );
      const unit = house ? Array.from({ length: house.units }, (_, i) => i + 1).find((u) => !used.has(u)) : undefined;
      if (!unit) {
        connection.exec("ROLLBACK");
        return { ok: false, error: "villa-full" };
      }
      connection
        .prepare("INSERT INTO villa_locks (night, house_slug, unit, reservation_id) VALUES (?, ?, ?, ?)")
        .run(input.date, input.villaSlug, unit, id);
    }

    connection.exec("COMMIT");
    const row = connection.prepare("SELECT * FROM tee_reservations WHERE id = ?").get(id) as Row;
    return { ok: true, reservation: toReservation(row) };
  } catch (error) {
    try {
      connection.exec("ROLLBACK");
    } catch {
      /* naibalik na */
    }
    throw error;
  }
}

export function getReservation(code: string): Reservation | null {
  const connection = db();
  releaseExpired(connection);
  const row = connection.prepare("SELECT * FROM tee_reservations WHERE code = ?").get(code) as Row | undefined;
  return row ? toReservation(row) : null;
}

export function getReservationBySession(sessionId: string): Reservation | null {
  const row = db().prepare("SELECT * FROM tee_reservations WHERE payment_session_id = ?").get(sessionId) as Row | undefined;
  return row ? toReservation(row) : null;
}

export function attachPaymentSession(id: number, sessionId: string) {
  db().prepare("UPDATE tee_reservations SET payment_session_id = ? WHERE id = ?").run(sessionId, id);
}

/**
 * Bayad na ang downpayment → `confirmed`. Tinatanggap pa rin kahit lumipas na
 * ang hold, basta buo pa ang mga lock (walang ibang kumuha). Kapag nakuha na
 * ng iba ang slot habang late ang bayad, `false` — ire-refund iyon ng club.
 */
export function confirmReservation(id: number, paymentRef: string): boolean {
  const connection = db();
  const row = connection.prepare("SELECT * FROM tee_reservations WHERE id = ?").get(id) as Row | undefined;
  if (!row) return false;
  if (row.status === "confirmed") return true;
  const locks = (connection.prepare("SELECT COUNT(*) AS n FROM tee_locks WHERE reservation_id = ?").get(id) as { n: number }).n;
  if (locks === 0) return false;
  connection
    .prepare("UPDATE tee_reservations SET status = 'confirmed', payment_ref = ?, paid_at = ? WHERE id = ?")
    .run(paymentRef, new Date().toISOString(), id);
  return true;
}
