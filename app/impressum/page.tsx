export const metadata = {
  title: "Impressum | Liminal Vision",
  description: "Impressum von Liminal Vision - Webdesign Agentur aus Waldkraiburg.",
};

export default function ImpressumPage() {
  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-12">Impressum</h1>

          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">Angaben gemäß § 5 TMG</h2>
              <p className="text-gray-300 leading-relaxed">
                <strong className="text-white">Liminal Vision</strong>
                <br />
                Noel [Nachname]
                <br />
                [Straße Hausnummer]
                <br />
                84478 Waldkraiburg
                <br />
                Deutschland
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">Kontakt</h2>
              <p className="text-gray-300">
                E-Mail:{" "}
                <a href="mailto:liz.claw@gmx.de" className="text-blue-400 hover:underline">
                  liz.claw@gmx.de
                </a>
                <br />
                Website:{" "}
                <a href="https://liminal-vision.de" className="text-blue-400 hover:underline">
                  www.liminal-vision.de
                </a>
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">Umsatzsteuer-ID</h2>
              <p className="text-gray-300">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
                <br />
                <span className="text-gray-500">
                  [Noch nicht umsatzsteuerpflichtig - Kleinunternehmer gemäß § 19 UStG]
                </span>
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">Streitschlichtung</h2>
              <p className="text-gray-300">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS)
                bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  https://ec.europa.eu/consumers/odr
                </a>
              </p>
              <p className="text-gray-300 mt-4">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </div>
          </div>

          <p className="text-gray-500 text-sm mt-12 text-center">Stand: März 2025</p>
        </div>
      </div>
    </section>
  );
}
