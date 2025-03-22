import { Post } from "content-collections";
import { TextProcessor } from "./textProcessor";
import { TfIdfVector, TermFrequencyMap, ContentWeights } from "./types";

export class VectorBuilder {
  private readonly textProcessor: TextProcessor;
  private readonly weights: ContentWeights;
  private readonly documentFrequency: Map<string, number> = new Map();
  private documentCount = 0;

  constructor(
    textProcessor: TextProcessor,
    weights: ContentWeights = { title: 3, excerpt: 2, tags: 1, body: 1 },
  ) {
    this.textProcessor = textProcessor;
    this.weights = weights;
  }

  /**
   * Builds document frequency data from a collection of posts.
   */
  public buildVocabulary(posts: Post[]): Map<string, number> {
    this.documentCount = posts.length;
    this.documentFrequency.clear();

    for (const post of posts) {
      const uniqueTerms = this.textProcessor.getUniqueTerms(
        this.getWeightedPostContent(post),
      );
      uniqueTerms.forEach((term) =>
        this.documentFrequency.set(
          term,
          (this.documentFrequency.get(term) || 0) + 1,
        ),
      );
    }
    return this.documentFrequency;
  }

  /**
   * Creates a TF-IDF vector from post content.
   */
  public createPostVector(post: Post): TfIdfVector {
    return this.createVector(this.getWeightedPostContent(post));
  }

  /**
   * Creates a TF-IDF vector from arbitrary text.
   */
  public createVector(text: string): TfIdfVector {
    const terms = this.textProcessor.extractTerms(text);
    const termFrequency = this.calculateTermFrequency(terms);
    const vector: TfIdfVector = {};

    const termCount = terms.length;

    for (const term in termFrequency) {
      if (Object.prototype.hasOwnProperty.call(termFrequency, term)) {
        const frequency = termFrequency[term];
        const tf = frequency / termCount;
        const df = this.documentFrequency.get(term) || 0;
        const idf = Math.log((this.documentCount + 1) / (df + 1)) + 1;
        vector[term] = tf * idf;
      }
    }
    return vector;
  }

  /**
   * Extracts weighted content from a post based on configured weights.
   */
  private getWeightedPostContent(post: Post): string {
    const { title, excerpt, tags, body } = this.weights;
    const titleParts = Array(title).fill(post.title || "");
    const excerptParts = Array(excerpt).fill(post.excerpt || "");
    const tagParts = Array.isArray(post.tags)
      ? post.tags.join(" ").repeat(tags)
      : "";
    const bodyParts = (post.content || "").repeat(body);

    return [...titleParts, ...excerptParts, tagParts, bodyParts].join(" ");
  }

  /**
   * Calculates term frequency for a list of terms.
   */
  private calculateTermFrequency(terms: string[]): TermFrequencyMap {
    const frequency: TermFrequencyMap = {};
    for (const term of terms) {
      frequency[term] = (frequency[term] || 0) + 1;
    }
    return frequency;
  }
}
