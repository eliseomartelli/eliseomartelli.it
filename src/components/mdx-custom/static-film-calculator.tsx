import React from "react";
import { calculateFilmTime } from "@/lib/film";
import { minutesToHHMMSS, parseTime } from "@/lib/time";

export interface StaticFilmCalculatorProps {
  time: string | number;
  temp?: number;
  name?: string;
  push?: number;
  step?: string;
  dilution?: string;
  agitation?: string;
}

export const StaticFilmCalculator: React.FC<StaticFilmCalculatorProps> = ({
  time,
  temp = 20,
  name,
  push = 0,
  step,
  dilution,
  agitation,
}) => {
  const [baseMinutes, baseSeconds] = parseTime(time);

  const baseTimeSeconds = baseMinutes * 60 + baseSeconds;

  const finalTimeSeconds = calculateFilmTime(
    baseTimeSeconds,
    temp,
    temp,
    push,
  );

  const calculatedTime = minutesToHHMMSS(finalTimeSeconds / 60);

  return (
    <div>
      <h3>
        {step || name || "Step"}{" "}
        {dilution && <span>({dilution})</span>}
      </h3>
      {agitation && <p>{agitation}</p>}
      <p>
        <strong>{calculatedTime}</strong> @ {temp}°C
        {push !== 0 && (
          <span>
            {" "}
            (Push: {push > 0 ? "+" : ""}
            {push})
          </span>
        )}
      </p>
    </div>
  );
};