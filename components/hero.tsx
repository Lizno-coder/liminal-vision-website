"use client";

import React, { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Hero3D from "./hero-3d";

const ACCENT = "#2997ff";

// Typing animation component for cycling words
function TypingWord() {
  const words = ["Fair.", "Gut.", "Sicher.", "Perfekt."];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    if (isDeleting) {
      if (displayText === "") {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 80);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText === currentWord) {
        const timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 3000);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        }, 120);
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <span className="text-[#2997ff]">
      {displayText}
      <span 
        className={`inline-block w-[3px] h-[0.9em] bg-[#2997ff] ml-[2px] align-middle ${showCursor ? 'opacity-100' : 'opacity-0'}`}
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
                Einfach. <TypingWord />
              </span>
            </h1>

            <p className="mt-4 max-w-md text-lg text-white/60">
              Für Influencer, Cafés, Handwerker & kleine Unternehmen.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="/kontakt"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-6 py-3 text-sm font-medium text-white transition-transform hover:scale-105"
              >
                Demo anfordern
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/#pricing"
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm text-white/80 transition-colors hover:border-white/20"
              >
                Preis berechnen
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
