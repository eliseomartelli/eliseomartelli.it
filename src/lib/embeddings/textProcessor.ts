import { stopwords } from "./stopwords";

export class TextProcessor {
  private readonly stopWords = new Set(stopwords);
  private readonly minTermLength: number;
  private readonly maxTextLength: number;
  private readonly maxTermsPerDocument: number;

  constructor(
    minTermLength = 2,
    maxTextLength = 100000,
    maxTermsPerDocument = 5000,
  ) {
    this.minTermLength = minTermLength;
    this.maxTextLength = maxTextLength;
    this.maxTermsPerDocument = maxTermsPerDocument;
  }

  /**
   * Extract and normalize terms from text
   */
  public extractTerms(text: string): string[] {
    if (!text) return [];

    // Safety limit for text size
    const limitedText = text.slice(0, this.maxTextLength);

    return limitedText
      .toLowerCase()
      .replace(/[^\w\s]/g, " ") // Replace punctuation with spaces
      .split(/\s+/) // Split on whitespace
      .filter(
        (term) =>
          term.length >= this.minTermLength && // Remove short terms
          !this.stopWords.has(term), // Remove stop words
      )
      .slice(0, this.maxTermsPerDocument); // Limit number of terms
  }

  /**
   * Get unique terms from a text
   */
  public getUniqueTerms(text: string): Set<string> {
    return new Set(this.extractTerms(text));
  }
}
