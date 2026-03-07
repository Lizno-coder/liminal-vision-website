export const metadata = {
  title: "Datenschutz | Liminal Vision",
  description: "Datenschutzerklärung von Liminal Vision. Ihre Daten sind bei uns sicher.",
};

export default function DatenschutzPage() {
  return (
    <section className="min-h-screen pt-32 pb-20">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto">
          <h1 className="heading-1 mb-4">
            Datenschutz-<span className="gradient-text">erklärung</span>
          </h1>
          <p className="text-gray-400 mb-12">
            Ihre Privatsphäre ist uns wichtig. Hier erfahren Sie, wie wir mit Ihren Daten umgehen.
          </p>

          <div className="space-y-8">
            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-lg font-medium text-blue-400 mb-2">Allgemeine Hinweise</h3>
              <p className="text-gray-300">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">2. Verantwortlicher</h2>
              <p className="text-gray-300">
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
              <p className="text-gray-300 mt-4">
                E-Mail:{" "}
                <a href="mailto:liz.claw@gmx.de" className="text-blue-400 hover:underline">
                  liz.claw@gmx.de
                </a>
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">3. Datenerfassung auf dieser Website</h2>
              <h3 className="text-lg font-medium text-blue-400 mb-2 mt-4">Kontaktformular</h3>
              <p className="text-gray-300">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben
                inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage
                bei uns gespeichert.
              </p>

              <h3 className="text-lg font-medium text-blue-400 mb-2 mt-4">Anfrage per E-Mail</h3>
              <p className="text-gray-300">
                Wenn Sie uns per E-Mail kontaktieren, wird Ihre Anfrage inklusive aller
                personenbezogenen Daten zum Zwecke der Bearbeitung Ihres Anliegens bei uns
                gespeichert und verarbeitet.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">4. Hosting</h2>
              <p className="text-gray-300">
                Diese Website wird bei <strong className="text-white">Vercel</strong> gehostet.
                Anbieter ist Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA.
              </p>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">5. Ihre Rechte</h2>
              <p className="text-gray-300">Sie haben jederzeit das Recht:</p>
              <ul className="list-disc list-inside text-gray-300 mt-2 space-y-1">
                <li>Auskunft über Ihre bei uns gespeicherten Daten zu erhalten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
                <li>Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung zu verlangen (Art. 18 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung einzulegen (Art. 21 DSGVO)</li>
              </ul>
            </div>

            <div className="glass rounded-2xl p-8">
              <h2 className="text-xl font-semibold mb-4">6. Cookies & Tracking</h2>
              <p className="text-gray-300">
                Diese Website verwendet keine Tracking-Cookies. Wir setzen keine Analyse-Tools wie
                Google Analytics ein.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center glass rounded-2xl p-8">
            <h3 className="text-lg font-semibold mb-2">Fragen zum Datenschutz?</h3>
            <p className="text-gray-400 mb-4">
              Bei Fragen zum Datenschutz können Sie sich jederzeit an uns wenden.
            </p>
            <a href="mailto:liz.claw@gmx.de" className="btn btn-primary">
              liz.claw@gmx.de
            </a>
          </div>

          <p className="text-gray-500 text-sm mt-8 text-center">Stand: März 2025</p>
        </div>
      </div>
    </section>
  );
}
