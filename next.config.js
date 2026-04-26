/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [
      320,
      360,
      390,
      430,
      640,
      750,
      828,
      1080,
      1200,
      1536,
      1920,
      2048,
      2560,
      3840,
    ],
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 512],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
}

module.exports = nextConfig
