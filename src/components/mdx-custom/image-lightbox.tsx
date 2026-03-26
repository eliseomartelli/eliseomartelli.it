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
  const overlayRef = useRef<HTMLDivElement>(null);

  const clampZoom = (val: number) => Math.min(4, Math.max(0.5, val));

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
