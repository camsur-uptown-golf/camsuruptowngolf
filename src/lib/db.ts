import { createClient, type Client } from "@libsql/client";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * Iisang database ng website, mobile app at admin.
 *
 *   - May TURSO_DATABASE_URL (Vercel, o lokal na naka-.env.local): lahat ng
 *     "store" ay nasa iisang Turso database — magkakaiba ang pangalan ng mga
 *     table, kaya walang nagbabanggaan.
 *   - Wala (offline na development): ang dating lokal na file sa data/ ng
 *     bawat store, gaya noon.
 *
 * Async ang lahat (libsql), kaya `await` ang bawat tawag.
 */
export type Store = "inquiries" | "members" | "reservations";

const LOCAL_FILES: Record<Store, string> = {
  inquiries: "camsuruptown.sqlite",
  members: "members.sqlite",
  reservations: "reservations.sqlite",
};

/* Isang client bawat URL, nakaimbak sa globalThis para hindi dumami sa hot reload. */
const cache = globalThis as unknown as { __siteDbClients?: Map<string, Client> };
const clients = (cache.__siteDbClients ??= new Map());

/**
 * Ang TURSO_* na galing sa Vercel o sa .env.local, nilinis: madalas sumama sa
 * pag-paste ang espasyo o bagong linya sa dulo, ang mga quote, o ang mismong
 * "TURSO_AUTH_TOKEN=" — at sa alinman sa mga iyon ay tinatanggihan ng Turso
 * ang token ("Server returned HTTP status 400").
 */
function envValue(name: "TURSO_DATABASE_URL" | "TURSO_AUTH_TOKEN"): string | undefined {
  let value = process.env[name]?.trim();
  if (!value) return undefined;
  if (value.startsWith(`${name}=`)) value = value.slice(name.length + 1).trim();
  value = value.replace(/^(['"])(.*)\1$/, "$2").trim();
  return value || undefined;
}

/* Minsan lang, sa unang koneksyon: makikita sa Vercel Logs kung ano ang
   nabasa — host at haba lang, hindi ang token mismo. */
let described = false;
function describeTurso(url: string, token: string | undefined) {
  if (described) return;
  described = true;
  let host = "(hindi URL)";
  try {
    host = new URL(url).host;
  } catch {}
  const parts = token?.split(".").length ?? 0;
  console.info(
    `[db] Turso: host=${host}, token=${token ? `${token.length} chars, ${parts === 3 ? "mukhang JWT" : "HINDI mukhang JWT"}` : "WALA"}`,
  );
}

export function usingTurso(): boolean {
  return Boolean(envValue("TURSO_DATABASE_URL"));
}

export function db(store: Store): Client {
  const remote = envValue("TURSO_DATABASE_URL");
  let url: string;
  if (remote) {
    url = remote;
  } else {
    const dir = path.join(/*turbopackIgnore: true*/ process.cwd(), "data");
    mkdirSync(dir, { recursive: true });
    url = `file:${path.join(dir, LOCAL_FILES[store])}`;
  }
  const existing = clients.get(url);
  if (existing) return existing;
  /* Lokal: maghintay nang hanggang 5s kapag may ibang may hawak ng lock sa file
     (dating `PRAGMA busy_timeout`), sa halip na agad na SQLITE_BUSY. */
  const authToken = envValue("TURSO_AUTH_TOKEN");
  if (remote) describeTurso(url, authToken);
  const client = createClient(remote ? { url, authToken } : { url, timeout: 5000 });
  clients.set(url, client);
  return client;
}

/**
 * Lumabag sa UNIQUE / PRIMARY KEY — hal. nakuha na ng iba ang slot. Iba ang
 * hugis ng error sa lokal na file at sa Turso, kaya parehong code at mensahe
 * ang tinitingnan.
 */
export function isUniqueViolation(error: unknown): boolean {
  if (!(error instanceof Error)) return false;
  const { extendedCode } = error as { extendedCode?: string };
  if (extendedCode === "SQLITE_CONSTRAINT_PRIMARYKEY" || extendedCode === "SQLITE_CONSTRAINT_UNIQUE") return true;
  return /UNIQUE constraint failed|PRIMARY KEY/i.test(error.message);
}
