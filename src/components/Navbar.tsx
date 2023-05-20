"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Button, { Color, getButtonClassNames } from "./Button";
import Link from "next/link";
import { Menu } from "./Icons";
import Image from "next/image";
import { usePathname } from "next/navigation";
import WidthLimit from "./WidthLimit";
import { Modal } from "./Modal";
import { useWindowWidth } from "@/hooks/useWindowSize";
import { NAVBAR_LINKS } from "../../NavbarLinks";

interface NavbarLinkProps {
  name: string;
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
  const width = useWindowWidth();
  useEffect(() => {
    if (width! >= 768) setMenuOpen(false);
  }, [width]);

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
        <MobileNavBar onClose={() => setMenuOpen(false)}>
          {children}
        </MobileNavBar>
      )}
    </>
  );
};

export function MobileNavBar({
  children,
  onClose,
}: {
  children: ReactNode;
  onClose: Function;
}) {
  return (
    <Modal onClose={() => onClose()}>
      <WidthLimit className="items-end flex flex-col">
        <div className="bg-white p-4 shadow-2xl rounded-md flex flex-col text-center max-w-xs mx-3">
          {children}
        </div>
      </WidthLimit>
    </Modal>
  );
}

export const NavbarLink = ({ name, href, selected }: NavbarLinkProps) => (
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
    {name}
  </Link>
);

export const DefaultNavbar = () => {
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
          {NAVBAR_LINKS.map((link, i) => (
            <NavbarLink {...link} key={i} selected={pathname === link.href} />
          ))}
        </Navbar>
      </WidthLimit>
    </div>
  );
};
