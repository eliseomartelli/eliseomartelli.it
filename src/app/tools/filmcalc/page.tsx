"use client";

import { useState, useMemo } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings2, Info, Clock, Thermometer, FlaskConical } from "lucide-react";
import { calculateFilmTime } from "@/lib/film";
import { minutesToHHMMSS } from "@/lib/time";

export default function FilmCalcPage() {
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
  }, [initialMinutes, initialSeconds, initialTemp, newTemp, constantAgitation, pushPull]);

  const ParamsForm = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground border-b pb-1">Recommended Time</h3>
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Input type="number" value={initialMinutes} onChange={(e) => setInitialMinutes(parseInt(e.target.value) || 0)} className="pr-10" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">min</span>
          </div>
          <div className="relative flex-1">
            <Input type="number" value={initialSeconds} onChange={(e) => setInitialSeconds(parseInt(e.target.value) || 0)} className="pr-10" />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">sec</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground border-b pb-1">Temperature</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <Label className="text-xs">Initial (°C)</Label>
            <Input type="number" value={initialTemp} onChange={(e) => setInitialTemp(parseFloat(e.target.value) || 0)} />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Target (°C)</Label>
            <Input type="number" value={newTemp} onChange={(e) => setNewTemp(parseFloat(e.target.value) || 0)} />
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground border-b pb-1">Adjustments</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-xs">Push/Pull Stops</Label>
            <span className="text-xs font-mono font-bold text-orange-500">{pushPull > 0 ? `+${pushPull}` : pushPull}</span>
          </div>
          <Slider min={-3} max={3} step={1} value={[pushPull]} onValueChange={(vals) => setPushPull(vals[0])} />
          
          <Label htmlFor="constant" className="flex items-center gap-3 rounded-lg border p-3 cursor-pointer hover:bg-muted/50 transition-colors">
            <Checkbox id="constant" checked={constantAgitation} onCheckedChange={(c) => setConstantAgitation(!!c)} />
            <div className="space-y-0.5">
              <span className="text-sm font-medium">Constant Agitation</span>
              <p className="text-[10px] text-muted-foreground text-balance">Reduces development time by 10%.</p>
            </div>
          </Label>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 text-[11px] leading-tight text-muted-foreground space-y-2">
        <div className="flex items-center gap-2 font-medium text-foreground"><Info className="h-3 w-3" /> Calculator Info</div>
        <p>Uses Ilford compensation factor (~10% per °C). Push/pull adds 50% per stop. Constant agitation reduces time by 10%.</p>
      </div>
    </div>
  );

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-background">
      <div className="flex flex-col border-y bg-background lg:flex-row h-[calc(100vh-160px)] min-h-[600px]">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-80 flex-col border-r bg-card lg:flex">
          <div className="border-b p-4">
            <Breadcrumb className="mb-2">
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/tools" className="text-xs">Tools</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="/tools/filmcalc" className="text-xs">Film Calc</BreadcrumbLink></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-serif text-xl font-bold">Film Calculator</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <ParamsForm />
          </div>
        </aside>

        {/* Main Display Area */}
        <main className="relative flex-1 flex flex-col bg-muted/20 overflow-hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b bg-background p-4 lg:hidden">
            <h1 className="font-serif text-lg font-bold">Film Calculator</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon"><Settings2 className="h-4 w-4" /></Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[80vh] overflow-y-auto">
                <SheetHeader className="mb-4">
                  <SheetTitle>Parameters</SheetTitle>
                </SheetHeader>
                <ParamsForm />
              </SheetContent>
            </Sheet>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
             <div className="space-y-2 mb-8">
               <h2 className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Adjusted Development Time</h2>
               <div className="h-1 w-12 bg-orange-500 mx-auto" />
             </div>
             
             <div className="relative">
                <p className="text-[20vw] lg:text-[12rem] font-mono leading-none tracking-tighter text-orange-500 drop-shadow-sm">
                  {calculatedTime}
                </p>
             </div>

             <div className="mt-12 grid grid-cols-3 gap-8 lg:gap-16">
                <div className="flex flex-col items-center gap-2">
                  <Thermometer className="h-5 w-5 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Temp Δ</p>
                    <p className="font-mono text-lg">{(newTemp - initialTemp).toFixed(1)}°C</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <FlaskConical className="h-5 w-5 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Push/Pull</p>
                    <p className="font-mono text-lg">{pushPull > 0 ? `+${pushPull}` : pushPull}</p>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Agitation</p>
                    <p className="font-mono text-lg">{constantAgitation ? "Cont" : "Std"}</p>
                  </div>
                </div>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}
