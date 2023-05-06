import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import { timeToRead } from "./src/lib/timeToRead";
import remarkGfm from "remark-gfm";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkToc from "remark-toc";

const Photo = defineNestedType(() => ({
  name: "Photo",
  fields: {
    title: {
      type: "string",
    },
    place: {
      type: "string",
      required: false,
    },
    url: {
      type: "string",
    },
    aspect: {
      type: "enum",
      options: ["vertical", "horizontal"],
    },
  },
}));

export const Photos = defineDocumentType(() => ({
  name: "Photos",
  filePathPattern: `photos/*.yaml`,
  contentType: "yaml",
  fields: {
    title: {
      type: "string",
      description: "The title of the photo section.",
      required: true,
    },
    photos: { type: "list", of: Photo },
  },
}));

export const Uses = defineDocumentType(() => ({
  name: "Uses",
  filePathPattern: "uses.md",
  contentType: "mdx",
}));

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blog/*.md`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the post",
      required: true,
    },
    excerpt: {
      type: "string",
      description: "The excerpt of the post",
      required: true,
    },
    date: {
      type: "date",
      description: "The date of the post",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "The tags of the post",
      required: true,
    },
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (post) => post._raw.flattenedPath,
    },
    timeToRead: {
      type: "number",
      resolve: (post) => timeToRead(post.body.raw),
    },
  },
}));

export default makeSource({
  contentDirPath: "./data",
  documentTypes: [Post, Photos, Uses],
  mdx: {
    remarkPlugins: [remarkGfm, remarkToc],
    rehypePlugins: [
      [rehypePrettyCode, { theme: "one-dark-pro" }],
      [rehypeAutolinkHeadings, { properties: { className: ["anchor"] } }],
    ],
  },
});
