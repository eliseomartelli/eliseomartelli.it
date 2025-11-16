---
title: Tagging film scans
date: "2025-11-16 12:38:00"
excerpt: "Adding proper metadata to scanned photos using ExifTool"
tags:
  - Short
  - Photography
---

If you shoot film, and later you scan it, especially into formats like DNG, you
end up with a file that is poor in metadata. Your scanner software (like
VueScan) knows about the scanner [perhaps a Plustek
8100](/blog/2025-11-12-scanning-workflow) and the scan settings, but it has no
idea what camera or lens took the original photo.  
This leaves a gap in your digital library.

To fix this, I use [ExifTool](https://exiftool.org/) to add the relevant EXIF
tags to the scanned files.

Here is a single command I use to batch-process a directory of DNGs to embed
all the correct metadata for a specific camera and lens combination.

```bash
exiftool -overwrite_original -r -ext dng \
-Make="Leica Camera AG" \
-Model="LEICA M6" \
-SerialNumber="<camera serial number>" \
-LensMake="Leica Camera AG" \
-LensModel="Summicron-M 1:2/35 ASPH." \
-LensID="Summicron-M 1:2/35 ASPH." -LensInfo="35mm f/2" \
-FocalLength="35.0 mm" \
-Artist="GIOELE MARTELLI" \
-ProfileName="LEICA M6" \
.
```

`-overwrite_original` is an important flag. By default, ExifTool creates a
backup copy of your original file (e.g., `file.dng_original`) before writing
changes. This flag prevents that, modifying the file in-place.  
This is a destructive action. I recommend running the command on *copies* of
your files first until you are confident in the results.

The above command is a "master template". I keep a
separate script with variations of this command for my other common
combinations.

It's a simple, one-time step per batch of scans that makes my digital archive
infinitely more organized and searchable.
