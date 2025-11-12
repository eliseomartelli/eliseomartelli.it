---
title: My scanning workflow with the Plustek OpticFilm 8100 and VueScan
date: "2025-11-12 12:54:00"
excerpt: "Oh no, another side quest?"
tags:
  - Photography
  - Misc
---

I’ve recently integrated a new piece of hardware into my film photography
workflow: a Plustek OpticFilm 8100. After watching the second-hand market for a
few weeks, I found a unit on subito.it for €200.

It’s not the best scanner ever, you can find some other scanners from the same
manufacturer with the infrared channel (used for identifying dust on the
negative), but for that price, I think you cannot do any better, and you can
always clean up the dust in post.

The decision to buy a dedicated scanner was driven almost entirely by cost
effectiveness. Locally, film development alone costs €2,50, which is entirely
reasonable. However, development plus scanning jumps to €12 per roll. The €9,50
difference adds up quickly.  Since I plan to shoot at least 20 rolls a year,
and the scanner was a shared purchase with my
[brother](https://martelligioele.it), the scanner pays itself off in about 7
months. It also gives me the flexibility to scan archives and process roll for
friends (looking at you, [nomnp](https://nomnp.com)).

## Software

This scanner comes bundled with SilverFast, but since I’m a macOS user that
likes to keep his setup the most minimal as possible, and I already had VueScan
installed for scanning my Polaroids on a not-so-great all-in-one printer from
Canon, I decided to use it.  
Also, the plus is not having a software rooted in late-90s paradigms. I tend to
prefer tools that are straightforward and configurable, and VueScan INI
configuration files are perfect for saving and backing up.

## Workflow

My core objective is to create a high-quality, archival digital negative while
also getting a usable positive image, all with a single scan operation. To
achieve this, I’ve configured VueScan for a dual-output workflow.

With every scan, the scanner gives me two files: 

- Graded Positive (DNG): Inverted, 16 bit grayscale or 48 bit RGB image.
- Raw Negative (DNG): Archival master, 48-bit DNG, unaltered linear data from
the scanner’s sensor.

## Scan Settings

After some nights of tinkering, I’ve settled on a few key settings for the
optimal balance of quality and efficiency. The core settings are:   

- Resolution: 3600 dpi. The 8100 claims a maximum of [7200
dpi](https://plustek.com/us/products/film-photo-scanners/opticfilm-8100/spec.php),
but this is largely coming from oversampling. The effective optical resolution
is closer to 3600-3900 dpi (observed by
[others](https://tommyraught.medium.com/scanning-35mm-film-with-the-plustek-opticfilm-8100-73efe117a152)).
I’ve settled on 3600 dpi because it provides a good balance of quality and scan
speed. I can always rescan a specific frame at a higher resolution if I truly
need a massive print.
- Bit-depth: 48-bit RGB. This captures the maximum tonal data from the
negative, essential for post processing.
- Multi-Exposure: 2 passes. I’ve enabled 2-pass multi exposure, it doubles the
scan time, but provides a significant reduction in noise, especially in the
shadow areas. VueScan reads the entire scan area multiple times (in your case,
twice) and then averages the data.

To get this dual output, I simply checked both `Output | Raw file` and `Output |
TIFF file` in VueScan and enabled the DNG format for both.

## See it in action

I ran an Instagram Live session yesterday demonstrating this entire process
I’ve archived the video on YouTube for anyone interested in the specific,
in-depth setup.

<YouTube id="egM_okmvIA0" />

This setup achieves the perfect balance for me: it's cost-effective, gives me
full control over the archival process, and provides the flexibility to improve
my conversions in the future without having to rescan my entire archive.

```toml title="vuescan.ini"
[VueScan]
[Input]
Options=2
Source=OpticFilm 8100
[Input-OpticFilm8100-Transparency]
Media=2
AutoMedia=2
PreviewArea=1
BitsPerPixel=5
PreviewResolution=5
ScanResolution=3
NumberOfPasses=2
[Output]
TIFFFileType=4
TIFFCompression=0
TIFFDNGFormat=1
RawDNGFormat=1
[Output-OpticFilm8100-Transparency]
TIFFFile=1
JPEGFile=0
RawFile=1
```
