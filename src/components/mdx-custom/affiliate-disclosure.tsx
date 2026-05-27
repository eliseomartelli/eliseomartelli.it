import React from "react";
import Link from "next/link";

export const AffiliateDisclosure = () => {
  return (
    <>
      <hr />
      <p>
        Disclosure: this post contains one (or more) affiliate link. If you buy
        something through one of those links you won&apos;t pay anything more
        but I&apos;ll get a small commission that helps me mantaining this blog.
        For more information about my approach to partnerships, see the{" "}
        <Link href="/brandpartnership" className="underline">
          brand partnerships page
        </Link>
        .
      </p>
    </>
  );
};

