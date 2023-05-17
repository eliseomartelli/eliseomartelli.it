import { Card } from "@/components/Card";
import WidthLimit from "@/components/WidthLimit";
import React from "react";
import * as typography from "@/components/Typography";

const WallpapersLoading = () => (
  <>
    <WidthLimit className="flex flex-col gap-4">
      <typography.h1>Wallpapers</typography.h1>
    </WidthLimit>
    <div className="grid grid-cols-3 gap-4">
      {new Array(6).fill(true).map((_, i) => (
        <Card className="!p-0 overflow-hidden" key={i}>
          <div className="relative w-full aspect-square bg-gray-600 animate-pulse"></div>
          <div className="p-4">
            <h2 className="h-8 w-1/2 bg-gray-600 animate-pulse"></h2>
            <p className="h-6 w-1/2 bg-gray-600 animate-pulse"></p>
          </div>
        </Card>
      ))}
    </div>
  </>
);
export default WallpapersLoading;
