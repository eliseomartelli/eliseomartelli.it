"use client";

import { X, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

interface LightboxProps {
  src: string;
  alt: string;
  onClose: () => void;
}

export const Lightbox = ({ src, alt, onClose }: LightboxProps) => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const dragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const panStart = useRef({ x: 0, y: 0 });
  const pinchStartDistance = useRef<number | null>(null);
  const pinchStartZoom = useRef(1);
  const panRef = useRef(pan);
  const zoomRef = useRef(zoom);
  const overlayRef = useRef<HTMLDivElement>(null);

  panRef.current = pan;
  zoomRef.current = zoom;

  const clampZoom = (val: number) => Math.min(4, Math.max(0.5, val));

  const getTouchDistance = (t1: Touch, t2: Touch) => {
    const dx = t1.clientX - t2.clientX;
    const dy = t1.clientY - t2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      setZoom((z) => clampZoom(z - e.deltaY * 0.001));
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        dragging.current = true;
        dragStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        panStart.current = panRef.current;
        pinchStartDistance.current = null;
      } else if (e.touches.length === 2) {
        dragging.current = false;
        pinchStartDistance.current = getTouchDistance(e.touches[0], e.touches[1]);
        pinchStartZoom.current = zoomRef.current;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (e.touches.length === 1 && dragging.current) {
        setPan({
          x: panStart.current.x + (e.touches[0].clientX - dragStart.current.x),
          y: panStart.current.y + (e.touches[0].clientY - dragStart.current.y),
        });
      } else if (e.touches.length === 2 && pinchStartDistance.current !== null) {
        const newDist = getTouchDistance(e.touches[0], e.touches[1]);
        setZoom(clampZoom(pinchStartZoom.current * (newDist / pinchStartDistance.current)));
      }
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (e.touches.length === 0 && e.changedTouches.length > 0) {
        const dx = Math.abs(e.changedTouches[0].clientX - dragStart.current.x);
        const dy = Math.abs(e.changedTouches[0].clientY - dragStart.current.y);
        if (dragging.current && dx < 8 && dy < 8 && e.target === overlayRef.current) {
          onClose();
        }
        dragging.current = false;
        pinchStartDistance.current = null;
      }
    };

    el.addEventListener("touchstart", onTouchStart, { passive: false });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: false });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [onClose]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    dragging.current = true;
    dragStart.current = { x: e.clientX, y: e.clientY };
    panStart.current = pan;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging.current) return;
    setPan({
      x: panStart.current.x + (e.clientX - dragStart.current.x),
      y: panStart.current.y + (e.clientY - dragStart.current.y),
    });
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    dragging.current = false;

    const dx = Math.abs(e.clientX - dragStart.current.x);
    const dy = Math.abs(e.clientY - dragStart.current.y);
    if (dx < 4 && dy < 4 && e.target === overlayRef.current) {
      onClose();
    }
  };

  const overlay = (
    <div
      ref={overlayRef}
      className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center overflow-hidden"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        dragging.current = false;
      }}
      style={{ cursor: dragging.current ? "grabbing" : "grab" }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        draggable={false}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          userSelect: "none",
        }}
        className="max-w-full max-h-full object-contain pointer-events-none"
      />
      <button
        className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-1 hover:bg-black/80"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={24} />
      </button>
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button
          className="text-white bg-black/50 rounded-full p-1 hover:bg-black/80"
          onClick={(e) => {
            e.stopPropagation();
            setZoom((z) => clampZoom(z + 0.25));
          }}
          aria-label="Zoom in"
        >
          <ZoomIn size={24} />
        </button>
        <button
          className="text-white bg-black/50 rounded-full p-1 hover:bg-black/80"
          onClick={(e) => {
            e.stopPropagation();
            setZoom((z) => clampZoom(z - 0.25));
          }}
          aria-label="Zoom out"
        >
          <ZoomOut size={24} />
        </button>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
};

interface ClickableImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ClickableImage = ({
  src,
  alt,
  className,
}: ClickableImageProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className={`cursor-zoom-in ${className ?? ""}`}
        onClick={() => setOpen(true)}
      />
      {open && <Lightbox src={src} alt={alt} onClose={() => setOpen(false)} />}
    </>
  );
};
