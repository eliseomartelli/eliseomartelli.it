import { allPosts } from "contentlayer/generated";
import { BlogPostItem } from "@/components/BlogPostItem";
import WidthLimit from "@/components/WidthLimit";
import { compareDesc } from "date-fns";
import { allTags } from "../allTags";
import { Metadata } from "next";
import { PageLayout } from "@/components/PageLayout";

export async function generateStaticParams() {
  return allTags.map((currentTag) => ({
    tag: currentTag,
  }));
}
export async function generateMetadata({
  params,
}: {
  params: {
    tag: string;
  };
}): Promise<Metadata | undefined> {
  return {
    title: `${params.tag} - Eliseo Martelli`,
    openGraph: {
      type: "article",
    },
    twitter: {
      card: "summary",
    },
  };
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
    <PageLayout
      routes={[
        { href: "/blog", name: "Blog" },
        { href: "/blog/tags", name: "Tags" },
        { href: `/blog/tags/${params.tag}`, name: params.tag },
      ]}
    >
      <WidthLimit>
        <ul className="flex flex-col gap-8">
          {posts.map((post, i) => (
            <li key={i}>
              <BlogPostItem {...post} />
            </li>
          ))}
        </ul>
      </WidthLimit>
    </PageLayout>
  );
};

export default TagPage;
