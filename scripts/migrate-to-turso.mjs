// Kinokopya ang lokal na data (data/*.sqlite ng website at data/admin.sqlite
// ng admin) papunta sa Turso — iisang database na ng website, app at admin.
//
//   node --env-file=.env.local scripts/migrate-to-turso.mjs
//
// Ligtas ulitin: INSERT OR IGNORE, at pareho ang mga id (kailangan ito ng
// tee_locks/villa_locks na tumuturo sa tee_reservations.id). Hindi binubura o
// binabago ang lokal na mga file.
import { createClient } from "@libsql/client";
import { existsSync } from "node:fs";
import path from "node:path";
import { DatabaseSync } from "node:sqlite";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!url || !authToken) {
  console.error("Kulang ang TURSO_DATABASE_URL o TURSO_AUTH_TOKEN sa .env.local.");
  process.exit(1);
}

const siteData = path.resolve("data");
const adminData = path.resolve(process.env.ADMIN_DATA_DIR || path.join("..", "admin-camsuruptowngolf", "data"));
const SOURCES = [
  path.join(siteData, "camsuruptown.sqlite"),
  path.join(siteData, "members.sqlite"),
  path.join(siteData, "reservations.sqlite"),
  path.join(adminData, "admin.sqlite"),
];

const turso = createClient({ url, authToken });

/* Mga magulang muna (tee_reservations) bago ang mga tumuturo rito (mga lock). */
const ORDER = ["tee_reservations", "members", "admins"];
const rank = (name) => (ORDER.includes(name) ? 0 : 1);

for (const file of SOURCES) {
  if (!existsSync(file)) {
    console.log(`– wala: ${file}`);
    continue;
  }
  const local = new DatabaseSync(file, { readOnly: true });
  const objects = local
    .prepare("SELECT type, name, sql FROM sqlite_master WHERE sql IS NOT NULL AND name NOT LIKE 'sqlite_%'")
    .all();

  /* Schema: kapareho ng lokal, pero IF NOT EXISTS para ligtas ulitin. */
  const tables = objects.filter((o) => o.type === "table").sort((a, b) => rank(a.name) - rank(b.name));
  for (const table of tables) {
    await turso.execute(table.sql.replace(/^CREATE TABLE\s+(?!IF NOT EXISTS)/i, "CREATE TABLE IF NOT EXISTS "));
  }
  for (const index of objects.filter((o) => o.type === "index")) {
    await turso.execute(index.sql.replace(/^CREATE (UNIQUE )?INDEX\s+(?!IF NOT EXISTS)/i, "CREATE $1INDEX IF NOT EXISTS "));
  }

  for (const table of tables) {
    const rows = local.prepare(`SELECT * FROM "${table.name}"`).all();
    if (rows.length === 0) {
      console.log(`  ${table.name}: 0`);
      continue;
    }
    const columns = Object.keys(rows[0]);
    const sql = `INSERT OR IGNORE INTO "${table.name}" (${columns.map((c) => `"${c}"`).join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`;
    /* Pakete-pakete, para hindi lumaki nang husto ang isang request. */
    for (let i = 0; i < rows.length; i += 200) {
      await turso.batch(
        rows.slice(i, i + 200).map((row) => ({ sql, args: columns.map((c) => row[c] ?? null) })),
        "write",
      );
    }
    const { rows: count } = await turso.execute(`SELECT COUNT(*) AS n FROM "${table.name}"`);
    console.log(`  ${table.name}: ${rows.length} lokal → ${Number(count[0].n)} sa Turso`);
  }
  local.close();
  console.log(`✓ ${path.basename(file)}`);
}

turso.close();
