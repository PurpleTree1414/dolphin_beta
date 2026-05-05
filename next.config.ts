import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Pin the workspace root to THIS directory. Without this, Next.js
  // walks upward looking for lockfiles and finds the stray
  // C:\Users\louca\package-lock.json, which silently breaks asset
  // tracing and the dev server. Lock it here so dev/build always
  // resolve from the project root.
  outputFileTracingRoot: path.resolve(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'imaginewithrashid.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;
