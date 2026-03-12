"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "xl";
}

function LiquidButton({
  className,
  variant = "primary",
  size = "lg",
  children,
  ...props
}: LiquidButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-300 overflow-hidden group";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#2997ff] to-[#5856d6] text-white shadow-lg shadow-[#2997ff]/25 hover:shadow-[#5856d6]/40 hover:brightness-110 hover:scale-105",
    outline: "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30 hover:scale-105",
    ghost: "text-white/80 hover:text-white hover:bg-white/5",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-10 px-5 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-8 text-base",
    xxl: "h-14 px-10 text-lg",
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {/* Glass overlay */}
      <span className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Shimmer effect */}
      <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
      
      {/* Inner highlight */}
      <span className="absolute inset-0 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)]" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  );
}

LiquidButton.displayName = "LiquidButton";

export { LiquidButton };
