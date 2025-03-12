import { Post } from "content-collections";

export interface ScoredPost {
  post: Post;
  score: number;
}

export interface EmbeddingSystemConfig {
  /** Maximum text length to process  */
  maxTextLength?: number;
  /** Maximum number of terms to consider per document */
  maxTermsPerDocument?: number;
  /** Term weighting for post title  */
  titleWeight?: number;
  /** Term weighting for post excerpt */
  excerptWeight?: number;
  /** Term weighting for post tags */
  tagWeight?: number;
  /** Term weighting for post body */
  bodyWeight?: number;
  /** Minimum term length to consider */
  minTermLength?: number;
  /** Enable debug logging */
  debug?: boolean;
}

export interface TermFrequencyMap {
  [term: string]: number;
}

export interface TfIdfVector {
  [term: string]: number;
}
