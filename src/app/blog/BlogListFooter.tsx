import { Color, getButtonClassNames } from "@/components/Button";
import { ArrowUpHighIcon } from "@/components/Icons";
import { RSSSubscribe } from "@/components/RSSSubscribe";
import Link from "next/link";

export function BlogListFooter() {
  return (
    <div className="flex justify-between items-center w-full">
      <Link
        href={"/blog/tags"}
        className={getButtonClassNames({
          small: true,
          noBold: true,
          color: Color.Transparent,
          className: "group flex items-center gap-2",
        })}
      >
        Explore tags
        <ArrowUpHighIcon className="h-4 w-4 group-hover:rotate-45 transition-all" />
      </Link>
      <RSSSubscribe />
    </div>
  );
}
