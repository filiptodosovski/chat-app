/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: `${'/server'}/:path*`,
        destination: `${
          process.env.BACKEND_URL ?? 'http://localhost:5002'
        }/:path*`,
      },
    ]
  },
}

module.exports = nextConfig
