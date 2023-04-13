"use client";

import React, { ReactNode, useState } from "react";
import Button, { Color } from "./Button";
import Link from "next/link";
import { Menu } from "./Icons";
import Image from "next/image";
import { usePathname } from "next/navigation";

interface NavbarLinkProps {
  title: string;
  href: string;
  selected?: boolean;
}

export const Navbar = ({
  children,
  trailing,
}: {
  children?: ReactNode[] | ReactNode;
  trailing?: ReactNode;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="flex flex-row justify-between place-items-end items-center">
        {trailing}
        <div className="hidden md:block">{children}</div>
        <Button
          className="md:hidden block"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </Button>
      </div>
      {menuOpen && (
        <div className="relative">
          <div
            className="md:hidden flex-col justify-end items-end border-md shadow-md flex bg-white border absolute rounded-md right-4 p-4 z-50"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export const NavbarLink = ({ title, href, selected }: NavbarLinkProps) => (
  <Link href={href} className="w-full">
    <Button
      noBold={!selected}
      color={Color.Transparent}
      className="w-full md:w-auto text-right"
    >
      {title}
    </Button>
  </Link>
);

export const DefaultNavbar = () => {
  const links = [
    { title: "Home", href: "/" },
    { title: "Blog", href: "/blog" },
    { title: "Photos", href: "/photos" },
    { title: "About", href: "/about" },
  ];
  const pathname = usePathname();
  return (
    <Navbar
      trailing={
        <Link href="/">
          <Image
            src="/icon.png"
            width={48}
            height={48}
            alt="Site icon"
            className="block h-12 w-auto rounded-full"
          ></Image>
        </Link>
      }
    >
      {links.map((link, i) => (
        <NavbarLink {...link} key={i} selected={pathname === link.href} />
      ))}
    </Navbar>
  );
};
