import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Anwendungsbereiche", href: "/portfolio" },
  { name: "Preise", href: "/#pricing" },
  { name: "Kontakt", href: "/kontakt" },
];

const legalLinks = [
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
        <div className="grid gap-10 px-6 py-12 sm:px-8 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-10">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a]">
                <img src="/logo.svg" alt="Liminal Vision" className="h-8 w-8 object-contain" />
              </div>
              <div className="flex items-center text-lg font-semibold tracking-[-0.02em] text-white">
                <span>Liminal</span>
                <span className="ml-1 text-[#2997ff]">Vision</span>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/65">
              Moderne Websites mit klarem Auftritt, starken blauen Akzenten und einer visuellen Sprache, die im Kopf bleibt.
            </p>
          </div>

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
            <p>© {new Date().getFullYear()} Liminal Vision. Alle Rechte vorbehalten.</p>
            <p>Waldkraiburg, Bayern</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
