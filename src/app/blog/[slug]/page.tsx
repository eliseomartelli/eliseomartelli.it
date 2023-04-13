import { DefaultFeaturedPosts } from "@/app/featuredPostSection";
import { BlogPostTitle, TagRow } from "@/components/BlogPostItem";
import { MDXComponent } from "@/components/MDX";
import { Newsletter } from "@/components/Newsletter";
import WidthLimit from "@/components/WidthLimit";
import { allPosts } from "contentlayer/generated";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post.url,
  }));
}

const PostPage = ({ params }: { params: { slug: string } }) => {
  const post = allPosts.find(
    (post) => post._raw.flattenedPath === `blog/${params.slug}`
  );

  if (!post) {
    notFound();
  }

  return (
    <WidthLimit className="p-4 flex flex-col gap-16">
      <article className="prose mx-auto">
        <section className="not-prose text-black text-center flex flex-col items-center align-middle mb-8">
          <BlogPostTitle {...post!} />
          <TagRow tags={post!.tags} />
        </section>
        <MDXComponent code={post.body.code} />
      </article>
      <DefaultFeaturedPosts />
      <Newsletter />
    </WidthLimit>
  );
};

export default PostPage;
