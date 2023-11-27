import moo from "@eliseomartelli/moo/dist";
import Link from "next/link";
import React from "react";

export const SegmentedNav = ({
  routes,
}: {
  routes: { href: string; name: string }[];
}) => {
  return (
    <>
      {routes.map((route, i) => {
        const isLast = i === routes.length - 1;
        return (
          <Link
            {...route}
            key={i}
            className={moo(
              ["text-gray-500 text-base", !isLast],
              ["block", isLast],
            )}
          >
            {route.name}
            {i < routes.length - 1 && "/"}
          </Link>
        );
      })}
    </>
  );
};
