"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Branchen", href: "/branchen" },
  { name: "Standorte", href: "/standorte" },
  { name: "Ablauf", href: "/#process" },
  { name: "Preise", href: "/#pricing" },
  { name: "Konto", href: "/konto" },
  { name: "Kontakt", href: "/kontakt" },
];

function BrandLockup({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative flex items-center overflow-hidden transition group-hover:drop-shadow-[0_0_20px_rgba(41,151,255,0.22)] ${
        compact ? "h-10" : "h-11 sm:h-12"
      }`}
    >
      <Image
        src="/Liminalo.png"
        alt="Liminalo"
        width={96}
        height={96}
        sizes={compact ? "40px" : "(min-width: 640px) 48px, 44px"}
        priority
        className="h-full w-auto object-contain"
      />
    </div>
  );
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);
  const headerRef = useRef<HTMLDivElement | null>(null);

  const headerY = useMotionValue(0);
  const springY = useSpring(headerY, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setScrolled(currentScrollY > 16);

          if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY.current + 5) {
              setIsOpen(false);
              headerY.set(-100);
            } else if (currentScrollY < lastScrollY.current - 5) {
              headerY.set(0);
            }
          } else {
            headerY.set(0);
          }

          lastScrollY.current = currentScrollY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [headerY]);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const closeOnOutsidePointer = (event: PointerEvent) => {
      if (
        headerRef.current &&
        event.target instanceof Node &&
        !headerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", closeOnOutsidePointer);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePointer);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-[calc(env(safe-area-inset-top)+1rem)] sm:px-6 lg:px-8">
      <motion.div
        ref={headerRef}
        style={{ y: springY }}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`mx-auto max-w-7xl transition-shadow ${
          scrolled ? "md:shadow-[0_8px_30px_rgba(0,0,0,0.18)]" : ""
        }`}
      >
        <div className="flex items-center justify-between md:rounded-[1.75rem] md:border md:border-white/10 md:bg-white/10 md:backdrop-blur-xl">
          <div className="flex h-12 w-full items-center justify-between px-1 md:h-16 md:px-6">
            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group flex cursor-pointer items-center gap-1 md:hidden"
              aria-label="Zur Startseite"
            >
              <BrandLockup compact />
            </Link>

            <Link
              href="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group hidden cursor-pointer items-center gap-1 md:flex"
              aria-label="Zur Startseite"
            >
              <BrandLockup />
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
                Kontakt
              </Link>
            </div>

            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center text-white md:hidden"
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
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="mt-3 flex justify-end md:hidden"
            >
              <div className="w-full max-w-xs overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#07111e]/88 p-3 shadow-[0_25px_80px_rgba(0,0,0,0.38)] backdrop-blur-2xl">
                <div className="space-y-1">
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
                        className="block rounded-2xl px-4 py-3 text-sm font-medium text-white/80 transition hover:bg-white/10 hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <Link
                  href="/kontakt"
                  onClick={() => setIsOpen(false)}
                  className="mt-3 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-4 py-3 text-sm font-semibold text-white"
                >
                  Kontakt anfragen
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
}
