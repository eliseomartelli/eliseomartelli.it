import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "./Button";

interface NavButtonProps {
  title: string;
  href: string;
}
function NavButton({ title, href }: NavButtonProps): JSX.Element {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <Link href={href} passHref>
      <Button>
        <a className={`${isActive ? "font-extrabold" : ""}`}>{title}</a>
      </Button>
    </Link>
  );
}

export default function Nav(): JSX.Element {
  const [dark, setDark] = useState(false);
  return (
    <nav>
      <a
        href="#skip"
        className="absolute p-4 opacity-0 focus:opacity-100 bg-gray-800 text-white -top-16 focus:top-0"
      >
        Skip to content
      </a>
      <div id="skip" className="flex flex-row py-2 max-w-3xl w-full mx-auto">
        <ul className="flex flex-row flex-1">
          <li>
            <NavButton title="Home" href="/" />
          </li>
          <li>
            <NavButton title="Blog" href="/blog" />
          </li>
          <li>
            <NavButton title="Photos" href="/photos" />
          </li>
        </ul>
        <Button onClick={() => setDark(!dark)}>
          {!dark ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z" />
            </svg>
          )}
        </Button>
      </div>
    </nav>
  );
}
