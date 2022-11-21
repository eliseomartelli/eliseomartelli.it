import Link from "next/link";

export default function Footer(): JSX.Element {
  return (
    <footer className="py-6 bg-gray-100 grow-0 print:hidden">
      <div className="flex max-w-3xl px-6 mx-auto flex-col gap-8">
        <div className="grid grid-cols-2 gap-4">
          <ul className="flex gap-2 flex-col">
            <FooterLink name="Newsletter" url="/newsletter" />
            <FooterLink name="About" url="/about" />
            <FooterLink name="RSS Feed" url="/feed.xml" external />
            <FooterLink
              name="PGP Key"
              url="https://keys.openpgp.org/vks/v1/by-email/me@eliseomartelli.it"
              external
            />
          </ul>
          <ul className="flex gap-2 flex-col">
            <FooterLink
              name="Twitter"
              url="https://twitter.com/eliseomartelli"
              external
            />
            <FooterLink
              name="Instagram"
              url="https://instagram.com/eliseomartelli"
              external
            />
            <FooterLink
              name="GitHub"
              url="https://github.com/eliseomartelli"
              external
            />
          </ul>
        </div>
        <p className="text-sm">
          © 2011-{new Date().getFullYear()} Eliseo Martelli 🐾
        </p>
      </div>
    </footer>
  );
}

interface FooterLinkProps {
  name: string;
  url: string;
  external?: boolean;
}

const FooterLink = ({ name, url, external }: FooterLinkProps) => {
  const linkProps = external && {
    target: "_blank",
    rel: "noopener noreferrer",
  };
  return (
    <li>
      <Link href={url} passHref legacyBehavior>
        <a {...linkProps} className="hover:text-gray-600 py-2">
          {name}
        </a>
      </Link>
    </li>
  );
};
