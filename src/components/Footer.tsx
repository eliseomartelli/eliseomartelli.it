import Link from "next/link";
import WidthLimit from "./WidthLimit";

export const Footer = () => (
  <footer className="bg-gray-200 grow-0">
    <WidthLimit className="py-8">
      <div className="flex mb-8">
        {[internalLinks, externalLinks].map((links, i) => (
          <ul className="flex flex-col gap-2 grow" key={i}>
            {links.map((link, j) => (
              <li key={i}>
                <Link
                  {...link}
                  key={j}
                  className="bold hover:text-red-800 hover:underline flex items-center gap-2"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        ))}
      </div>
      <p>© 2011-{new Date().getFullYear()} Eliseo Martelli 🐾</p>
    </WidthLimit>
  </footer>
);

const externalLinks = [
  {
    name: "GitHub",
    href: "https://github.com/eliseomartelli",
    rel: "me",
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@eliseomartelli",
    rel: "me",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/eliseomartelli",
    rel: "me",
  },
  {
    name: "Wallpapers",
    href: "/wallpapers",
  },
  {
    name: "SSH Keys",
    href: "/ssh",
  },
  {
    name: "PGP Key",
    href: "https://keyserver.ubuntu.com/pks/lookup?op=hget&search=d1d8ef9629b93cda0ee2b0164fa7d02e",
  },
];

const internalLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Blog",
    href: "/blog",
  },
  {
    name: "Snippets",
    href: "/snippets",
  },
  {
    name: "Photos",
    href: "/photos",
  },
  {
    name: "Uses",
    href: "/uses",
  },
  {
    name: "RSS Feed",
    href: "/feed.xml",
  },
  {
    name: "Feedback",
    href: "/feedback",
  },
];
