"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

export interface NavigationLinkProps {
  href: string;
  className?: string;
  children: React.ReactNode;
  toUnderline?: boolean;
}

const NavigationLink = React.forwardRef<HTMLAnchorElement, NavigationLinkProps>(
  ({ className, toUnderline = true, ...props }, ref) => {
    const pathname = usePathname();
    let underline = false;

    if (props.href === "/") {
      underline = pathname === "/";
    } else {
      underline =
        pathname.startsWith(props.href) &&
        (pathname.length === props.href.length ||
          pathname.charAt(props.href.length) === "/");
    }
    underline = underline && toUnderline;
    return (
      <Button asChild variant="ghost">
        <Link
          className={cn(className, underline && "underline", "rounded")}
          {...props}
          ref={ref}
        ></Link>
      </Button>
    );
  },
);

NavigationLink.displayName = "NavigationLink";

export { NavigationLink };
