import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const analyzeBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === 'production' ? "/sic069" : "",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  serverExternalPackages: [
    "better-sqlite3",
    "@prisma/adapter-better-sqlite3",
  ],
  outputFileTracingIncludes: {
    "/**": ["./prisma/**/*", "./src/generated/prisma/**/*"],
  },
};

export default analyzeBundle(nextConfig);
