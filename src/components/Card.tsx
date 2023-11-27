import moo from "@eliseomartelli/moo/dist";
import React, { ReactNode } from "react";

export const Card = ({
  children,
  hoverable,
  className,
  noBackground,
  noBorder,
}: {
  children?: ReactNode;
  hoverable?: boolean;
  className?: string;
  noBackground?: boolean;
  noBorder?: boolean;
}) => {
  const classNames = moo(
    "rounded-md p-4 justify-between gap-8",
    ["hover:bg-stone-100", hoverable],
    ["bg-stone-50", !noBackground],
    ["border", !noBorder],
    className!,
  );
  return <div className={classNames}>{children}</div>;
};
