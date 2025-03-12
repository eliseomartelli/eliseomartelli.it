import { TfIdfVector } from "./types";

export class VectorSimilarity {
  /**
   * Calculate cosine similarity between two TF-IDF vectors
   */
  public calculateCosineSimilarity(
    vectorA: TfIdfVector,
    vectorB: TfIdfVector,
  ): number {
    if (!vectorA || !vectorB) return 0;

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    // Calculate dot product and magnitude of vector A
    for (const [term, valueA] of Object.entries(vectorA)) {
      const valueB = vectorB[term] || 0;
      dotProduct += valueA * valueB;
      magnitudeA += valueA * valueA;
    }

    // Calculate magnitude of vector B (for terms not in A)
    for (const [term, valueB] of Object.entries(vectorB)) {
      if (!(term in vectorA)) {
        magnitudeB += valueB * valueB;
      } else {
        // Terms already in A were calculated above
        magnitudeB += valueB * valueB;
      }
    }

    const magnitude = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);

    // Handle zero vectors
    if (magnitude === 0) return 0;

    return dotProduct / magnitude;
  }
}
