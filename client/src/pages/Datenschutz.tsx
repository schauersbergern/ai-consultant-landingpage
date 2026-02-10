import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";

export default function Datenschutz() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <nav className="fixed top-0 w-full z-50 border-b border-white/20" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
      }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/XjvoXOCMszZFXAGc.png" alt="AI Practitioner" className="w-8 h-8" />
            <span className="font-semibold text-lg">AI Practitioner</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition">Startseite</a>
            <a href="/blog" className="text-gray-600 hover:text-gray-900 transition">Blog</a>
          </div>
        </div>
      </nav>

      <article className="pt-28 pb-16 px-4">
        <div className="container max-w-3xl mx-auto">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zur Startseite
          </Button>

          <h1 className="text-4xl font-semibold mb-8">Datenschutzerkl&auml;rung</h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Datenschutz auf einen Blick</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Allgemeine Hinweise</h3>
              <p>
                Die folgenden Hinweise geben einen einfachen Ueberblick darueber, was mit Ihren personenbezogenen Daten
                passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie
                persoenlich identifiziert werden koennen.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Datenerfassung auf dieser Website</h3>
              <p>
                <strong>Wer ist verantwortlich fuer die Datenerfassung auf dieser Website?</strong><br />
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten
                koennen Sie dem Abschnitt &bdquo;Hinweis zur verantwortlichen Stelle&ldquo; in dieser Datenschutzerklaerung entnehmen.
              </p>
              <p>
                <strong>Wie erfassen wir Ihre Daten?</strong><br />
                Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um
                Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer
                Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten
                (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
              </p>
              <p>
                <strong>Wofuer nutzen wir Ihre Daten?</strong><br />
                Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewaehrleisten. Andere
                Daten koennen zur Analyse Ihres Nutzerverhaltens verwendet werden.
              </p>
              <p>
                <strong>Welche Rechte haben Sie bezueglich Ihrer Daten?</strong><br />
                Sie haben jederzeit das Recht, unentgeltlich Auskunft ueber Herkunft, Empfaenger und Zweck Ihrer
                gespeicherten personenbezogenen Daten zu erhalten. Sie haben ausserdem ein Recht, die Berichtigung oder
                Loeschung dieser Daten zu verlangen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Hosting</h2>
              <p>
                Wir hosten die Inhalte unserer Website bei folgendem Anbieter:
              </p>
              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-4">Externes Hosting</h3>
              <p>
                Diese Website wird extern gehostet. Die personenbezogenen Daten, die auf dieser Website erfasst werden,
                werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v.a. um IP-Adressen,
                Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe
                und sonstige Daten, die ueber eine Website generiert werden, handeln.
              </p>
              <p>
                Das externe Hosting erfolgt zum Zwecke der Vertragserfuellung gegenueber unseren potenziellen und
                bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und
                effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1
                lit. f DSGVO).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Allgemeine Hinweise und Pflichtinformationen</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Datenschutz</h3>
              <p>
                Die Betreiber dieser Seiten nehmen den Schutz Ihrer persoenlichen Daten sehr ernst. Wir behandeln Ihre
                personenbezogenen Daten vertraulich und entsprechend den gesetzlichen Datenschutzvorschriften sowie
                dieser Datenschutzerklaerung.
              </p>
              <p>
                Wir weisen darauf hin, dass die Datenuebertragung im Internet (z.B. bei der Kommunikation per E-Mail)
                Sicherheitsluecken aufweisen kann. Ein lueckenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht
                moeglich.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Hinweis zur verantwortlichen Stelle</h3>
              <p>
                Die verantwortliche Stelle fuer die Datenverarbeitung auf dieser Website ist:
              </p>
              <p>
                [Name des Unternehmens / Einzelunternehmers]<br />
                [Vor- und Nachname]<br />
                [Strasse und Hausnummer]<br />
                [PLZ und Ort]
              </p>
              <p>
                Telefon: [Telefonnummer]<br />
                E-Mail: [E-Mail-Adresse]
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Speicherdauer</h3>
              <p>
                Soweit innerhalb dieser Datenschutzerklaerung keine speziellere Speicherdauer genannt wurde, verbleiben
                Ihre personenbezogenen Daten bei uns, bis der Zweck fuer die Datenverarbeitung entfaellt. Wenn Sie ein
                berechtigtes Loeschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen,
                werden Ihre Daten geloescht, sofern wir keine anderen rechtlich zulaessigen Gruende fuer die Speicherung
                Ihrer personenbezogenen Daten haben.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
              <p>
                Viele Datenverarbeitungsvorgaenge sind nur mit Ihrer ausdruecklichen Einwilligung moeglich. Sie koennen eine
                bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmaessigkeit der bis zum Widerruf erfolgten
                Datenverarbeitung bleibt vom Widerruf unberuehrt.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Recht auf Datenuebertragbarkeit</h3>
              <p>
                Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfuellung eines Vertrags
                automatisiert verarbeiten, an sich oder an einen Dritten in einem gaengigen, maschinenlesbaren Format
                aushaendigen zu lassen.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Auskunft, Loeschung und Berichtigung</h3>
              <p>
                Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                Auskunft ueber Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfaenger und den Zweck
                der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Loeschung dieser Daten.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Datenerfassung auf dieser Website</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Cookies</h3>
              <p>
                Unsere Internetseiten verwenden so genannte Cookies. Cookies sind kleine Datenpakete und richten auf
                Ihrem Endgeraet keinen Schaden an. Sie werden entweder voruebergehend fuer die Dauer einer Sitzung
                (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgeraet gespeichert.
              </p>
              <p>
                Cookies, die zur Durchfuehrung des elektronischen Kommunikationsvorgangs, zur Bereitstellung bestimmter,
                von Ihnen erwuenschter Funktionen oder zur Optimierung der Website erforderlich sind, werden auf
                Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">Server-Log-Dateien</h3>
              <p>
                Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien,
                die Ihr Browser automatisch an uns uebermittelt. Dies sind: Browsertyp und Browserversion, verwendetes
                Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und
                IP-Adresse.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Analyse-Tools und Werbung</h2>
              <p>
                Auf dieser Website werden derzeit keine Analyse-Tools oder Werbetracker eingesetzt. Sollte sich dies
                aendern, wird diese Datenschutzerklaerung entsprechend aktualisiert.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Newsletter</h2>
              <p>
                Wenn Sie den auf der Website angebotenen Newsletter beziehen moechten, benoetigen wir von Ihnen eine
                E-Mail-Adresse sowie Informationen, welche uns die Ueberpruefung gestatten, dass Sie der Inhaber der
                angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind.
              </p>
              <p>
                Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschliesslich auf
                Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der
                Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters koennen Sie jederzeit
                widerrufen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Plugins und Tools</h2>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">YouTube mit erweitertem Datenschutz</h3>
              <p>
                Diese Website bindet Videos der Website YouTube ein. Betreiber der Seiten ist die Google Ireland Limited
                (Google), Gordon House, Barrow Street, Dublin 4, Irland.
              </p>
              <p>
                Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt laut YouTube, dass YouTube
                keine Informationen ueber die Besucher auf dieser Website speichert, bevor diese sich das Video ansehen.
              </p>
              <p>
                Weitere Informationen ueber Datenschutz bei YouTube finden Sie in deren Datenschutzerklaerung unter:{" "}
                <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  https://policies.google.com/privacy
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Aenderung dieser Datenschutzerklaerung</h2>
              <p>
                Wir behalten uns vor, diese Datenschutzerklaerung anzupassen, damit sie stets den aktuellen rechtlichen
                Anforderungen entspricht oder um Aenderungen unserer Leistungen in der Datenschutzerklaerung umzusetzen.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Stand: Februar 2026
              </p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
