---
title: "A Gaussian Splat Portrait on the Homepage"
date: "2026-03-28 12:00:00"
excerpt: "Rendering a 3D portrait from a single photo using Gaussian Splatting, Canvas 2D, and zero dependencies."
tags:
  - Programming
---

I recently watched a video by Tsoding where he rendered a full 3D scene using
just a plain canvas 2D element, without any WebGL or Three.js.

The core of the video was a simple formula to calculate the position of each
pixel:

```
given (x, y, z)

x' = y / z
y' = x / z
```

It tickled the part of my brain that loves graphics and it was enough to make
me want to try the same thing on my homepage portrait. I wanted to create a 3D
portrait that could be rotated and viewed from different angles, all using just
Canvas 2D and some math.

<YouTube id="qjWkNZ0SXfo" />

Some months ago, I was playing around with Apple's
[ml-sharp](https://github.com/apple/ml-sharp), which can
reconstruct a 3D point cloud from a single photo. 

At that time, I didn't have a use for it, but it seemed like the perfect tool
for this project.

This technique is called Gaussian Splatting.
It uses millions of semi-transparent 3D blobs, each with a position, opacity,
color, scale, and rotation. Render them back-to-front and you get surprisingly
good results, especially on faces.

One photo in. One `.ply` file out.

I ran ml-sharp on a portrait of me and got a `.ply` file with ~689,000
gaussians. Most of them were background noise. I loaded it into
[superspl.at/editor](https://superspl.at/editor) and cropped everything that
wasn't my face.

Still way too many points. And the raw `.ply` format is huge. None of that is
useful for a grayscale web viewer.

689k gaussians at 60+ bytes each isn't something you ship over the wire. I
wrote a Python script to cut it down.

The core idea: not all gaussians matter equally. A tiny opaque one is a sharp
detail — an eye, a lip edge. A huge transparent one is blurry fill. Score by
`opacity / volume`, importance-sample down to 15k, and you keep what the eye
actually sees:

```python
volume = np.exp(s0 + s1 + s2)
importance = opacity / (volume + 1e-8)
importance /= importance.sum()
idx = rng.choice(len(x), size=min(N, len(x)), replace=False, p=importance)
```

Then quantize positions to `uint16` and pull grayscale brightness from the DC
term of the spherical harmonics. Pack it all into a tight binary struct:

```python
def quant(a):
    lo, hi = a.min(), a.max()
    return lo, hi, np.round((a - lo) / (hi - lo) * 65535).astype(np.uint16)

dt = np.dtype([("x", "<u2"), ("y", "<u2"), ("z", "<u2"), ("a", "u1"), ("b", "u1")])
```

Five fields per point, no JSON, no headers.


To view it, I wrote a single TypeScript component, no dependencies. Each frame
it rotates the points around Y then X, depth-sorts them furthest-first, draws
each one as a 3×3 square into an `ImageData` buffer with alpha blending, and
flushes with `putImageData`.

The projection is just perspective division:

```typescript
const rx  =  x[i] * cosY + z[i] * sinY;
const rz  = -x[i] * sinY + z[i] * cosY;
const ry2 =  y[i] * cosX - rz * sinX;
const rz2 =  y[i] * sinX + rz * cosX;
const d   = rz2 - CAM_Z;
const sx  = (W * 0.5 + (FOCAL * rx)  / d + 0.5) | 0;
const sy  = (H * 0.5 + (FOCAL * ry2) / d + 0.5) | 0;
```

Mouse gives ±4° rotation. Touch drives a sinusoidal pan that coasts a little
after you lift your finger. An `IntersectionObserver` kills the animation loop
when the element isn't on screen. The circular crop is `rounded-full
overflow-hidden` on the wrapper.

15,000 points is genuinely not that many. I expected it to look sparse. It
doesn't, the face reads clearly, rotation gives real depth, and it moves in a
way a flat photo can't. Surprised at how well it held up.
