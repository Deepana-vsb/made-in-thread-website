import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: basePath ? "export" : undefined,
  basePath: basePath,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
