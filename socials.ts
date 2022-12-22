type Social = {
  name: string;
  url: string;
  customRel?: string;
};

export const socials: Social[] = [
  { name: "Email: me@eliseomartelli.it", url: "mailto:me@eliseomartelli.it" },
  { name: "GitHub: @eliseomartelli", url: "https://github.com/eliseomartelli" },
  { name: "BeReal: @eliseomartelli", url: "https://bere.al/eliseomartelli" },
  {
    name: "Instagram: @eliseomartelli",
    url: "https://instagram.com/eliseomartelli",
  },
  {
    name: "Mastodon: @eliseomartelli@mastodon.social",
    url: "https://mastodon.social/@eliseomartelli",
    customRel: "me",
  },
  { name: "Telegram: @eliseomartelli", url: "https://t.me/eliseomartelli" },
  {
    name: "Twitter: @eliseomartelli",
    url: "https://twitter.com/eliseomartelli",
  },
  {
    name: "Keyoxide: fe81cdb04848cc6e29f85a499560e7af90f0e1b9",
    url: "https://keyoxide.org/me@eliseomartelli.it",
  },
];
