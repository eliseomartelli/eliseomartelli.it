"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Settings2, Info, Droplets, Waves } from "lucide-react";

function DilutionCalcContent() {
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

  const ParamsForm = () => (
    <div className="space-y-8">
      <div className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground border-b pb-1">Solution Volume</h3>
        <div className="space-y-2">
          <Label className="text-xs">Total Target Volume (ml)</Label>
          <Input type="number" value={totalVolume} onChange={(e) => setTotalVolume(parseInt(e.target.value) || 0)} />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground border-b pb-1">Dilution Ratio</h3>
        <div className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
             <div className="space-y-1">
               <Label className="text-xs text-orange-500">Chemical (Parts)</Label>
               <Input type="number" value={partA} onChange={(e) => setPartA(parseFloat(e.target.value) || 0)} />
             </div>
             <div className="space-y-1">
               <Label className="text-xs">Water (Parts)</Label>
               <Input type="number" value={partB} onChange={(e) => setPartB(parseFloat(e.target.value) || 0)} />
             </div>
           </div>
           <p className="text-[10px] text-muted-foreground text-center">Standard 1+X notation means 1 part chemical + X parts water.</p>
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4 text-[11px] leading-tight text-muted-foreground space-y-2">
        <div className="flex items-center gap-2 font-medium text-foreground"><Info className="h-3 w-3" /> Calculator Info</div>
        <p>Calculates exact volumes of concentrate and water needed to reach the target total volume at the specified ratio.</p>
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
                <BreadcrumbItem><BreadcrumbLink href="/tools/dilution" className="text-xs">Dilution</BreadcrumbLink></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-serif text-xl font-bold">Dilution Calculator</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
            <ParamsForm />
          </div>
        </aside>

        {/* Main Display Area */}
        <main className="relative flex-1 flex flex-col bg-muted/20 overflow-hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b bg-background p-4 lg:hidden">
            <h1 className="font-serif text-lg font-bold">Dilution Calculator</h1>
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
             <div className="grid grid-cols-1 lg:grid-cols-2 w-full max-w-4xl gap-12 lg:gap-24">
                <div className="space-y-4">
                   <div className="flex flex-col items-center gap-2">
                     <Droplets className="h-6 w-6 text-orange-500" />
                     <h2 className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Chemical Amount</h2>
                   </div>
                   <div className="relative">
                      <p className="text-[15vw] lg:text-[8rem] font-mono leading-none tracking-tighter text-orange-500 drop-shadow-sm">
                        {Number.isInteger(volumeA) ? volumeA : volumeA.toFixed(1)}
                      </p>
                      <span className="text-2xl font-bold text-muted-foreground">ml</span>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex flex-col items-center gap-2">
                     <Waves className="h-6 w-6 text-blue-500" />
                     <h2 className="uppercase text-xs font-bold tracking-widest text-muted-foreground">Water Amount</h2>
                   </div>
                   <div className="relative">
                      <p className="text-[15vw] lg:text-[8rem] font-mono leading-none tracking-tighter text-foreground drop-shadow-sm">
                        {Number.isInteger(volumeB) ? volumeB : volumeB.toFixed(1)}
                      </p>
                      <span className="text-2xl font-bold text-muted-foreground">ml</span>
                   </div>
                </div>
             </div>

             <div className="mt-16 text-muted-foreground max-w-md">
                <p className="text-sm italic">Mix <span className="text-orange-500 font-bold">{Number.isInteger(volumeA) ? volumeA : volumeA.toFixed(1)}ml</span> of concentrate into <span className="text-foreground font-bold">{Number.isInteger(volumeB) ? volumeB : volumeB.toFixed(1)}ml</span> of water to make <span className="text-foreground font-bold">{totalVolume}ml</span> of working solution.</p>
             </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default function DilutionCalcPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen">Loading calculator...</div>}>
      <DilutionCalcContent />
    </Suspense>
  );
}
