import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Engraved PNGs are already small and pre-cropped; serve them as-is.
    unoptimized: true,
  },
};

export default nextConfig;
