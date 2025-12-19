import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        pathname: "/u/**",
      },

      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      }

    ],
  },
};

export default nextConfig;
