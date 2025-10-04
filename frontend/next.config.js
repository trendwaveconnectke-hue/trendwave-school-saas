/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    BACKEND_URL: process.env.BACKEND_URL || 'https://trendwave-backend-zord.onrender.com'
  }
}

module.exports = nextConfig
