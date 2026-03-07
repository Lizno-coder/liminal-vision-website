import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/#services" },
  { name: "Portfolio", href: "/#portfolio" },
  { name: "Kontakt", href: "/kontakt" },
];

const serviceLinks = [
  { name: "Web Design", href: "/#services" },
  { name: "Development", href: "/#services" },
  { name: "3D Animation", href: "/#services" },
  { name: "Cloud Hosting", href: "/#services" },
];

const legalLinks = [
  { name: "Impressum", href: "/impressum" },
  { name: "Datenschutz", href: "/datenschutz" },
];

export default function Footer() {
  return (
    <footer className="relative mt-24 px-4 pb-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl">
        <div className="grid gap-10 px-6 py-12 sm:px-8 lg:grid-cols-4 lg:px-10">
          <div className="lg:col-span-1">
            <div className="mb-4 flex items-center gap-3">
              <div className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl border border-white/20 bg-white/10">
                <div className="absolute inset-0 bg-gradient-to-br from-[#2997ff] via-[#4f7dff] to-[#5856d6]" />
                <span className="relative text-sm font-bold tracking-[0.2em] text-white">
                  LV
                </span>
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-white">
                  Liminal Vision
                </h3>
                <p className="text-xs text-white/50">Premium Web Design</p>
              </div>
            </div>
            <p className="max-w-sm text-sm leading-6 text-white/65">
              Wir erstellen einzigartige Websites für Unternehmen, die sich von der Masse abheben wollen.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Navigation
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-white/90">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
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
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm text-white/70">
                Bereit für Ihre neue Website?
              </p>
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
            <p>Made with passion in Waldkraiburg</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
