import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "5000",
        pathname: "/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/image/:path*",
        destination: "http://localhost:5000/static/image/:path*",
      },
    ];
  },
};

export default nextConfig;
