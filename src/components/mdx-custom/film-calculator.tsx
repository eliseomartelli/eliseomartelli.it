"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateFilmTime } from "@/lib/film";
import { minutesToHHMMSS } from "@/lib/time";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { LinkIcon, ChevronDown, ChevronUp } from "lucide-react";
import { useMemo, useState } from "react";

interface InlineFilmCalculatorProps {
  time: string;
  temp?: number;
  name?: string;
  push?: number;
}

export function InlineFilmCalculator({
  time,
  temp = 20,
  name,
  push = 0,
}: InlineFilmCalculatorProps) {
  const [baseMinutes, baseSeconds] = useMemo(() => {
    if (typeof time === "number") return [time, 0];
    const [m, s] = time.split(":").map(Number);
    return [m, s || 0];
  }, [time]);

  const [measuredTemp, setMeasuredTemp] = useState<number>(temp);
  const [pushPull, setPushPull] = useState<number>(push);
  const [showControls, setShowControls] = useState(false);

  const calculatedTime = useMemo(() => {
    const baseTimeSeconds = baseMinutes * 60 + baseSeconds;

    const finalTimeSeconds = calculateFilmTime(
      baseTimeSeconds,
      temp,
      measuredTemp,
      pushPull,
    );

    return minutesToHHMMSS(finalTimeSeconds / 60);
  }, [baseMinutes, baseSeconds, temp, measuredTemp, pushPull]);

  return (
    <div className="my-8 rounded-lg border bg-card text-card-foreground shadow-sm p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold leading-none tracking-tight">
            {name || "Development Time"}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Base: {baseMinutes}:{baseSeconds.toString().padStart(2, "0")} @{" "}
            {temp}°C
          </p>
        </div>
        <div className="flex items-center gap-4 justify-between sm:justify-end w-full sm:w-auto">
          <span className="text-3xl font-mono font-bold text-orange-500">
            {calculatedTime}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowControls(!showControls)}
            className="h-8 w-8"
            aria-label={showControls ? "Hide adjustments" : "Show adjustments"}
          >
            {showControls ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {showControls && (
        <div className="space-y-4 pt-4 border-t">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="measured-temp">Measured Temp (°C)</Label>
              <div className="relative">
                <Input
                  id="measured-temp"
                  type="number"
                  step="0.1"
                  value={measuredTemp}
                  onChange={(e) =>
                    setMeasuredTemp(parseFloat(e.target.value) || 0)
                  }
                  className="pr-8"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                  °C
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="push-pull">Push/Pull</Label>
                <span className="text-sm font-mono text-muted-foreground">
                  {pushPull > 0 ? `+${pushPull}` : pushPull} stops
                </span>
              </div>
              <Slider
                id="push-pull"
                min={-2}
                max={2}
                step={1}
                value={[pushPull]}
                onValueChange={(vals) => setPushPull(vals[0])}
                className="py-2"
              />
            </div>
          </div>
          <div className="flex justify-end pt-2">
            <Button asChild variant="ghost" size="sm">
              <Link
                href="/tools/filmcalc"
                className="flex items-center gap-2 no-underline"
              >
                <LinkIcon className="h-4 w-4" />
                <span>Open Full Calculator</span>
              </Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}