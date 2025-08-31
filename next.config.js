/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PORT: '6789'
  },
  typescript: {
    ignoreBuildErrors: false
  },
  eslint: {
    ignoreDuringBuilds: false
  }
}

module.exports = nextConfig