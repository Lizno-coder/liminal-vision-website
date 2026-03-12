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
    low: "opacity-20",
    medium: "opacity-40",
    high: "opacity-60",
  };

  const variantMap = {
    blue: "from-[#2997ff]/30 via-[#5856d6]/20 to-[#2997ff]/30",
    purple: "from-[#5856d6]/30 via-[#af52de]/20 to-[#5856d6]/30",
    mixed: "from-[#2997ff]/25 via-[#af52de]/20 to-[#5856d6]/25",
  };

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Animated gradient blobs */}
      <div
        className={cn(
          "absolute -left-20 -top-20 h-64 w-64 rounded-full blur-3xl animate-blob",
          intensityMap[intensity],
          "bg-gradient-to-br",
          variantMap[variant]
        )}
      />
      <div
        className={cn(
          "absolute -right-20 -bottom-20 h-64 w-64 rounded-full blur-3xl animate-blob animation-delay-2000",
          intensityMap[intensity],
          "bg-gradient-to-br",
          variantMap[variant]
        )}
      />
      <div
        className={cn(
          "absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-blob animation-delay-4000",
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
    blue: "from-[#2997ff]/20 via-transparent to-[#5856d6]/10",
    purple: "from-[#5856d6]/20 via-transparent to-[#af52de]/10",
    mixed: "from-[#2997ff]/15 via-[#af52de]/10 to-[#5856d6]/15",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20",
        className
      )}
    >
      {/* Flow gradient background */}
      <div
        className={cn(
          "absolute inset-0 -z-10 animate-flow-gradient bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
          variantMap[variant]
        )}
      />

      {/* Static subtle gradient */}
      <div
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-br opacity-30",
          variantMap[variant]
        )}
      />

      {/* Animated blobs on hover */}
      <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#2997ff]/20 blur-3xl transition-all duration-700 group-hover:scale-150 group-hover:opacity-100 opacity-0" />
      <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-[#5856d6]/20 blur-3xl transition-all duration-700 delay-100 group-hover:scale-150 group-hover:opacity-100 opacity-0" />

      {children}
    </div>
  );
}
