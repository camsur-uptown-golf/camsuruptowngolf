/**
 * Naglalagay ng ilang HALIMBAWANG "ask about availability" na request sa lokal
 * na SQLite, para may makita agad sa admin Availability page.
 *
 *   npm run seed-availability
 *
 * Idempotent: minamarkahan ng `@example.com` ang mga halimbawa, at binubura
 * muna ang mga iyon bago mag-insert ulit — kaya hindi nag-iipon ng doble sa
 * paulit-ulit na takbo, at hindi nagagalaw ang totoong pasa ng bisita.
 *
 * Hiwalay itong bumubukas ng file (hindi dumadaan sa src/lib), kaya gumagana
 * kahit hindi tumatakbo ang dev server. Gumagawa ito ng DB/table kung wala pa.
 */
import { DatabaseSync } from "node:sqlite";
import { mkdirSync } from "node:fs";
import path from "node:path";

const DB_FILE = path.join(process.cwd(), "data", "camsuruptown.sqlite");
mkdirSync(path.dirname(DB_FILE), { recursive: true });

const db = new DatabaseSync(DB_FILE);

/* Gaya ng nasa src/lib/inquiries-db.ts — para tumakbo ito sa sariwang DB. */
db.exec(`
  CREATE TABLE IF NOT EXISTS availability_requests (
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    created_at          TEXT    NOT NULL,
    accommodation_slug  TEXT    NOT NULL,
    accommodation_title TEXT    NOT NULL,
    preferred_date      TEXT    NOT NULL,
    guests              INTEGER NOT NULL,
    first_name          TEXT    NOT NULL,
    last_name           TEXT    NOT NULL,
    email               TEXT    NOT NULL,
    mobile              TEXT    NOT NULL,
    message             TEXT,
    status              TEXT    NOT NULL DEFAULT 'new'
  );
`);

/** YYYY-MM-DD, `days` araw mula ngayon. */
function inDays(days) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

const EXAMPLES = [
  {
    accommodationSlug: "villa-del-rey",
    accommodationTitle: "Villa Del Rey",
    preferredDate: inDays(12),
    guests: 4,
    firstName: "Juan",
    lastName: "Dela Cruz",
    email: "juan.delacruz@example.com",
    mobile: "+63 917 123 4567",
    message: "Golf trip with three friends — hoping for two rooms close together.",
    status: "new",
  },
  {
    accommodationSlug: "villa-del-rey",
    accommodationTitle: "Villa Del Rey",
    preferredDate: inDays(20),
    guests: 2,
    firstName: "Maria",
    lastName: "Santos",
    email: "maria.santos@example.com",
    mobile: "+63 918 222 3344",
    message: "",
    status: "contacted",
  },
  {
    accommodationSlug: "villa-del-rey",
    accommodationTitle: "Villa Del Rey",
    preferredDate: inDays(33),
    guests: 6,
    firstName: "Robert",
    lastName: "Tan",
    email: "robert.tan@example.com",
    mobile: "+63 919 555 7788",
    message: "Family weekend — is an extra bed possible for a child?",
    status: "new",
  },
  {
    accommodationSlug: "villa-del-rey",
    accommodationTitle: "Villa Del Rey",
    preferredDate: inDays(5),
    guests: 3,
    firstName: "Kim",
    lastName: "Min-jae",
    email: "minjae.kim@example.com",
    mobile: "+63 916 300 7914",
    message: "Arriving late — what time is the latest check-in?",
    status: "closed",
  },
];

/* Alisin muna ang dating halimbawa para hindi magdoble. */
const removed = db.prepare(`DELETE FROM availability_requests WHERE email LIKE '%@example.com'`).run();

const insert = db.prepare(
  `INSERT INTO availability_requests
     (created_at, accommodation_slug, accommodation_title, preferred_date,
      guests, first_name, last_name, email, mobile, message, status)
   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
);

EXAMPLES.forEach((e, index) => {
  /* Iba-ibang created_at (mga nakaraang araw) para makita ang pagkaka-ayos. */
  const created = new Date(Date.now() - index * 86_400_000).toISOString();
  insert.run(
    created,
    e.accommodationSlug,
    e.accommodationTitle,
    e.preferredDate,
    e.guests,
    e.firstName,
    e.lastName,
    e.email,
    e.mobile,
    e.message || null,
    e.status,
  );
});

db.close();

console.log(`Tinanggal: ${removed.changes} dating halimbawa`);
console.log(`Idinagdag: ${EXAMPLES.length} halimbawang availability request`);
console.log(`DB: ${DB_FILE}`);
