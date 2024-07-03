/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    'gsap',
  ],
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  profiler: true,
}

module.exports = nextConfig
