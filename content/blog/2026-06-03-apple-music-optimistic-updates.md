---
title: "Apple's lesson in how NOT to do optimistic updates"
date: "2026-06-03 10:20:00"
excerpt: "The favorite button in Apple Music on macOS feels broken af."
tags:
  - Apple
description: "The favorite button in Apple Music on macOS feels broken af."
---

You're listening to a song you love and want to save it. You click the favorite
star and... nothing.

You wonder if you missed the button. Did the app freeze? You're about to click
again when, SECONDS later, the star finally turns red.

This is the current state of Apple Music (Version 1.6.5.10) on macOS 26.5.1.

Most apps use "optimistic updates." When you like a post or star a song, the UI
changes immediately. The app assumes the server request will work. If it fails,
the UI just reverts later.

This makes everything feel fast. You shouldn't have to wait for a server
response just to see a star change color.

Apple Music does the opposite. It waits for the server to confirm the change
before updating the UI.

In this video, you can see the lag. I click the star, and it stays empty for
five seconds before finally filling in.

<video controls allowFullScreen src="/posts/2026-06-03-apple-music-optimistic-updates/video.mp4" class="w-full rounded-lg shadow-lg" />

It's not just slow; it's confusing. When the UI doesn't react instantly, you
lose confidence in the app. You end up double-checking your own actions.

It bums me out. I've bought so many Apple products and services over the years,
most recently the AirPods Max 2, and it's discouraging to see such a clunky
experience in a core app. For a company that markets "fluidity," this is a
basic failure.

It's another sign of [declining software quality](/blog/2025-03-02-apple-quality/).
If a tiny startup can make a button feel instant, Apple can too.

Tim, we're still not cooking.

### The Song in Question

<iframe
  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
  allowFullScreen
  height="150"
  class="w-full max-w-2xl overflow-hidden bg-transparent"
  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
  src="https://embed.music.apple.com/it/album/%C3%BAltima-noche/1836306069?i=1836306073"
></iframe>
