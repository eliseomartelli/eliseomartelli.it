import { Post, allPosts } from "@/.contentlayer/generated";
import { TextProcessor } from "./textProcessor";
import { VectorBuilder, ContentWeights } from "./vectorBuilder";
import { VectorSimilarity } from "./vectorSimilarity";
import { ScoredPost, EmbeddingSystemConfig, TfIdfVector } from "./types";

export class BlogEmbeddingSystem {
  private posts: Post[] = [];
  private postVectors: Map<string, TfIdfVector> = new Map();
  private isInitialized = false;
  private readonly config: Required<EmbeddingSystemConfig>;

  // Core components
  private textProcessor: TextProcessor;
  private vectorBuilder: VectorBuilder;
  private vectorSimilarity: VectorSimilarity;

  constructor(config: EmbeddingSystemConfig = {}) {
    this.config = {
      maxTextLength: 100000,
      maxTermsPerDocument: 5000,
      titleWeight: 6,
      excerptWeight: 2,
      tagWeight: 1,
      bodyWeight: 1,
      minTermLength: 2,
      debug: false,
      ...config
    };

    this.textProcessor = new TextProcessor(
      this.config.minTermLength,
      this.config.maxTextLength,
      this.config.maxTermsPerDocument
    );

    const weights: ContentWeights = {
      title: this.config.titleWeight,
      excerpt: this.config.excerptWeight,
      tags: this.config.tagWeight,
      body: this.config.bodyWeight
    };

    this.vectorBuilder = new VectorBuilder(this.textProcessor, weights);
    this.vectorSimilarity = new VectorSimilarity();
  }

  /**
   * Initialize the embedding system with a collection of posts
   */
  public initialize(posts: Post[]): void {
    if (!posts || posts.length === 0) {
      this.isInitialized = false;
      return;
    }

    this.posts = [...posts];
    this.postVectors.clear();

    this.vectorBuilder.buildVocabulary(this.posts);

    for (const post of this.posts) {
      if (!post._id) continue;
      this.postVectors.set(post._id, this.vectorBuilder.createPostVector(post));
    }

    this.isInitialized = true;

    if (this.config.debug) {
      console.log(`Initialized embedding system with ${this.posts.length} posts`);
    }
  }

  /**
   * Find similar posts to the given post ID
   */
  public getSimilarPosts(postId: string, count = 3): ScoredPost[] {
    this.ensureInitialized();

    const sourceVector = this.postVectors.get(postId);
    if (!sourceVector) {
      throw new Error(`Post ${postId} not found in embedding system`);
    }

    return this.posts
      .filter(post => post._id !== postId)
      .map(post => ({
        post,
        score: this.vectorSimilarity.calculateCosineSimilarity(
          sourceVector,
          this.postVectors.get(post._id) || {}
        )
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }

  /**
   * Find posts similar to a text query
   */
  public searchSimilarPosts(query: string, count = 3): ScoredPost[] {
    this.ensureInitialized();

    if (!query || query.length > this.config.maxTextLength) {
      return [];
    }

    const queryVector = this.vectorBuilder.createVector(query);

    return this.posts
      .map(post => ({
        post,
        score: this.vectorSimilarity.calculateCosineSimilarity(
          queryVector,
          this.postVectors.get(post._id) || {}
        )
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, count);
  }

  /**
   * Ensure the embedding system is initialized
   */
  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new Error('Embedding system not initialized. Call initialize() first.');
    }
  }
}

// Export a singleton instance with default configuration
const embeddingSystem = new BlogEmbeddingSystem();
embeddingSystem.initialize(allPosts)

export { embeddingSystem };
