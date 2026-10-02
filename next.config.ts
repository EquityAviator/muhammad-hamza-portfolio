import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  allowedDevOrigins: ['**.manus.computer', '**.manuspre.computer', '127.0.0.1'],
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
