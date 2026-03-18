"use client";

import { CheckCircle2 } from "lucide-react";

export default function PaymentSuccessPage() {
  return (
    <div className="relative flex min-h-[calc(100vh-9rem)] items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2997ff]/10 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />

      <div className="relative flex w-full max-w-xl flex-col items-center rounded-[2rem] border border-white/10 bg-white/[0.035] px-8 py-12 text-center shadow-[0_30px_90px_rgba(0,0,0,0.26)] backdrop-blur-2xl sm:px-12 sm:py-16">
        <div className="mb-8 inline-flex h-24 w-24 items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/10 text-emerald-400 shadow-[0_0_40px_rgba(74,222,128,0.16)]">
          <CheckCircle2 className="h-12 w-12" strokeWidth={1.75} />
        </div>

        <h1 className="text-4xl font-semibold tracking-[-0.05em] text-white sm:text-5xl">
          Zahlung erfolgreich
        </h1>
      </div>
    </div>
  );
}
