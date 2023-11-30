"use client";

import { Photos } from "@/.contentlayer/generated";
import { MDXComponent } from "@/components/MDX";
import { useEffect, useRef } from "react";

export function useHorizontalScroll<T extends HTMLElement>() {
  const elRef = useRef<T>(null);
  useEffect(() => {
    const el = elRef.current;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY == 0) return;
        if (Math.abs(el.scrollLeft) !== el.scrollWidth - el.clientWidth) {
          e.preventDefault();
        }
        el.scrollTo({
          left: el.scrollLeft + e.deltaY,
          behavior: "auto",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}

export const PhotoSection = ({ photoGallery }: { photoGallery: Photos }) => {
  const horizontalRef = useHorizontalScroll<HTMLDivElement>();
  return (
    <div
      className="bg-white w-screen md:h-[calc(100vh-4rem)] md:overflow-x-scroll flex md:flex-row flex-col -mt-16 gap-4 p-4 cursor-zoom-in"
      ref={horizontalRef}
      onClick={(e) => {
        if (document.fullscreenElement) {
          document.exitFullscreen();
        } else {
          e.currentTarget.requestFullscreen();
        }
      }}
    >
      <MDXComponent code={photoGallery.body.code} />
    </div>
  );
};
