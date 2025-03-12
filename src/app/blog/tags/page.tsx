import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { colorClassFromPostTag } from "@/lib/color-from-tag";
import { allTags } from "@/lib/tags";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Blog Tags",
};

export default function BlogTagExplorePage() {
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
        </BreadcrumbList>
      </Breadcrumb>
      <ul className="space-y-4 grid grid-cols-2 gap-x-4 sm:grid-cols-4">
        {allTags.map((tag) => (
          <li key={tag}>
            <Link href={`/blog/tags/${tag}`} passHref>
              <div
                className={cn(
                  colorClassFromPostTag(tag),
                  "p-4 rounded-lg border text-center hover:opacity-75",
                )}
              >
                {tag}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
