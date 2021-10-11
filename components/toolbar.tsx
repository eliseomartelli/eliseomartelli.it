import React, { Component, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const pages = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
];

export const Toolbar: React.FC<{ name?: string; href: string }> = ({
  name = "Eliseo Martelli",
}) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const base = "font-bold px-4 py-2 hover:bg-gray-100 rounded-lg ";
  const selected = "text-red-500 border";
  return (
    <div>
      <header className="max-w-6xl px-4 mx-auto flex items-center bg-white relative z-50">
        <h1 className="font-bold text-2xl my-6 flex-1">
          <Link href="/">{name}</Link>
        </h1>
        <ul className="hidden md:visible md:flex space-x-2">
          {pages.map(({ name, link }, i) => (
            <li
              key={i}
              className={base + (router.asPath === link ? selected : "")}
            >
              <Link href={link}>{name}</Link>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setExpanded(!expanded)}
          className="md:hidden visible"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={`${expanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}`}
            />
          </svg>
        </button>
        <button className="ml-8">🌙</button>
      </header>
      <div
        onClick={() => setExpanded(false)}
        className={`${
          expanded
            ? "opacity-50 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        } md:opacity-0 md:pointer-events-none transition-opacity ease-in-out bg-black pointer-events-none z-10 fixed top-0 left-0 w-full h-screen`}
      ></div>
      <div
        className={`${
          expanded ? "opacity-100" : "opacity-0"
        } md:opacity-0 transition-opacity ease-in-out z-50 bg-white pb-4 w-screen fixed px-4`}
      >
        <ul className="flex flex-col space-y-2">
          {pages.map(({ name, link }, i) => (
            <Link href={link}>
              <li
                key={i}
                className={base + (router.asPath === link ? selected : "")}
                onClick={() => setExpanded(false)}
              >
                {name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};
