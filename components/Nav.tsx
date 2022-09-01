import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Button, { Color } from "./Button";

interface NavButtonProps {
  title: string;
  href: string;
}

function NavButton({ title, href }: NavButtonProps): JSX.Element {
  const router = useRouter();
  const isActive = router.asPath === href;
  return (
    <Link href={href} passHref>
      <a
        className={`hover:bg-gray-200 py-2 px-4 rounded-md transition-colors ${
          isActive && "font-extrabold"
        }`}
      >
        {title}
      </a>
    </Link>
  );
}

export default function Nav(): JSX.Element {
  return (
    <nav>
      <a
        href="#skip"
        className="absolute p-8 opacity-0 focus:opacity-100 bg-gray-800 text-white -top-16 focus:top-0"
      >
        Skip to content
      </a>
      <div className="flex flex-row py-4 px-2 max-w-3xl w-full mx-auto">
        <ul className="flex flex-row flex-1">
          <li>
            <NavButton title="Home" href="/" />
          </li>
          <li>
            <NavButton title="Blog" href="/blog" />
          </li>
        </ul>
      </div>
    </nav>
  );
}
