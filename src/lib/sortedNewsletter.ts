import { allNewsletters } from "content-collections";

export const allSortedNewsletter = allNewsletters.sort((a, b) => {
  return b.slug.localeCompare(a.slug);
});
