import Link from "next/link";
import { Color, getButtonClassNames } from "./Button";
import { RSSIcon } from "./Icons";
import { Features, useFeatures } from "@/lib/useFeatures";

export const RSSSubscribe = () => {
  if (useFeatures().includes(Features.RSSSubscribe)) {
    return (
      <Link
        href={"/feed.xml"}
        className={getButtonClassNames({
          small: true,
          noBold: true,
          color: Color.Transparent,
          className: "group flex items-center gap-2",
        })}
      >
        <span className="text-orange-500">
          <RSSIcon />
        </span>
        Subscribe to RSS
      </Link>
    );
  }
  return <></>;
};
