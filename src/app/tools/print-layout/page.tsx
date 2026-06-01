"use client";

import { useState, useMemo, useRef, useEffect } from "react";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Download, Settings2, Info, AlertTriangle, ArrowRightLeft } from "lucide-react";
import jsPDF from "jspdf";

const PAPER_SIZES = {
  A4: { width: 210, height: 297 },
  A3: { width: 297, height: 420 },
  "US Letter": { width: 215.9, height: 279.4 },
  "US Legal": { width: 215.9, height: 355.6 },
  Custom: { width: 210, height: 297 },
};

type PaperSize = keyof typeof PAPER_SIZES;
type Unit = "mm" | "cm" | "in";

const convertToMm = (value: number, unit: Unit): number => {
  switch (unit) {
    case "cm":
      return value * 10;
    case "in":
      return value * 25.4;
    default:
      return value;
  }
};

interface ParamsFormProps {
  layout: {
    tW: number;
    tH: number;
    pW: number;
    pH: number;
    imgW: number;
    imgH: number;
    warnings: string[];
  };
  targetSize: PaperSize;
  setTargetSize: (size: PaperSize) => void;
  customTarget: { width: number; height: number };
  setCustomTarget: (target: { width: number; height: number }) => void;
  targetOrientation: "portrait" | "landscape";
  setTargetOrientation: (o: "portrait" | "landscape") => void;
  printSheet: { width: number; height: number; unit: Unit };
  setPrintSheet: (s: { width: number; height: number; unit: Unit }) => void;
  printOrientation: "portrait" | "landscape";
  setPrintOrientation: (o: "portrait" | "landscape") => void;
  imageRatio: { width: number; height: number };
  setImageRatio: (r: { width: number; height: number }) => void;
  margin: number;
  setMargin: (m: number) => void;
  handleExportPdf: () => void;
}

const ParamsForm = ({
  layout,
  targetSize,
  setTargetSize,
  customTarget,
  setCustomTarget,
  targetOrientation,
  setTargetOrientation,
  printSheet,
  setPrintSheet,
  printOrientation,
  setPrintOrientation,
  imageRatio,
  setImageRatio,
  margin,
  setMargin,
  handleExportPdf,
}: ParamsFormProps) => (
  <div className="space-y-6">
    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-1">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Target Output Sheet</h3>
        <button
          className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          onClick={() => {
            if (targetSize === "Custom") {
              setCustomTarget({ width: customTarget.height, height: customTarget.width });
            }
            setTargetOrientation(targetOrientation === "portrait" ? "landscape" : "portrait");
          }}
        >
          <ArrowRightLeft className="h-3 w-3" />
        </button>
      </div>
      <div className="grid gap-4">
        <div className="space-y-2">
          <Label>Size</Label>
          <Select value={targetSize} onValueChange={(v: PaperSize) => setTargetSize(v)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(PAPER_SIZES).map((size) => (
                <SelectItem key={size} value={size}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant={targetOrientation === "portrait" ? "default" : "outline"} size="sm" onClick={() => setTargetOrientation("portrait")}>Portrait</Button>
          <Button variant={targetOrientation === "landscape" ? "default" : "outline"} size="sm" onClick={() => setTargetOrientation("landscape")}>Landscape</Button>
        </div>
        {targetSize === "Custom" && (
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label className="text-xs">Width (mm)</Label>
              <Input type="number" value={customTarget.width} onChange={(e) => setCustomTarget({ ...customTarget, width: Number(e.target.value) })} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Height (mm)</Label>
              <Input type="number" value={customTarget.height} onChange={(e) => setCustomTarget({ ...customTarget, height: Number(e.target.value) })} />
            </div>
          </div>
        )}
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-1">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Printing Sheet</h3>
        <button
          className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          onClick={() => {
            setPrintSheet({ ...printSheet, width: printSheet.height, height: printSheet.width });
            setPrintOrientation(printOrientation === "portrait" ? "landscape" : "portrait");
          }}
        >
          <ArrowRightLeft className="h-3 w-3" />
        </button>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1 col-span-1">
            <Label className="text-xs">Width</Label>
            <Input type="number" value={printSheet.width} onChange={(e) => setPrintSheet({ ...printSheet, width: Number(e.target.value) })} />
          </div>
          <div className="space-y-1 col-span-1">
            <Label className="text-xs">Height</Label>
            <Input type="number" value={printSheet.height} onChange={(e) => setPrintSheet({ ...printSheet, height: Number(e.target.value) })} />
          </div>
          <div className="space-y-1 col-span-1">
            <Label className="text-xs">Unit</Label>
            <Select value={printSheet.unit} onValueChange={(v: Unit) => setPrintSheet({ ...printSheet, unit: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="mm">mm</SelectItem>
                <SelectItem value="cm">cm</SelectItem>
                <SelectItem value="in">in</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant={printOrientation === "portrait" ? "default" : "outline"} size="sm" onClick={() => setPrintOrientation("portrait")}>Portrait</Button>
          <Button variant={printOrientation === "landscape" ? "default" : "outline"} size="sm" onClick={() => setPrintOrientation("landscape")}>Landscape</Button>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div className="flex items-center justify-between border-b pb-1">
        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">Image & Margins</h3>
        <button
          className="h-6 w-6 inline-flex items-center justify-center rounded-md hover:bg-muted transition-colors"
          onClick={() => setImageRatio({ width: imageRatio.height, height: imageRatio.width })}
        >
          <ArrowRightLeft className="h-3 w-3" />
        </button>
      </div>
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label className="text-xs">Ratio W</Label>
            <Input
              type="number"
              value={imageRatio.width}
              onChange={(e) => setImageRatio({ ...imageRatio, width: Number(e.target.value) })}
            />
          </div>
          <div className="space-y-1">
            <Label className="text-xs">Ratio H</Label>
            <Input
              type="number"
              value={imageRatio.height}
              onChange={(e) => setImageRatio({ ...imageRatio, height: Number(e.target.value) })}
            />
          </div>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Margin (mm)</Label>
          <Input type="number" value={margin} onChange={(e) => setMargin(Number(e.target.value))} />
        </div>
      </div>
    </div>

    <Button className="w-full mt-4" size="lg" onClick={handleExportPdf}>
      <Download className="mr-2 h-4 w-4" /> Export PDF
    </Button>

    <div className="rounded-lg border bg-muted/30 p-4 text-[11px] leading-tight text-muted-foreground space-y-2">
      <div className="flex items-center gap-2 font-medium text-foreground"><Info className="h-3 w-3" /> Layout Stats</div>
      <div className="grid grid-cols-2 gap-y-1">
        <span>Target Size:</span> <span className="text-right font-mono">{layout.tW.toFixed(1)}x{layout.tH.toFixed(1)}mm</span>
        <span>Paper Size:</span> <span className="text-right font-mono">{layout.pW.toFixed(1)}x{layout.pH.toFixed(1)}mm</span>
        <span>Image Size:</span> <span className="text-right font-mono">{layout.imgW.toFixed(1)}x{layout.imgH.toFixed(1)}mm</span>
        <span>Actual Margin:</span> <span className="text-right font-mono">{((layout.pW - layout.imgW) / 2).toFixed(1)}mm</span>
      </div>
    </div>
  </div>
);

export default function PrintLayoutPage() {
  const [targetSize, setTargetSize] = useState<PaperSize>("A4");
  const [customTarget, setCustomTarget] = useState({ width: 210, height: 297 });
  const [targetOrientation, setTargetOrientation] = useState<
    "portrait" | "landscape"
  >("portrait");

  const [printSheet, setPrintSheet] = useState({
    width: 178,
    height: 240,
    unit: "mm" as Unit,
  });
  const [printOrientation, setPrintOrientation] = useState<
    "portrait" | "landscape"
  >("portrait");

  const [imageRatio, setImageRatio] = useState({ width: 3, height: 2 });
  const [margin, setMargin] = useState(10); // in mm

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Layout calculations
  const layout = useMemo(() => {
    let tW =
      targetSize === "Custom" ? customTarget.width : PAPER_SIZES[targetSize].width;
    let tH =
      targetSize === "Custom" ? customTarget.height : PAPER_SIZES[targetSize].height;

    if (targetOrientation === "landscape") {
      [tW, tH] = [Math.max(tW, tH), Math.min(tW, tH)];
    } else {
      [tW, tH] = [Math.min(tW, tH), Math.max(tW, tH)];
    }

    let pW = convertToMm(printSheet.width, printSheet.unit);
    let pH = convertToMm(printSheet.height, printSheet.unit);

    if (printOrientation === "landscape") {
      [pW, pH] = [Math.max(pW, pH), Math.min(pW, pH)];
    } else {
      [pW, pH] = [Math.min(pW, pH), Math.max(pW, pH)];
    }

    const printableW = Math.max(0, pW - margin * 2);
    const printableH = Math.max(0, pH - margin * 2);

    const ratio = imageRatio.width / imageRatio.height;
    let imgW, imgH;

    if (printableW / printableH > ratio) {
      imgH = printableH;
      imgW = printableH * ratio;
    } else {
      imgW = printableW;
      imgH = printableW / ratio;
    }

    const pX = (tW - pW) / 2;
    const pY = (tH - pH) / 2;
    const imgX = pX + (pW - imgW) / 2;
    const imgY = pY + (pH - imgH) / 2;

    const warnings = [];
    if (pW > tW || pH > tH) {
      warnings.push("Photo paper is larger than output sheet.");
    }
    if (printableW <= 0 || printableH <= 0) {
      warnings.push("Margin is too large for the photo paper.");
    }

    return { tW, tH, pW, pH, pX, pY, imgW, imgH, imgX, imgY, warnings };
  }, [targetSize, customTarget, targetOrientation, printSheet, printOrientation, imageRatio, margin]);

  useEffect(() => {
    const updateCanvas = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.scale(dpr, dpr);

      const padding = 60;
      const scale = Math.min(
        (rect.width - padding) / layout.tW,
        (rect.height - padding) / layout.tH
      );

      const offsetX = (rect.width - layout.tW * scale) / 2;
      const offsetY = (rect.height - layout.tH * scale) / 2;

      ctx.clearRect(0, 0, rect.width, rect.height);

      // Draw Target Sheet
      ctx.fillStyle = "#ffffff";
      ctx.shadowColor = "rgba(0,0,0,0.05)";
      ctx.shadowBlur = 20;
      ctx.fillRect(offsetX, offsetY, layout.tW * scale, layout.tH * scale);
      ctx.shadowBlur = 0;
      
      ctx.strokeStyle = "#e5e7eb";
      ctx.lineWidth = 1;
      ctx.strokeRect(offsetX, offsetY, layout.tW * scale, layout.tH * scale);

      // Draw Printing Sheet
      ctx.strokeStyle = "#111827";
      ctx.lineWidth = 2;
      ctx.strokeRect(
        offsetX + layout.pX * scale,
        offsetY + layout.pY * scale,
        layout.pW * scale,
        layout.pH * scale
      );

      // Draw Image Area
      if (layout.imgW > 0 && layout.imgH > 0) {
        ctx.setLineDash([6, 4]);
        ctx.strokeStyle = "#2563eb";
        ctx.lineWidth = 1.5;
        ctx.strokeRect(
          offsetX + layout.imgX * scale,
          offsetY + layout.imgY * scale,
          layout.imgW * scale,
          layout.imgH * scale
        );
        ctx.setLineDash([]);
      }

      // Draw Crosshair
      ctx.strokeStyle = "rgba(239, 68, 68, 0.4)";
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(offsetX, offsetY + (layout.tH * scale) / 2);
      ctx.lineTo(offsetX + layout.tW * scale, offsetY + (layout.tH * scale) / 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(offsetX + (layout.tW * scale) / 2, offsetY);
      ctx.lineTo(offsetX + (layout.tW * scale) / 2, offsetY + layout.tH * scale);
      ctx.stroke();
    };

    updateCanvas();
    window.addEventListener("resize", updateCanvas);
    return () => window.removeEventListener("resize", updateCanvas);
  }, [layout]);

  const handleExportPdf = () => {
    const doc = new jsPDF({
      orientation: targetOrientation,
      unit: "mm",
      format: targetSize === "Custom" ? [customTarget.width, customTarget.height] : targetSize.toLowerCase().replace(" ", ""),
    });
    doc.setDrawColor(0);
    doc.setLineWidth(0.2);
    doc.rect(layout.pX, layout.pY, layout.pW, layout.pH);
    doc.setDrawColor(60, 130, 246);
    doc.setLineDashPattern([2, 2], 0);
    doc.rect(layout.imgX, layout.imgY, layout.imgW, layout.imgH);
    doc.setLineDashPattern([], 0);
    doc.setDrawColor(239, 68, 68);
    doc.setLineWidth(0.1);
    doc.line(0, layout.tH / 2, layout.tW, layout.tH / 2);
    doc.line(layout.tW / 2, 0, layout.tW / 2, layout.tH);
    doc.save("darkroom-print-layout.pdf");
  };

  const sharedProps = {
    layout,
    targetSize,
    setTargetSize,
    customTarget,
    setCustomTarget,
    targetOrientation,
    setTargetOrientation,
    printSheet,
    setPrintSheet,
    printOrientation,
    setPrintOrientation,
    imageRatio,
    setImageRatio,
    margin,
    setMargin,
    handleExportPdf,
  };

  return (
    <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] bg-background -mb-12 mt-4">
      <div className="flex flex-col border-y bg-background lg:flex-row h-[calc(100vh-6rem)] min-h-[700px] shadow-sm">
        {/* Sidebar - Desktop */}
        <aside className="hidden w-80 flex-col border-r bg-muted/5 lg:flex">
          <div className="border-b p-6 bg-background/50 backdrop-blur-sm">
            <Breadcrumb className="mb-3">
              <BreadcrumbList>
                <BreadcrumbItem><BreadcrumbLink href="/tools" className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground hover:text-foreground transition-colors">Tools</BreadcrumbLink></BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem><BreadcrumbLink href="/tools/print-layout" className="text-[10px] uppercase tracking-wider font-bold text-foreground">Print Layout</BreadcrumbLink></BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h1 className="font-serif text-2xl font-bold tracking-tight">Print Layout</h1>
          </div>
          <div className="flex-1 overflow-y-auto p-6 scrollbar-hide space-y-8">
            <ParamsForm {...sharedProps} />
          </div>
        </aside>

        {/* Main Preview Area */}
        <main className="relative flex-1 flex flex-col bg-muted/30 overflow-hidden">
          {/* Mobile Header */}
          <div className="flex items-center justify-between border-b bg-background/80 backdrop-blur-md p-4 lg:hidden">
            <h1 className="font-serif text-lg font-bold">Print Layout</h1>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="rounded-full shadow-sm"><Settings2 className="h-4 w-4" /></Button>
              </SheetTrigger>
              <SheetContent side="bottom" className="h-[85vh] overflow-y-auto rounded-t-[2rem] border-t-0 shadow-2xl">
                <SheetHeader className="mb-6">
                  <SheetTitle className="text-center font-serif text-2xl">Parameters</SheetTitle>
                </SheetHeader>
                <div className="pb-12">
                  <ParamsForm {...sharedProps} />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Canvas Container */}
          <div ref={containerRef} className="flex-1 cursor-crosshair">
            <canvas ref={canvasRef} />
          </div>

          {/* Warnings Overlay */}
          {layout.warnings.length > 0 && (
            <div className="absolute top-6 left-6 right-6 lg:right-auto lg:w-80 space-y-2 pointer-events-none z-10">
              {layout.warnings.map((w: string, i: number) => (
                <div key={i} className="flex items-center gap-2 rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-xs font-medium text-destructive backdrop-blur-md shadow-lg ring-1 ring-destructive/10 animate-in fade-in slide-in-from-top-2 duration-300">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{w}</span>
                </div>
              ))}
            </div>
          )}

          {/* Legend Overlay */}
          <div className="absolute bottom-6 right-6 flex flex-wrap justify-end gap-3 pointer-events-none">
            <div className="flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-tight backdrop-blur-md shadow-sm ring-1 ring-black/5">
              <div className="h-2 w-2 border border-black" /> 
              <span>Photo Paper</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-tight backdrop-blur-md shadow-sm ring-1 ring-black/5">
              <div className="h-2 w-2 border border-dashed border-blue-500" /> 
              <span>Image Area</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border bg-background/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-tight backdrop-blur-md shadow-sm ring-1 ring-black/5">
              <div className="h-2.5 w-0.5 bg-red-400/60" />
              <div className="h-0.5 w-2.5 bg-red-400/60 -ml-2.5" />
              <span>Center</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
