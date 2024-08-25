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
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dsxoj4kiy/**",
      },
    ],
  },
  compiler: {
    removeConsole: false,
  },
}

module.exports = nextConfig
