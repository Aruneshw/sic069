import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const analyzeBundle = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes: {
    "/**": ["./prisma/**/*", "./src/generated/prisma/**/*"],
  },
};

export default analyzeBundle(nextConfig);
