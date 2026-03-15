"use client";

import React from "react";
import { Warp } from "@paper-design/shaders-react";
import { cn } from "@/lib/utils";

interface WarpShaderProps {
  className?: string;
  blurClassName?: string;
}

export default function WarpShader({ className, blurClassName }: WarpShaderProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="hidden h-full w-full opacity-65 sm:block">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.38}
          softness={0.92}
          distortion={0.2}
          swirl={0.62}
          swirlIterations={9}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={-10}
          speed={0.5}
          colors={[
            "hsl(210, 88%, 46%)",
            "hsl(196, 88%, 36%)",
            "hsl(246, 52%, 48%)",
            "hsl(174, 70%, 46%)",
          ]}
        />
      </div>
      <div className="absolute inset-0 sm:hidden bg-[radial-gradient(circle_at_15%_20%,rgba(41,151,255,0.28),transparent_32%),radial-gradient(circle_at_85%_22%,rgba(88,86,214,0.24),transparent_36%),radial-gradient(circle_at_58%_78%,rgba(23,210,194,0.18),transparent_32%),linear-gradient(135deg,rgba(6,12,26,0.92),rgba(7,18,38,0.88))] animate-flow-gradient" />
      <div className="absolute inset-0 bg-[#02050d]/72 sm:bg-[#02050d]/74" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.025),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(41,151,255,0.08),transparent_30%),radial-gradient(circle_at_left,rgba(88,86,214,0.06),transparent_26%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,5,13,0.04),rgba(2,5,13,0.22))]" />
      <div className={cn("absolute inset-0 backdrop-blur-[8px] sm:backdrop-blur-[12px]", blurClassName)} />
    </div>
  );
}
