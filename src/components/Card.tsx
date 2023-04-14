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
  const classNames = [
    "bg-gray-50 rounded-md p-4 border justify-between gap-8",
    hoverable && "hover:bg-gray-200",
    className,
  ].join(" ");
  return <div className={classNames}>{children}</div>;
};
