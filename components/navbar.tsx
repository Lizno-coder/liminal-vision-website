"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#services", label: "Leistungen" },
  { href: "/#pricing", label: "Preise" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold text-white">
          Limi<span className="text-[#2997ff]">nalo</span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-white/60 hover:text-white">
              {link.label}
            </Link>
          ))}
          <Link
            href="/kontakt"
            className="rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-4 py-2 text-sm font-medium text-white"
          >
            Demo
          </Link>
        </div>

        <button className="p-2 text-white md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-white/5 bg-[#0a0a0a]/95 md:hidden"
          >
            <div className="space-y-1 px-6 py-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block py-3 text-white/70"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/kontakt"
                className="mt-4 block rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-4 py-3 text-center text-sm font-medium text-white"
                onClick={() => setIsOpen(false)}
              >
                Demo anfordern
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
