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
  typescript: {
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [new URL('https://myfirstportfolio.s3.amazonaws.com/**'), new URL('http://res.cloudinary.com/**'),
    new URL('https://res.cloudinary.com/**')
    ],
  }
};

export default nextConfig;
