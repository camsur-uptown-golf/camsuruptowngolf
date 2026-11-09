import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { Client, Row } from "@libsql/client";
import { db, isUniqueViolation } from "@/lib/db";

/**
 * Mga miyembro at ang kanilang mga session — ang likod ng Member's Login.
 *
 * Hiwalay na mga talahanayan sa `inquiries-db.ts`: iba ang sensitibo ng datos
 * dito (password hash). Sa lokal ay sariling file pa (`data/members.sqlite`).
 *
 * PASSWORD: scrypt na may sariling random na salt ang bawat miyembro. Hindi
 * kailanman iniimbak ang mismong password. Nakasulat ang mga parameter sa
 * hash mismo (`scrypt$N$r$p$salt$hash`), kaya maaaring palakasin ang mga ito
 * sa hinaharap nang hindi nasisira ang mga lumang account.
 *
 * SESSION: random na 32-byte na token sa isang httpOnly cookie. Ang SHA-256
 * ng token lang ang nasa database — kapag nanakaw ang database file, hindi
 * magagamit ang laman nito para mag-login bilang kahit sino.
 *
 * DATABASE: Turso (libsql) kapag may TURSO_DATABASE_URL — iisa ang database
 * ng website, mobile app at admin — kung wala, ang lokal na file (tingnan ang
 * `db.ts`). Node runtime lang, kaya `export const runtime = "nodejs"` sa
 * bawat route na gumagamit nito.
 */

export const SESSION_COOKIE = "cu-member";
export const SESSION_DAYS = 30;

const SCRYPT = { N: 16384, r: 8, p: 1, keylen: 64 } as const;

export type Member = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  mobile: string | null;
  createdAt: string;
  lastLoginAt: string | null;
  /** Membership plan (`membership-plans.ts`), o `null` kung wala pa. */
  plan: string | null;
  planSince: string | null;
  /** Litrato ng Google account (https), kapag Google ang ginamit; kung hindi, `null`. */
  picture: string | null;
};

export type SignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  password: string;
};

/* Gaya ng inquiries-db: tumatakbo ang schema pagkatapos ng bawat hot reload,
   kahit nabubuhay ang client sa globalThis. */
let ready: Promise<void> | null = null;

async function applySchema(client: Client) {
  await client.batch(
    [
      `CREATE TABLE IF NOT EXISTS members (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        email          TEXT    NOT NULL UNIQUE COLLATE NOCASE,
        password_hash  TEXT    NOT NULL,
        first_name     TEXT    NOT NULL,
        last_name      TEXT    NOT NULL,
        mobile         TEXT,
        created_at     TEXT    NOT NULL,
        last_login_at  TEXT
      )`,
      `CREATE TABLE IF NOT EXISTS member_sessions (
        token_hash  TEXT    PRIMARY KEY,
        member_id   INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
        created_at  TEXT    NOT NULL,
        expires_at  TEXT    NOT NULL
      )`,
      "CREATE INDEX IF NOT EXISTS member_sessions_member ON member_sessions(member_id)",
      /* "Continue with Google" ng member app: panandaliang code (tingnan sa ibaba). */
      `CREATE TABLE IF NOT EXISTS app_login_codes (
        code_hash   TEXT    PRIMARY KEY,
        member_id   INTEGER NOT NULL,
        challenge   TEXT    NOT NULL,
        expires_at  TEXT    NOT NULL
      )`,
    ],
    "write",
  );
  /* Idinagdag pagkatapos ng unang bersyon — ALTER lang kapag wala pa ang
     column, para gumana sa database na mayroon nang mga miyembro. */
  const info = await client.execute("PRAGMA table_info(members)");
  const columns = new Set(info.rows.map((c) => String(c.name)));
  const addColumn = async (name: string) => {
    if (columns.has(name)) return;
    try {
      await client.execute(`ALTER TABLE members ADD COLUMN ${name} TEXT`);
    } catch (error) {
      /* Naunahan ng ibang instance — ayos lang. */
      if (!(error instanceof Error && /duplicate column/i.test(error.message))) throw error;
    }
  };
  await addColumn("plan");
  await addColumn("plan_since");
  /* "Continue with Google / Apple": ang `sub` ng account sa provider. */
  await addColumn("google_sub");
  await addColumn("apple_sub");
  await addColumn("picture");
  await client.batch(
    [
      "CREATE UNIQUE INDEX IF NOT EXISTS members_google_sub ON members(google_sub) WHERE google_sub IS NOT NULL",
      "CREATE UNIQUE INDEX IF NOT EXISTS members_apple_sub ON members(apple_sub) WHERE apple_sub IS NOT NULL",
    ],
    "write",
  );
}

async function connection(): Promise<Client> {
  const client = db("members");
  ready ??= applySchema(client).catch((error) => {
    ready = null;
    throw error;
  });
  await ready;
  return client;
}

/* ---------- Password ---------- */

export function hashPassword(password: string): string {
  const salt = randomBytes(16);
  const hash = scryptSync(password, salt, SCRYPT.keylen, { N: SCRYPT.N, r: SCRYPT.r, p: SCRYPT.p });
  return ["scrypt", SCRYPT.N, SCRYPT.r, SCRYPT.p, salt.toString("base64"), hash.toString("base64")].join("$");
}

export function verifyPassword(password: string, stored: string): boolean {
  const [scheme, n, r, p, saltB64, hashB64] = stored.split("$");
  if (scheme !== "scrypt" || !saltB64 || !hashB64) return false;
  const expected = Buffer.from(hashB64, "base64");
  const actual = scryptSync(password, Buffer.from(saltB64, "base64"), expected.length, {
    N: Number(n),
    r: Number(r),
    p: Number(p),
  });
  return actual.length === expected.length && timingSafeEqual(actual, expected);
}

/* Isang hash na laging kinukumpara kapag walang ganoong email, para pareho
   ang tagal ng sagot — hindi malalaman sa bilis kung may account ang email. */
const DUMMY_HASH = hashPassword(randomBytes(16).toString("hex"));

/* ---------- Members ---------- */

function toMember(row: Row): Member {
  const text = (value: unknown) => (value == null ? null : String(value));
  return {
    id: Number(row.id),
    email: String(row.email),
    firstName: String(row.first_name),
    lastName: String(row.last_name),
    mobile: text(row.mobile),
    createdAt: String(row.created_at),
    lastLoginAt: text(row.last_login_at),
    plan: text(row.plan),
    planSince: text(row.plan_since),
    picture: text(row.picture),
  };
}

/** `null` kapag may account na ang email. */
export async function createMember(input: SignupInput): Promise<Member | null> {
  const now = new Date().toISOString();
  const client = await connection();
  try {
    const result = await client.execute({
      sql: `INSERT INTO members (email, password_hash, first_name, last_name, mobile, created_at)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [input.email, hashPassword(input.password), input.firstName, input.lastName, input.mobile ?? null, now],
    });
    return {
      id: Number(result.lastInsertRowid),
      email: input.email,
      firstName: input.firstName,
      lastName: input.lastName,
      mobile: input.mobile ?? null,
      createdAt: now,
      lastLoginAt: null,
      plan: null,
      planSince: null,
      picture: null,
    };
  } catch (error) {
    if (isUniqueViolation(error)) return null;
    throw error;
  }
}

/** Ang miyembro kapag tama ang email at password; kung hindi, `null`. */
export async function authenticate(email: string, password: string): Promise<Member | null> {
  const client = await connection();
  const row = (await client.execute({ sql: "SELECT * FROM members WHERE email = ?", args: [email] })).rows[0];
  if (!row || !row.password_hash) {
    verifyPassword(password, DUMMY_HASH);
    return null;
  }
  if (!verifyPassword(password, String(row.password_hash))) return null;
  const now = new Date().toISOString();
  await client.execute({ sql: "UPDATE members SET last_login_at = ? WHERE id = ?", args: [now, row.id] });
  return { ...toMember(row), lastLoginAt: now };
}

/* ---------- Sessions ---------- */

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

/** Bagong session para sa miyembro; ibinabalik ang token para sa cookie. */
export async function createSession(memberId: number): Promise<{ token: string; expiresAt: Date }> {
  const token = randomBytes(32).toString("base64url");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DAYS * 86_400_000);
  const client = await connection();
  await client.batch(
    [
      /* Paglilinis habang nandito na rin: alisin ang mga lumipas nang session. */
      { sql: "DELETE FROM member_sessions WHERE expires_at < ?", args: [now.toISOString()] },
      {
        sql: "INSERT INTO member_sessions (token_hash, member_id, created_at, expires_at) VALUES (?, ?, ?, ?)",
        args: [sha256(token), memberId, now.toISOString(), expiresAt.toISOString()],
      },
    ],
    "write",
  );
  return { token, expiresAt };
}

export async function memberFromSession(token: string | undefined): Promise<Member | null> {
  if (!token) return null;
  const client = await connection();
  const row = (
    await client.execute({
      sql: `SELECT m.id, m.email, m.first_name, m.last_name, m.mobile, m.created_at, m.last_login_at, m.plan, m.plan_since, m.picture
            FROM member_sessions s JOIN members m ON m.id = s.member_id
            WHERE s.token_hash = ? AND s.expires_at > ?`,
      args: [sha256(token), new Date().toISOString()],
    })
  ).rows[0];
  return row ? toMember(row) : null;
}

export async function deleteSession(token: string | undefined): Promise<void> {
  if (!token) return;
  const client = await connection();
  await client.execute({ sql: "DELETE FROM member_sessions WHERE token_hash = ?", args: [sha256(token)] });
}

/* ---------- Google/Apple sa member app ---------- */

const APP_CODE_MINUTES = 3;

/**
 * Pagkatapos ng Google sa in-app browser, isang beses na code ang ibinabalik
 * sa app (hindi ang session token mismo — dumadaan ito sa URL). Ipinapalit ito
 * ng app sa token gamit ang `verifier` na ito lang ang may hawak (PKCE):
 * kahit maagaw ang code mula sa redirect, walang silbi ito nang walang verifier.
 */
export async function createAppLoginCode(memberId: number, challenge: string): Promise<string> {
  const code = randomBytes(32).toString("base64url");
  const now = new Date();
  const client = await connection();
  await client.batch(
    [
      { sql: "DELETE FROM app_login_codes WHERE expires_at < ?", args: [now.toISOString()] },
      {
        sql: "INSERT INTO app_login_codes (code_hash, member_id, challenge, expires_at) VALUES (?, ?, ?, ?)",
        args: [sha256(code), memberId, challenge, new Date(now.getTime() + APP_CODE_MINUTES * 60_000).toISOString()],
      },
    ],
    "write",
  );
  return code;
}

/** Isang beses lang magagamit: binubura agad. Ang member kapag tugma ang verifier. */
export async function redeemAppLoginCode(code: string, verifier: string): Promise<Member | null> {
  const client = await connection();
  const [found] = await client.batch(
    [
      { sql: "SELECT member_id, challenge, expires_at FROM app_login_codes WHERE code_hash = ?", args: [sha256(code)] },
      { sql: "DELETE FROM app_login_codes WHERE code_hash = ?", args: [sha256(code)] },
    ],
    "write",
  );
  const row = found.rows[0];
  if (!row || String(row.expires_at) < new Date().toISOString()) return null;
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  if (challenge !== String(row.challenge)) return null;
  const member = await client.execute({ sql: "SELECT * FROM members WHERE id = ?", args: [Number(row.member_id)] });
  return member.rows[0] ? toMember(member.rows[0]) : null;
}

/* ---------- Membership plan ---------- */

/** Itinatakda (o inaalis, kapag `null`) ang plan ng miyembro. Ang route ang
    sumusuri na kilalang plan ang `plan`. */
export async function setMemberPlan(memberId: number, plan: string | null): Promise<void> {
  const client = await connection();
  await client.execute({
    sql: "UPDATE members SET plan = ?, plan_since = ? WHERE id = ?",
    args: [plan, plan ? new Date().toISOString() : null, memberId],
  });
}

/* ---------- Google / Apple ---------- */

export type OAuthIdentity = {
  provider: "google" | "apple";
  sub: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
  /** Google lang ang nagbibigay; sinasariwa sa bawat login. */
  picture?: string | null;
};

/**
 * Ang miyembrong may ganitong Google/Apple account, o bago kung wala pa.
 *
 * 1. May miyembro nang naka-link sa `sub` na ito → siya.
 * 2. May miyembro na may parehong email AT beripikado ng provider ang email
 *    → ili-link ang account sa kanya (iisang tao, dalawang paraan ng login).
 *    Kapag hindi beripikado, HINDI ili-link — kung hindi ay maaagaw ng
 *    sinumang may pekeng email ang account ng iba.
 * 3. Wala → bagong miyembro. Random at hindi alam na password ang inilalagay,
 *    kaya sa Google/Apple lang siya makakapag-login hangga't hindi nagse-set
 *    ng password.
 */
export async function findOrCreateOAuthMember(identity: OAuthIdentity): Promise<Member | null> {
  const column = identity.provider === "google" ? "google_sub" : "apple_sub";
  const client = await connection();
  const linked = (await client.execute({ sql: `SELECT * FROM members WHERE ${column} = ?`, args: [identity.sub] })).rows[0];
  const now = new Date().toISOString();
  const picture = identity.picture ?? null;
  if (linked) {
    await client.execute({
      sql: "UPDATE members SET last_login_at = ?, picture = COALESCE(?, picture) WHERE id = ?",
      args: [now, picture, linked.id],
    });
    return { ...toMember(linked), lastLoginAt: now, ...(picture ? { picture } : {}) };
  }

  const byEmail = (await client.execute({ sql: "SELECT * FROM members WHERE email = ?", args: [identity.email] })).rows[0];
  if (byEmail) {
    if (!identity.emailVerified) return null;
    await client.execute({
      sql: `UPDATE members SET ${column} = ?, last_login_at = ?, picture = COALESCE(?, picture) WHERE id = ?`,
      args: [identity.sub, now, picture, byEmail.id],
    });
    return { ...toMember(byEmail), lastLoginAt: now, ...(picture ? { picture } : {}) };
  }

  const result = await client.execute({
    sql: `INSERT INTO members (email, password_hash, first_name, last_name, created_at, last_login_at, ${column}, picture)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [identity.email, hashPassword(randomBytes(32).toString("hex")), identity.firstName, identity.lastName, now, now, identity.sub, picture],
  });
  return {
    id: Number(result.lastInsertRowid),
    email: identity.email,
    firstName: identity.firstName,
    lastName: identity.lastName,
    mobile: null,
    createdAt: now,
    lastLoginAt: now,
    plan: null,
    planSince: null,
    picture,
  };
}
