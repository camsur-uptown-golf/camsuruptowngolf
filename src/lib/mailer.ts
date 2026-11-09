import nodemailer, { type Transporter } from "nodemailer";
import { CLUB_EMAIL } from "@/lib/site-content";

/**
 * Pagpapadala ng email mula sa Gmail ng club (`GMAIL_USER`), gamit ang App
 * Password (`GMAIL_APP_PASSWORD`) — Google account → Security → 2-Step
 * Verification → App passwords. Hindi ang totoong password ng account.
 *
 * Kapag wala ang dalawa (hal. sa computer ng developer), WALANG naipapadala:
 * isinusulat lang sa log ang sana'y ipinadala. Kaya ligtas mag-test nang
 * walang member na makakatanggap ng email nang hindi sinasadya.
 *
 * Hangganan ng Gmail: mga 500 email kada araw — sapat para sa mga booking ng
 * club. Kapag lumaki, palitan ang transport (hal. Resend) dito lang.
 */

const env = (name: string) => process.env[name]?.trim().replace(/^(['"])(.*)\1$/, "$2") || undefined;

let transporter: Transporter | null = null;

function gmail(): Transporter | null {
  const user = env("GMAIL_USER");
  const pass = env("GMAIL_APP_PASSWORD")?.replace(/\s+/g, "");
  if (!user || !pass) return null;
  transporter ??= nodemailer.createTransport({ service: "gmail", auth: { user, pass } });
  return transporter;
}

export type Mail = {
  to: string;
  subject: string;
  text: string;
  html: string;
  /** Calendar invite (`.ics`): idinadagdag ng Gmail sa Google Calendar ng tumanggap. */
  calendar?: { method: "REQUEST" | "CANCEL"; content: string };
};

/** Ipinapadala ang email. Hindi kailanman nagtatapon ng error — `false` kapag pumalya. */
export async function sendMail(mail: Mail): Promise<boolean> {
  const transport = gmail();
  if (!transport) {
    console.info(`[mail] walang GMAIL_USER/GMAIL_APP_PASSWORD — hindi ipinadala: "${mail.subject}" → ${mail.to}`);
    return false;
  }
  try {
    await transport.sendMail({
      from: { name: "CamSur Uptown Golf", address: env("GMAIL_USER")! },
      replyTo: CLUB_EMAIL.label,
      to: mail.to,
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
      ...(mail.calendar ? { icalEvent: { method: mail.calendar.method, content: mail.calendar.content } } : {}),
    });
    return true;
  } catch (error) {
    console.warn("[mail] hindi naipadala:", error instanceof Error ? error.message : error);
    return false;
  }
}
