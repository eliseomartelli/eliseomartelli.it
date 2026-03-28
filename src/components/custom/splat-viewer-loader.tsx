"use client";

import dynamic from "next/dynamic";

const SplatViewer = dynamic(() => import("./splat-viewer"), { ssr: false });

export default function SplatViewerLoader() {
  return <SplatViewer />;
}
