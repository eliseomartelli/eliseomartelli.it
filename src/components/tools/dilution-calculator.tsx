"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export function DilutionCalculator() {
  const searchParams = useSearchParams();
  const [totalVolume, setTotalVolume] = useState<number>(300);
  const [partA, setPartA] = useState<number>(1);
  const [partB, setPartB] = useState<number>(9);

  useEffect(() => {
    const vol = searchParams.get("volume");
    const a = searchParams.get("a");
    const b = searchParams.get("b");

    if (vol) setTotalVolume(parseInt(vol) || 300);
    if (a) setPartA(parseFloat(a) || 1);
    if (b) setPartB(parseFloat(b) || 9);
  }, [searchParams]);

  const { volumeA, volumeB } = useMemo(() => {
    const totalParts = partA + partB;
    if (totalParts === 0) return { volumeA: 0, volumeB: 0 };

    const onePart = totalVolume / totalParts;
    return {
      volumeA: onePart * partA,
      volumeB: onePart * partB,
    };
  }, [totalVolume, partA, partB]);

  return (
    <div className="space-y-8">
      <section className="mt-8 space-y-4">
        <h2 className="text-center uppercase text-sm font-bold">
          Solution Parameters
        </h2>

        <div className="space-y-2">
          <Label>Total Target Volume</Label>
          <div className="relative">
            <Input
              type="number"
              value={totalVolume}
              onChange={(e) => setTotalVolume(parseInt(e.target.value) || 0)}
              className="pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ml
            </span>
          </div>
        </div>

        <Label>Dilution Ratio (Parts Chemical + Parts Water)</Label>
        <div className="flex flex-row space-x-2 items-center">
          <div className="relative flex-1">
            <Input
              type="number"
              value={partA}
              onChange={(e) => setPartA(parseFloat(e.target.value) || 0)}
              className="text-center"
            />
            <span className="text-xs text-muted-foreground mt-1">Chemical</span>
          </div>
          <span className="text-xl font-bold mb-6">+</span>
          <div className="relative flex-1">
            <Input
              type="number"
              value={partB}
              onChange={(e) => setPartB(parseFloat(e.target.value) || 0)}
              className="text-center"
            />
            <span className="text-xs text-muted-foreground mt-1">Water</span>
          </div>
        </div>
      </section>

      <section className="mt-8 space-y-8 border-orange-500 rounded-md border p-8">
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          <div className="space-y-2 text-center flex-1">
            <h2 className="uppercase text-sm font-bold text-muted-foreground">
              Chemical
            </h2>
            <p className="text-4xl sm:text-6xl font-mono text-orange-500">
              {Number.isInteger(volumeA) ? volumeA : volumeA.toFixed(1)}
              <span className="text-xl sm:text-2xl ml-2 text-muted-foreground">
                ml
              </span>
            </p>
          </div>
          <div className="space-y-2 text-center flex-1">
            <h2 className="uppercase text-sm font-bold text-muted-foreground">
              Water
            </h2>
            <p className="text-4xl sm:text-6xl font-mono text-foreground">
              {Number.isInteger(volumeB) ? volumeB : volumeB.toFixed(1)}
              <span className="text-xl sm:text-2xl ml-2 text-muted-foreground">
                ml
              </span>
            </p>
          </div>
        </div>
      </section>

      <p className="text-sm text-center text-gray-500 mt-4">
        Standard photographic dilution notation (1+X) where 1 part chemical is
        added to X parts water.
      </p>
    </div>
  );
}
