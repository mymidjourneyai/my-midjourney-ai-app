/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    domains: [
      "localhost",
      "images.unsplash.com",
      "images.pexels.com",
      "cdn.discordapp.com",
    ],
  },
}

module.exports = nextConfig
