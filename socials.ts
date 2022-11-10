type Social = {
  name: string;
  url: string;
  customRel?: string;
};
export const socials: Social[] = [
  {
    name: "Twitter: @eliseomartelli",
    url: "https://twitter.com/eliseomartelli",
  },
  {
    name: "Instagram: @eliseomartelli",
    url: "https://instagram.com/eliseomartelli",
  },
  {
    name: "Mastodon: @eliseomartelli@mastodon.social",
    url: "https://mastodon.social/@eliseomartelli",
    customRel: "me",
  },
  {
    name: "GitHub: @eliseomartelli",
    url: "https://github.com/eliseomartelli",
  },
  {
    name: "Email: me@eliseomartelli.it",
    url: "mailto:me@eliseomartelli.it",
  },
];
