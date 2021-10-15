import React from "react";
import { useRouter } from "next/router";
import { Button } from "../Button/Button";
import Link from "next/link";

interface Page {
  title: string;
  href: string;
}

interface PageListProps {
  isVertical?: boolean;
  current?: string;
  pages: Array<Page>;
  className?: string;
  setExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PageList: React.FC<PageListProps> = ({
  pages,
  isVertical,
  current,
  className,
  setExpanded,
}) => {
  const classes = [
    className,
    "flex",
    isVertical ? "flex-col space-y-2" : "flex-row space-x-4",
  ];

  const router = useRouter();
  const handleRouting = (href: string) => {
    if (setExpanded !== undefined) {
      setExpanded(false);
    }
    router.push(href);
  };

  return (
    <ul className={classes.join(" ")}>
      {pages.map(({ title, href }) => (
        <li key={href}>
          <Link passHref href={href}>
            <a onClick={() => handleRouting(href)}>
              <Button isActive={current === href} isTransparent>
                {title}
              </Button>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  );
};
