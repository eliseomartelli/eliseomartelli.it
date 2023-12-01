import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from "contentlayer/source-files";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import remarkToc from "remark-toc";

import { timeToRead } from "./src/lib/timeToRead";

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
  filePathPattern: `photos/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the photo section.",
      required: true,
    },
    thumbnail: {
      type: "string",
      description: "The thumbnail of the photo section.",
      required: false,
    },
    photos: { type: "list", of: Photo },
  },
}));

export const Newsletter = defineDocumentType(() => ({
  name: "Newsletter",
  filePathPattern: `newsletter/*.md`,
  contentType: "markdown",
  fields: {
    title: {
      type: "string",
      required: true,
    },
  },
}));

export const Uses = defineDocumentType(() => ({
  name: "Uses",
  filePathPattern: "uses.md",
  contentType: "mdx",
}));

export const Snippet = defineDocumentType(() => ({
  name: "Snippet",
  filePathPattern: `snippets/*.mdx`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "The title of the snippet",
      required: true,
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "The tags of the snippet",
      required: false,
    },
  },
}));

const Social = defineNestedType(() => ({
  name: "Social",
  fields: {
    url: {
      type: "string",
    },
    name: {
      type: "string",
    },
    user: {
      type: "string",
    },
  },
}));

const Socials = defineDocumentType(() => ({
  name: "Socials",
  filePathPattern: `socials.json`,
  contentType: "data",
  fields: { socials: { type: "list", of: Social } },
}));

const TimelineEvent = defineNestedType(() => ({
  name: "TimelineEvent",
  fields: {
    from: { type: "string" },
    to: { type: "string" },
    what: { type: "string" },
    where: { type: "string" },
  },
}));

const Timeline = defineNestedType(() => ({
  name: "Timeline",
  fields: {
    title: { type: "string" },
    description: { type: "string", required: false },
    events: { type: "list", of: TimelineEvent },
  },
}));

const Timelines = defineDocumentType(() => ({
  name: "Timelines",
  filePathPattern: `timelines.yaml`,
  contentType: "data",
  fields: {
    timelines: { type: "list", of: Timeline },
  },
}));

export const Ingredient = defineNestedType(() => ({
  name: "Ingredient",
  fields: {
    name: {
      type: "string",
    },
    quantity: {
      type: "number",
    },
    unit: {
      type: "string",
      required: false,
    },
  },
}));

export const Recipe = defineDocumentType(() => ({
  name: "Recipe",
  filePathPattern: `recipes/*.*`,
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
    },
    excerpt: {
      type: "string",
    },
    category: {
      type: "string",
    },
    yield: {
      type: "json",
      of: Ingredient,
    },
    prep_time: {
      type: "string",
    },
    cook_time: {
      type: "string",
    },
    ingredients: { type: "list", of: Ingredient },
  },
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
  documentTypes: [
    Post,
    Photos,
    Uses,
    Snippet,
    Socials,
    Timelines,
    Recipe,
    Newsletter,
  ],
  mdx: {
    remarkPlugins: [remarkGfm, remarkToc],
    rehypePlugins: [
      [
        rehypePrettyCode,
        {
          theme: "one-dark-pro",
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow
            // empty lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: "text", value: " " }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push("line--highlighted");
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ["word--highlighted"];
          },
        },
      ],
      [rehypeAutolinkHeadings, { properties: { className: ["anchor"] } }],
    ],
  },
});
