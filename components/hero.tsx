"use client";

import React, { useMemo, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Hero3D from "./hero-3d";
import { SpecialText } from "@/components/ui/special-text";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

const ACCENT = "#2997ff";

// Simple and robust typing animation
function TypingWord() {
  const words = useMemo(() => ["Fair.", "Gut.", "Nice.", "Safe."], []);
  const [text, setText] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  // Cursor blink
  useEffect(() => {
    const i = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(i);
  }, []);

  // Typewriter loop - runs on every change
  useEffect(() => {
    const word = words[wordIdx];
    
    // Determine what to do
    const shouldDelete = deleting;
    const isComplete = text === word;
    const isEmpty = text === "";
    
    let delay = 100; // default type speed
    let action: (() => void) | null = null;
    
    if (shouldDelete) {
      if (isEmpty) {
        // Done deleting - next word
        action = () => {
          setDeleting(false);
          setWordIdx((prev) => (prev + 1) % words.length);
        };
        delay = 0; // immediate
      } else {
        // Delete one char
        action = () => setText(t => t.slice(0, -1));
        delay = 50;
      }
    } else {
      if (isComplete) {
        // Done typing - wait then delete
        action = () => setDeleting(true);
        delay = 1500;
      } else {
        // Type one char
        action = () => setText(word.slice(0, text.length + 1));
        delay = 100;
      }
    }
    
    const timer = setTimeout(action, delay);
    return () => clearTimeout(timer);
    
  }, [text, deleting, wordIdx, words]);

  return (
    <span className="text-[#2997ff]">
      {text}
      <span 
        className={`inline-block w-[3px] h-[0.9em] bg-[#2997ff] ml-[2px] align-middle ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{ transition: 'opacity 0.1s ease' }}
      />
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
              <span className="block">
                <span className="text-[#2997ff]">
                  <SpecialText inView once delay={0.5} className="text-[#2997ff]">Einfach.</SpecialText>
                </span>{" "}
                <TypingWord />
              </span>
            </h1>

            <p className="mt-4 max-w-md text-lg text-white/60">
              Für Influencer, Cafés, Handwerker & kleine Unternehmen.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <a href="/kontakt">
                <LiquidButton
                  variant="primary"
                  size="xxl"
                  className="group"
                >
                  Demo anfordern
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </LiquidButton>
              </a>
              <a href="/#pricing">
                <LiquidButton
                  variant="outline"
                  size="xxl"
                >
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
