import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  devIndicators: false,
  reactStrictMode: false,
  webpack: (config, { isServer }) => {
    isServer && (config.externals = [...config.externals, 'socket.io-client']);
    return config;
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
