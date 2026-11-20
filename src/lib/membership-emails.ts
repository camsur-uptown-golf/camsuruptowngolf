import { after } from "next/server";
import { sendMail } from "@/lib/mailer";
import type { MembershipPayment } from "@/lib/membership-db";
import { findPlan, formatPeso } from "@/lib/membership-plans";
import { membersConnection } from "@/lib/members-db";
import { CLUB_EMAIL, CLUB_PHONE } from "@/lib/site-content";
import { siteUrl } from "@/lib/site-url";

/**
 * Resibo sa member pagkabayad ng membership: plan, ilang buwan, halaga, at
 * hanggang kailan aktibo. (May hiwalay na resibo rin ang PayMongo mismo.)
 * Galing sa Gmail ng club — tingnan ang mailer.ts.
 */

const escape = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const longDate = (date: string) =>
  new Date(`${date}T00:00:00+08:00`).toLocaleDateString("en-PH", { day: "numeric", month: "long", year: "numeric", timeZone: "Asia/Manila" });

async function sendPaidEmail(payment: MembershipPayment) {
  const client = await membersConnection();
  const member = (await client.execute({ sql: "SELECT first_name, email FROM members WHERE id = ?", args: [payment.memberId] })).rows[0];
  const plan = findPlan(payment.plan);
  if (!member || !plan || !payment.periodEnd) return;

  const name = String(member.first_name);
  const months = `${payment.months} ${payment.months === 1 ? "month" : "months"}`;
  const rows: [string, string][] = [
    ["Plan", plan.name],
    ["Paid for", months],
    ["Amount", formatPeso(payment.amount)],
    ["Active until", longDate(payment.periodEnd)],
    ["Reference", payment.code],
  ];
  const url = `${siteUrl()}/members`;
  const contact = `Questions? Reply to this email, call ${CLUB_PHONE.label} or write to ${CLUB_EMAIL.label}.`;
  const intro = `Thank you — your ${plan.name} membership is active until ${longDate(payment.periodEnd)}.`;

  await sendMail({
    to: String(member.email),
    subject: `Your ${plan.name} membership is active · until ${longDate(payment.periodEnd)}`,
    text: [`Hi ${name},`, "", intro, "", ...rows.map(([label, value]) => `${label}: ${value}`), "", `Your account: ${url}`, "", contact, "", "CamSur Uptown Golf"].join("\n"),
    html: `<!doctype html>
<html><body style="margin:0;background:#f3ede1;font-family:Helvetica,Arial,sans-serif;color:#03321b">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3ede1;padding:32px 12px"><tr><td align="center">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e2d9c6">
      <tr><td style="background:#03321b;padding:22px 28px;color:#e2c77a;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:bold">CamSur Uptown Golf</td></tr>
      <tr><td style="padding:28px 28px 8px">
        <h1 style="margin:0 0 12px;font-family:Georgia,serif;font-weight:normal;font-size:28px;line-height:1.2">Welcome to ${escape(plan.name)}</h1>
        <p style="margin:0 0 6px;font-size:15px;line-height:1.6">Hi ${escape(name)},</p>
        <p style="margin:0;font-size:15px;line-height:1.6;color:#4f5b52">${escape(intro)}</p>
      </td></tr>
      <tr><td style="padding:18px 28px"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:14px">
        ${rows
          .map(
            ([label, value]) =>
              `<tr><td style="padding:9px 0;border-bottom:1px solid #eee7d9;color:#667269">${escape(label)}</td><td align="right" style="padding:9px 0;border-bottom:1px solid #eee7d9;font-weight:bold${label === "Reference" ? ";letter-spacing:2px;color:#7d6224" : ""}">${escape(value)}</td></tr>`,
          )
          .join("")}
      </table></td></tr>
      <tr><td align="center" style="padding:8px 28px 24px"><a href="${escape(url)}" style="display:inline-block;background:#03321b;color:#ffffff;text-decoration:none;font-size:12px;font-weight:bold;letter-spacing:2px;text-transform:uppercase;padding:15px 28px;border-radius:999px">Your account</a></td></tr>
      <tr><td style="padding:0 28px 28px;font-size:13px;line-height:1.6;color:#667269">${escape(contact)}</td></tr>
    </table>
  </td></tr></table>
</body></html>`,
  });
}

/** Pagkatapos ng sagot ng route (`after`); sa labas ng request, agad. */
export function emailMembershipPaid(payment: MembershipPayment): void {
  const send = () => sendPaidEmail(payment).catch((error) => console.warn("[mail] membership:", error instanceof Error ? error.message : error));
  try {
    after(send);
  } catch {
    void send();
  }
}
