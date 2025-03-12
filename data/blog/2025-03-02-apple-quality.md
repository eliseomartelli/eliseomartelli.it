---
title: "Apple's Software Quality Crisis: When Premium Hardware Meets Subpar Software"
date: 2025-03-02 19:15
excerpt: Tim, I think we are not cooking
tags:
  - Apple
---

## Update: March 5, 2025

I wrote a [small application](https://github.com/eliseomartelli/Thermals) that outputs
[`ProcessInfo.ThermalState`](https://developer.apple.com/documentation/foundation/processinfo/thermalstate).
The reported Thermal State is `nominal` when the iPad is not heating, `fair`
when the iPad started to heat and `serious` when the iPad was hurting to touch.
I defintely had the iPad heating more than `serious` on other occurrences.

---

## Update: March 4, 2025

The response to this post has been overwhelming, with sharing on
[Hacker News](https://news.ycombinator.com/item?id=43243075) and
[Reddit](https://www.reddit.com/r/MacOS/comments/1j2j7b4/apples_software_quality_crisis_when_premium/).
It's clear that many others are experiencing frustrations with Apple's
software, indicating quality issue within Apple's OSes portfolio.

To provide more context, here's the workflow that triggers these issues:
I create a new note at the start of each lecture, add a title and tags
for organization, and begin writing with my Apple Pencil Pro.  
The issues manifest after filling roughly one page (or "screen")
with handwritten notes. The iPad here starts to overheat, and lag spikes become
increasingly frequent.

---

As a long-time Apple user, I've always appreciated the integration of
hardware and software, signature of the Apple ecosystem. However, recent
experiences with my iPad Air 11" M2 has left me questioning whether
Apple has lost sight of what once made their products great.

## A Brief Timeline

- **November 6, 2024**: Visited the Apple Store in Turin with my then new iPad
  Air 11" M2 experiencing significant lag and overheating when using Notes and
  Freeform with Apple Pencil Pro.
- **November 13, 2024**: Received a replacement unit after store
  representatives suggested a hardware swap.
- **February 27, 2025**: The replacement unit is now having identical
  performance issues.

## Premium Hardware, Struggling Software

In November, I visited the Apple Store in Turin to address persistent issues
with my iPad Air 11" M2 running iPadOS 18.1. Despite having cutting-edge
hardware, I've been experiencing significant lag when using _basic_ Apple
applications like Notes and Freeform.

The performance issues don't stop at sluggish response times. During these
use cases, my iPad overheated, making it uncomfortable to
hold or even rest the palm on, raising concerns about potential long-term
hardware damage.

What made this particularly frustrating is that these aren't third-party
applications pushing the hardware to its limits. These are Apple's own
applications that should be _theoretically_ optimized for their hardware.

After demonstrating the issues in person to Apple Store staff (that were
courteous and professional), the support representative that was handling my
case suggested a hardware replacement.  
However, after further discussion, we
both concluded this was likely a software problem rather than a
hardware defect.

I think this highlights a growing challenge for Apple's support model:
how do you troubleshoot software issues when the traditional solution has been
to replace hardware?

I think this experience feels symptomatic of a broader decline in Apple's
software quality.

My replacement iPad Air 11" M2 with the Apple Pencil Pro is once again
struggling with the same basic tasks. Despite multiple iPadOS updates since my
original complaint (we're now on 18.3.1), the fundamental issues remain:

- **Significant lag when using Apple's own Notes and Freeform applications**:
  Input latency increases dramatically after about 5-10 minutes of use, with
  stroke rendering delayed by up to 5 seconds;
- **Device overheating during standard usage scenarios**: CPU temperatures
  reach concerning levels (based on device's external heat) during pencil
  input;
- **Poor responsiveness with the Apple Pencil Pro**: Palm rejection fails
  intermittently, and pressure and roll sensitivity becomes inconsistent.

This recurrence with a replacement device (and other friend's iPads) confirms
what I and the support representative suspected last November - this is a
software optimization problem, not a hardware defect.

## Details Worth Noting

Since my original complaint, I've discovered
[numerous](https://www.reddit.com/r/iPadOS/search/?q=overheating) forum threads
and social media discussions from iPad users experiencing similar issues. This
suggests a systemic problem rather than isolated incidents.

I think these are sympthoms of two main problems:

- **Thermal Management Issues**: The SoC should throttle performance
  before reaching high external temperatures;
- **Memory Management Problems**: The gradual degradation in performance makes
  me think of memory leaks or improper garbage collection in Apple's Note and
  Freeform applications.

Most concerning is that multiple software updates have failed to address these
performance issues while introducing new features that add more strain to the
system (like Apple Intelligence, but that's a story for another day).

## Reconsidering the "Apple Tax"

For years, many of us have willingly paid the "Apple tax", the premium price
for Apple products justified by superior user experience, design, and ecosystem
integration. But if software quality continues to decline, this value
proposition becomes increasingly difficult to defend.

The persistence of these issues through multiple software updates suggests:

1. **Feature prioritization over optimization**: Engineering resources appear
   focused on adding new capabilities rather than fixing existing performance
   problems;
2. **Inadequate performance testing**: Real-world usage scenarios with Apple's
   own applications aren't being adequately tested.

As customers paying premium prices for Apple products, we at least deserve:

1. **Transparency**: Acknowledgment of known performance issues;
2. **Focus on fundamentals**: Updates focused on performance and stability;
3. **Extended support**: Consideration for extended warranties when software
   issues impact hardware lifespan.

The Apple experience was once defined by the words "it just works".  
Today, that promise feels hollow as software struggles to keep pace with
hardware capabilities. As users and customers, we need to vocally advocate for
the quality-focused Apple we once knew.

After months of hoping for improvement, I'm faced with difficult decisions
about my future in the Apple ecosystem. This issue, along with several others,
albeit smaller, ones, has severely damaged my confidence in new Apple products.

Apple should return to its roots - creating products that prioritize user
experience over feature _creep_. Apple needs to reclaim that ethos.
