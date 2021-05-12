import React from "react";

import { Meta } from "@storybook/react";

import { Bio } from "./Bio";

export default {
  title: "Components/Bio",
  component: Bio,
} as Meta;

const socials = [
  {
    name: "Instagram",
    url: "https://instagram.com/eliseomartelli",
    iconName: "fa-instagram",
  },
  {
    name: "GitHub",
    url: "https://github.com/eliseomartelli",
    iconName: "fa-github",
  },
];

export const Primary: React.VFC<{}> = () => (
  <Bio
    socials={socials}
    imageUrl="https://eliseomartelli.it/static/3e18ba7e59519492b83c54713849b65b/684c4/avatar.jpg"
    bio="I'm <b>Eliseo</b>, a CS student in Italy.<br> Join my journey through networks and computers."
  />
);

export const NoSocials: React.VFC<{}> = () => (
  <Bio
    imageUrl="https://eliseomartelli.it/static/3e18ba7e59519492b83c54713849b65b/684c4/avatar.jpg"
    bio="I'm <b>Eliseo</b>, a CS student in Italy.<br> Join my journey through networks and computers."
  />
);
