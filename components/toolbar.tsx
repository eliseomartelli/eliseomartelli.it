import React, { Component, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkModeToggle } from "./DarkModeToggle.tsx";

const pages = [
  { name: "Home", link: "/" },
  { name: "About", link: "/about" },
];

export const Toolbar: React.FC<{
  name?: string;
  href: string;
  toggleTheme: any;
  theme: any;
}> = ({ name = "Eliseo Martelli", toggleTheme, theme }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <header className="max-w-6xl px-4 mx-auto flex items-center bg-white relative z-50">
        <h1 className="font-bold text-2xl my-8 flex-1">
          <Link href="/">{name}</Link>
        </h1>
        <PageList
          pageList={pages}
          configuration="hidden md:visible md:flex space-x-6"
        />
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
        <DarkModeToggle toggleTheme={toggleTheme} theme={theme} />
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
        <PageList configuration="flex flex-col space-y-2" pageList={pages} />
      </div>
    </div>
  );
};

interface Page {
  name: string;
  link: string;
}

interface PageListProps {
  pageList: Array<Page>;
  configuration: string;
}

const PageList: React.FC<PageListProps> = ({ pageList, configuration }) => {
  const base = "border border-white font-bold px-4 py-2 hover:bg-gray-100 rounded-lg ";
  const selected = "text-red-500 border-red-200";
  const router = useRouter();
  return (
    <ul className={configuration}>
      {pageList.map(({ name, link }, i) => (
        <li key={i} className={base + (router.asPath === link ? selected : "")}>
          <Link href={link}>{name}</Link>
        </li>
      ))}
    </ul>
  );
};
