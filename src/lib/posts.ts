import { defineCollection } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { calculateTimeToRead } from "./time-to-read";
import { pluralize } from "./pluralize";
import { colorClassFromPostTag } from "./color-from-tag";
import { dateFormatter } from "./date-formatter";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";

const formatMinutesToRead = (minutes: number): string =>
  pluralize(minutes, ["%d minute to read", "%d minutes to read"]);

export const posts = defineCollection({
  name: "posts",
  directory: "data/blog",
  include: "*.md*",
  schema: (zod) => ({
    title: zod.string(),
    date: zod.string(),
    excerpt: zod.string(),
    tags: zod.array(zod.string()),
  }),

  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrettyCode],
    });
    const slug = document._meta.fileName.split(".")[0];
    const minutesToRead = calculateTimeToRead(document.content);
    const timeToRead = formatMinutesToRead(minutesToRead);
    const formattedDate = dateFormatter(document.date);
    const postTags = document.tags.sort().map((tag) => {
      return {
        tag,
        colorClassName: colorClassFromPostTag(tag),
      };
    });
    const wordCount = (document.content.match(/[\w\d\’\'-]+/gi) || []).length;
    return {
      ...document,
      mdx,
      slug,
      timeToRead,
      formattedDate,
      postTags,
      wordCount,
    };
  },
});
