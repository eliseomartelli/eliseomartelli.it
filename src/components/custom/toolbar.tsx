import { cn } from "@/lib/utils";
import { NavigationLink } from "./navigation-link";

export const Toolbar = () => {
  return (
    <header
      className={cn(
        "flex p-4 sticky sm:flex-row flex-col",
        "sm:justify-between justify-center align-middle text-center",
        "gap-4",
      )}
    >
      <h1>
        <NavigationLink
          href="/"
          className="font-bold! font-mono text-lg!"
          toUnderline={false}
        >
          eliseomartelli
        </NavigationLink>
      </h1>
      <nav>
        <ul className="flex sm:justify-between justify-center">
          <li>
            <NavigationLink href="/">Home</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/blog">Blog</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/about">About</NavigationLink>
          </li>
          <li>
            <NavigationLink href="/photos">Photos</NavigationLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};
