/**
 * Ipinapakita ang mga naipong "request a call back" mula sa lokal na SQLite.
 *
 *   npm run inquiries          — pinakabago ang una, 30 ang ipinapakita
 *   npm run inquiries -- 100   — mas marami
 *
 * Hiwalay itong binabasa ang file at hindi dumadaan sa src/lib, kaya
 * gumagana ito kahit hindi tumatakbo ang dev server.
 */
import { DatabaseSync } from "node:sqlite";
import { existsSync } from "node:fs";
import path from "node:path";

const DB_FILE = path.join(process.cwd(), "data", "camsuruptown.sqlite");

if (!existsSync(DB_FILE)) {
  console.log("Wala pang database sa " + DB_FILE);
  console.log("Nagagawa ito sa unang beses na may magpapasa ng form.");
  process.exit(0);
}

const limit = Number(process.argv[2]) || 30;
const db = new DatabaseSync(DB_FILE);
const rows = db
  .prepare(
    `SELECT id, created_at, first_name, last_name, email, mobile, interest,
            guests, timeframe, call_windows, question, context, status
       FROM callback_requests
      ORDER BY created_at DESC
      LIMIT ?`,
  )
  .all(limit);

if (rows.length === 0) {
  console.log("Wala pang naipong inquiry.");
} else {
  console.log(`${rows.length} inquiry (pinakabago ang una)\n`);
  for (const r of rows) {
    const when = new Date(r.created_at).toLocaleString("en-PH", { timeZone: "Asia/Manila" });
    console.log(`#${r.id}  ${when}  [${r.status}]`);
    console.log(`  ${r.first_name} ${r.last_name} · ${r.email} · ${r.mobile}`);
    console.log(`  ${r.interest} · ${r.guests} guest(s) · ${r.timeframe}`);
    console.log(`  Tawagan: ${r.call_windows} (PHT)`);
    if (r.context) console.log(`  Galing sa: ${r.context}`);
    if (r.question) console.log(`  Tanong: ${r.question}`);
    console.log("");
  }
}

db.close();
