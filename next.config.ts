import type { NextConfig } from "next";
import path from "node:path";
const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  output: "export",
  outputFileTracingRoot: path.resolve("."),
  trailingSlash: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
