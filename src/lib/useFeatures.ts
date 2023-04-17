export enum Features {
  Newsletter,
  FeaturedPosts,
  RSSSubscribe,
}

export const useFeatures = () => {
  return [Features.FeaturedPosts, Features.RSSSubscribe];
};
