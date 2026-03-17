"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Branchen", href: "/branchen" },
  { name: "Preise", href: "/#pricing" },
  { name: "Kontakt", href: "/kontakt" },
];

const industryLinks = [
  { name: "Cafés & Restaurants", href: "/branchen/cafes-restaurants", color: "#f59e0b" },
  { name: "Handwerk & Gewerbe", href: "/branchen/handwerk-gewerbe", color: "#8b5cf6" },
  { name: "Fitness & Wellness", href: "/branchen/fitness-wellness", color: "#10b981" },
  { name: "Beauty & Kosmetik", href: "/branchen/beauty-kosmetik", color: "#f43f5e" },
  { name: "Einzelhandel", href: "/branchen/einzelhandel", color: "#3b82f6" },
  { name: "Dienstleister", href: "/branchen/dienstleister", color: "#06b6d4" },
  { name: "Hotels & Unterkünfte", href: "/branchen/hotels-unterkuenfte", color: "#ec4899" },
  { name: "Gesundheit & Praxen", href: "/branchen/gesundheit-praxen", color: "#ef4444" },
  { name: "Bildung & Coaching", href: "/branchen/bildung-coaching", color: "#f97316" },
  { name: "Automobil & Service", href: "/branchen/automobil-service", color: "#6366f1" },
  { name: "Kreative & Künstler", href: "/branchen/kreative-kuenstler", color: "#a855f7" },
];

const legalLinks = [
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
  { name: "AGB", href: "/agb" },
];

const socialLinks = [
  { name: "Instagram", href: "https://www.instagram.com/limi.nalo/" },
  { name: "Facebook", href: "https://www.facebook.com/Liminalo" },
];

export default function Footer() {
  const [industriesOpen, setIndustriesOpen] = useState(false);

  return (
    <footer className="relative mt-24 px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
        <div className="grid gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-10">
          {/* Logo & Description */}
          <div>
            <Link 
              href="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="mb-6 flex cursor-pointer items-center"
            >
              <div className="flex h-16 items-center overflow-hidden sm:h-20">
                <img 
                  src="/Liminalo.png?v=2" 
                  alt="Liminalo" 
                  className="h-full w-auto object-contain"
                />
              </div>
            </Link>
            <p className="max-w-sm text-sm leading-6 text-white/65">
              Wir erstellen maßgeschneiderte Websites für Unternehmen, die online überzeugen wollen. Klar, modern, konversionsstark.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/65 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Industries Accordion */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Branchen
            </h4>
            <ul className="space-y-2">
              {industryLinks.slice(0, 4).map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-white/65 transition hover:text-white flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: link.color }} />
                    {link.name}
                  </Link>
                </li>
              ))}
              
              {/* Accordion for more industries */}
              <li>
                <button
                  onClick={() => setIndustriesOpen(!industriesOpen)}
                  className="flex items-center gap-2 text-sm text-[#2997ff] transition hover:text-white/80"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${industriesOpen ? 'rotate-180' : ''}`} />
                  {industriesOpen ? 'Weniger anzeigen' : 'Alle Branchen'}
                </button>
              </li>
              
              {industriesOpen && (
                <>
                  {industryLinks.slice(4).map((link) => (
                    <li key={link.name} className="animate-fadeIn">
                      <Link 
                        href={link.href} 
                        className="text-sm text-white/65 transition hover:text-white flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: link.color }} />
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Rechtliches
            </h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-white/65 transition hover:text-white">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mb-4 mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Social
            </h4>
            <ul className="space-y-3">
              {socialLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-white/65 transition hover:text-[#2997ff]"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">Bereit für Ihre neue Website?</p>
              <Link
                href="/kontakt"
                className="mt-3 inline-flex items-center rounded-full bg-gradient-to-r from-[#2997ff] to-[#5856d6] px-4 py-2 text-sm font-semibold text-white"
              >
                Demo anfordern
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 px-6 py-4 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-2 text-sm text-white/50 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} Liminalo. Alle Rechte vorbehalten.</p>
            <p>Waldkraiburg, Bayern</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
