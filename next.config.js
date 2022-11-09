/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async rewrites() {
    return [
      { source: "/actor", destination: "/api/fedi/actor" },
      { source: "/outbox", destination: "/api/fedi/outbox" },
      { source: "/.well-known/webfinger", destination: "/api/fedi/webfinger" },
    ];
  },
};

module.exports = nextConfig;
