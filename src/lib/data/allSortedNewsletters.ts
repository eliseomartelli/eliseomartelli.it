import { allNewsletters } from "@/.contentlayer/generated";

export const allSortedNewsletters = allNewsletters
  .sort((a, b) => {
    if (a._id < b._id) {
      return -1;
    }
    if (a._id > b._id) {
      return 1;
    }
    return 0;
  })
  .reverse();
