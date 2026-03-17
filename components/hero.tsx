"use client";

import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Hero3D from "./hero-3d";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

function SequentialHeroWords() {
  const firstWord = "Einfach.";
  const rotatingWords = useMemo(() => ["Nice.", "Schnell.", "Sichtbar.", "Safe."], []);

  const [firstText, setFirstText] = useState("");
  const [phase, setPhase] = useState<"first" | "pause" | "rotate">("first");
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase !== "first") return;

    if (firstText === firstWord) {
      const timer = setTimeout(() => setPhase("pause"), 260);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setFirstText(firstWord.slice(0, firstText.length + 1));
    }, 85);

    return () => clearTimeout(timer);
  }, [firstText, firstWord, phase]);

  useEffect(() => {
    if (phase !== "pause") return;
    const timer = setTimeout(() => setPhase("rotate"), 180);
    return () => clearTimeout(timer);
  }, [phase]);

  useEffect(() => {
    if (phase !== "rotate") return;

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
    } else {
      if (isComplete) {
        action = () => setDeleting(true);
        delay = 1400;
      } else {
        action = () => setText(word.slice(0, text.length + 1));
        delay = wordIdx === 0 ? 105 : 85;
      }
    }

    const timer = setTimeout(() => {
      action?.();
    }, delay);

    return () => clearTimeout(timer);
  }, [deleting, phase, rotatingWords, text, wordIdx]);

  return (
    <span className="block">
      <span className="text-[#2997ff]">{firstText}</span>{" "}
      <span className="text-[#2997ff] min-h-[1.1em] inline-block min-w-[5.7ch]">
        {phase === "rotate" ? text : ""}
        <span
          className={`ml-[2px] inline-block h-[0.9em] w-[3px] align-middle bg-[#2997ff] ${cursorVisible ? "opacity-100" : "opacity-0"}`}
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
      visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.7,
          delay: 0.15 + i * 0.12,
          ease: [0.22, 1, 0.36, 1],
        },
      }),
    }),
    []
  );

  return (
    <section className="relative flex min-h-[90vh] items-center overflow-visible">
      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <motion.div custom={0} initial="hidden" animate="visible" variants={textVariants}>
            <span className="mb-4 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
              Websites ab 50€
            </span>

            <h1 className="text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
              Ihre Website.
              <SequentialHeroWords />
            </h1>

            <p className="mt-4 max-w-md text-lg text-white/60">
              Für Influencer, Cafés, Handwerker & kleine Unternehmen.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a href="/kontakt">
                <LiquidButton variant="primary" size="xxl" className="group">
                  Kontakt
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </LiquidButton>
              </a>
              <a href="/#pricing">
                <LiquidButton variant="outline" size="xxl">
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
            className="relative overflow-visible py-8"
          >
            <Hero3D />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
