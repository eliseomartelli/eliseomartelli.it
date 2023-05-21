import { Post } from "contentlayer/generated";
import Link from "next/link";
import { Card } from "./Card";
import { CategoryRow } from "./CategoryRow";
import { BlogPostTitle } from "./BlogPostTitle";

export const BlogPostItem = (post: Post) => {
  const { url, tags, excerpt } = post;

  return (
    <Card className="-mx-4" noBackground noBorder>
      <Link href={url}>
        <BlogPostTitle {...post} />
        <p className="mt-2">{excerpt}</p>
      </Link>
      <CategoryRow tags={tags} />
    </Card>
  );
};
