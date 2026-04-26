import type { Metadata } from "next";

import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "CRM | Liminalo",
  description: "Interner CRM-Bereich von Liminalo.",
  path: "/crm",
  noIndex: true,
});

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8 text-white">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-2 text-3xl font-bold">Liminalo CRM</h1>
        <p className="mb-8 text-white/60">Kundenanfragen und Projektverwaltung</p>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-[#2997ff]">-</div>
            <div className="mt-1 text-sm text-white/60">Neue Anfragen</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-emerald-400">-</div>
            <div className="mt-1 text-sm text-white/60">In Bearbeitung</div>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="text-3xl font-bold text-purple-400">-</div>
            <div className="mt-1 text-sm text-white/60">Abgeschlossen</div>
          </div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
          <div className="mb-4 text-5xl">📧</div>
          <h2 className="mb-2 text-xl font-semibold">Anfragen per E-Mail</h2>
          <p className="mx-auto mb-6 max-w-lg text-white/60">
            Aktuell werden alle Anfragen direkt an <strong>business@liminalo.com</strong>{" "}
            gesendet. Prüfen Sie Ihr E-Mail-Postfach für neue Kundenanfragen.
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="mailto:business@liminalo.com"
              className="inline-flex items-center gap-2 rounded-xl bg-[#2997ff] px-6 py-3 text-white transition hover:bg-[#2997ff]/80"
            >
              E-Mail öffnen
            </a>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 font-semibold">Workflow</h3>
          <ol className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2997ff]/20 text-xs text-[#2997ff]">
                1
              </span>
              <span>Kunde sendet Anfrage über Kontaktformular</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2997ff]/20 text-xs text-[#2997ff]">
                2
              </span>
              <span>Anfrage landet im E-Mail-Postfach `business@liminalo.com`</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2997ff]/20 text-xs text-[#2997ff]">
                3
              </span>
              <span>Direkte Antwort an den Kunden per E-Mail</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2997ff]/20 text-xs text-[#2997ff]">
                4
              </span>
              <span>Projektstart nach Zahlungseingang der 50-Prozent-Anzahlung</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
