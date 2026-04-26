"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

import Hero3D from "./hero-3d";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

function SequentialHeroWords() {
  const rotatingWords = useMemo(() => ["Nice.", "Schnell.", "Sichtbar.", "Safe."], []);

  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((value) => !value), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const word = rotatingWords[wordIdx];
    const isComplete = text === word;
    const isEmpty = text === "";

    let delay = 95;
    let action: (() => void) | null = null;

    if (deleting) {
      if (isEmpty) {
        action = () => {
          setDeleting(false);
          setWordIdx((prev) => (prev + 1) % rotatingWords.length);
        };
        delay = 0;
      } else {
        action = () => setText((prev) => prev.slice(0, -1));
        delay = 45;
      }
    } else if (isComplete) {
      action = () => setDeleting(true);
      delay = 1400;
    } else {
      action = () => setText(word.slice(0, text.length + 1));
      delay = wordIdx === 0 ? 105 : 85;
    }

    const timer = setTimeout(() => {
      action?.();
    }, delay);

    return () => clearTimeout(timer);
  }, [deleting, rotatingWords, text, wordIdx]);

  return (
    <span className="block whitespace-nowrap text-[#2997ff]">
      <span>Einfach.</span>{" "}
      <span className="inline-flex min-h-[1.1em] min-w-[5.7ch] items-baseline">
        {text}
        <span
          className={`ml-[3px] inline-block h-[0.82em] w-[3px] translate-y-[0.06em] bg-[#2997ff] ${
            cursorVisible ? "opacity-100" : "opacity-0"
          }`}
          style={{ transition: "opacity 0.1s ease" }}
        />
      </span>
    </span>
  );
}

export default function Hero(): JSX.Element {
  const textVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: 24 },
      visible: (index: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: 0.15 + index * 0.12,
          ease: [0.22, 1, 0.36, 1],
        },
      }),
    }),
    []
  );

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center overflow-visible md:min-h-[90vh]">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 md:px-10">
        <div className="grid items-start gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-14">
          <motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="mx-auto flex min-h-[calc(100svh-8rem)] w-full max-w-xl flex-col items-center justify-center text-center sm:min-h-[calc(100svh-9rem)] lg:mx-0 lg:min-h-0 lg:items-start lg:text-left"
          >
            <span className="mb-5 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
              Websites ab 50 EUR
            </span>

            <h1 className="text-[clamp(2.28rem,10.3vw,4.8rem)] font-bold leading-[0.96] text-white md:text-6xl lg:text-7xl">
              Ihre Website.
              <SequentialHeroWords />
            </h1>

            <p className="mt-6 max-w-[18.5rem] text-base leading-7 text-white/60 sm:max-w-md sm:text-lg">
              Fuer Influencer, Cafes, Handwerker und kleine Unternehmen.
            </p>

            <div className="mx-auto mt-8 flex w-full max-w-[18.5rem] flex-col gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center lg:mx-0 lg:justify-start">
              <a href="/kontakt" className="w-full sm:w-auto">
                <LiquidButton variant="primary" size="xxl" className="group w-full sm:w-auto">
                  Kontakt
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </LiquidButton>
              </a>

              <a href="/#pricing" className="w-full sm:w-auto">
                <LiquidButton variant="outline" size="xxl" className="w-full sm:w-auto">
                  Preis berechnen
                </LiquidButton>
              </a>
            </div>
          </motion.div>

          <motion.div
            custom={1}
            initial="hidden"
            animate="visible"
            variants={textVariants}
            className="relative overflow-visible py-2 md:py-8"
          >
            <Hero3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
