import Link from "next/link";
import { CategoryTaglet } from "./Taglet";

export const CategoryRow = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row gap-2 mt-4">
    {tags.sort().map((tag, i) => (
      <Link href={`/blog/tags/${tag}`} key={i}>
        <CategoryTaglet category={tag} />
      </Link>
    ))}
  </div>
);
