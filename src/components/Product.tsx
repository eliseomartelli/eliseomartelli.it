import React, { ReactNode } from "react";
import { Card } from "./Card";
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
        <div>
          <h1 className="text-xl font-bold flex items-center gap-2">{title}</h1>
          {variation && (
            <span className="text-sm text-gray-500">{variation}</span>
          )}
        </div>
        {link && (
          <a
            href={link}
            className={getButtonClassNames({
              small: true,
              color: Color.DarkGray,
              className: "!decoration-none",
            })}
          >
            {linkText}
          </a>
        )}
      </div>
      <section className="prose">{children}</section>
    </Card>
  );
};
