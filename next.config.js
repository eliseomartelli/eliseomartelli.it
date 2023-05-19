/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "eliseomartelli.it",
      "www.eliseomartelli.it",
      "localhost",
      "files.mastodon.social",
      "cdn.pony.social",
      "raw.githubusercontent.com",
    ],
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
