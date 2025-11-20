/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  basePath: '/rb-home',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
