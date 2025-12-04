/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Only use static export for production builds
  ...(process.env.NODE_ENV === 'production' && { output: 'export' }),
  // Only use basePath for production builds (GitHub Pages)
  basePath: process.env.NODE_ENV === 'production' ? '/rb-home' : '',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
