type Social = {
  name: string;
  url: string;
  customRel?: string;
};

export const socials: Social[] = [
  {
    name: "Email: me@eliseomartelli.it",
    url: "mailto:me@eliseomartelli.it",
  },
  {
    name: "GitHub: @eliseomartelli",
    url: "https://github.com/eliseomartelli",
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
    name: "Telegram: @eliseomartelli",
    url: "https://t.me/eliseomartelli",
  },
  {
    name: "Twitter: @eliseomartelli",
    url: "https://twitter.com/eliseomartelli",
  },
];
