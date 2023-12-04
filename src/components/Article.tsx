import React, { ReactNode } from "react";

export const Article = ({
  children,
}: {
  children: ReactNode | ReactNode[] | null;
}) => {
  return <article className="prose mx-auto px-4 w-full">{children}</article>;
};
