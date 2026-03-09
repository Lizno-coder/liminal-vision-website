"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Anwendungsbereiche", href: "#anwendungsbereiche" },
  { name: "Ablauf", href: "#process" },
  { name: "Preise", href: "#pricing" },
  { name: "Kontakt", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Scroll direction detection for hide/show
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // Spring physics for smooth header animation
  const headerY = useMotionValue(0);
  const springY = useSpring(headerY, { stiffness: 400, damping: 30 });

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Add shadow when scrolled
          setScrolled(currentScrollY > 16);
          
          // Hide header when scrolling down, show when scrolling up
          // Only hide after scrolling past 100px (hero section)
          if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY.current + 5) {
              // Scrolling down - hide
              setIsHidden(true);
              headerY.set(-100);
            } else if (currentScrollY < lastScrollY.current - 5) {
              // Scrolling up - show
              setIsHidden(false);
              headerY.set(0);
            }
          } else {
            // Always show at top
            setIsHidden(false);
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

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <motion.div
        style={{ y: springY }}
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`mx-auto max-w-7xl rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl transition-shadow ${
          scrolled ? "shadow-[0_8px_30px_rgba(0,0,0,0.18)]" : ""
        }`}
      >
        <div className="flex h-16 items-center justify-between px-4 sm:px-6">
          <Link href="/" className="group flex items-center gap-3">
            {/* Eye Logo Icon */}
            <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-[#0a0a0a] border border-white/10 transition group-hover:border-[#2997ff]/50 group-hover:shadow-[0_0_20px_rgba(41,151,255,0.3)]">
              <img 
                src="/logo.svg" 
                alt="Liminal Vision" 
                className="h-9 w-9 object-contain"
              />
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
