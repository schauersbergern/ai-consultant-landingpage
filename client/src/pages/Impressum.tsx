import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLocation } from "wouter";
import { PageSeo } from "@/ssr/head";

export default function Impressum() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen bg-white">
      <PageSeo
        title="Impressum | AI Practitioner"
        description="Impressum der AI Practitioner Ausbildung. Rechtliche Informationen und Kontaktmöglichkeiten."
        canonicalPath="/impressum"
      />
      {/* Navigation */}
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
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zur Startseite
          </Button>

          <h1 className="text-4xl font-semibold mb-8">Impressum</h1>

          <div className="prose prose-lg max-w-none text-gray-700 space-y-8">
            <section>
              <p>
                <strong>Pundamilia Marketing OÜ</strong><br />
                Keemia 4<br />
                10616 Tallinn<br />
                Estland
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontakt</h2>
              <p>
                E-Mail: management@purplezebraconsulting.com
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Vertreten durch</h2>
              <p>
                Markus Habermehl
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Registergericht, Registernummer</h2>
              <p>
                Registered as, 14885410
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Social Media Profile</h2>
              <p>
                Dieses Impressum gilt auch für folgende Social Media Profile:<br />
                <a href="https://www.facebook.com/kientdecken" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  https://www.facebook.com/kientdecken
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">EU-Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  https://ec.europa.eu/consumers/odr/
                </a>
              </p>
            </section>

            <section>
              <p className="text-sm text-gray-500">
                Quelle:{" "}
                <a href="https://www.ra-plutte.de/impressum-generator/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                  www.ra-plutte.de/impressum-generator/
                </a>
              </p>
            </section>
          </div>
        </div>
      </article>
    </div>
  );
}
