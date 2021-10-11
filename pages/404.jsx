import React from "react";
import Link from "next/link";
import { Button } from "../components/Button.tsx";

const NotFound = () => {
  return (
    <div>
      <div className="mx-auto text-center prose prose-nounder">
        <h1>🔎 Not found</h1>
        <p>Uh oh! The page you're looking for is nowhere to be found.</p>
        <Link href="/" passHref>
          <a className="no-underline">
            <Button isBig isRed>
            🏠 Go Home
            </Button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
