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
   * Extracts and normalizes terms from text.
   */
  public extractTerms(text: string): string[] {
    if (!text) {
      return [];
    }

    const normalizedText = text
      .slice(0, this.maxTextLength)
      .toLowerCase()
      .replace(/[^\w\s]/g, " ")
      .split(/\s+/);

    return normalizedText
      .filter(
        (term) =>
          term.length >= this.minTermLength && !this.stopWords.has(term),
      )
      .slice(0, this.maxTermsPerDocument);
  }

  /**
   * Gets unique terms from a text.
   */
  public getUniqueTerms(text: string): Set<string> {
    return new Set(this.extractTerms(text));
  }
}
