"use client";

import React, { ReactNode, useState } from "react";
import Button, { Color, getButtonClassNames } from "./Button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Modal } from "./Modal";
import { NAVBAR_LINKS } from "../../NavbarLinks";
import WidthLimit from "./WidthLimit";
import moo from "@eliseomartelli/moo/dist";

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
    <WidthLimit className="mx-auto pt-4 flex flex-row items-center justify-between">
      {menuOpen ? <Link href={"/"} >
        <div className="group relative h-8 w-40 overflow-hidden flex items-center font-bold hover:bg-stone-200 rounded-md p-2 -m-2">
          <div className="absolute transition-transform duration-200 transform translate-y-0 group-hover:-translate-y-full">
            <p className="font-serif">Eliseo Martelli</p>
          </div>
          <div className="absolute transition-transform duration-200 transform translate-y-full group-hover:translate-y-0">
            <p className="font-mono">@eliseomartelli</p>
          </div>
        </div>
      </Link> : <></>}
      <div className={moo("-me-4",
        ["block!", menuOpen],
        ["hidden!", !menuOpen],
        "md:hidden block")}>
        {children}
      </div>
      <Button onClick={() => setMenuOpen(!menuOpen)} color={Color.Transparent} className={moo("font-serif -me-4 md:hidden")}>
        {menuOpen ? "Menu" : "Close"}
      </Button>
    </WidthLimit >
  );
};

export const NavbarLink = ({ name, href, selected }: NavbarLinkProps) => (
  <Link
    href={href}
    className={getButtonClassNames({
      noBold: !selected,
      color: Color.Transparent,
      className: `w-full md:w-auto font-serif ${selected && "text-pink-700 underline"
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
      {NAVBAR_LINKS.map((link, i) => (
        <NavbarLink {...link} key={i} selected={pathname === link.href} />
      ))}
    </Navbar>
  );
};
