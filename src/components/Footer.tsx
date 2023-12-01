import Link from "next/link";
import WidthLimit from "./WidthLimit";
import { NAVBAR_LINKS } from "../../NavbarLinks";
import { allSocials } from "@/.contentlayer/generated";

export const Footer = () => (
  <footer className="bg-stone-200 grow-0">
    <WidthLimit className="py-8">
      <div className="flex mb-8">
        <ul className="columns-2 w-full">
          {[internalLinks, externalLinks].map((links) => {
            return (
              <>
                {links.map((link) => (
                  <li key={link.href} className="py-1">
                    <Link
                      {...link}
                      className="bold hover:text-red-800 hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
                <br />
              </>
            );
          })}
        </ul>
      </div>
      <p>© 2011-{new Date().getFullYear()} Eliseo Martelli 🐾</p>
    </WidthLimit>
  </footer>
);

const [socialsJson] = allSocials;
const { socials } = socialsJson;

const externalLinks = [
  ...socials!
    .filter((social) =>
      ["GitHub", "Instagram", "Mastodon"].includes(social.name!),
    )
    .map((social) => ({
      name: social.name!,
      href: social.url!,
      rel: "me",
    })),
  {
    name: "PGP Key",
    href: "https://keyserver.ubuntu.com/pks/lookup?op=hget&search=d1d8ef9629b93cda0ee2b0164fa7d02e",
  },
];

const internalLinks = [
  ...NAVBAR_LINKS,
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
  {
    name: "Contact",
    href: "/contact",
  },
  { name: "Recipes", href: "/recipes" },
  {
    name: "Wallpapers",
    href: "/wallpapers",
  },
  {
    name: "SSH Keys",
    href: "/ssh",
  },
];
