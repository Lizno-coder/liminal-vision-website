export const metadata = {
  title: "AGB | Liminal Vision",
  description: "Allgemeine Geschäftsbedingungen von Liminal Vision.",
};

const agbSections = [
  {
    title: "§ 1 Geltungsbereich",
    content: [
      "Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen Liminal Vision (nachfolgend 'Anbieter') und ihren Kunden (nachfolgend 'Auftraggeber') über die Erstellung von Websites und damit zusammenhängende Dienstleistungen.",
      "Abweichende Bedingungen des Auftraggebers werden nicht anerkannt, es sei denn, der Anbieter stimmt ihrer Geltung ausdrücklich schriftlich zu.",
    ],
  },
  {
    title: "§ 2 Vertragsgegenstand",
    content: [
      "Der Anbieter erstellt für den Auftraggeber eine Website gemäß der vereinbarten Spezifikation.",
      "Leistungsumfang, Zeitplan und Vergütung ergeben sich aus dem individuellen Angebot bzw. der Auftragsbestätigung.",
      "Der Anbieter behält sich das Recht vor, Subunternehmer für die Erbringung der Leistungen einzusetzen.",
    ],
  },
  {
    title: "§ 3 Pflichten des Auftraggebers",
    content: [
      "Der Auftraggeber stellt dem Anbieter alle für die Leistungserbringung erforderlichen Inhalte (Texte, Bilder, Logos etc.) zeitnah zur Verfügung.",
      "Der Auftraggeber sichert zu, dass die bereitgestellten Inhalte nicht gegen geltendes Recht oder Rechte Dritter verstoßen.",
      "Verzögert sich das Projekt aufgrund fehlender Unterlagen des Auftraggebers, verlängern sich Fristen angemessen.",
    ],
  },
  {
    title: "§ 4 Vergütung und Zahlungsbedingungen",
    content: [
      "Die Vergütung richtet sich nach dem individuellen Angebot.",
      "Es gilt eine Anzahlung von 50% bei Auftragserteilung. Die Restzahlung ist fällig nach Fertigstellung und vor Übergabe der Website.",
      "Bei Zahlungsverzug ist der Anbieter berechtigt, die Arbeiten bis zur Zahlung auszusetzen.",
    ],
  },
  {
    title: "§ 5 Nutzungsrechte",
    content: [
      "Nach vollständiger Bezahlung erhält der Auftraggeber ein einfaches, zeitlich und räumlich unbeschränktes Nutzungsrecht an der erstellten Website.",
      "Der Anbieter behält sich vor, das Projekt in seiner Portfolio-Präsentation zu zeigen, sofern nicht anders vereinbart.",
      "Der Quellcode bleibt Eigentum des Anbieters, soweit nicht ausdrücklich anders vereinbart.",
    ],
  },
  {
    title: "§ 6 Gewährleistung",
    content: [
      "Der Anbieter gewährleistet die ordnungsgemäße Funktionsfähigkeit der erstellten Website für 6 Monate nach Übergabe.",
      "Mängel, die innerhalb dieser Frist auftreten, werden vom Anbieter kostenlos behoben.",
      "Keine Gewährleistung besteht für Mängel, die auf Änderungen durch den Auftraggeber oder Dritte zurückzuführen sind.",
    ],
  },
  {
    title: "§ 7 Haftung",
    content: [
      "Der Anbieter haftet nur für vorsätzliches oder grob fahrlässiges Verhalten.",
      "Die Haftung für leichte Fahrlässigkeit ist auf vertragstypische, vorhersehbare Schäden begrenzt.",
      "Der Anbieter haftet nicht für Inhalte, die vom Auftraggeber bereitgestellt werden.",
    ],
  },
  {
    title: "§ 8 Kündigung",
    content: [
      "Beide Parteien können den Vertrag aus wichtigem Grund kündigen.",
      "Der Auftraggeber kann den Vertrag jederzeit ohne Angabe von Gründen kündigen. Bereits erbrachte Leistungen sind zu vergüten.",
      "Bei Kündigung durch den Auftraggeber behält dieser keinen Anspruch auf bereits geleistete Anzahlungen.",
    ],
  },
  {
    title: "§ 9 Datenschutz",
    content: [
      "Der Anbieter verarbeitet personenbezogene Daten des Auftraggebers nur zur Erfüllung des Vertrags.",
      "Einzelheiten zur Datenverarbeitung sind der Datenschutzerklärung zu entnehmen.",
    ],
  },
  {
    title: "§ 10 Schlussbestimmungen",
    content: [
      "Es gilt das Recht der Bundesrepublik Deutschland.",
      "Gerichtsstand ist, soweit gesetzlich zulässig, der Sitz des Anbieters (Waldkraiburg).",
      "Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt der Vertrag im Übrigen wirksam.",
    ],
  },
];

export default function AGBPage() {
  return (
    <section className="min-h-screen px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
            AGB
          </span>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            <span className="text-[#2997ff]">Allgemeine</span> Geschäftsbedingungen.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/55 sm:text-base">
            Die verbindlichen Bedingungen für unsere Zusammenarbeit.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5">
          {agbSections.map((section, index) => (
            <div
              key={section.title}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-7"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <h2 className="text-lg font-semibold text-[#2997ff] sm:text-xl">{section.title}</h2>
              <div className="mt-4 space-y-2 text-sm leading-6 text-white/65 sm:text-base">
                {section.content.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/38">Stand: März 2026</p>
      </div>
    </section>
  );
}
