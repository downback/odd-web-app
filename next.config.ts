import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  // Enables additional checks and warnings for React
  images: {
    domains: ["firebasestorage.googleapis.com"],
  },
}

export default nextConfig
