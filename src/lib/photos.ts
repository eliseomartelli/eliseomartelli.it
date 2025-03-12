import { defineCollection } from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";

export const photos = defineCollection({
  name: "photos",
  directory: "data/photos",
  include: "*.mdx",
  schema: (zod) => ({
    title: zod.string(),
    thumbnail: zod.string(),
  }),

  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    const slug = document._meta.fileName.split(".")[0];
    return { ...document, mdx, slug };
  },
});
