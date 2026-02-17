---
title: "A Braun clock for a $30 handheld"
date: "2026-02-17 14:45:00"
excerpt: "Homaging a Dieter Rams masterpiece on a $30 handheld."
tags:
  - Programming
---

A week ago, [Francesco](https://nomnp.com) and I bought a couple of R36S
handhelds. Or at least, that's what the listing said.

What we got was the `Y3506_V05_20251215` revision. It's a clone of a clone. If
you've played with these cheap Chinese SBCs before, you know the
drill: you flash a standard image, and the screen stays black because the
driver is slightly different. It's a hardware lottery.

In our case, we had to use DTB files from this
[repo](https://github.com/AeolusUX/R36S-DTB/tree/main/R36S/Panel%205), and we
used the `ArkOS` image from [here](https://github.com/AeolusUX/ArkOS-R3XS).

But once the firmware is sorted, the hardware is surprisingly charming. The
transparent shell is pure 90s nostalgia, and the screen is actually good for
the price.

I didn't want it just for emulating Game Boy and PlayStation games, though. I
wanted it to be useful on my desk.

Every time I work from Francesco's place, I'm distracted by his Braun BC03
clock. It's a Dieter Rams masterpiece. It follows the "Less, but better"
philosophy that modern tech seems to have forgotten. It does one thing, and it
does it with absolute clarity.

So, I wrote [bc03](https://github.com/eliseomartelli/bc03).

When I started building this, the obvious path was to use PNGs for the face and
the hands. But that felt like cheating. A Braun-inspired tool should be
defined by its geometry, not by a bitmap.

The "cool" part of the code is that there isn't a single image file in the
repository. Everything is drawn directly via `SDL_RenderGeometry`. This
allows for drawing arbitrary shapes on the GPU by defining vertices, which is
much cleaner than using `SDL_RenderCopyEx` with pre-rendered textures.

The core of the rendering is the `draw_rotated_rect` function. It takes a
center point, dimensions, and an angle, then calculates the rotation matrix to
position the vertices.

```c
void draw_rotated_rect(SDL_Renderer *renderer, int cx, int cy, float length,
                       float width, float angle, int offset_back) {
  float half_w = width / 2.0f;

  // Define corners relative to the rotation point
  Pointf corners[4] = {
    {-half_w, (float)offset_back},
    {half_w, (float)offset_back},
    {half_w, -length},
    {-half_w, -length}
  };

  SDL_Vertex vertices[4];
  // ... apply rotation and draw
  SDL_RenderGeometry(renderer, NULL, vertices, 4, indices, 6);
}
```

The `offset_back` parameter is the secret sauce. If you look at a real BC03,
the second hand doesn't start from the center; it has a small counterweight
that extends backwards. By adding a 30px offset, I captured that specific
analog feel.

## Fractional Movement

Most digital clocks just jump every second. It looks "digital" and cheap. Real
analog movements have gears. To mimic this, I didn't just use
`timeinfo->tm_sec`. I calculate the angles using the fractional parts of the
time:

```c
float sec = timeinfo->tm_sec;
float min = timeinfo->tm_min + (sec / 60.0f);
float hr = timeinfo->tm_hour + (min / 60.0f);
```

This means the hour hand moves gradually as the minutes pass, and the minute
hand moves as the seconds pass.

The project has four themes (Stealth, Classic, Contrast, and Nightstand), all
keeping the iconic yellow second hand.
