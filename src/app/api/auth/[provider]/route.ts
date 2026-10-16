import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { OAUTH_COOKIE, configured, isProvider, siteOrigin, startAuthorization } from "@/lib/oauth";

export const runtime = "nodejs";

/**
 * Simula ng "Continue with Google / Apple" — ang `href` ng pindutan.
 *
 * Kapag wala pang susi ang provider, bumabalik sa /members na may
 * `?auth_error=unavailable` (ipinapakita ng form bilang "not available yet").
 */
export async function GET(request: Request, ctx: RouteContext<"/api/auth/[provider]">) {
  const { provider } = await ctx.params;
  const back = (error: string) => NextResponse.redirect(`${siteOrigin(request)}/members?auth_error=${error}#member-access`);
  if (!isProvider(provider)) return back("invalid");
  if (!configured(provider)) return back("unavailable");

  const { url, cookie } = startAuthorization(request, provider);
  (await cookies()).set(OAUTH_COOKIE, cookie, {
    httpOnly: true,
    /* Ang Apple ay bumabalik sa POST mula sa appleid.apple.com (cross-site),
       kaya `none` ang kailangan doon para maipadala ang cookie; Google ay GET. */
    sameSite: provider === "apple" ? "none" : "lax",
    secure: provider === "apple" || process.env.NODE_ENV === "production",
    path: "/api/auth",
    maxAge: 600,
  });
  return NextResponse.redirect(url);
}
