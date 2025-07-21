---
title: LensRenamer
date: "2025-07-21 15:09:00"
excerpt: "First world problems, solved."
tags:
  - Misc
---

Anecdote time. I recently bought a Leica, and suddenly my perfectly organized
photo library became a guessing game. Why? Because manual and vintage lenses
don’t talk to the camera, so EXIF is incomplete—or just plain missing. Which
Summicron? Was that the Brightin Star or the Zeiss? What focal length?

So, I built **LensRenamer**.

LensRenamer is a macOS app that batch-writes lens metadata—make, model, serial,
focal length—directly into your image files. If you use manual or adapted
glass, especially on a Leica, you know why this matters. Your cataloging tools
depend on that EXIF, and missing data can turn a simple search into a rabbit
hole.

## Features

- Drop your images, select your lens, and go.
- Build your own collection of lens profiles, ready to stamp onto any batch.
- No extra installs. No Terminal dance.

## Requirements

- macOS (Intel or Apple Silicon)
- Nothing else—ExifTool is bundled

## Get It

- Download: [Latest
Release](https://github.com/eliseomartelli/LensRenamer/releases)
