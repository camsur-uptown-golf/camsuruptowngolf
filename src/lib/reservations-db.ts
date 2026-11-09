import { randomBytes } from "node:crypto";
import type { Client, InStatement, Row } from "@libsql/client";
import { db, isUniqueViolation } from "@/lib/db";
import { COURSE, VILLA_NIGHTS, occupiedSlots, type AddonId, type Holes, type Tee } from "@/lib/golf-booking";
import { cancelledEmail, confirmedEmail, emailGuest } from "@/lib/booking-emails";
import { notifyConfirmed } from "@/lib/push";

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
 * DATABASE: Turso (libsql) kapag may TURSO_DATABASE_URL — iisa ang database
 * ng website, mobile app at admin — kung wala, ang lokal na
 * `data/reservations.sqlite` (tingnan ang `db.ts`). Hindi umaasa sa
 * `PRAGMA foreign_keys` / ON DELETE CASCADE: hindi iyon nananatili sa Turso
 * over HTTP, kaya laging tahasang binubura ang mga lock.
 */

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

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS tee_reservations (
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
  )`,
  "CREATE INDEX IF NOT EXISTS tee_reservations_date ON tee_reservations(date)",
  `CREATE TABLE IF NOT EXISTS tee_locks (
    date           TEXT    NOT NULL,
    tee            INTEGER NOT NULL,
    time           TEXT    NOT NULL,
    reservation_id INTEGER NOT NULL REFERENCES tee_reservations(id) ON DELETE CASCADE,
    PRIMARY KEY (date, tee, time)
  )`,
  `CREATE TABLE IF NOT EXISTS villa_locks (
    night          TEXT    NOT NULL,
    house_slug     TEXT    NOT NULL,
    unit           INTEGER NOT NULL,
    reservation_id INTEGER NOT NULL REFERENCES tee_reservations(id) ON DELETE CASCADE,
    PRIMARY KEY (night, house_slug, unit)
  )`,
  "CREATE TABLE IF NOT EXISTS booking_meta (key TEXT PRIMARY KEY, value TEXT NOT NULL)",
];

/* Isang beses bawat process (at bawat hot reload, dahil module-level) ang
   schema. Kapag pumalya, susubukan ulit sa susunod na tawag. */
let ready: Promise<void> | null = null;

async function connection(): Promise<Client> {
  const client = db("reservations");
  ready ??= (async () => {
    await client.batch(SCHEMA, "write");
    await rebuildLocksIfRuleChanged(client);
  })().catch((error) => {
    ready = null;
    throw error;
  });
  await ready;
  return client;
}

function toReservation(row: Row): Reservation {
  const text = (value: unknown) => (value == null ? null : String(value));
  return {
    id: Number(row.id),
    code: String(row.code),
    createdAt: String(row.created_at),
    date: String(row.date),
    tee: Number(row.tee) as Tee,
    time: String(row.time),
    holes: Number(row.holes) as Holes,
    players: Number(row.players),
    playerNames: JSON.parse(String(row.player_names)),
    contactName: String(row.contact_name),
    contactEmail: String(row.contact_email),
    contactPhone: String(row.contact_phone),
    memberId: row.member_id == null ? null : Number(row.member_id),
    addons: JSON.parse(String(row.addons)),
    villaSlug: text(row.villa_slug),
    amountTotal: Number(row.amount_total),
    amountDeposit: Number(row.amount_deposit),
    status: String(row.status) as ReservationStatus,
    holdExpiresAt: String(row.hold_expires_at),
    paymentSessionId: text(row.payment_session_id),
    paymentRef: text(row.payment_ref),
    paidAt: text(row.paid_at),
  };
}

/**
 * Kapag nagbago ang patakaran ng pagsakop (`exclusiveNines`, tagal ng nine),
 * binubuo ulit ang `tee_locks` mula sa mga aktibong reservation — kung hindi,
 * ang mga lumang booking ay may lumang hugis ng lock at may makakapasok sa
 * oras nila. Mas naunang booking ang nauuna kapag nagbanggaan.
 */
async function rebuildLocksIfRuleChanged(client: Client) {
  /* `version`: itaas kapag binago ang LOHIKA ng occupiedSlots (hindi lang ang
     mga setting), para mabuo ulit ang mga lock ng lumang booking. */
  const rule = JSON.stringify({
    version: 2,
    exclusive: COURSE.exclusiveNines,
    turn: COURSE.turnMinutes,
    duration: COURSE.durationMinutes,
    step: COURSE.lockIntervalMinutes,
  });
  const ruleQuery = "SELECT value FROM booking_meta WHERE key = 'lock_rule'";
  const saved = await client.execute(ruleQuery);
  if (saved.rows[0]?.value === rule) return;
  const tx = await client.transaction("write");
  try {
    /* Baka naunahan na ng ibang instance habang naghihintay. */
    const again = await tx.execute(ruleQuery);
    if (again.rows[0]?.value === rule) return;
    const active = await tx.execute(
      "SELECT id, date, tee, time, holes FROM tee_reservations WHERE status IN ('held','confirmed') ORDER BY id",
    );
    const statements: InStatement[] = ["DELETE FROM tee_locks"];
    for (const row of active.rows) {
      for (const slot of occupiedSlots(Number(row.tee) as Tee, String(row.time), Number(row.holes) as Holes)) {
        statements.push({
          sql: "INSERT OR IGNORE INTO tee_locks (date, tee, time, reservation_id) VALUES (?, ?, ?, ?)",
          args: [String(row.date), slot.tee, slot.time, Number(row.id)],
        });
      }
    }
    statements.push({
      sql: "INSERT INTO booking_meta (key, value) VALUES ('lock_rule', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value",
      args: [rule],
    });
    await tx.batch(statements);
    await tx.commit();
  } finally {
    /* Walang epekto kapag na-commit na; kung hindi, rollback. */
    tx.close();
  }
}

/** Lumipas na ang hold nang hindi nabayaran → `expired`, at buksan ulit ang slot. */
function releaseExpired(): InStatement[] {
  return [
    {
      sql: "UPDATE tee_reservations SET status = 'expired' WHERE status = 'held' AND hold_expires_at < ?",
      args: [new Date().toISOString()],
    },
    "DELETE FROM tee_locks WHERE reservation_id IN (SELECT id FROM tee_reservations WHERE status IN ('expired','cancelled'))",
    "DELETE FROM villa_locks WHERE reservation_id IN (SELECT id FROM tee_reservations WHERE status IN ('expired','cancelled'))",
  ];
}

/** `releaseExpired` at saka ang `query`, sa iisang biyahe — ibinabalik ang mga hilera ng `query`. */
async function afterRelease(query: InStatement): Promise<Row[]> {
  const client = await connection();
  const results = await client.batch([...releaseExpired(), query], "write");
  return results[results.length - 1].rows;
}

/** Mga sinasakop na slot sa isang petsa (held o confirmed). */
export async function bookedSlots(date: string): Promise<{ tee: Tee; time: string }[]> {
  const rows = await afterRelease({ sql: "SELECT tee, time FROM tee_locks WHERE date = ?", args: [date] });
  return rows.map((row) => ({ tee: Number(row.tee) as Tee, time: String(row.time) }));
}

/** Ilang unit pa ang bakante kada bahay para sa gabi ng `night`. */
export async function villaVacancies(night: string): Promise<Record<string, number>> {
  const rows = await afterRelease({
    sql: "SELECT house_slug, COUNT(*) AS n FROM villa_locks WHERE night = ? GROUP BY house_slug",
    args: [night],
  });
  const used = new Map(rows.map((row) => [String(row.house_slug), Number(row.n)]));
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
 * (iisang write transaction). Kapag naunahan na ang slot o puno ang villa,
 * walang naiiwang kalahating reservation.
 */
export async function createHeldReservation(input: NewReservation): Promise<CreateResult> {
  const client = await connection();
  const now = new Date();
  const holdExpiresAt = new Date(now.getTime() + COURSE.holdMinutes * 60_000).toISOString();
  const tx = await client.transaction("write");
  try {
    await tx.batch(releaseExpired());
    const inserted = await tx.execute({
      sql: `INSERT INTO tee_reservations
              (code, created_at, date, tee, time, holes, players, player_names, contact_name, contact_email, contact_phone,
               member_id, addons, villa_slug, amount_total, amount_deposit, status, hold_expires_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'held', ?)`,
      args: [
        newCode(),
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
        input.memberId ?? null,
        JSON.stringify(input.addons),
        input.villaSlug ?? null,
        input.amountTotal,
        input.amountDeposit,
        holdExpiresAt,
      ],
    });
    const id = Number(inserted.lastInsertRowid);

    /* Ang PRIMARY KEY ng tee_locks ang tumatanggi kapag may nakauna na. */
    try {
      await tx.batch(
        occupiedSlots(input.tee, input.time, input.holes).map((slot) => ({
          sql: "INSERT INTO tee_locks (date, tee, time, reservation_id) VALUES (?, ?, ?, ?)",
          args: [input.date, slot.tee, slot.time, id],
        })),
      );
    } catch (error) {
      if (!isUniqueViolation(error)) throw error;
      await tx.rollback();
      return { ok: false, error: "taken" };
    }

    if (input.villaSlug) {
      const house = VILLA_NIGHTS.find((v) => v.slug === input.villaSlug);
      const taken = await tx.execute({
        sql: "SELECT unit FROM villa_locks WHERE night = ? AND house_slug = ?",
        args: [input.date, input.villaSlug],
      });
      const used = new Set(taken.rows.map((row) => Number(row.unit)));
      const unit = house ? Array.from({ length: house.units }, (_, i) => i + 1).find((u) => !used.has(u)) : undefined;
      if (!unit) {
        await tx.rollback();
        return { ok: false, error: "villa-full" };
      }
      try {
        await tx.execute({
          sql: "INSERT INTO villa_locks (night, house_slug, unit, reservation_id) VALUES (?, ?, ?, ?)",
          args: [input.date, input.villaSlug, unit, id],
        });
      } catch (error) {
        if (!isUniqueViolation(error)) throw error;
        await tx.rollback();
        return { ok: false, error: "villa-full" };
      }
    }

    const row = await tx.execute({ sql: "SELECT * FROM tee_reservations WHERE id = ?", args: [id] });
    await tx.commit();
    return { ok: true, reservation: toReservation(row.rows[0]) };
  } finally {
    /* Kapag may error bago ang commit: rollback, walang naiiwang kalahati. */
    tx.close();
  }
}

/**
 * Ang ipinapakita ng app (at ng /golf/book/[code]) — walang email, telepono
 * o payment id ng guest.
 */
export function publicReservation(reservation: Reservation) {
  return {
    code: reservation.code,
    status: reservation.status,
    date: reservation.date,
    tee: reservation.tee,
    time: reservation.time,
    holes: reservation.holes,
    playerNames: reservation.playerNames,
    addons: reservation.addons,
    villaSlug: reservation.villaSlug,
    amountTotal: reservation.amountTotal,
    amountDeposit: reservation.amountDeposit,
    holdExpiresAt: reservation.holdExpiresAt,
  };
}

export async function getReservation(code: string): Promise<Reservation | null> {
  const rows = await afterRelease({ sql: "SELECT * FROM tee_reservations WHERE code = ?", args: [code] });
  return rows[0] ? toReservation(rows[0]) : null;
}

/**
 * Mga booking ng isang member, pinakabago ang petsa muna. Kasama ang mga
 * booking na ginawa bago nag-sign-in (walang `member_id`) basta pareho ang
 * email — iisang tao iyon, at ang email ang nakasulat sa resibo.
 */
export async function memberReservations(memberId: number, email: string): Promise<Reservation[]> {
  const rows = await afterRelease({
    sql: `SELECT * FROM tee_reservations
          WHERE member_id = ? OR (member_id IS NULL AND contact_email = ? COLLATE NOCASE)
          ORDER BY date DESC, time DESC LIMIT 100`,
    args: [memberId, email],
  });
  return rows.map(toReservation);
}

/**
 * Kinakansela ng member ang sarili niyang hold (hindi pa bayad) at binubuksan
 * ulit ang slot. Ang confirmed na may downpayment ay hindi dito — ang club
 * ang bahala sa refund, kaya request ang ipinapadala ng app.
 */
export async function cancelHeldReservation(code: string, memberId: number, email: string): Promise<boolean> {
  const client = await connection();
  const results = await client.batch(
    [
      {
        sql: `UPDATE tee_reservations SET status = 'cancelled'
              WHERE code = ? AND status = 'held'
                AND (member_id = ? OR (member_id IS NULL AND contact_email = ? COLLATE NOCASE))`,
        args: [code, memberId, email],
      },
      ...releaseExpired(),
      { sql: "SELECT * FROM tee_reservations WHERE code = ?", args: [code] },
    ],
    "write",
  );
  const cancelled = results[0].rowsAffected > 0;
  const row = results[results.length - 1].rows[0];
  if (cancelled && row) emailGuest(cancelledEmail(toReservation(row)));
  return cancelled;
}

export async function getReservationBySession(sessionId: string): Promise<Reservation | null> {
  const client = await connection();
  const result = await client.execute({ sql: "SELECT * FROM tee_reservations WHERE payment_session_id = ?", args: [sessionId] });
  return result.rows[0] ? toReservation(result.rows[0]) : null;
}

export async function attachPaymentSession(id: number, sessionId: string): Promise<void> {
  const client = await connection();
  await client.execute({ sql: "UPDATE tee_reservations SET payment_session_id = ? WHERE id = ?", args: [sessionId, id] });
}

/**
 * Bayad na ang downpayment → `confirmed`. Tinatanggap pa rin kahit lumipas na
 * ang hold, basta buo pa ang mga lock (walang ibang kumuha). Kapag nakuha na
 * ng iba ang slot habang late ang bayad, `false` — ire-refund iyon ng club.
 *
 * Iisang UPDATE na may kondisyon (sa iisang write batch), para walang
 * `releaseExpired` na makakasingit sa pagitan ng pagsusuri at pag-confirm.
 */
export async function confirmReservation(id: number, paymentRef: string): Promise<boolean> {
  const client = await connection();
  const [updated, after] = await client.batch(
    [
      {
        sql: `UPDATE tee_reservations SET status = 'confirmed', payment_ref = ?, paid_at = ?
              WHERE id = ? AND status <> 'confirmed' AND EXISTS (SELECT 1 FROM tee_locks WHERE reservation_id = ?)`,
        args: [paymentRef, new Date().toISOString(), id, id],
      },
      { sql: "SELECT * FROM tee_reservations WHERE id = ?", args: [id] },
    ],
    "write",
  );
  const row = after.rows[0];
  /* Ngayon lang na-confirm (hindi ang pangalawang tawag ng webhook/return):
     abisuhan ang phone ng member (pagkatapos ng sagot — tingnan ang push.ts). */
  if (updated.rowsAffected > 0 && row) {
    const reservation = toReservation(row);
    notifyConfirmed(reservation);
    emailGuest(confirmedEmail(reservation));
  }
  return row?.status === "confirmed";
}
