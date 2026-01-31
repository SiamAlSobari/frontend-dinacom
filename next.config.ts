import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-5f6d4337a14b4154b8c90718ec70ea52.r2.dev",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
