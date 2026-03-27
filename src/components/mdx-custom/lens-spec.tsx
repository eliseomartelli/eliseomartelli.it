import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface LensSpecProps {
  name: string;
  manufacturer: string;
  mount: string;
  focalLength: number;
  maxAperture: number;
  format: "full-frame" | "aps-c" | "medium-format";
  year?: number;
}

const formatLabels: Record<LensSpecProps["format"], string> = {
  "full-frame": "Full Frame",
  "aps-c": "APS-C",
  "medium-format": "Medium Format",
};

const rows: Array<{ label: string; key: keyof LensSpecProps }> = [
  { label: "Manufacturer", key: "manufacturer" },
  { label: "Mount", key: "mount" },
  { label: "Focal Length", key: "focalLength" },
  { label: "Max Aperture", key: "maxAperture" },
  { label: "Format", key: "format" },
  { label: "Year", key: "year" },
];

export const LensSpec = (props: LensSpecProps) => {
  return (
    <Card className="not-prose my-6">
      <CardHeader>
        <CardTitle>{props.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <table className="w-full text-sm">
          <tbody>
            {rows.map(({ label, key }) => {
              if (key === "year" && props.year === undefined) return null;
              let value: React.ReactNode;
              if (key === "focalLength") {
                value = `${props.focalLength}mm`;
              } else if (key === "maxAperture") {
                value = `f/${props.maxAperture}`;
              } else if (key === "format") {
                value = formatLabels[props.format];
              } else {
                value = props[key] as string;
              }
              return (
                <tr key={key} className="border-b last:border-0">
                  <td className="py-2 pr-4 text-muted-foreground font-medium w-40">
                    {label}
                  </td>
                  <td className="py-2">{value}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );
};
