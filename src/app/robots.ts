import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-url";

/**
 * Bukas ang buong site sa mga search engine maliban sa API at sa mga sariling
 * reservation page (`/golf/book/<code>`) — personal na booking iyon ng bisita.
 * Ang `/golf/book` mismo (ang booking form) ay bukas pa rin.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/golf/book/"],
    },
    sitemap: `${siteUrl()}/sitemap.xml`,
  };
}
