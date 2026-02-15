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
            <img src="/images/logo.png" alt="AI Practitioner" className="w-8 h-8" />
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

          <h1 className="text-4xl font-semibold mb-8">Datenschutzerklärung</h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <p>
                Wir freuen uns sehr über Ihr Interesse an unserem Unternehmen. Datenschutz hat einen besonders hohen Stellenwert für die Geschäftsleitung der Purple Zebra Consulting. Eine Nutzung der Internetseiten der Purple Zebra Consulting ist grundsätzlich ohne jede Angabe personenbezogener Daten möglich. Sofern eine betroffene Person besondere Services unseres Unternehmens über unsere Internetseite in Anspruch nehmen möchte, könnte jedoch eine Verarbeitung personenbezogener Daten erforderlich werden. Ist die Verarbeitung personenbezogener Daten erforderlich und besteht für eine solche Verarbeitung keine gesetzliche Grundlage, holen wir generell eine Einwilligung der betroffenen Person ein.
              </p>
              <p>
                Die Verarbeitung personenbezogener Daten, beispielsweise des Namens, der Anschrift, E-Mail-Adresse oder Telefonnummer einer betroffenen Person, erfolgt stets im Einklang mit der Datenschutz-Grundverordnung und in Übereinstimmung mit den für die Purple Zebra Consulting geltenden landesspezifischen Datenschutzbestimmungen. Mittels dieser Datenschutzerklärung möchte unser Unternehmen die Öffentlichkeit über Art, Umfang und Zweck der von uns erhobenen, genutzten und verarbeiteten personenbezogenen Daten informieren. Ferner werden betroffene Personen mittels dieser Datenschutzerklärung über die ihnen zustehenden Rechte aufgeklärt.
              </p>
              <p>
                Die Purple Zebra Consulting hat als für die Verarbeitung Verantwortlicher zahlreiche technische und organisatorische Maßnahmen umgesetzt, um einen möglichst lückenlosen Schutz der über diese Internetseite verarbeiteten personenbezogenen Daten sicherzustellen. Dennoch können Internetbasierte Datenübertragungen grundsätzlich Sicherheitslücken aufweisen, sodass ein absoluter Schutz nicht gewährleistet werden kann. Aus diesem Grund steht es jeder betroffenen Person frei, personenbezogene Daten auch auf alternativen Wegen, beispielsweise telefonisch, an uns zu übermitteln.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Begriffsbestimmungen</h2>
              <p>
                Die Datenschutzerklärung der Purple Zebra Consulting beruht auf den Begrifflichkeiten, die durch den Europäischen Richtlinien- und Verordnungsgeber beim Erlass der Datenschutz-Grundverordnung (DS-GVO) verwendet wurden. Unsere Datenschutzerklärung soll sowohl für die Öffentlichkeit als auch für unsere Kunden und Geschäftspartner einfach lesbar und verständlich sein. Um dies zu gewährleisten, möchten wir vorab die verwendeten Begrifflichkeiten erläutern.
              </p>
              <p>Wir verwenden in dieser Datenschutzerklärung unter anderem die folgenden Begriffe:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Personenbezogene Daten:</strong> Personenbezogene Daten sind alle Informationen, die sich auf eine identifizierte oder identifizierbare natürliche Person beziehen.</li>
                <li><strong>Betroffene Person:</strong> Betroffene Person ist jede identifizierte oder identifizierbare natürliche Person, deren personenbezogene Daten von dem für die Verarbeitung Verantwortlichen verarbeitet werden.</li>
                <li><strong>Verarbeitung:</strong> Verarbeitung ist jeder mit oder ohne Hilfe automatisierter Verfahren ausgeführte Vorgang oder jede solche Vorgangsreihe im Zusammenhang mit personenbezogenen Daten.</li>
                <li><strong>Einschränkung der Verarbeitung:</strong> Einschränkung der Verarbeitung ist die Markierung gespeicherter personenbezogener Daten mit dem Ziel, ihre künftige Verarbeitung einzuschränken.</li>
                <li><strong>Profiling:</strong> Profiling ist jede Art der automatisierten Verarbeitung personenbezogener Daten, die darin besteht, dass diese personenbezogenen Daten verwendet werden, um bestimmte persönliche Aspekte zu bewerten.</li>
                <li><strong>Pseudonymisierung:</strong> Pseudonymisierung ist die Verarbeitung personenbezogener Daten in einer Weise, auf welche die personenbezogenen Daten ohne Hinzuziehung zusätzlicher Informationen nicht mehr einer spezifischen betroffenen Person zugeordnet werden können.</li>
                <li><strong>Verantwortlicher:</strong> Verantwortlicher ist die natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.</li>
                <li><strong>Auftragsverarbeiter:</strong> Auftragsverarbeiter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, die personenbezogene Daten im Auftrag des Verantwortlichen verarbeitet.</li>
                <li><strong>Empfänger:</strong> Empfänger ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle, der personenbezogene Daten offengelegt werden.</li>
                <li><strong>Dritter:</strong> Dritter ist eine natürliche oder juristische Person, Behörde, Einrichtung oder andere Stelle außer der betroffenen Person, dem Verantwortlichen, dem Auftragsverarbeiter und den Personen, die unter der unmittelbaren Verantwortung des Verantwortlichen oder des Auftragsverarbeiters befugt sind, die personenbezogenen Daten zu verarbeiten.</li>
                <li><strong>Einwilligung:</strong> Einwilligung ist jede von der betroffenen Person freiwillig für den bestimmten Fall in informierter Weise und unmissverständlich abgegebene Willensbekundung.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Name und Anschrift des für die Verarbeitung Verantwortlichen</h2>
              <p>
                Verantwortlicher im Sinne der Datenschutz-Grundverordnung, sonstiger in den Mitgliedstaaten der Europäischen Union geltenden Datenschutzgesetze und anderer Bestimmungen mit datenschutzrechtlichem Charakter ist die:
              </p>
              <p>
                <strong>Purple Zebra Consulting</strong><br />
                Keemia 4<br />
                10616 Tallinn<br />
                Estland
              </p>
              <p>
                E-Mail: management@purplezebraconsulting.com<br />
                Website: www.purplezebraconsulting.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Cookies</h2>
              <p>
                Die Internetseiten der Purple Zebra Consulting verwenden Cookies. Cookies sind Textdateien, welche über einen Internetbrowser auf einem Computersystem abgelegt und gespeichert werden.
              </p>
              <p>
                Zahlreiche Internetseiten und Server verwenden Cookies. Viele Cookies enthalten eine sogenannte Cookie-ID. Eine Cookie-ID ist eine eindeutige Kennung des Cookies. Sie besteht aus einer Zeichenfolge, durch welche Internetseiten und Server dem konkreten Internetbrowser zugeordnet werden können, in dem das Cookie gespeichert wurde. Dies ermöglicht es den besuchten Internetseiten und Servern, den individuellen Browser der betroffenen Person von anderen Internetbrowsern, die andere Cookies enthalten, zu unterscheiden.
              </p>
              <p>
                Durch den Einsatz von Cookies kann die Purple Zebra Consulting den Nutzern dieser Internetseite nutzerfreundlichere Services bereitstellen, die ohne die Cookie-Setzung nicht möglich wären.
              </p>
              <p>
                Die betroffene Person kann die Setzung von Cookies durch unsere Internetseite jederzeit mittels einer entsprechenden Einstellung des genutzten Internetbrowsers verhindern und damit der Setzung von Cookies dauerhaft widersprechen. Ferner können bereits gesetzte Cookies jederzeit über einen Internetbrowser oder andere Softwareprogramme gelöscht werden. Deaktiviert die betroffene Person die Setzung von Cookies in dem genutzten Internetbrowser, sind unter Umständen nicht alle Funktionen unserer Internetseite vollumfänglich nutzbar.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Erfassung von allgemeinen Daten und Informationen</h2>
              <p>
                Die Internetseite der Purple Zebra Consulting erfasst mit jedem Aufruf der Internetseite durch eine betroffene Person oder ein automatisiertes System eine Reihe von allgemeinen Daten und Informationen. Diese allgemeinen Daten und Informationen werden in den Logfiles des Servers gespeichert. Erfasst werden können die (1) verwendeten Browsertypen und Versionen, (2) das vom zugreifenden System verwendete Betriebssystem, (3) die Internetseite, von welcher ein zugreifendes System auf unsere Internetseite gelangt (sogenannte Referrer), (4) die Unterwebseiten, (5) das Datum und die Uhrzeit eines Zugriffs auf die Internetseite, (6) eine Internet-Protokoll-Adresse (IP-Adresse), (7) der Internet-Service-Provider des zugreifenden Systems und (8) sonstige ähnliche Daten und Informationen, die der Gefahrenabwehr im Falle von Angriffen auf unsere informationstechnologischen Systeme dienen.
              </p>
              <p>
                Bei der Nutzung dieser allgemeinen Daten und Informationen zieht die Purple Zebra Consulting keine Rückschlüsse auf die betroffene Person. Diese Informationen werden vielmehr benötigt, um (1) die Inhalte unserer Internetseite korrekt auszuliefern, (2) die Inhalte unserer Internetseite sowie die Werbung für diese zu optimieren, (3) die dauerhafte Funktionsfähigkeit unserer informationstechnologischen Systeme und der Technik unserer Internetseite zu gewährleisten sowie (4) um Strafverfolgungsbehörden im Falle eines Cyberangriffes die zur Strafverfolgung notwendigen Informationen bereitzustellen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Registrierung auf unserer Internetseite</h2>
              <p>
                Die betroffene Person hat die Möglichkeit, sich auf der Internetseite des für die Verarbeitung Verantwortlichen unter Angabe von personenbezogenen Daten zu registrieren. Welche personenbezogenen Daten dabei an den für die Verarbeitung Verantwortlichen übermittelt werden, ergibt sich aus der jeweiligen Eingabemaske, die für die Registrierung verwendet wird. Die von der betroffenen Person eingegebenen personenbezogenen Daten werden ausschließlich für die interne Verwendung bei dem für die Verarbeitung Verantwortlichen und für eigene Zwecke erhoben und gespeichert.
              </p>
              <p>
                Der für die Verarbeitung Verantwortliche erteilt jeder betroffenen Person jederzeit auf Anfrage Auskunft darüber, welche personenbezogenen Daten über die betroffene Person gespeichert sind. Ferner berichtigt oder löscht der für die Verarbeitung Verantwortliche personenbezogene Daten auf Wunsch oder Hinweis der betroffenen Person, soweit dem keine gesetzlichen Aufbewahrungspflichten entgegenstehen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Abonnement unseres Newsletters</h2>
              <p>
                Auf der Internetseite der Purple Zebra Consulting wird den Benutzern die Möglichkeit eingeräumt, den Newsletter unseres Unternehmens zu abonnieren. Die Purple Zebra Consulting informiert ihre Kunden und Geschäftspartner in regelmäßigen Abständen im Wege eines Newsletters über Angebote des Unternehmens.
              </p>
              <p>
                Die im Rahmen einer Anmeldung zum Newsletter erhobenen personenbezogenen Daten werden ausschließlich zum Versand unseres Newsletters verwendet. Das Abonnement unseres Newsletters kann durch die betroffene Person jederzeit gekündigt werden. Die Einwilligung in die Speicherung personenbezogener Daten, die die betroffene Person uns für den Newsletterversand erteilt hat, kann jederzeit widerrufen werden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Newsletter-Tracking</h2>
              <p>
                Die Newsletter der Purple Zebra Consulting enthalten sogenannte Zählpixel. Ein Zählpixel ist eine Miniaturgrafik, die in solche E-Mails eingebettet wird, welche im HTML-Format versendet werden, um eine Logdatei-Aufzeichnung und eine Logdatei-Analyse zu ermöglichen. Dadurch kann eine statistische Auswertung des Erfolges oder Misserfolges von Online-Marketing-Kampagnen durchgeführt werden.
              </p>
              <p>
                Solche über die in den Newslettern enthaltenen Zählpixel erhobenen personenbezogenen Daten werden von dem für die Verarbeitung Verantwortlichen gespeichert und ausgewertet, um den Newsletterversand zu optimieren und den Inhalt zukünftiger Newsletter noch besser den Interessen der betroffenen Person anzupassen. Diese personenbezogenen Daten werden nicht an Dritte weitergegeben.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Kontaktmöglichkeit über die Internetseite</h2>
              <p>
                Die Internetseite der Purple Zebra Consulting enthält aufgrund von gesetzlichen Vorschriften Angaben, die eine schnelle elektronische Kontaktaufnahme zu unserem Unternehmen sowie eine unmittelbare Kommunikation mit uns ermöglichen. Sofern eine betroffene Person per E-Mail oder über ein Kontaktformular den Kontakt mit dem für die Verarbeitung Verantwortlichen aufnimmt, werden die von der betroffenen Person übermittelten personenbezogenen Daten automatisch gespeichert. Es erfolgt keine Weitergabe dieser personenbezogenen Daten an Dritte.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Kommentarfunktion im Blog auf der Internetseite</h2>
              <p>
                Die Purple Zebra Consulting bietet den Nutzern auf einem Blog, der sich auf der Internetseite des für die Verarbeitung Verantwortlichen befindet, die Möglichkeit, individuelle Kommentare zu einzelnen Blog-Beiträgen zu hinterlassen.
              </p>
              <p>
                Hinterlässt eine betroffene Person einen Kommentar in dem auf dieser Internetseite veröffentlichten Blog, werden neben den von der betroffenen Person hinterlassenen Kommentaren auch Angaben zum Zeitpunkt der Kommentareingabe sowie zu dem von der betroffenen Person gewählten Nutzernamen (Pseudonym) gespeichert und veröffentlicht. Ferner wird die vom Internet-Service-Provider (ISP) der betroffenen Person vergebene IP-Adresse mitprotokolliert. Diese Speicherung der IP-Adresse erfolgt aus Sicherheitsgründen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Abonnement von Kommentaren im Blog auf der Internetseite</h2>
              <p>
                Die im Blog der Purple Zebra Consulting abgegebenen Kommentare können grundsätzlich von Dritten abonniert werden. Insbesondere besteht die Möglichkeit, dass ein Kommentator die seinem Kommentar nachfolgenden Kommentare zu einem bestimmten Blog-Beitrag abonniert.
              </p>
              <p>
                Sofern sich eine betroffene Person für die Option entscheidet, Kommentare zu abonnieren, versendet der für die Verarbeitung Verantwortliche eine automatische Bestätigungsmail, um im Double-Opt-In-Verfahren zu überprüfen, ob sich wirklich der Inhaber der angegebenen E-Mail-Adresse für diese Option entschieden hat. Die Option zum Abonnement von Kommentaren kann jederzeit beendet werden.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Routinemäßige Löschung und Sperrung von personenbezogenen Daten</h2>
              <p>
                Der für die Verarbeitung Verantwortliche verarbeitet und speichert personenbezogene Daten der betroffenen Person nur für den Zeitraum, der zur Erreichung des Speicherungszwecks erforderlich ist oder sofern dies durch den Europäischen Richtlinien- und Verordnungsgeber oder einen anderen Gesetzgeber in Gesetzen oder Vorschriften, welchen der für die Verarbeitung Verantwortliche unterliegt, vorgesehen wurde.
              </p>
              <p>
                Entfällt der Speicherungszweck oder läuft eine vom Europäischen Richtlinien- und Verordnungsgeber oder einem anderen zuständigen Gesetzgeber vorgeschriebene Speicherfrist ab, werden die personenbezogenen Daten routinemäßig und entsprechend den gesetzlichen Vorschriften gesperrt oder gelöscht.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Rechte der betroffenen Person</h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Recht auf Bestätigung:</strong> Jede betroffene Person hat das Recht, von dem für die Verarbeitung Verantwortlichen eine Bestätigung darüber zu verlangen, ob sie betreffende personenbezogene Daten verarbeitet werden.</li>
                <li><strong>Recht auf Auskunft:</strong> Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, jederzeit von dem für die Verarbeitung Verantwortlichen unentgeltliche Auskunft über die zu seiner Person gespeicherten personenbezogenen Daten und eine Kopie dieser Auskunft zu erhalten.</li>
                <li><strong>Recht auf Berichtigung:</strong> Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, die unverzügliche Berichtigung sie betreffender unrichtiger personenbezogener Daten zu verlangen.</li>
                <li><strong>Recht auf Löschung (Recht auf Vergessen werden):</strong> Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, von dem Verantwortlichen zu verlangen, dass die sie betreffenden personenbezogenen Daten unverzüglich gelöscht werden, sofern einer der gesetzlichen Gründe zutrifft.</li>
                <li><strong>Recht auf Einschränkung der Verarbeitung:</strong> Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, von dem Verantwortlichen die Einschränkung der Verarbeitung zu verlangen, wenn eine der gesetzlichen Voraussetzungen gegeben ist.</li>
                <li><strong>Recht auf Datenübertragbarkeit:</strong> Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, die sie betreffenden personenbezogenen Daten in einem strukturierten, gängigen und maschinenlesbaren Format zu erhalten.</li>
                <li><strong>Recht auf Widerspruch:</strong> Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, aus Gründen, die sich aus ihrer besonderen Situation ergeben, jederzeit gegen die Verarbeitung sie betreffender personenbezogener Daten Widerspruch einzulegen.</li>
                <li><strong>Automatisierte Entscheidungen im Einzelfall einschließlich Profiling:</strong> Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, nicht einer ausschließlich auf einer automatisierten Verarbeitung beruhenden Entscheidung unterworfen zu werden.</li>
                <li><strong>Recht auf Widerruf einer datenschutzrechtlichen Einwilligung:</strong> Jede von der Verarbeitung personenbezogener Daten betroffene Person hat das Recht, eine Einwilligung zur Verarbeitung personenbezogener Daten jederzeit zu widerrufen.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Datenschutz bei Bewerbungen und im Bewerbungsverfahren</h2>
              <p>
                Der für die Verarbeitung Verantwortliche erhebt und verarbeitet die personenbezogenen Daten von Bewerbern zum Zwecke der Abwicklung des Bewerbungsverfahrens. Die Verarbeitung kann auch auf elektronischem Wege erfolgen. Wird von dem für die Verarbeitung Verantwortlichen kein Anstellungsvertrag mit dem Bewerber geschlossen, so werden die Bewerbungsunterlagen zwei Monate nach Bekanntgabe der Absageentscheidung automatisch gelöscht, sofern einer Löschung keine sonstigen berechtigten Interessen des für die Verarbeitung Verantwortlichen entgegenstehen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Rechtsgrundlage der Verarbeitung</h2>
              <p>
                Art. 6 I lit. a DS-GVO dient unserem Unternehmen als Rechtsgrundlage für Verarbeitungsvorgänge, bei denen wir eine Einwilligung für einen bestimmten Verarbeitungszweck einholen. Ist die Verarbeitung personenbezogener Daten zur Erfüllung eines Vertrags, dessen Vertragspartei die betroffene Person ist, erforderlich, so beruht die Verarbeitung auf Art. 6 I lit. b DS-GVO. Unterliegt unser Unternehmen einer rechtlichen Verpflichtung durch welche eine Verarbeitung von personenbezogenen Daten erforderlich wird, so basiert die Verarbeitung auf Art. 6 I lit. c DS-GVO. Letztlich könnten Verarbeitungsvorgänge auf Art. 6 I lit. f DS-GVO beruhen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Berechtigte Interessen an der Verarbeitung</h2>
              <p>
                Basiert die Verarbeitung personenbezogener Daten auf Artikel 6 I lit. f DS-GVO ist unser berechtigtes Interesse die Durchführung unserer Geschäftstätigkeit zugunsten des Wohlergehens all unserer Mitarbeiter und unserer Anteilseigner.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Dauer, für die die personenbezogenen Daten gespeichert werden</h2>
              <p>
                Das Kriterium für die Dauer der Speicherung von personenbezogenen Daten ist die jeweilige gesetzliche Aufbewahrungsfrist. Nach Ablauf der Frist werden die entsprechenden Daten routinemäßig gelöscht, sofern sie nicht mehr zur Vertragserfüllung oder Vertragsanbahnung erforderlich sind.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Gesetzliche oder vertragliche Vorschriften zur Bereitstellung der personenbezogenen Daten</h2>
              <p>
                Wir klären Sie darüber auf, dass die Bereitstellung personenbezogener Daten zum Teil gesetzlich vorgeschrieben ist (z.B. Steuervorschriften) oder sich auch aus vertraglichen Regelungen (z.B. Angaben zum Vertragspartner) ergeben kann. Mitunter kann es zu einem Vertragsschluss erforderlich sein, dass eine betroffene Person uns personenbezogene Daten zur Verfügung stellt, die in der Folge durch uns verarbeitet werden müssen.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">18. Bestehen einer automatisierten Entscheidungsfindung</h2>
              <p>
                Als verantwortungsbewusstes Unternehmen verzichten wir auf eine automatische Entscheidungsfindung oder ein Profiling.
              </p>
            </section>

            <section className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Diese Datenschutzerklärung wurde durch den Datenschutzerklärungs-Generator der DGD Deutsche Gesellschaft für Datenschutz GmbH, die als{" "}
                <a href="https://dg-datenschutz.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Externer Datenschutzbeauftragter Hamburg
                </a>{" "}
                tätig ist, in Kooperation mit dem{" "}
                <a href="https://www.wbs-law.de/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  Kölner IT- und Datenschutz Anwalt Christian Solmecke
                </a>{" "}
                erstellt.
              </p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
