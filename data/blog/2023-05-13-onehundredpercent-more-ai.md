---
title: Featured posts with 100% more AI
date: 2023-05-13 21:30
excerpt: AI critic uses AI to suggest posts to users
tags:
  - AI
  - Misc
  - Short
---

I'll admit it: having static "Featured Posts" for my blog articles was boring.
We left the 2010s for a while. All the young kids are now talking about LLMs, GPTs, world destruction, and strange fingers on AI-generated images that I couldn't help but feel missing out.

So I did the dumbest thing ever: I added AI-suggested featured posts for a site that has, at the moment, 17 articles.

```bash
~/personalsite $ ls data/blog | wc -l
17
```

The first idea I got was to implement a scoring system that took account of the potential interests of the people looking at this site. I then intended to embed that score in each post metadata. Generating the Featured posts section was then easily achieved by ordering posts by that score and picking the top three entries.

```
You're given the text from an article geared toward an audience that is
techy, and generally has interests in computer science, electronics,
music, photography, art, and productivity.

You will calculate an interest score based on the intended audience.

The interest score is a numeric value with one decimal position after
the dot.
The range of the interest score is between 0 and 1.
The response format is JSON and will look like this.

{ "interest": "<interest>", "explaination": "<explaination>" }

What's the response to the text below? Respond only with the specified
format. Don't add anything more.

{text}
```

This prompt kind of worked. The main problem was that it did not solve the first requirement: suggesting more posts for users.

It was a clear example of "blind prompting"; for the effect of witchcraft, it worked reasonably well.

My next idea was to instruct GPT to pick three articles based purely on a (descriptive) filename.

```
Given this list of filenames:
{filenames}
pick three files you think are most important based on this {file}
```

How naïve of me. LLMs don't think. GPT-3.5 started spitting filenames left and right, often not even matching the provided list, prefixing everything with an explanation of why it couldn't do it (ironic, I know).

> As an AI language model, I cannot make subjective decisions based on importance as it is relative to individual preferences and interests. However, I can provide suggestions based on the popularity of the articles on the internet.

I then stumbled upon Mitchell Hashimoto's ["Prompt Engineering vs. Blind Prompting"](https://mitchellh.com/writing/prompt-engineering-vs-blind-prompting) and ["Prompt Engineering"](https://lilianweng.github.io/posts/2023-03-15-prompt-engineering/) by Lilian Weng.

These two posts gave me some pointers on how to improve my prompt. The second-last iteration of the prompt was:

```
You are an editor for a site assigned to pick 3 articles from the possible filenames given a filename. The site treats arguments spanning music, photography, technology, software development, and life.

Output only plain text. No explanation. One filename per line. Don't change the filename.

The list of possible filenames is this:
{filenames}
Pick files based on this one: {file}
```

And it _kind of_ worked until it didn't. During some requests, it added text surrounding the filenames (even after stating that it shouldn't have done that).

The last iteration includes a level of imperative I wouldn't use during usual conversations, but it is highly effective when interfacing with LLMs.

```
Pick 3 filenames from the possible filenames.

The files are about topics spanning music,
photography,
technology,
software development,
and life.

RULES:
- OUTPUT plain text ONLY.
- OUTPUT exact filename ONLY.
- OUTPUT one filename per line.
- MUST NOT include explanations.
- MUST NOT include current filename.
- MUST NOT include any other text.

Possible filenames:
{filenames}

Current filename: {file}
```

Oh, and all caps, lots of all caps.

It started to work wonders!

I then created a Python script to proxy requests to GPT-3.5 (I want to use this proxy for other projects as well), packaged it all up, and deployed it on [fly.io](https://fly.io). I'm using `aiohttp` and OpenAI's Python library.

I call this proxy from a Next.JS API route that doesn't do much other than some output filtering.

And now, I'll leave you to enjoy this AI feature. I'll add the obligatory "AI Prompt Engineer" to my resume soon™️.
