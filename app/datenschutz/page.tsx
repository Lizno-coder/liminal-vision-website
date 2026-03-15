export const metadata = {
  title: "Datenschutz | Liminalo",
  description: "Datenschutzerklärung von Liminalo.",
};

const sections = [
  {
    title: "1. Verantwortlicher",
    paragraphs: [
      "Verantwortlich für die Datenverarbeitung auf dieser Website ist:",
      "Noel Liessel, Liminalo, Graf-zu-Toerring-Straße 10, 84478 Waldkraiburg, Deutschland",
      "E-Mail: business@liminalo.com | Telefon: 0174 6509061",
    ],
  },
  {
    title: "2. Hosting",
    paragraphs: [
      "Diese Website wird bei Vercel gehostet. Anbieter ist Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.",
      "Beim Aufruf der Website können technisch erforderliche Verbindungsdaten wie IP-Adresse, Datum und Uhrzeit, Browserinformationen sowie angeforderte Dateien verarbeitet werden, um den sicheren und stabilen Betrieb der Website zu gewährleisten.",
      "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an sicherer Bereitstellung der Website).",
    ],
  },
  {
    title: "3. Kontaktaufnahme",
    paragraphs: [
      "Wenn Sie uns per E-Mail oder über ein Kontaktformular kontaktieren, verarbeiten wir die von Ihnen übermittelten Angaben ausschließlich zur Bearbeitung Ihrer Anfrage und für mögliche Anschlussfragen.",
      "Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Anbahnung oder Durchführung eines Vertrags zusammenhängt, oder auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO bei allgemeinen Anfragen.",
    ],
  },
  {
    title: "4. Speicherdauer",
    paragraphs: [
      "Personenbezogene Daten werden nur so lange gespeichert, wie dies zur Bearbeitung Ihrer Anfrage erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen.",
    ],
  },
  {
    title: "5. Ihre Rechte",
    paragraphs: [
      "Sie haben das Recht auf Auskunft über Ihre gespeicherten personenbezogenen Daten, auf Berichtigung unrichtiger Daten, auf Löschung, auf Einschränkung der Verarbeitung sowie auf Widerspruch gegen die Verarbeitung im Rahmen der gesetzlichen Vorgaben.",
      "Außerdem haben Sie das Recht, sich bei einer zuständigen Datenschutz-Aufsichtsbehörde zu beschweren.",
    ],
  },
  {
    title: "6. Cookies und Analyse-Tools",
    paragraphs: [
      "Diese Website verwendet nach aktuellem Stand keine nicht notwendigen Cookies und keine Analyse- oder Tracking-Tools wie Google Analytics.",
    ],
  },
  {
    title: "7. SSL- bzw. TLS-Verschlüsselung",
    paragraphs: [
      "Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte eine SSL- bzw. TLS-Verschlüsselung.",
    ],
  },
];

export default function DatenschutzPage() {
  return (
    <section className="min-h-screen px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
            Datenschutz
          </span>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            <span className="text-[#2997ff]">Informationen</span> zum Umgang mit Ihren Daten.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/55 sm:text-base">
            Transparent, verständlich und auf das Wesentliche reduziert.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5">
          {sections.map((section, index) => (
            <div
              key={section.title}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-7"
              style={{ animationDelay: `${index * 70}ms` }}
            >
              <h2 className="text-lg font-semibold text-white sm:text-xl">{section.title}</h2>
              <div className="mt-4 space-y-3 text-sm leading-6 text-white/65 sm:text-base">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-7">
          <h2 className="text-lg font-semibold text-white sm:text-xl">Fragen zum Datenschutz?</h2>
          <p className="mt-3 text-sm leading-6 text-white/60 sm:text-base">
            Wenn Sie Fragen zur Verarbeitung Ihrer Daten haben, können Sie sich jederzeit per E-Mail an business@liminalo.com wenden.
          </p>
        </div>

        <p className="mt-8 text-sm text-white/38">Stand: März 2026</p>
      </div>
    </section>
  );
}
