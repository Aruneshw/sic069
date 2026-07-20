import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["better-sqlite3"],
    outputFileTracingIncludes: {
      "/*": ["./prisma/dev.db"],
      "/api/*": ["./prisma/dev.db"],
      "/trips/*": ["./prisma/dev.db"],
      "/packages": ["./prisma/dev.db"],
    },
  },
};

export default nextConfig;
