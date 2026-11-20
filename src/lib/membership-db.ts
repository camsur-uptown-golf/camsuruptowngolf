import { randomBytes } from "node:crypto";
import type { Row } from "@libsql/client";
import { membersConnection } from "@/lib/members-db";
import type { BillingTerm, PlanId } from "@/lib/membership-plans";

/**
 * Mga bayad sa membership (PayMongo o PayPal, o cash/bank sa clubhouse na itinatala
 * ng staff sa admin).
 *
 * DALOY: pending na bayad → PayMongo/PayPal checkout → `confirmMembershipPayment`
 * (mula sa pagbalik ng member o sa webhook, alinman ang mauna) → `paid`, at
 * ang member ay may `plan` at `plan_until` (huling araw na bayad).
 *
 * PAG-RENEW NG PAREHONG PLAN habang aktibo pa: idinudugtong ang bagong buwan
 * pagkatapos ng `plan_until` — walang nasasayang na araw. Ibang plan, o
 * lumipas na: magsisimula ngayon.
 *
 * Nasa members store (iisang database ng site, app at admin).
 */

export type MembershipPaymentStatus = "pending" | "paid" | "cancelled";

export type MembershipPayment = {
  id: number;
  code: string;
  memberId: number;
  plan: PlanId;
  months: number;
  amount: number;
  status: MembershipPaymentStatus;
  source: "paymongo" | "paypal" | "manual" | "test";
  checkoutSessionId: string | null;
  paymentRef: string | null;
  createdAt: string;
  paidAt: string | null;
  periodStart: string | null;
  periodEnd: string | null;
};

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS membership_payments (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    code                TEXT    NOT NULL UNIQUE,
    member_id           INTEGER NOT NULL,
    plan                TEXT    NOT NULL,
    months              INTEGER NOT NULL,
    amount              INTEGER NOT NULL,
    status              TEXT    NOT NULL,
    source              TEXT    NOT NULL,
    checkout_session_id TEXT,
    payment_ref         TEXT,
    created_at          TEXT    NOT NULL,
    paid_at             TEXT,
    period_start        TEXT,
    period_end          TEXT
  )`,
  "CREATE INDEX IF NOT EXISTS membership_payments_member ON membership_payments(member_id)",
];

let ready: Promise<void> | null = null;

async function connection() {
  const client = await membersConnection();
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

function toPayment(row: Row): MembershipPayment {
  const text = (value: unknown) => (value == null ? null : String(value));
  return {
    id: Number(row.id),
    code: String(row.code),
    memberId: Number(row.member_id),
    plan: String(row.plan) as PlanId,
    months: Number(row.months),
    amount: Number(row.amount),
    status: String(row.status) as MembershipPaymentStatus,
    source: String(row.source) as MembershipPayment["source"],
    checkoutSessionId: text(row.checkout_session_id),
    paymentRef: text(row.payment_ref),
    createdAt: String(row.created_at),
    paidAt: text(row.paid_at),
    periodStart: text(row.period_start),
    periodEnd: text(row.period_end),
  };
}

function newCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return "MB-" + Array.from(randomBytes(10), (b) => alphabet[b % alphabet.length]).join("");
}

/** Ngayon sa Maynila, YYYY-MM-DD. */
const todayInManila = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Manila" }).format(new Date());

const addDays = (date: string, days: number) => new Date(Date.parse(`${date}T00:00:00Z`) + days * 86_400_000).toISOString().slice(0, 10);

/** Huling araw ng `months` na buwan mula `start`: 2026-11-10 + 1 buwan → 2026-12-09. */
function periodEnd(start: string, months: number) {
  const date = new Date(`${start}T00:00:00Z`);
  const day = date.getUTCDate();
  date.setUTCDate(1);
  date.setUTCMonth(date.getUTCMonth() + months);
  /* Hal. Ene 31 + 1 buwan → Peb 28/29, hindi Marso 3. */
  const lastOfMonth = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + 1, 0)).getUTCDate();
  date.setUTCDate(Math.min(day, lastOfMonth));
  return addDays(date.toISOString().slice(0, 10), -1);
}

export async function createPendingPayment(input: {
  memberId: number;
  plan: PlanId;
  months: BillingTerm;
  amount: number;
  source: MembershipPayment["source"];
}): Promise<MembershipPayment> {
  const client = await connection();
  const result = await client.execute({
    sql: `INSERT INTO membership_payments (code, member_id, plan, months, amount, status, source, created_at)
          VALUES (?, ?, ?, ?, ?, 'pending', ?, ?) RETURNING *`,
    args: [newCode(), input.memberId, input.plan, input.months, input.amount, input.source, new Date().toISOString()],
  });
  return toPayment(result.rows[0]);
}

export async function attachMembershipCheckout(id: number, sessionId: string): Promise<void> {
  const client = await connection();
  await client.execute({ sql: "UPDATE membership_payments SET checkout_session_id = ? WHERE id = ?", args: [sessionId, id] });
}

export async function getMembershipPayment(code: string): Promise<MembershipPayment | null> {
  const client = await connection();
  const result = await client.execute({ sql: "SELECT * FROM membership_payments WHERE code = ?", args: [code] });
  return result.rows[0] ? toPayment(result.rows[0]) : null;
}

export async function getMembershipPaymentBySession(sessionId: string): Promise<MembershipPayment | null> {
  const client = await connection();
  const result = await client.execute({ sql: "SELECT * FROM membership_payments WHERE checkout_session_id = ?", args: [sessionId] });
  return result.rows[0] ? toPayment(result.rows[0]) : null;
}

/** Mga bayad ng member, pinakabago muna — para sa resibo/history. */
export async function memberPayments(memberId: number): Promise<MembershipPayment[]> {
  const client = await connection();
  const result = await client.execute({
    sql: "SELECT * FROM membership_payments WHERE member_id = ? AND status = 'paid' ORDER BY paid_at DESC LIMIT 50",
    args: [memberId],
  });
  return result.rows.map(toPayment);
}

/**
 * Bayad na → `paid`, at aktibo ang plan ng member hanggang sa bagong
 * `plan_until`. Isang beses lang: ang pangalawang tawag (webhook pagkatapos
 * ng pagbalik, o kabaligtaran) ay walang ginagawa at `null` ang balik.
 */
export async function confirmMembershipPayment(id: number, paymentRef: string): Promise<MembershipPayment | null> {
  const client = await connection();
  const tx = await client.transaction("write");
  try {
    const found = await tx.execute({ sql: "SELECT * FROM membership_payments WHERE id = ? AND status = 'pending'", args: [id] });
    if (!found.rows[0]) return null;
    const payment = toPayment(found.rows[0]);
    const member = (await tx.execute({ sql: "SELECT plan, plan_until FROM members WHERE id = ?", args: [payment.memberId] })).rows[0];
    if (!member) return null;

    const today = todayInManila();
    const currentUntil = member.plan_until == null ? null : String(member.plan_until);
    const extends_ = member.plan === payment.plan && currentUntil !== null && currentUntil >= today;
    const start = extends_ ? addDays(currentUntil, 1) : today;
    const end = periodEnd(start, payment.months);
    const now = new Date().toISOString();

    await tx.batch([
      {
        sql: `UPDATE membership_payments SET status = 'paid', payment_ref = ?, paid_at = ?, period_start = ?, period_end = ? WHERE id = ?`,
        args: [paymentRef, now, start, end, id],
      },
      {
        /* `plan_since`: bago lang kapag ibang plan (o unang bayad). */
        sql: `UPDATE members SET plan = ?, plan_until = ?,
                plan_since = CASE WHEN plan = ? AND plan_since IS NOT NULL THEN plan_since ELSE ? END
              WHERE id = ?`,
        args: [payment.plan, end, payment.plan, now, payment.memberId],
      },
    ]);
    await tx.commit();
    return { ...payment, status: "paid", paymentRef, paidAt: now, periodStart: start, periodEnd: end };
  } finally {
    tx.close();
  }
}
