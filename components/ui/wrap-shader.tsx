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
      <Warp
        style={{ height: "100%", width: "100%" }}
        proportion={0.42}
        softness={1}
        distortion={0.22}
        swirl={0.72}
        swirlIterations={10}
        shape="checks"
        shapeScale={0.1}
        scale={1}
        rotation={-8}
        speed={0.55}
        colors={[
          "hsl(210, 100%, 58%)",
          "hsl(196, 100%, 46%)",
          "hsl(246, 64%, 60%)",
          "hsl(174, 84%, 62%)",
        ]}
      />
      <div className="absolute inset-0 bg-[#050816]/55" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(41,151,255,0.18),transparent_38%)]" />
      <div className={cn("absolute inset-0 backdrop-blur-[56px]", blurClassName)} />
    </div>
  );
}
