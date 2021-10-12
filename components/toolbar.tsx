import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { DarkModeToggle } from "./DarkModeToggle";
import { ToolbarExpandToggle } from "./ToolbarExpandToggle";
import { PageList } from "./PageList";

const pages = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
];

export const Toolbar: React.FC<{
  name?: string;
  toggleTheme: any;
  theme: any;
}> = ({ name = "Eliseo Martelli", toggleTheme, theme }) => {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const renderExpandableThing = () => {
    const classNames = [
      expanded ? "opacity-100 " : "opacity-0 hidden",
      "md:opacity-0 transition-opacity ease-in-out z-50 bg-white pb-4 w-screen fixed px-4",
    ];
    return (
      <div className={classNames.join(" ")}>
        <PageList
          pages={pages}
          current={router.asPath}
          setExpanded={setExpanded}
          isVertical
        />
      </div>
    );
  };

  const renderBlackCurtain = () => {
    const classNames = [
      expanded
        ? "opacity-50 pointer-events-auto"
        : "opacity-0 pointer-events-none",
      "md:opacity-0 md:pointer-events-none transition-opacity ease-in-out bg-black pointer-events-none z-10 fixed top-0 left-0 w-full h-screen",
    ];
    return (
      <div
        onClick={() => setExpanded(false)}
        className={classNames.join(" ")}
      />
    );
  };
  return (
    <div>
      <header className="max-w-6xl px-4 mx-auto flex items-center bg-white relative z-50 space-x-6">
        <h1 className="font-bold text-2xl my-8 flex-1">
          <Link href="/">{name}</Link>
        </h1>
        <PageList
          className="md:flex hidden"
          pages={pages}
          current={router.asPath}
          setExpanded={setExpanded}
        />
        <button
          onClick={() => setExpanded(!expanded)}
          className="md:hidden visible"
        >
          <ToolbarExpandToggle expanded={expanded} />
        </button>
        <DarkModeToggle toggleTheme={toggleTheme} theme={theme} />
      </header>
      {renderExpandableThing()}
      {renderBlackCurtain()}
    </div>
  );
};
