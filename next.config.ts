import type { NextConfig } from "next";

/* Kapag may sariling domain na (SITE_URL, hal. https://camsuruptowngolf.com),
   ang mga pahinang binuksan sa `*.vercel.app` ng production ay inililipat doon
   — iisang address para sa Google, sa share preview, at sa sign-in (nasa
   domain ng SITE_URL ang OAuth callback, kaya doon dapat nakatakda ang cookie).
   Hindi kasama ang /api: tumatawag pa roon ang mga webhook ng PayMongo/PayPal
   at ang member app. Walang epekto habang walang SITE_URL o sa preview. */
function vercelAppToCustomDomain() {
  const site = process.env.SITE_URL?.trim().replace(/\/$/, "");
  if (process.env.VERCEL_ENV !== "production" || !site) return [];
  return [
    {
      source: "/:path((?!api(?:/|$)).*)",
      has: [{ type: "host" as const, value: ".*\\.vercel\\.app" }],
      destination: `${site}/:path`,
      permanent: true,
    },
  ];
}

const nextConfig: NextConfig = {
  /* Ang `process.cwd()` sa db.ts (lokal na SQLite sa data/) ay nagpapasama sa
     BUONG proyekto sa bawat server function — ~780 MB na may mga video, lampas
     sa 250 MB na limit ng Vercel ("Error" pagkatapos ng "Deploying outputs").
     Walang server code na nagbabasa ng mga ito; ang public/ ay sa CDN. */
  outputFileTracingExcludes: {
    "/**": [
      "public/**/*",
      "exports/**/*",
      "output/**/*",
      "tmp/**/*",
      "media-archive/**/*",
      "brand-brain/**/*",
      "reports/**/*",
      "research_notes/**/*",
      "docs/**/*",
      "scripts/**/*",
      "data/**/*",
    ],
  },
  images: {
    qualities: [75, 85, 90],
    /* Dinagdag ang 2560: retina laptop na 1280–1440px ang lapad ay kumukuha
       noon ng 3840 (doble ang bigat, ~1.7 MB sa hero ng bawat hole) dahil
       walang sukat sa pagitan ng 2048 at 3840. */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 2560, 3840],
    remotePatterns: [
      // Poster frame ng Wistia teaser, ginagamit ng course film section.
      { protocol: "https", hostname: "embed-ssl.wistia.com", pathname: "/deliveries/**" },
      // Poster frame ng homepage hero video (Cloudinary).
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/ypqgyrbc/**" },
    ],
  },
  /* Walang sariling pahina ang /accommodations — ang mga tuluyan ay nasa
     /accommodations/<stay>. Pansamantala (307) dahil puwedeng magkaroon
     ito ng sariling listahan kapag may pangalawang resort na. */
  async redirects() {
    return [
      { source: "/accommodations", destination: "/accommodations/villa-del-rey", permanent: false },
      ...vercelAppToCustomDomain(),
    ];
  },
  /* Ang web preview ng Expo app (repo `app-camsuruptowngolf`, port 8081) ay ibang origin, kaya
     hinaharang ng browser ang fetch nito sa /api. Sa dev lang — walang CORS
     ang totoong iOS/Android app, at hindi nagbabago ang production.
     `*` (hindi lang localhost:8081): gumagana rin sa ibang port at sa IP ng Mac
     (hal. 192.168.x.x:8081). Ligtas dahil Bearer token ang auth, hindi cookie. */
  async headers() {
    if (process.env.NODE_ENV === "production") return [];
    const allow = (methods: string) => [
      { key: "Access-Control-Allow-Origin", value: "*" },
      { key: "Access-Control-Allow-Methods", value: methods },
      { key: "Access-Control-Allow-Headers", value: "Content-Type, Authorization" },
    ];
    return [
      { source: "/api/tee-times", headers: allow("GET") },
      /* Ang member app: reserve, reservation, pay (POST/GET). */
      { source: "/api/tee-times/:path*", headers: allow("GET, POST, OPTIONS") },
      { source: "/api/app/:path*", headers: allow("GET, POST, DELETE, OPTIONS") },
      { source: "/api/callback", headers: allow("POST, OPTIONS") },
    ];
  },
};

export default nextConfig;
