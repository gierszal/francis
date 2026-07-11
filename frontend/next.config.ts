import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const backendUrl = new URL(process.env.BACKEND_URL!);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: backendUrl.protocol.replace(":", "") as "http" | "https",
        hostname: backendUrl.hostname,
        port: backendUrl.port,
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.BACKEND_URL}/static/:path*`,
      },
    ];
  },
};

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
export default withNextIntl(nextConfig);
