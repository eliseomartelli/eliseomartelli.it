import { defineCollection } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

export const newsletter = defineCollection({
  name: "newsletter",
  directory: "data/newsletter",
  include: "*.md*",
  schema: (zod) => ({
    title: zod.string(),
  }),

  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    const slug = document._meta.fileName.split(".")[0];
    return { ...document, mdx, slug };
  },
});
