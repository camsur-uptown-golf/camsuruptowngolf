import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Poster frame ng Wistia teaser, ginagamit ng course film section.
      { protocol: "https", hostname: "embed-ssl.wistia.com", pathname: "/deliveries/**" },
    ],
  },
};

export default nextConfig;
