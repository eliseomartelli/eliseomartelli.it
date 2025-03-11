import { Post } from "@/.contentlayer/generated";
import { TextProcessor } from "./textProcessor";
import { TfIdfVector, TermFrequencyMap } from "./types";

export interface ContentWeights {
  title: number;
  excerpt: number;
  tags: number;
  body: number;
}

export class VectorBuilder {
  private readonly textProcessor: TextProcessor;
  private readonly weights: ContentWeights;
  private documentFrequency: Map<string, number> = new Map();
  private documentCount = 0;

  constructor(
    textProcessor: TextProcessor,
    weights: ContentWeights = { title: 3, excerpt: 2, tags: 1, body: 1 }
  ) {
    this.textProcessor = textProcessor;
    this.weights = weights;
  }

  /**
   * Build document frequency data from a collection of posts
   */
  public buildVocabulary(posts: Post[]): Map<string, number> {
    this.documentCount = posts.length;
    this.documentFrequency.clear();

    for (const post of posts) {
      const content = this.getWeightedPostContent(post);
      const uniqueTerms = this.textProcessor.getUniqueTerms(content);

      uniqueTerms.forEach((term) => {
        this.documentFrequency.set(
          term,
          (this.documentFrequency.get(term) || 0) + 1,
        );
      })
    }

    return this.documentFrequency;
  }

  /**
   * Create TF-IDF vector from post content
   */
  public createPostVector(post: Post): TfIdfVector {
    const content = this.getWeightedPostContent(post);
    return this.createVector(content);
  }

  /**
   * Create TF-IDF vector from arbitrary text
   */
  public createVector(text: string): TfIdfVector {
    const terms = this.textProcessor.extractTerms(text);
    const termFrequency = this.calculateTermFrequency(terms);
    const vector: TfIdfVector = {};

    for (const [term, frequency] of Object.entries(termFrequency)) {
      const tf = frequency / terms.length;
      const df = this.documentFrequency.get(term) || 0;
      const idf = Math.log((this.documentCount + 1) / (df + 1)) + 1; // Smoothed IDF

      vector[term] = tf * idf;
    }

    return vector;
  }

  /**
   * Extract weighted content from a post based on configured weights
   */
  private getWeightedPostContent(post: Post): string {
    // Repeat elements based on their weights to influence term frequency
    const titleParts = Array(this.weights.title).fill(post.title || '');
    const excerptParts = Array(this.weights.excerpt).fill(post.excerpt || '');
    const tagParts = Array.isArray(post.tags)
      ? post.tags.join(' ').repeat(this.weights.tags)
      : '';
    const bodyParts = (post.body?.raw || '').repeat(this.weights.body);

    return [
      ...titleParts,
      ...excerptParts,
      tagParts,
      bodyParts
    ].join(' ');
  }

  /**
   * Calculate term frequency for a list of terms
   */
  private calculateTermFrequency(terms: string[]): TermFrequencyMap {
    const frequency: TermFrequencyMap = {};

    for (const term of terms) {
      frequency[term] = (frequency[term] || 0) + 1;
    }

    return frequency;
  }
}
