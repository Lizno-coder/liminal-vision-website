export const metadata = {
  title: "Impressum | Liminal Vision",
  description: "Impressum von Liminal Vision.",
};

const details = [
  {
    title: "Angaben gemäß § 5 TMG",
    content: [
      "Liminal Vision",
      "Inhaber: Noel Liessel",
      "Graf-zu-Toerring-Straße 10",
      "84478 Waldkraiburg",
      "Deutschland",
    ],
  },
  {
    title: "Kontakt",
    content: [
      "Telefon: 0174 6509061",
      "E-Mail: liz.claw@gmx.de",
      "Website: https://liminal-vision.vercel.app",
    ],
  },
  {
    title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    content: [
      "Noel Liessel",
      "Graf-zu-Toerring-Straße 10",
      "84478 Waldkraiburg",
    ],
  },
  {
    title: "Hinweis zur Streitbeilegung",
    content: [
      "Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: https://ec.europa.eu/consumers/odr/.",
      "Wir sind nicht verpflichtet und nicht bereit, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.",
    ],
  },
];

export default function ImpressumPage() {
  return (
    <section className="min-h-screen px-4 pb-20 pt-6 sm:px-6 lg:px-8 lg:pt-10">
      <div className="mx-auto max-w-5xl">
        <div className="mb-10 max-w-2xl">
          <span className="mb-4 inline-block rounded-full border border-[#2997ff]/30 bg-[#2997ff]/10 px-4 py-1.5 text-sm text-[#2997ff]">
            Impressum
          </span>
          <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white md:text-5xl">
            Rechtliche Angaben.
          </h1>
          <p className="mt-4 text-sm leading-6 text-white/55 sm:text-base">
            Alle Pflichtangaben zu Anbieter, Kontakt und Verantwortlichkeit auf einen Blick.
          </p>
        </div>

        <div className="grid gap-4 sm:gap-5">
          {details.map((section, index) => (
            <div
              key={section.title}
              className="rounded-[1.8rem] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl sm:p-7"
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <h2 className="text-lg font-semibold text-white sm:text-xl">{section.title}</h2>
              <div className="mt-4 space-y-2 text-sm leading-6 text-white/65 sm:text-base">
                {section.content.map((line) => (
                  <p key={line}>{line}</p>
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
