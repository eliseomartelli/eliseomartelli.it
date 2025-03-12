import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
};

export default withContentCollections(nextConfig);
