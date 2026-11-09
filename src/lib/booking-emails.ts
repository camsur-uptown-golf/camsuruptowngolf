import { after } from "next/server";
import { COURSE, VILLA_NIGHTS } from "@/lib/golf-booking";
import { sendMail, type Mail } from "@/lib/mailer";
import { formatPeso } from "@/lib/membership-plans";
import type { Reservation } from "@/lib/reservations-db";
import { CLUB_EMAIL, CLUB_PHONE } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-url";

/**
 * Mga email sa nagpareserve (member man o guest), sa `contact_email` ng booking:
 *
 *   held       → "Complete your downpayment" + link para magbayad
 *   confirmed  → "You're on the tee" + calendar invite: kusang idinadagdag ng
 *                Gmail (at ng iPhone/Outlook) sa calendar ng tumanggap
 *   cancelled  → "Your booking was cancelled"
 *
 * Ipinapadala pagkatapos ng sagot ng route (`after`), kaya hindi bumabagal
 * ang booking at hindi ito napuputol sa Vercel.
 */

const CLUB = "CamSur Uptown Golf";
const ADDRESS = "CamSur Uptown Golf, San Jose, Pili, Camarines Sur, Philippines";

const longDate = (date: string) =>
  new Date(`${date}T00:00:00+08:00`).toLocaleDateString("en-PH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Manila",
  });

function clock(time: string) {
  const [h, m] = time.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")} ${h < 12 ? "AM" : "PM"}`;
}

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const bookingUrl = (reservation: Reservation) => `${siteUrl()}/golf/book/${reservation.code}`;

/** Ang mga hilera ng detalye — iisa para sa text at HTML. */
function details(reservation: Reservation): [string, string][] {
  const villa = reservation.villaSlug ? VILLA_NIGHTS.find((v) => v.slug === reservation.villaSlug)?.name : null;
  const rows: [string, string][] = [
    ["Date", longDate(reservation.date)],
    ["Tee time", `${clock(reservation.time)} · Hole ${reservation.tee} start`],
    ["Course", `Championship ${reservation.holes}`],
    ["Players", reservation.playerNames.join(", ")],
  ];
  if (villa) rows.push(["Stay", `${villa} · night of ${longDate(reservation.date)}`]);
  rows.push(["Total", formatPeso(reservation.amountTotal)], ["Downpayment", formatPeso(reservation.amountDeposit)]);
  rows.push(["Reference", reservation.code]);
  return rows;
}

function layout(reservation: Reservation, heading: string, intro: string, button: { label: string; url: string } | null): Pick<Mail, "text" | "html"> {
  const rows = details(reservation);
  const contact = `Questions? Reply to this email, call ${CLUB_PHONE.label} or write to ${CLUB_EMAIL.label}.`;
  const text = [
    `Hi ${reservation.contactName},`,
    "",
    intro,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    ...(button ? [`${button.label}: ${button.url}`, ""] : []),
    contact,
    "",
    CLUB,
  ].join("\n");

  const html = `<!doctype html>
<html><body style="margin:0;background:#f3ede1;font-family:Helvetica,Arial,sans-serif;color:#03321b">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3ede1;padding:32px 12px">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2d9c6">
        <tr><td style="background:#03321b;padding:22px 28px;color:#e2c77a;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:bold">${CLUB}</td></tr>
        <tr><td style="padding:28px 28px 8px">
          <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:normal;font-size:28px;line-height:1.2">${escape(heading)}</h1>
          <p style="margin:0 0 6px;font-size:15px;line-height:1.6">Hi ${escape(reservation.contactName)},</p>
          <p style="margin:0;font-size:15px;line-height:1.6;color:#4f5b52">${escape(intro)}</p>
        </td></tr>
        <tr><td style="padding:18px 28px">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
            ${rows
              .map(
                ([label, value]) =>
                  `<tr><td style="padding:9px 0;border-bottom:1px solid #eee7d9;color:#667269">${escape(label)}</td><td align="right" style="padding:9px 0;border-bottom:1px solid #eee7d9;font-weight:bold${label === "Reference" ? ";letter-spacing:2px;color:#7d6224" : ""}">${escape(value)}</td></tr>`,
              )
              .join("")}
          </table>
        </td></tr>
        ${
          button
            ? `<tr><td align="center" style="padding:8px 28px 24px"><a href="${escape(button.url)}" style="display:inline-block;background:#03321b;color:#ffffff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:15px 28px;border-radius:999px">${escape(button.label)}</a></td></tr>`
            : ""
        }
        <tr><td style="padding:0 28px 28px;font-size:13px;line-height:1.6;color:#667269">${escape(contact)}</td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
  return { text, html };
}

/* ---------- Calendar invite (RFC 5545) ---------- */

/** `2026-12-01` + `07:00` (oras sa Maynila) → `20261130T230000Z`. */
function icsTime(date: Date) {
  return date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");
}

const icsText = (value: string) => value.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/\n/g, "\\n");

/** Mahahabang linya: hinahati sa 75 character, gaya ng hinihingi ng pamantayan. */
const fold = (line: string) => line.match(/.{1,74}/g)!.join("\r\n ");

function calendarInvite(reservation: Reservation, method: "REQUEST" | "CANCEL"): string {
  const start = new Date(`${reservation.date}T${reservation.time}:00+08:00`);
  const end = new Date(start.getTime() + COURSE.durationMinutes[reservation.holes] * 60_000);
  const organizer = process.env.GMAIL_USER?.trim() || CLUB_EMAIL.label;
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//CamSur Uptown Golf//Tee times//EN",
    `METHOD:${method}`,
    "BEGIN:VEVENT",
    /* Iisang UID bawat booking: ito ang nagtutugma sa CANCEL at sa naunang invite. */
    `UID:${reservation.code}@camsuruptowngolf`,
    `SEQUENCE:${method === "CANCEL" ? 1 : 0}`,
    `DTSTAMP:${icsTime(new Date())}`,
    `DTSTART:${icsTime(start)}`,
    `DTEND:${icsTime(end)}`,
    `SUMMARY:${icsText(`Golf · Championship ${reservation.holes} · ${CLUB}`)}`,
    `LOCATION:${icsText(ADDRESS)}`,
    `DESCRIPTION:${icsText(`Hole ${reservation.tee} start · ${reservation.players} player(s)\nReference ${reservation.code}\n${bookingUrl(reservation)}`)}`,
    `URL:${bookingUrl(reservation)}`,
    `ORGANIZER;CN=${CLUB}:mailto:${organizer}`,
    `ATTENDEE;CN=${icsText(reservation.contactName)};ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED:mailto:${reservation.contactEmail}`,
    `STATUS:${method === "CANCEL" ? "CANCELLED" : "CONFIRMED"}`,
    ...(method === "REQUEST"
      ? ["BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Tee time tomorrow", "TRIGGER:-P1D", "END:VALARM", "BEGIN:VALARM", "ACTION:DISPLAY", "DESCRIPTION:Tee time in two hours", "TRIGGER:-PT2H", "END:VALARM"]
      : []),
    "END:VEVENT",
    "END:VCALENDAR",
  ];
  return lines.map(fold).join("\r\n") + "\r\n";
}

/* ---------- Ang tatlong email ---------- */

export function heldEmail(reservation: Reservation): Mail {
  return {
    to: reservation.contactEmail,
    subject: `Complete your downpayment · ${clock(reservation.time)}, ${longDate(reservation.date)}`,
    ...layout(
      reservation,
      "Your tee time is on hold",
      `We're holding your tee time for ${COURSE.holdMinutes} minutes. Pay the ${formatPeso(reservation.amountDeposit)} downpayment to confirm it — unpaid holds are released automatically.`,
      { label: "Pay downpayment", url: bookingUrl(reservation) },
    ),
  };
}

export function confirmedEmail(reservation: Reservation): Mail {
  return {
    to: reservation.contactEmail,
    subject: `You're on the tee · ${clock(reservation.time)}, ${longDate(reservation.date)}`,
    ...layout(
      reservation,
      "You're on the tee",
      "Your downpayment is in and your tee time is confirmed. It has been added to your calendar.",
      { label: "View booking", url: bookingUrl(reservation) },
    ),
    calendar: { method: "REQUEST", content: calendarInvite(reservation, "REQUEST") },
  };
}

export function cancelledEmail(reservation: Reservation): Mail {
  return {
    to: reservation.contactEmail,
    subject: `Booking cancelled · ${clock(reservation.time)}, ${longDate(reservation.date)}`,
    ...layout(reservation, "Your booking was cancelled", "This tee time has been cancelled and released for other players.", {
      label: "Book another round",
      url: `${siteUrl()}/golf/book`,
    }),
    /* Kung may invite nang naipadala (confirmed), aalisin ito sa calendar. */
    ...(reservation.paidAt ? { calendar: { method: "CANCEL" as const, content: calendarInvite(reservation, "CANCEL") } } : {}),
  };
}

/** Ipinapadala pagkatapos ng sagot ng route; sa labas ng request (script), agad. */
export function emailGuest(mail: Mail): void {
  const send = () => sendMail(mail).then(() => undefined);
  try {
    after(send);
  } catch {
    void send();
  }
}
