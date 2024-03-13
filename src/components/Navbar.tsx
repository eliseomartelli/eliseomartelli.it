"use client";

import React, { ReactNode, useState } from "react";
import Button, { Color, getButtonClassNames } from "./Button";
import Link from "next/link";
import { Menu } from "./Icons";
import { usePathname } from "next/navigation";
import { Modal } from "./Modal";
import { NAVBAR_LINKS } from "../../NavbarLinks";
import WidthLimit from "./WidthLimit";

interface NavbarLinkProps {
  name: string;
  href: string;
  selected?: boolean;
}

export const Navbar = ({
  children,
}: {
  children?: ReactNode[] | ReactNode;
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="bg-stone-50 py-4 px-4 flex flex-row items-center gap-2">
        <Button
          color={Color.Transparent}
          ariaLabel="Menu button"
          small
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Menu />
        </Button>
        <Link href={"/"} className="font-bold font-serif">
          eliseomartelli
        </Link>
      </div>

      <Modal onClose={() => setMenuOpen(false)} open={menuOpen}>
        {children}
      </Modal>
    </>
  );
};

export const NavbarLink = ({ name, href, selected }: NavbarLinkProps) => (
  <Link
    href={href}
    className={getButtonClassNames({
      noBold: !selected,
      color: Color.Transparent,
      className: `w-full md:w-auto text-3xl font-serif ${
        selected && "text-pink-700 underline"
      }`,
    })}
  >
    {name}
  </Link>
);

export const DefaultNavbar = () => {
  const pathname = usePathname();

  return (
    <Navbar>
      <WidthLimit className="flex flex-col justify-center h-screen ">
        {NAVBAR_LINKS.map((link, i) => (
          <NavbarLink {...link} key={i} selected={pathname === link.href} />
        ))}
      </WidthLimit>
    </Navbar>
  );
};
