import { DefaultNavbar } from "@/components/Navbar";
import "./globals.css";
import WidthLimit from "@/components/WidthLimit";
import Link from "next/link";

export const metadata = {
  title: "Eliseo Martelli",
  description: "Computers, photography & music.",
};
const Footer = () => (
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen scroll-smooth">
      <body className="flex flex-col w-full min-h-screen">
        {/*<NextTopLoader color="rgb(153 27 27)" showSpinner={false} />*/}
        <DefaultNavbar />
        <main className="flex flex-col min-h-screen my-8">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

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
