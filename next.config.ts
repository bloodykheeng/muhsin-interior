import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler: {
    // // Remove all console logs
    // removeConsole: true

    // // Remove all console logs, excluding error logs
    // removeConsole: { exclude: ["error"] },

    // Remove console logs only in production
    removeConsole: process.env.NODE_ENV === "production"

    // // Remove console logs only in production, excluding error logs
    // removeConsole: process.env.NODE_ENV === "production" ? { exclude: ["error"] } : false
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'iykrvxusnnudoskkwish.supabase.co',
      },
    ],
    // This is needed to allow private IPs like 127.0.0.1 in development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
