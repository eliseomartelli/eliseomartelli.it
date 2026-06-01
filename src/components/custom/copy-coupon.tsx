"use client";

import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface CopyCouponProps {
  code: string;
}

export function CopyCoupon({ code }: CopyCouponProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Coupon code copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy code");
    }
  };

  return (
    <Button
      variant="secondary"
      size="sm"
      className={cn(
        "h-8 px-3 text-xs font-mono font-bold uppercase tracking-wider gap-2 transition-all active:scale-95 border border-border/50 shadow-xs shrink-0",
        copied && "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 shadow-none"
      )}
      onClick={copyToClipboard}
    >
      {copied ? (
        <Check className="size-3.5" />
      ) : (
        <Copy className="size-3.5" />
      )}
      <span>{code}</span>
    </Button>
  );
}
