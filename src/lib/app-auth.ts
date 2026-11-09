import { memberFromSession, type Member } from "@/lib/members-db";
import { currentMember } from "@/lib/member-session";

/**
 * Ang member app (`mobile/`): token sa `Authorization: Bearer`, hindi cookie.
 * Kapareho ng website ang session table — iisang `member_sessions` lang.
 */
export type AppMember = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string | null;
  plan: string | null;
  since: string;
  /** Numero sa member card at sa QR, hal. `CUG · 2026 · 0042`. */
  memberNumber: string;
};

/**
 * Hindi nagbabago ang numero: ang taon ng pagsali at ang `id` ng member.
 * Ito ang nasa QR, kaya mahahanap ng front desk ang member kahit walang
 * scanner — basahin lang ang huling apat na digit.
 */
export function memberNumber(member: Member): string {
  return `CUG · ${member.createdAt.slice(0, 4)} · ${String(member.id).padStart(4, "0")}`;
}

/** Ang ipinapakita ng app — walang id, walang petsa ng huling login. */
export function toAppMember(member: Member): AppMember {
  return {
    firstName: member.firstName,
    lastName: member.lastName,
    email: member.email,
    mobile: member.mobile,
    plan: member.plan,
    since: member.planSince ?? member.createdAt,
    memberNumber: memberNumber(member),
  };
}

/** `Authorization: Bearer <token>` → token, o `undefined`. */
export function bearerToken(request: Request): string | undefined {
  const header = request.headers.get("authorization") ?? "";
  const match = /^Bearer\s+(.+)$/i.exec(header);
  return match?.[1]?.trim() || undefined;
}

/** Ang member ng request: Bearer token ng app, o ang cookie ng website. */
export async function requestMember(request: Request): Promise<Member | null> {
  const token = bearerToken(request);
  return token ? memberFromSession(token) : currentMember();
}

/** Sagot sa CORS preflight ng Expo web (dev); ang headers ay nasa next.config.ts. */
export function preflight() {
  return new Response(null, { status: 204 });
}
