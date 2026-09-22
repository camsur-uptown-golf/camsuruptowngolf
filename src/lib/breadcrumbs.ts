import { CLUBHOUSE_SPACES } from "@/lib/clubhouse";
import { SITE_SECTIONS } from "@/lib/site-content";

export type Crumb = { label: string; href: string };

/**
 * Ang landas papunta sa isang pahina, hinuhugot sa pathname.
 *
 * Walang hiwalay na listahan ng pamagat dito. Ang `SITE_SECTIONS` ang
 * pinagmulan ng label ng bawat section at ng bawat anak nito — kaya kapag
 * pinalitan ang pangalan ng butas o ng kuwarto sa clubhouse, sumusunod
 * ito nang kusa. Sa dalawang listahan ay tiyak na maghihiwalay sila.
 *
 * Hindi ipinapakita ang `/` mismo: walang landas ang ugat.
 */

/** Mga pahinang walang section sa itaas. */
const STANDALONE: Record<string, string> = {
  "plan-your-visit": "Plan your visit",
  contact: "Contact",
  "terms-of-use": "Terms of use",
};

/**
 * Huling pantakip kapag walang tugma sa data: ginagawang pamagat ang slug.
 * "architecture" → "Architecture". Ligtas ito sa bagong ruta — mas mabuti
 * ang bahagyang magaspang na label kaysa sa walang breadcrumb.
 */
function titleCase(slug: string) {
  return slug
    .split("-")
    .map((word) => (word.length > 0 ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

export function trailFor(pathname: string): Crumb[] {
  const path = pathname.replace(/\/+$/, "");
  if (path === "" || path === "/") return [];

  const segments = path.split("/").filter(Boolean);
  const crumbs: Crumb[] = [{ label: "Home", href: "/" }];

  const section = SITE_SECTIONS.find((item) => item.slug === segments[0]);

  if (!section) {
    crumbs.push({ label: STANDALONE[segments[0]] ?? titleCase(segments[0]), href: path });
    return crumbs;
  }

  crumbs.push({ label: section.label, href: `/${section.slug}` });
  if (segments.length === 1) return crumbs;

  /* Tugmang buong href, hindi ang huling bahagi lang: ang butas ay
     `/golf/courses/hole-no.1` — tatlong bahagi, pero hindi ruta ang
     `/golf/courses`, kaya nilalaktawan ito at diretso sa butas. */
  const link = section.links.find((item) => item.href === path);
  if (link) {
    crumbs.push({ label: link.label, href: path });
    return crumbs;
  }

  /* Ang mga kuwarto sa clubhouse ay nasa `links` na, pero hindi ang
     `/clubhouse/architecture`. Tinitingnan pa rin ito dito para tiyak. */
  const space = CLUBHOUSE_SPACES.find((item) => `/clubhouse/${item.id}` === path);
  crumbs.push({ label: space ? space.name : titleCase(segments[segments.length - 1]), href: path });
  return crumbs;
}
