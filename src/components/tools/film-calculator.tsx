"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { calculateFilmTime } from "@/lib/film";
import { minutesToHHMMSS } from "@/lib/time";
import { useMemo, useState } from "react";

export function FilmCalculator() {
  const [initialMinutes, setInitialMinutes] = useState<number>(8);
  const [initialSeconds, setInitialSeconds] = useState<number>(0);
  const [initialTemp, setInitialTemp] = useState<number>(20);
  const [newTemp, setNewTemp] = useState<number>(20);
  const [constantAgitation, setConstantAgitation] = useState<boolean>(false);
  const [pushPull, setPushPull] = useState<number>(0);

  const calculatedTime = useMemo(() => {
    const baseTimeSeconds = initialMinutes * 60 + initialSeconds;

    const finalTimeSeconds = calculateFilmTime(
      baseTimeSeconds,
      initialTemp,
      newTemp,
      pushPull,
      constantAgitation,
    );

    return minutesToHHMMSS(finalTimeSeconds / 60);
  }, [
    initialMinutes,
    initialSeconds,
    initialTemp,
    newTemp,
    constantAgitation,
    pushPull,
  ]);

  return (
    <div className="space-y-8">
      <section className="mt-8 space-y-4">
        <h2 className="text-center uppercase text-sm font-bold">
          Development Parameters
        </h2>
        <Label>Recommended Time</Label>
        <div className="flex flex-row space-x-2">
          <div className="relative flex-1">
            <Input
              type="number"
              value={initialMinutes}
              onChange={(e) => setInitialMinutes(parseInt(e.target.value) || 0)}
              className="pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              min
            </span>
          </div>
          <div className="relative flex-1">
            <Input
              type="number"
              value={initialSeconds}
              onChange={(e) => setInitialSeconds(parseInt(e.target.value) || 0)}
              placeholder="Seconds"
              className="pr-12"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              sec
            </span>
          </div>
        </div>
        <div className="flex flex-row space-x-2">
          <div className="flex-1 space-y-2">
            <Label>Initial Temp</Label>
            <div className="relative">
              <Input
                type="number"
                value={initialTemp}
                onChange={(e) =>
                  setInitialTemp(parseFloat(e.target.value) || 0)
                }
                placeholder="Initial Temperature (°C)"
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                °C
              </span>
            </div>
          </div>
          <div className="flex-1 space-y-2">
            <Label>Target Temp</Label>
            <div className="relative">
              <Input
                type="number"
                value={newTemp}
                onChange={(e) => setNewTemp(parseFloat(e.target.value) || 0)}
                placeholder="New Temperature (°C)"
                className="pr-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                °C
              </span>
            </div>
          </div>
        </div>

        <Label
          htmlFor="constant"
          className="cursor-pointer flex items-center space-x-2 border border-transparent p-2 -mx-2 rounded-md hover:bg-muted/50 transition-colors"
        >
          <Checkbox
            id="constant"
            checked={constantAgitation}
            onCheckedChange={(checked) => setConstantAgitation(!!checked)}
          />
          Constant Agitation
        </Label>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label>Push/Pull</Label>
            <span className="text-sm font-mono">
              {pushPull > 0 ? `+${pushPull}` : pushPull} stops
            </span>
          </div>
          <Slider
            min={-3}
            max={3}
            step={1}
            value={[pushPull]}
            onValueChange={(vals) => setPushPull(vals[0])}
          />
        </div>
      </section>

      <section className="mt-8 space-y-8 border-orange-500 rounded-md border p-8">
        <div className="space-y-4">
          <h2 className="uppercase text-center text-sm font-bold">
            Adjusted Development Time
          </h2>
          <p className="text-6xl sm:text-8xl font-mono text-center text-orange-500">
            {calculatedTime}
          </p>
        </div>
        <hr />
        <div className="flex flex-row justify-between text-center">
          <div className="flex flex-col items-center space-y-2 flex-1">
            <p className="text-sm uppercase text-muted-foreground">Temp Δ</p>
            <p className="font-bold text-lg font-mono">
              {(initialTemp - newTemp).toFixed(1)}°C
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 flex-1">
            <p className="text-sm uppercase text-muted-foreground">Push/Pull</p>
            <p className="font-bold text-lg font-mono">
              {pushPull > 0 ? `+${pushPull}` : pushPull}
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 flex-1">
            <p className="text-sm uppercase text-muted-foreground">Agitation</p>
            <p className="font-bold text-lg font-mono">
              {constantAgitation ? "Cont" : "Std"}
            </p>
          </div>
        </div>
      </section>
      <p className="text-sm text-center text-gray-500 mt-4">
        Temperature compensation uses the Ilford factor (~10% per °C). Push/pull
        adjusts time by 50% per stop. Constant agitation reduces time by 10%.
      </p>
    </div>
  );
}
