/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: `${'/server'}/:path*`,
        destination: `${
          process.env.BACKEND_URL ?? 'http://backend:8080'
        }:path*`,
      },
    ]
  },
}

module.exports = nextConfig
