import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Poster frame ng Wistia teaser, ginagamit ng course film section.
      { protocol: "https", hostname: "embed-ssl.wistia.com", pathname: "/deliveries/**" },
    ],
  },
  /* Walang sariling pahina ang /accommodations — ang mga tuluyan ay nasa
     /accommodations/<stay>. Pansamantala (307) dahil puwedeng magkaroon
     ito ng sariling listahan kapag may pangalawang resort na. */
  async redirects() {
    return [{ source: "/accommodations", destination: "/accommodations/villa-del-rey", permanent: false }];
  },
  /* Ang web preview ng Expo app (`mobile/`, port 8081) ay ibang origin, kaya
     hinaharang ng browser ang fetch nito sa /api. Sa dev lang — walang CORS
     ang totoong iOS/Android app, at hindi nagbabago ang production. */
  async headers() {
    if (process.env.NODE_ENV === "production") return [];
    const allow = (methods: string) => [
      { key: "Access-Control-Allow-Origin", value: "http://localhost:8081" },
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
