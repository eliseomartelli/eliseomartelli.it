import { TfIdfVector } from "./types";

export class VectorSimilarity {
  /**
   * Calculate cosine similarity between two TF-IDF vectors.
   */
  public calculateCosineSimilarity(
    vectorA: TfIdfVector,
    vectorB: TfIdfVector,
  ): number {
    if (!vectorA || !vectorB) return 0;

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (const term in vectorA) {
      if (Object.prototype.hasOwnProperty.call(vectorA, term)) {
        const valueA = vectorA[term];
        const valueB = vectorB[term] || 0;
        dotProduct += valueA * valueB;
        magnitudeA += valueA * valueA;
      }
    }

    for (const term in vectorB) {
      if (Object.prototype.hasOwnProperty.call(vectorB, term)) {
        const valueB = vectorB[term];
        magnitudeB += valueB * valueB;
      }
    }

    const magnitude = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);

    return magnitude === 0 ? 0 : dotProduct / magnitude;
  }
}
