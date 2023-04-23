"use client";

import React, { ReactNode, useState } from "react";
import Button, { Color, getButtonClassNames } from "./Button";
import Link from "next/link";
import { Menu } from "./Icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import WidthLimit from "./WidthLimit";

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
      <div className="flex flex-row justify-between items-center">
        {trailing}
        <div className="hidden md:block ml-auto py-1">{children}</div>
        <Button
          className="md:hidden block ml-auto"
          color={Color.Transparent}
          ariaLabel="Menu button"
          small
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </Button>
      </div>
      {menuOpen && (
        <div className="relative">
          <div
            className="md:hidden flex absolute z-50 justify-end w-full"
            onClick={() => {
              setMenuOpen(false);
            }}
          >
            <div className="bg-white p-4 shadow-2xl rounded-md flex flex-col text-center">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const NavbarLink = ({ title, href, selected }: NavbarLinkProps) => (
  <Link
    href={href}
    className={getButtonClassNames({
      noBold: !selected,
      color: Color.Transparent,
      className: `w-full md:w-auto text-right ${
        selected && "underline"
      } decoration-wavy underline-offset-4 decoration-red-600`,
    })}
  >
    {title}
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
    <div className="backdrop-blur-md sticky w-full border-b-[0.5px] bg-white/90 top-0 z-[100]">
      <WidthLimit className="p-4">
        <Navbar
          trailing={
            pathname !== "/" && (
              <Link href="/">
                <Image
                  src="/icon.png"
                  width={32}
                  height={32}
                  alt="Site icon"
                  className="block h-8 w-auto rounded-full"
                ></Image>
              </Link>
            )
          }
        >
          {links.map((link, i) => (
            <NavbarLink {...link} key={i} selected={pathname === link.href} />
          ))}
        </Navbar>
      </WidthLimit>
    </div>
  );
};
