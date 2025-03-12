---
title: "Building The New Recommendation System"
date: 2025-03-11 15:15
excerpt: Sometimes, a little bit of math is all you need
tags:
  - Misc
---

Creating a personalized recommendation system for a blog doesn't require
massive machine learning models or complex neural networks. With some clever
mathematics, we can build a robust content similarity engine that runs entirely
in the browser (or on the server).

In this article, I'll walk you through the implementation of a lightweight
embedding system that powers the “Writing" section of this blog using TF-IDF
vectorization and cosine similarity.

## The Problem

When readers finish an article, they often want to explore related content.
Manually curating recommendations for each post becomes increasingly difficult
as your content library grows.

I experimented with using an
[LLM](https://www.eliseomartelli.it/blog/13-05-2023-onehundredpercent-more-ai)
in the past, to provide suggested content, but costs and latency was not
reasonable for a personal blog.

Automated solutions based on tags or categories help, but they lack the nuance
of understanding actual content similarity.

## The Roadmap

I corroborated a roadmap of what I needed to do:

- Covert post content into mathematical vector representations
- Weight different parts of the content (title, excerpt, tags, body)
  appropriately
- Calculate similarity scores between posts using vector mathematics

## Representing Text as Numbers

At the heart of this recommendation system is the concept of vector space
models. How do we transform text into something a computer can compare
mathematically?

Before anything else, I need to prepare post’s text by:

1. Converting everything to lowercase;
2. Removing punctuation;
3. Splitting into individual words (tokens);
4. Filtering out common stopwords ("the", "and", "is", etc.);
5. Removing very short terms.

```typescript
const stopwords = Set(["the", "and", "is"]);
const newText = text
  .toLowerCase()
  .replace(/[^\w\s]/g, " ") // Replace punctuation with spaces
  .split(/\s+/) // Split on whitespace
  .filter(
    (term) =>
      term.length >= this.minTermLength && // Remove short terms
      !this.stopWords.has(term),
  ); // Remove stop words
```

This transformation gives us a bag of meaningful words, but we still need to
convert these words into numerical representations.

## Some Words Matter More

TF-IDF (Term Frequency-Inverse Document Frequency) is a mathematical technique
that measures the importance of a word to a document in a collection. It
addresses two key insights:

1. Words that appear frequently in a document are likely important to that
   document (Term Frequency)
2. Words that appear in many documents are likely less distinctive (Inverse
   Document Frequency)

**Term frequency** measures how often a term appears in a document. The simplest
form is just a raw count, but we normalize it by dividing by the total number
of terms to account for different document lengths.

```typescript
const tf = frequency / terms.length;
```

**Inverse Document Frequency** measures how unique or rare a term is across all documents.

```typescript
const idf = Math.log((this.documentCount + 1) / (df + 1)) + 1;
```

### Putting them together

The TF-IDF score is simply the multiplication of these two metrics:

```typescript
vector[term] = tf * idf;
```

This formula gives higher values to terms that appear frequently in a specific
document and appear rarely in other documents.

For example, in this blog, the word “problem” might have a high TF but a low
IDF (it appears everywhere), while “apple” might have a moderate TF but a high
IDF (it appears in fewer documents).

## Not all text is created equal

Since a post's title is typically more representative of its content than an
arbitrary sentence in the body. This system accounts for this by weighting
different parts of the content differently.

This approach boosts the term frequency of words appearing in more important
sections without requiring complex multi-vector representations.

```typescript
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
```

## Measuring Closeness

Once we have our TF-IDF vectors, how do we determine similarity? We use cosine
similarity, which measures the cosine of the angle between two vectors.

```typescript
public calculateCosineSimilarity(vectorA: TfIdfVector, vectorB: TfIdfVector): number {
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
```

Cosine similarity ranges from -1 (completely opposite) to 1 (exactly the same),
with 0 indicating orthogonality (no relationship). In our context with
non-negative TF-IDF values, it ranges from 0 to 1.

This is particularly useful for our use case, since it’s length independent
(because it measures angular similarity and not magnitude, so a short blog post
can be similar to a long one).

The complete embedding system initializes by:

1. Processing all blog posts
2. Building a vocabulary and document frequency counts
3. Creating TF-IDF vectors for each post

Once initialized, it can provide similar posts or search results.  The beauty
of this recommendation system lies in its simplicity. Without recurring to
bigger solutions, we created a system that: 

- Understands the essence of content through numerical representation;
- Identifies similar content with reasonable accuracy;
- Requires minimal computational resources.

Sometimes, a little bit of math is all you need.

You can see the recommendation system in action here below!
