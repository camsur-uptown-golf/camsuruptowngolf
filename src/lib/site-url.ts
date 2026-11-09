/**
 * Ang buong URL ng site, para sa mga bagay na kailangan ng absolute na link:
 * `metadataBase` (share image ng Messenger/Facebook), sitemap, at robots.
 *
 * Pagkakasunod: `SITE_URL` (ang ginagamit din ng OAuth sa `lib/oauth.ts`),
 * tapos ang production domain na ibinibigay ng Vercel, tapos localhost para
 * sa dev. Itakda ang `SITE_URL` sa Vercel kapag may sariling domain na, para
 * hindi ang `*.vercel.app` ang lumabas sa mga share preview.
 */
export function siteUrl(): string {
  const explicit = process.env.SITE_URL?.trim().replace(/\/$/, "");
  if (explicit) return explicit;
  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return `https://${vercel}`;
  return "http://localhost:3000";
}
