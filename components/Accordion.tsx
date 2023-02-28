import React, { ReactNode, useEffect, useState } from "react";
import Button, { Color } from "./Button";

interface AccordionProps {
  children?: ReactNode;
  menu?: ReactNode;
  title?: string;
  buttonContent?: ReactNode;
}
export default function Accordion({
  children,
  menu,
  title,
  buttonContent,
}: AccordionProps): JSX.Element {
  const [menuState, setMenuState] = useState(true);
  useEffect(() => {
    setMenuState(true);
  }, [title]);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center">
        <h2 className="flex-grow text-2xl font-bold">{title}</h2>
        <Button onClick={() => setMenuState(!menuState)} color={Color.DarkGray}>
          {buttonContent ? (
            buttonContent
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          )}
        </Button>
      </div>
      <nav
        className={`${
          menuState ? "max-h-0" : "max-h-screen"
        } transition-all ease-in-out overflow-hidden h-auto`}
      >
        {menu}
      </nav>
      <div> {children} </div>
    </section>
  );
}
