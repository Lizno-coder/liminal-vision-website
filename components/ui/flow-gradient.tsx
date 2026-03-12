"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface FlowGradientBackgroundProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "low" | "medium" | "high";
  variant?: "blue" | "purple" | "mixed";
}

export function FlowGradientBackground({
  children,
  className,
  intensity = "medium",
  variant = "blue",
}: FlowGradientBackgroundProps) {
  const intensityMap = {
    low: "opacity-30",
    medium: "opacity-60",
    high: "opacity-90",
  };

  const variantMap = {
    blue: "from-[#2997ff]/40 via-[#5856d6]/30 to-[#2997ff]/40",
    purple: "from-[#5856d6]/40 via-[#af52de]/30 to-[#5856d6]/40",
    mixed: "from-[#2997ff]/35 via-[#af52de]/25 to-[#5856d6]/35",
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated gradient blobs - bigger and more visible */}
      <div
        className={cn(
          "absolute -left-32 -top-32 h-96 w-96 rounded-full blur-3xl animate-blob",
          intensityMap[intensity],
          "bg-gradient-to-br",
          variantMap[variant]
        )}
      />
      <div
        className={cn(
          "absolute -right-32 -bottom-32 h-96 w-96 rounded-full blur-3xl animate-blob animation-delay-2000",
          intensityMap[intensity],
          "bg-gradient-to-br",
          variantMap[variant]
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-blob animation-delay-4000",
          intensityMap[intensity],
          "bg-gradient-to-br",
          variantMap[variant]
        )}
      />

      {/* Flow gradient overlay */}
      <div
        className={cn(
          "absolute inset-0 animate-flow-gradient bg-gradient-to-br",
          variantMap[variant],
          intensityMap[intensity]
        )}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

// Card wrapper with flow gradient
interface FlowGradientCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "blue" | "purple" | "mixed";
}

export function FlowGradientCard({
  children,
  className,
  variant = "blue",
}: FlowGradientCardProps) {
  const variantMap = {
    blue: "from-[#2997ff]/30 via-transparent to-[#5856d6]/20",
    purple: "from-[#5856d6]/30 via-transparent to-[#af52de]/20",
    mixed: "from-[#2997ff]/20 via-[#af52de]/15 to-[#5856d6]/20",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/30",
        className
      )}
    >
      {/* Flow gradient background - always visible but intensifies on hover */}
      <div
        className={cn(
          "absolute inset-0 -z-10 animate-flow-gradient bg-gradient-to-br opacity-40 transition-opacity duration-500 group-hover:opacity-80",
          variantMap[variant]
        )}
      />

      {/* Animated blobs on hover */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#2997ff]/30 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-40" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#5856d6]/30 blur-3xl transition-all duration-700 delay-100 group-hover:scale-150 group-hover:opacity-100 opacity-40" />

      {children}
    </div>
  );
}
