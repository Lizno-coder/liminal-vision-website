"use client";

import React from "react";
import { Plus } from "lucide-react";

export function TextColor() {
  return (
    <div className="py-20 md:py-32">
      <div className="relative px-4">
        <div className="relative mx-auto max-w-5xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-8 md:p-12 [mask-image:radial-gradient(40rem_20rem_at_center,white,transparent)]">
          {/* Corner decorations */}
          <Plus className="absolute -left-3 -top-3 h-6 w-6 text-[#2997ff]" />
          <Plus className="absolute -bottom-3 -left-3 h-6 w-6 text-[#2997ff]" />
          <Plus className="absolute -right-3 -top-3 h-6 w-6 text-[#2997ff]" />
          <Plus className="absolute -bottom-3 -right-3 h-6 w-6 text-[#2997ff]" />
          
          <h1 className="flex select-none flex-col items-center justify-center gap-2 text-center text-5xl font-extrabold leading-tight tracking-tighter sm:text-6xl md:flex-row md:text-7xl lg:text-8xl">
            {/* Design - Cyan to Blue */}
            <span className="relative">
              <span className="animate-gradient-foreground-1 bg-gradient-to-r from-[#00D4AA] to-[#2997ff] bg-clip-text px-2 text-transparent sm:px-4">
                Design.
              </span>
              <span className="animate-gradient-background-1 absolute inset-0 bg-gradient-to-r from-[#00D4AA]/40 to-[#2997ff]/40 bg-clip-text px-2 text-transparent blur-sm opacity-0 sm:px-4">
                Design.
              </span>
            </span>
            
            {/* Build - Purple to Pink */}
            <span className="relative">
              <span className="animate-gradient-foreground-2 bg-gradient-to-r from-[#5856d6] to-[#ff6b9d] bg-clip-text px-2 text-transparent sm:px-4">
                Build.
              </span>
              <span className="animate-gradient-background-2 absolute inset-0 bg-gradient-to-r from-[#5856d6]/40 to-[#ff6b9d]/40 bg-clip-text px-2 text-transparent blur-sm opacity-0 sm:px-4">
                Build.
              </span>
            </span>
            
            {/* Launch - Orange to Yellow */}
            <span className="relative">
              <span className="animate-gradient-foreground-3 bg-gradient-to-r from-[#ff9500] to-[#ffd60a] bg-clip-text px-2 text-transparent sm:px-4">
                Launch.
              </span>
              <span className="animate-gradient-background-3 absolute inset-0 bg-gradient-to-r from-[#ff9500]/40 to-[#ffd60a]/40 bg-clip-text px-2 text-transparent blur-sm opacity-0 sm:px-4">
                Launch.
              </span>
            </span>
          </h1>
          
          <p className="mt-6 text-center text-sm text-white/40 md:text-base">
            Drei Schritte zu Ihrer neuen Website
          </p>
        </div>
      </div>
    </div>
  );
}
