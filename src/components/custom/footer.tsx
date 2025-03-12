import Link from "next/link";
import { Button } from "../ui/button";

export const Footer = () => {
  return (
    <footer className="p-4 bg-gray-100 space-y-4">
      <div className="max-w-prose w-full mx-auto flex flex-row items-start flex-wrap">
        <Button variant="link" asChild className="basis-1/2 justify-start">
          <Link href="/">Home</Link>
        </Button>
        <Button variant="link" asChild className="basis-1/2 justify-start">
          <Link href="/blog">Blog</Link>
        </Button>
        <Button variant="link" asChild className="basis-1/2 justify-start">
          <Link href="/about">About</Link>
        </Button>
        <Button variant="link" asChild className="basis-1/2 justify-start">
          <Link href="/photos">Photos</Link>
        </Button>
        <Button variant="link" asChild className="basis-1/2 justify-start">
          <Link href="/newsletter">Newsletter</Link>
        </Button>
        <Button variant="link" asChild className="basis-1/2 justify-start">
          <Link href="/feedback">Feedback</Link>
        </Button>
        <Button variant="link" asChild className="basis-1/2 justify-start">
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
      <div className="w-full max-w-prose mx-auto px-4">
        © 2015 - {new Date().getFullYear()} - Eliseo Martelli
      </div>
    </footer>
  );
};
