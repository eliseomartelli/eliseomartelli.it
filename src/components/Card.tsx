import moo from "@eliseomartelli/moo/dist";
import React, { ReactNode } from "react";

export const Card = ({
  children,
  hoverable,
  className,
}: {
  children?: ReactNode;
  hoverable?: boolean;
  className?: string;
}) => {
  const classNames = moo(
    "bg-gray-50 rounded-md p-4 border justify-between gap-8",
    ["hover:bg-gray-200", hoverable],
    className!
  );
  return <div className={classNames}>{children}</div>;
};
