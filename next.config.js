/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      { source: "/socials", destination: "/about" },
      { source: "/ngl", destination: "/feedback" },
    ];
  },
};

const { withContentlayer } = require("next-contentlayer");
module.exports = withContentlayer(nextConfig);
