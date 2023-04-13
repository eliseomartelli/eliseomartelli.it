import { DefaultNavbar } from "@/components/Navbar";
import "./globals.css";
import WidthLimit from "@/components/WidthLimit";
import NextTopLoader from "nextjs-toploader";
import Link from "next/link";

export const metadata = {
  title: "Eliseo Martelli",
  description: "Computers, photography & music.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="min-h-screen scroll-smooth">
      <body className="flex flex-col w-full min-h-screen">
        <NextTopLoader color="rgb(153 27 27)" showSpinner={false} />
        <WidthLimit className="p-4">
          <DefaultNavbar />
        </WidthLimit>
        <main className="flex flex-col grow min-h-screen py-4 flex-1">
          {children}
        </main>
        <footer className="bg-gray-200 grow-0">
          <WidthLimit className="p-4 py-8">
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
      </body>
    </html>
  );
}

const externalLinks = [
  {
    name: "GitHub",
    href: "https://github.com/eliseomartelli",
  },
  {
    name: "Mastodon",
    href: "https://mastodon.social/@eliseomartelli",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/eliseomartelli",
  },
  {
    name: "SSH Key",
    href: "https://instagram.com/eliseomartelli",
  },
  {
    name: "PGP Key",
    href: "https://instagram.com/eliseomartelli",
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
    name: "RSS Feed",
    href: "/feex.xml",
  },
  {
    name: "Feedback",
    href: "/feedback",
  },
];
