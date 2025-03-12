import { compareDesc } from "date-fns";
import { allPosts } from "content-collections";

export const allSortedPosts = allPosts.sort((a, b) => {
  return compareDesc(new Date(a.date), new Date(b.date));
});
