import { allPosts } from "contentlayer/generated";
import { BlogPostItem } from "@/components/BlogPostItem";
import WidthLimit from "@/components/WidthLimit";
import { compareDesc } from "date-fns";
import Link from "next/link";
import { allTags } from "../allTags";

export async function generateStaticParams() {
  return allTags.map((currentTag) => ({
    tag: currentTag,
  }));
}

const TagPage = ({ params }: { params: { tag: string } }) => {
  const posts = allPosts
    .filter(
      (post) =>
        post.tags
          .map((tag) => tag.toLowerCase())
          .indexOf(params.tag.toLowerCase()) !== -1
    )
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date));
    });
  return (
    <WidthLimit>
      <h1 className="text-4xl font-bold mb-4">
        <Link className="opacity-50" href={"/blog/tags"}>
          Blog/Tags/
        </Link>
        {params.tag}
      </h1>
      <ul className="flex flex-col gap-8 mt-8">
        {posts.map((post, i) => (
          <li key={i}>
            <BlogPostItem {...post} />
          </li>
        ))}
      </ul>
    </WidthLimit>
  );
};

export default TagPage;
