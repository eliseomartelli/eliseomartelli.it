"use client";

import { useEffect, useRef } from "react";

const W = 330;
const H = 330;
const FOCAL = 850;
const CAM_Z = -0.9;
const BG32 = 0xfff0f0f0; // off white in little-endian RGBA
const MAX_ANGLE = (Math.PI / 90) * 1.5;
const LERP = 0.08;
const SORT_THRESHOLD = 0.001;
const RENDER_THRESHOLD = 1e-5;

function parseSplats(buf: ArrayBuffer) {
  const v = new DataView(buf);
  let o = 0;
  const count = v.getUint32((o += 0), true);
  o += 4;
  const minX = v.getFloat32(o, true);
  o += 4;
  const minY = v.getFloat32(o, true);
  o += 4;
  const minZ = v.getFloat32(o, true);
  o += 4;
  const maxX = v.getFloat32(o, true);
  o += 4;
  const maxY = v.getFloat32(o, true);
  o += 4;
  const maxZ = v.getFloat32(o, true);
  o += 4;

  const x = new Float32Array(count);
  const y = new Float32Array(count);
  const z = new Float32Array(count);
  const alpha = new Uint8Array(count);
  const bright = new Uint8Array(count);
  const alphaF = new Float32Array(count);

  const rx = maxX - minX,
    ry = maxY - minY,
    rz = maxZ - minZ;
  for (let i = 0; i < count; i++) {
    x[i] = minX + (v.getUint16(o, true) / 65535) * rx;
    o += 2;
    y[i] = minY + (v.getUint16(o, true) / 65535) * ry;
    o += 2;
    z[i] = minZ + (v.getUint16(o, true) / 65535) * rz;
    o += 2;
    alpha[i] = v.getUint8(o++);
    bright[i] = v.getUint8(o++);
    alphaF[i] = alpha[i] / 255;
  }
  return { count, x, y, z, alpha, bright, alphaF };
}

type Splats = ReturnType<typeof parseSplats>;

export default function SplatViewer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!ctx) return;

    let targetY = 0;
    let targetX = 0;
    let curY = 0;
    let curX = 0;
    let lastSortY = NaN;
    let lastSortX = NaN;
    let lastRenderY = NaN;
    let lastRenderX = NaN;

    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    function onMouseMove(e: MouseEvent) {
      targetY = -(e.clientX / window.innerWidth - 0.5) * 2 * MAX_ANGLE;
      targetX = (e.clientY / window.innerHeight - 0.5) * 2 * MAX_ANGLE;
    }

    if (!isTouch) {
      window.addEventListener("mousemove", onMouseMove);
    }

    let rafId = 0;
    let paused = false;
    let splats: Splats | null = null;
    let sortIdx: Int32Array | null = null;
    let depths: Float32Array | null = null;

    const img = ctx.createImageData(W, H);
    const pix32 = new Uint32Array(img.data.buffer);

    const PT = 3;

    function render() {
      if (!splats || !sortIdx || !depths) return;
      const { count, x, y, z, alpha, bright, alphaF } = splats;

      const cosY = Math.cos(curY),
        sinY = Math.sin(curY);
      const cosX = Math.cos(curX),
        sinX = Math.sin(curX);

      const needSort =
        Math.abs(curY - lastSortY) > SORT_THRESHOLD ||
        Math.abs(curX - lastSortX) > SORT_THRESHOLD;

      if (needSort) {
        for (let i = 0; i < count; i++) {
          const rz = -x[i] * sinY + z[i] * cosY;
          depths[i] = y[i] * sinX + rz * cosX;
        }
        sortIdx.sort((p, q) => depths![q] - depths![p]);
        lastSortY = curY;
        lastSortX = curX;
      }

      pix32.fill(BG32);

      for (let ii = 0; ii < count; ii++) {
        const i = sortIdx[ii];
        const a = alpha[i];
        if (a < 4) continue;

        const xi = x[i],
          yi = y[i],
          zi = z[i];
        const rx = xi * cosY + zi * sinY;
        const rz = -xi * sinY + zi * cosY;
        const ry2 = yi * cosX - rz * sinX;
        const rz2 = yi * sinX + rz * cosX;

        const d = rz2 - CAM_Z;
        if (d < 0.01) continue;

        const sx = (W * 0.5 + (FOCAL * rx) / d + 0.5) | 0;
        const sy = (H * 0.5 + (FOCAL * ry2) / d + 0.5) | 0;

        const af = alphaF[i];
        const br = bright[i];
        const oma = 1 - af;

        if (sx >= 0 && sx + PT <= W && sy >= 0 && sy + PT <= H) {
          // Fast path: all 9 pixels guaranteed in bounds, skip per-pixel checks
          for (let dy = 0; dy < PT; dy++) {
            const row = (sy + dy) * W + sx;
            for (let dx = 0; dx < PT; dx++) {
              const pidx = row + dx;
              const v = ((pix32[pidx] & 0xff) * oma + br * af + 0.5) | 0;
              pix32[pidx] = (0xff000000 | (v << 16) | (v << 8) | v) >>> 0;
            }
          }
        } else {
          for (let dy = 0; dy < PT; dy++) {
            const py = sy + dy;
            if (py < 0 || py >= H) continue;
            for (let dx = 0; dx < PT; dx++) {
              const px = sx + dx;
              if (px < 0 || px >= W) continue;
              const pidx = py * W + px;
              const v = ((pix32[pidx] & 0xff) * oma + br * af + 0.5) | 0;
              pix32[pidx] = (0xff000000 | (v << 16) | (v << 8) | v) >>> 0;
            }
          }
        }
      }

      ctx.putImageData(img, 0, 0);
      lastRenderY = curY;
      lastRenderX = curX;
    }

    function frame(ts: number) {
      rafId = requestAnimationFrame(frame);
      if (paused) return;

      if (isTouch) {
        targetY = MAX_ANGLE * Math.sin(ts * 0.0004);
        targetX = MAX_ANGLE * 0.4 * Math.sin(ts * 0.00027);
      }

      // lerp toward target
      curY += (targetY - curY) * LERP;
      curX += (targetX - curX) * LERP;

      if (
        Math.abs(curY - lastRenderY) < RENDER_THRESHOLD &&
        Math.abs(curX - lastRenderX) < RENDER_THRESHOLD
      )
        return;

      render();
    }

    const observer = new IntersectionObserver(([e]) => {
      paused = !e.isIntersecting;
    });
    observer.observe(canvas);

    pix32.fill(BG32);
    ctx.putImageData(img, 0, 0);

    fetch("/portrait.bin")
      .then((r) => r.arrayBuffer())
      .then((buf) => {
        splats = parseSplats(buf);
        sortIdx = new Int32Array(splats.count);
        for (let i = 0; i < splats.count; i++) sortIdx[i] = i;
        depths = new Float32Array(splats.count);
        rafId = requestAnimationFrame(frame);
      });

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      if (!isTouch) window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div className="max-w-full aspect-square rounded-full overflow-hidden">
      <canvas ref={canvasRef} width={W} height={H} className="w-full h-full" />
    </div>
  );
}
