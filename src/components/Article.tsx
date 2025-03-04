import React, { ReactNode } from "react";

export const Article = ({
  children,
}: {
  children: ReactNode | ReactNode[] | null;
}) => {
  return <article className="prose px-8 max-w-prose mx-auto">{children}</article>;
};
