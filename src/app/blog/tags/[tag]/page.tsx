import { PostList } from "@/components/custom/post-list";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { colorClassFromPostTag } from "@/lib/color-from-tag";
import { allSortedPosts } from "@/lib/sortedPosts";
import { allTags, PostTagType } from "@/lib/tags";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: PostTagType }>;
}): Promise<Metadata> {
  const { tag: title } = await params;

  return {
    title,
    description: `All the posts about ${title}`,
    openGraph: {
      title,
      description: `All the posts about ${title}`,
      images: [],
    },
  };
}

export async function generateStaticParams() {
  return allTags.map((tag) => ({ tag }));
}

export default async function BlogTagViewPage({
  params,
}: {
  params: Promise<{ tag: PostTagType }>;
}) {
  const { tag } = await params;

  const postForTag = allSortedPosts.filter((post) => {
    return post.tags.map((t) => t.toLowerCase()).includes(tag.toLowerCase());
  });

  return (
    <>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/blog/tags">Tags</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink
              href={`/blog/tags/${tag}`}
              className={cn(
                colorClassFromPostTag(tag),
                "bg-transparent font-bold",
              )}
            >
              {tag}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <PostList postlist={postForTag} />
    </>
  );
}
