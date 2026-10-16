import { DatabaseSync } from "node:sqlite";
import { createHash, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * Mga miyembro at ang kanilang mga session — ang likod ng Member's Login.
 *
 * Hiwalay na file sa `inquiries-db.ts` (`data/members.sqlite`): iba ang
 * sensitibo ng datos dito (password hash), kaya hindi ito isinasama sa mga
 * inquiry na binabasa ng admin.
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
 * Node runtime lang (`node:sqlite`), kaya `export const runtime = "nodejs"`
 * sa bawat route na gumagamit nito.
 *
 * TODO bago i-deploy: lokal na file ito. Sa Vercel (serverless) ay
 * panandalian ang filesystem — mawawala ang mga account sa bawat deploy.
 * Ilipat sa hosted database bago buksan ito sa totoong mga miyembro.
 */

const DB_FILE = path.join(process.cwd(), "data", "members.sqlite");

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
};

export type SignupInput = {
  firstName: string;
  lastName: string;
  email: string;
  mobile?: string;
  password: string;
};

const globalCache = globalThis as unknown as { __membersDb?: DatabaseSync };
/* Gaya ng inquiries-db: tumatakbo ang schema pagkatapos ng bawat hot reload,
   kahit nabubuhay ang connection sa globalThis. */
let schemaApplied = false;

function db() {
  if (!globalCache.__membersDb) {
    mkdirSync(path.dirname(DB_FILE), { recursive: true });
    globalCache.__membersDb = new DatabaseSync(DB_FILE);
    globalCache.__membersDb.exec("PRAGMA journal_mode = WAL; PRAGMA foreign_keys = ON;");
  }
  const connection = globalCache.__membersDb;
  if (!schemaApplied) {
    connection.exec(`
      CREATE TABLE IF NOT EXISTS members (
        id             INTEGER PRIMARY KEY AUTOINCREMENT,
        email          TEXT    NOT NULL UNIQUE COLLATE NOCASE,
        password_hash  TEXT    NOT NULL,
        first_name     TEXT    NOT NULL,
        last_name      TEXT    NOT NULL,
        mobile         TEXT,
        created_at     TEXT    NOT NULL,
        last_login_at  TEXT
      );
      CREATE TABLE IF NOT EXISTS member_sessions (
        token_hash  TEXT    PRIMARY KEY,
        member_id   INTEGER NOT NULL REFERENCES members(id) ON DELETE CASCADE,
        created_at  TEXT    NOT NULL,
        expires_at  TEXT    NOT NULL
      );
      CREATE INDEX IF NOT EXISTS member_sessions_member ON member_sessions(member_id);
    `);
    /* Idinagdag pagkatapos ng unang bersyon — ALTER lang kapag wala pa ang
       column, para gumana sa database na mayroon nang mga miyembro. */
    const columns = new Set(
      (connection.prepare("PRAGMA table_info(members)").all() as { name: string }[]).map((c) => c.name),
    );
    if (!columns.has("plan")) connection.exec("ALTER TABLE members ADD COLUMN plan TEXT");
    if (!columns.has("plan_since")) connection.exec("ALTER TABLE members ADD COLUMN plan_since TEXT");
    /* "Continue with Google / Apple": ang `sub` ng account sa provider. */
    if (!columns.has("google_sub")) connection.exec("ALTER TABLE members ADD COLUMN google_sub TEXT");
    if (!columns.has("apple_sub")) connection.exec("ALTER TABLE members ADD COLUMN apple_sub TEXT");
    connection.exec(`
      CREATE UNIQUE INDEX IF NOT EXISTS members_google_sub ON members(google_sub) WHERE google_sub IS NOT NULL;
      CREATE UNIQUE INDEX IF NOT EXISTS members_apple_sub ON members(apple_sub) WHERE apple_sub IS NOT NULL;
    `);
    schemaApplied = true;
  }
  return connection;
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

type MemberRow = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  mobile: string | null;
  created_at: string;
  last_login_at: string | null;
  plan?: string | null;
  plan_since?: string | null;
  password_hash?: string;
};

function toMember(row: MemberRow): Member {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    mobile: row.mobile,
    createdAt: row.created_at,
    lastLoginAt: row.last_login_at,
    plan: row.plan ?? null,
    planSince: row.plan_since ?? null,
  };
}

/** `null` kapag may account na ang email. */
export function createMember(input: SignupInput): Member | null {
  const now = new Date().toISOString();
  try {
    const result = db()
      .prepare(
        `INSERT INTO members (email, password_hash, first_name, last_name, mobile, created_at)
         VALUES (?, ?, ?, ?, ?, ?)`,
      )
      .run(input.email, hashPassword(input.password), input.firstName, input.lastName, input.mobile ?? null, now);
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
    };
  } catch (error) {
    if (error instanceof Error && /UNIQUE/.test(error.message)) return null;
    throw error;
  }
}

/** Ang miyembro kapag tama ang email at password; kung hindi, `null`. */
export function authenticate(email: string, password: string): Member | null {
  const row = db().prepare("SELECT * FROM members WHERE email = ?").get(email) as MemberRow | undefined;
  if (!row || !row.password_hash) {
    verifyPassword(password, DUMMY_HASH);
    return null;
  }
  if (!verifyPassword(password, row.password_hash)) return null;
  const now = new Date().toISOString();
  db().prepare("UPDATE members SET last_login_at = ? WHERE id = ?").run(now, row.id);
  return toMember({ ...row, last_login_at: now });
}

/* ---------- Sessions ---------- */

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

/** Bagong session para sa miyembro; ibinabalik ang token para sa cookie. */
export function createSession(memberId: number): { token: string; expiresAt: Date } {
  const token = randomBytes(32).toString("base64url");
  const now = new Date();
  const expiresAt = new Date(now.getTime() + SESSION_DAYS * 86_400_000);
  const connection = db();
  /* Paglilinis habang nandito na rin: alisin ang mga lumipas nang session. */
  connection.prepare("DELETE FROM member_sessions WHERE expires_at < ?").run(now.toISOString());
  connection
    .prepare("INSERT INTO member_sessions (token_hash, member_id, created_at, expires_at) VALUES (?, ?, ?, ?)")
    .run(sha256(token), memberId, now.toISOString(), expiresAt.toISOString());
  return { token, expiresAt };
}

export function memberFromSession(token: string | undefined): Member | null {
  if (!token) return null;
  const row = db()
    .prepare(
      `SELECT m.id, m.email, m.first_name, m.last_name, m.mobile, m.created_at, m.last_login_at, m.plan, m.plan_since
       FROM member_sessions s JOIN members m ON m.id = s.member_id
       WHERE s.token_hash = ? AND s.expires_at > ?`,
    )
    .get(sha256(token), new Date().toISOString()) as MemberRow | undefined;
  return row ? toMember(row) : null;
}

export function deleteSession(token: string | undefined) {
  if (!token) return;
  db().prepare("DELETE FROM member_sessions WHERE token_hash = ?").run(sha256(token));
}

/* ---------- Membership plan ---------- */

/** Itinatakda (o inaalis, kapag `null`) ang plan ng miyembro. Ang route ang
    sumusuri na kilalang plan ang `plan`. */
export function setMemberPlan(memberId: number, plan: string | null) {
  db()
    .prepare("UPDATE members SET plan = ?, plan_since = ? WHERE id = ?")
    .run(plan, plan ? new Date().toISOString() : null, memberId);
}

/* ---------- Google / Apple ---------- */

export type OAuthIdentity = {
  provider: "google" | "apple";
  sub: string;
  email: string;
  emailVerified: boolean;
  firstName: string;
  lastName: string;
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
export function findOrCreateOAuthMember(identity: OAuthIdentity): Member | null {
  const column = identity.provider === "google" ? "google_sub" : "apple_sub";
  const connection = db();
  const linked = connection.prepare(`SELECT * FROM members WHERE ${column} = ?`).get(identity.sub) as MemberRow | undefined;
  const now = new Date().toISOString();
  if (linked) {
    connection.prepare("UPDATE members SET last_login_at = ? WHERE id = ?").run(now, linked.id);
    return toMember({ ...linked, last_login_at: now });
  }

  const byEmail = connection.prepare("SELECT * FROM members WHERE email = ?").get(identity.email) as MemberRow | undefined;
  if (byEmail) {
    if (!identity.emailVerified) return null;
    connection.prepare(`UPDATE members SET ${column} = ?, last_login_at = ? WHERE id = ?`).run(identity.sub, now, byEmail.id);
    return toMember({ ...byEmail, last_login_at: now });
  }

  const result = connection
    .prepare(
      `INSERT INTO members (email, password_hash, first_name, last_name, created_at, last_login_at, ${column})
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    )
    .run(identity.email, hashPassword(randomBytes(32).toString("hex")), identity.firstName, identity.lastName, now, now, identity.sub);
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
  };
}
