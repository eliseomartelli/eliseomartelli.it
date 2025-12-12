import { withContentCollections } from "@content-collections/next";
import type { NextConfig } from "next";
const isDocker = process.env.IS_DOCKER === "true";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["next-mdx-remote"],
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
  async redirects() {
    return [
      {
        source: "/blog/netflix-payments-home-assistant",
        destination: "/blog/2020-03-02-netflix-payments-home-assistant",
        permanent: true,
      },
      {
        source: "/blog/ansible_tasmota",
        destination: "/blog/2020-03-10-ansible_tasmota",
        permanent: true,
      },
      {
        source: "/blog/pfSense_multiple_wan",
        destination: "/blog/2020-04-05-pfSense_multiple_wan",
        permanent: true,
      },
      {
        source: "/blog/quick-tip-macos-as-a-cache-for-apple-devices",
        destination:
          "/blog/2020-04-09quick-tip-macos-as-a-cache-for-apple-devices",
        permanent: true,
      },
      {
        source: "/blog/nebula",
        destination: "/blog/2020-05-01-nebula",
        permanent: true,
      },
      {
        source: "/blog/iot-vlan-edgeos",
        destination: "/blog/2020-09-14-iot-vlan-edgeos",
        permanent: true,
      },
      {
        source: "/blog/ipados_review",
        destination: "/blog/2020-10-31-ipados_review",
        permanent: true,
      },
      {
        source: "/blog/vyos-ospf-wireguard",
        destination: "/blog/2022-09-29-vyos-ospf-wireguard",
        permanent: true,
      },
      {
        source: "/blog/24-11-2022-music-services",
        destination: "/blog/2022-11-24-music-services",
        permanent: true,
      },
      {
        source: "/blog/25-11-2022-cameras",
        destination: "/blog/2022-11-25-cameras",
        permanent: true,
      },
      {
        source: "/blog/26-11-2022-cryptobros",
        destination: "/blog/2022-11-26-cryptobros",
        permanent: true,
      },
      {
        source: "/blog/02-12-2022-gomodular",
        destination: "/blog/2022-12-02-gomodular",
        permanent: true,
      },
      {
        source: "/blog/07-12-2022-photostruggles",
        destination: "/blog/2022-12-07-photostruggles",
        permanent: true,
      },
      {
        source: "/blog/05-04-2023-masters",
        destination: "/blog/2023-04-05-masters",
        permanent: true,
      },
      {
        source: "/blog/27-04-2023-youtube-pip",
        destination: "/blog/2023-04-27-youtube-pip",
        permanent: true,
      },
      {
        source: "/blog/03-05-2023-coffee",
        destination: "/blog/2023-05-03-coffee",
        permanent: true,
      },
      {
        source: "/blog/13-05-2023-onehundredpercent-more-ai",
        destination: "/blog/2023-05-13-onehundredpercent-more-ai",
        permanent: true,
      },
    ];
  },
};

export default withContentCollections(nextConfig);
