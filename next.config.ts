import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    domains: ["img.clerk.com"], 
  },
};

export default nextConfig;

