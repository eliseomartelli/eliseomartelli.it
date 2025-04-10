import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";
const isDocker = process.env.IS_DOCKER === "true";

const nextConfig: NextConfig = {
  /* config options here */
  output: isDocker ? "standalone" : undefined,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "eliseomartelli.it",
        port: "",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "www.eliseomartelli.it",
        port: "",
        pathname: "*",
      },
      { protocol: "https", hostname: "localhost", port: "", pathname: "*" },
      {
        protocol: "https",
        hostname: "files.mastodon.social",
        port: "",
        pathname: "**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "cdn.pony.social",
        port: "",
        pathname: "*",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        pathname: "*",
      },
    ],
  },
};

export default withContentCollections(nextConfig);
