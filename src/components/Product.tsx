import React, { ReactNode } from "react";
import { Card } from "./Card";
import Link from "next/link";
import { Color, getButtonClassNames } from "./Button";

export const Product = ({
  children,
  title,
  variation,
  link,
  linkText = "Buy",
}: {
  children?: ReactNode;
  title?: ReactNode;
  variation?: string;
  link?: string;
  linkText?: string;
}) => {
  return (
    <Card className="mb-4 flex gap-1.5 flex-col">
      <div className="flex justify-between not-prose items-center">
        <h1 className="text-xl font-bold flex items-center gap-2">
          {title}{" "}
          {variation && (
            <span className="text-sm text-gray-500">{variation}</span>
          )}
        </h1>
        {link && (
          <Link
            href={link}
            className={getButtonClassNames({
              small: true,
              color: Color.DarkGray,
              className: "!decoration-none",
            })}
          >
            {linkText}
          </Link>
        )}
      </div>
      <section className="prose">{children}</section>
    </Card>
  );
};
