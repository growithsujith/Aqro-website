import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Engraved PNGs are already small and pre-cropped; serve them as-is.
    unoptimized: true,
  },
  webpack: (config) => {
    // Disable persistent pack-file caching to prevent OneDrive file-locking ENOENT errors on Windows
    config.cache = false;
    return config;
  },
};

export default nextConfig;
