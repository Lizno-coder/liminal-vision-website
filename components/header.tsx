"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Process", href: "#process" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`mx-auto max-w-7xl rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.18)]" : ""
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff] via-[#4f7dff] to-[#5856d6] opacity-90" />
              <span className="relative text-sm font-bold tracking-[0.2em] text-white">
                LV
              </span>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold uppercase tracking-[0.24em] text-white/90">
                Liminal Vision
              </span>
              <span className="text-xs text-white/50">Premium Web Design</span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-white/75 transition hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/kontakt"
              className="inline-flex items-center rounded-full border border-white/20 bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#2997ff]/20 transition hover:scale-[1.02] hover:shadow-[#5856d6]/30"
            >
              Demo anfordern
            </Link>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white md:hidden"
          >
            <div className="relative h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isOpen ? "top-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-1.5 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isOpen ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 top-3 h-0.5 w-5 rounded-full bg-white transition-all duration-300 ${
                  isOpen ? "top-1.5 -rotate-45" : ""
                }`}
              />
            </div>
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="space-y-2 border-t border-white/10 px-4 py-4">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-xl px-3 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <Link
                  href="/kontakt"
                  onClick={() => setIsOpen(false)}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-4 py-3 text-sm font-semibold text-white"
                >
                  Demo anfordern
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
