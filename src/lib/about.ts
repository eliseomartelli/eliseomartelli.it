import { defineCollection } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

export const about = defineCollection({
  name: "about",
  directory: "data/",
  include: "about.mdx",
  schema: () => ({}),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return { ...document, mdx };
  },
});
