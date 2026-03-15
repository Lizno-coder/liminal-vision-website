export const dynamic = 'force-dynamic';

export const metadata = {
  title: "CRM | Liminalo",
  description: "Kundenanfragen verwalten",
};

export default function CRMPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Liminalo CRM</h1>
        <p className="text-white/60 mb-8">Kundenanfragen und Projektverwaltung</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-[#2997ff]">-</div>
            <div className="text-sm text-white/60 mt-1">Neue Anfragen</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-emerald-400">-</div>
            <div className="text-sm text-white/60 mt-1">In Bearbeitung</div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="text-3xl font-bold text-purple-400">-</div>
            <div className="text-sm text-white/60 mt-1">Abgeschlossen</div>
          </div>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <div className="text-5xl mb-4">📧</div>
          <h2 className="text-xl font-semibold mb-2">Anfragen per E-Mail</h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Aktuell werden alle Anfragen direkt an <strong>business@liminalo.com</strong> gesendet.
            Prüfe dein E-Mail-Postfach für neue Kundenanfragen.
          </p>
          <div className="flex justify-center gap-4">
            <a 
              href="mailto:business@liminalo.com" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#2997ff] text-white rounded-xl hover:bg-[#2997ff]/80 transition"
            >
              E-Mail öffnen
            </a>
          </div>
        </div>

        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="font-semibold mb-4">Workflow</h3>
          <ol className="space-y-3 text-sm text-white/70">
            <li className="flex items-start gap-3">
              <span className="bg-[#2997ff]/20 text-[#2997ff] w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">1</span>
              <span>Kunde sendet Anfrage über Kontaktformular</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#2997ff]/20 text-[#2997ff] w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">2</span>
              <span>Anfrage landet in deinem E-Mail-Postfach (business@liminalo.com)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#2997ff]/20 text-[#2997ff] w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">3</span>
              <span>Du antwortest dem Kunden direkt per E-Mail</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-[#2997ff]/20 text-[#2997ff] w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0">4</span>
              <span>Projekt beginnt nach Zahlungseingang (50% Anzahlung)</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
