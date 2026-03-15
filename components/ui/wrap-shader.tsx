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
      <div className="hidden h-full w-full sm:block">
        <Warp
          style={{ height: "100%", width: "100%" }}
          proportion={0.4}
          softness={0.95}
          distortion={0.24}
          swirl={0.8}
          swirlIterations={10}
          shape="checks"
          shapeScale={0.1}
          scale={1}
          rotation={-10}
          speed={0.7}
          colors={[
            "hsl(210, 100%, 56%)",
            "hsl(196, 100%, 44%)",
            "hsl(246, 62%, 58%)",
            "hsl(174, 82%, 60%)",
          ]}
        />
      </div>
      <div className="absolute inset-0 sm:hidden bg-[radial-gradient(circle_at_15%_20%,rgba(41,151,255,0.34),transparent_30%),radial-gradient(circle_at_85%_22%,rgba(88,86,214,0.28),transparent_34%),radial-gradient(circle_at_58%_78%,rgba(23,210,194,0.2),transparent_30%),linear-gradient(135deg,rgba(9,18,38,0.92),rgba(8,25,52,0.86))] animate-flow-gradient" />
      <div className="absolute inset-0 bg-[#040814]/68 sm:bg-[#040814]/62" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(41,151,255,0.16),transparent_34%),radial-gradient(circle_at_left,rgba(88,86,214,0.12),transparent_28%)]" />
      <div className={cn("absolute inset-0 backdrop-blur-[22px] sm:backdrop-blur-[28px]", blurClassName)} />
    </div>
  );
}
