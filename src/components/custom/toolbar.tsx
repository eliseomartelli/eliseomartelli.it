import { cn } from "@/lib/utils";
import { NavigationLink } from "./navigation-link";
import { Button } from "@/components/ui/button";

const pillClass = cn(
  "flex flex-row items-center gap-2 px-3 py-1.5",
  "rounded-full",
  "backdrop-blur-md bg-white/60 dark:bg-black/50",
  "border border-white/40 dark:border-white/10",
  "shadow-lg shadow-black/10 dark:shadow-black/40",
  "ring-1 ring-black/5 dark:ring-white/5",
);

export const Toolbar = () => {
  return (
    <>
      {/* Left pill — wordmark */}
      <div className="fixed top-4 left-4 z-50">
        <header className={pillClass}>
          <h1>
            <NavigationLink href="/" className="font-bold! font-mono text-sm!" toUnderline={false}>
              eliseomartelli
            </NavigationLink>
          </h1>
        </header>
      </div>

      {/* Right pill — navigation */}
      <div className="fixed top-4 right-4 z-50">
        {/* Desktop: plain pill with nav links */}
        <nav className={cn(pillClass, "hidden md:flex")}>
          <ul className="flex items-center">
            <li><NavigationLink href="/">Home</NavigationLink></li>
            <li><NavigationLink href="/blog">Blog</NavigationLink></li>
            <li><NavigationLink href="/about">About</NavigationLink></li>
            <li><NavigationLink href="/photos">Photos</NavigationLink></li>
          </ul>
        </nav>

        {/* Mobile: details/summary hamburger — morphs pill→card */}
        <details className={cn(
          "md:hidden group hamburger-pill flex flex-col px-3 py-1.5",
          "backdrop-blur-md bg-white/60 dark:bg-black/50",
          "border border-white/40 dark:border-white/10",
          "shadow-lg shadow-black/10 dark:shadow-black/40",
          "ring-1 ring-black/5 dark:ring-white/5",
        )}>
          <Button variant="ghost" size="icon" asChild className="cursor-pointer ml-auto">
            <summary className="list-none">
              <svg className="size-5" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="4" y1="6" x2="20" y2="6" className="hamburger-line hamburger-line-top" />
                <line x1="4" y1="12" x2="20" y2="12" className="hamburger-line hamburger-line-mid" />
                <line x1="4" y1="18" x2="20" y2="18" className="hamburger-line hamburger-line-bot" />
              </svg>
            </summary>
          </Button>

          {/* In-flow nav — height animated via grid trick */}
          <nav className="hamburger-nav">
            <ul className="flex flex-col px-3 pb-2">
              <li><NavigationLink href="/">Home</NavigationLink></li>
              <li><NavigationLink href="/blog">Blog</NavigationLink></li>
              <li><NavigationLink href="/about">About</NavigationLink></li>
              <li><NavigationLink href="/photos">Photos</NavigationLink></li>
            </ul>
          </nav>
        </details>
      </div>
    </>
  );
};
