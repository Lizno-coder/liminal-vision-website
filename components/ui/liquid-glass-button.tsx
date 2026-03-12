"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const liquidbuttonVariants = cva(
  "inline-flex items-center transition-colors justify-center cursor-pointer gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-[color,box-shadow] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2997ff]/50",
  {
    variants: {
      variant: {
        default: "bg-transparent hover:scale-105 duration-300 transition text-white",
        primary: "bg-gradient-to-r from-[#2997ff] to-[#5856d6] text-white shadow-lg shadow-[#2997ff]/25 hover:shadow-[#5856d6]/40 hover:brightness-110",
        outline: "border border-white/20 bg-white/5 text-white hover:bg-white/10 hover:border-white/30",
        ghost: "hover:bg-white/5 text-white/80 hover:text-white",
      },
      size: {
        default: "h-10 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "lg",
    },
  }
);

export interface LiquidButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof liquidbuttonVariants> {
  asChild?: boolean;
}

function LiquidButton({
  className,
  variant,
  size,
  asChild = false,
  children,
  ...props
}: LiquidButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <>
      <Comp
        data-slot="button"
        className={cn(
          "relative overflow-hidden",
          liquidbuttonVariants({ variant, size, className })
        )}
        {...props}
      >
        {/* Liquid glass overlay effect */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        
        {/* Inner glow */}
        <div className="absolute inset-0 -z-10 rounded-full shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),inset_0_-1px_1px_rgba(0,0,0,0.1)]" />
        
        {/* Content */}
        <div className="relative z-10 flex items-center gap-2">
          {children}
        </div>
        
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 -z-5 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 hover:translate-x-[100%]" />
      </Comp>
    </>
  );
}

LiquidButton.displayName = "LiquidButton";

export { LiquidButton, liquidbuttonVariants };
