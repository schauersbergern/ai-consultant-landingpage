import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PublicSiteFooter } from "@/components/PublicSiteFooter";
import { PublicSiteHeader } from "@/components/PublicSiteHeader";
import { PageSeo } from "@/ssr/head";
import {
  CONTACT_EMAIL,
  getOrganizationJsonLd,
  getTrainerPageJsonLd,
  getWebsiteJsonLd,
  trainerProfiles,
} from "@/site-content";
import { useRequestInfo } from "@/ssr/request-info";

const navItems = [
  { href: "/", label: "Startseite" },
  { href: "/blog", label: "Blog" },
];

export default function Trainer() {
  const requestInfo = useRequestInfo();
  const jsonLd = [
    getOrganizationJsonLd(requestInfo.origin),
    getWebsiteJsonLd(requestInfo.origin),
    ...getTrainerPageJsonLd(requestInfo.origin),
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <PageSeo
        title="Deine Trainer | AI Practitioner"
        description="Lerne die Trainer hinter der AI Practitioner Weiterbildung kennen: technische Leitung, didaktische Führung und direkte Betreuung jeder Kohorte."
        canonicalPath="/trainer"
        ogImage={trainerProfiles[0]?.image}
        jsonLd={jsonLd}
      />

      <PublicSiteHeader items={navItems} />

      <main>
        <section className="relative overflow-hidden px-4 pb-16 pt-32">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute left-1/2 top-8 h-72 w-72 -translate-x-[120%] rounded-full bg-blue-100/70 blur-3xl" />
            <div className="absolute bottom-0 right-1/2 h-80 w-80 translate-x-[120%] rounded-full bg-sky-100/80 blur-3xl" />
          </div>

          <div className="container relative z-10 max-w-5xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-sm font-medium text-blue-700 shadow-sm backdrop-blur-sm">
              <CheckCircle2 className="h-4 w-4" />
              Persönliche Betreuung statt anonymer Kursplattform
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight md:text-6xl">
              Die Köpfe hinter deiner KI-Weiterbildung
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
              Jede Kohorte wird von erfahrenen Praktikern begleitet, die technische Umsetzung,
              Live-Sessions und direktes Feedback zu deinen Projektaufgaben verantworten.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="container mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
            {trainerProfiles.map(trainer => (
              <article
                id={trainer.id}
                key={trainer.id}
                className="card-glass rounded-[2rem] px-8 py-10 md:px-10"
              >
                <div className="mb-8 flex flex-col items-center text-center">
                  <div className="relative mb-6 h-48 w-48">
                    <div className="absolute inset-0 scale-105 rounded-[2rem] bg-gradient-to-br from-blue-200/70 via-white to-sky-100/80 blur-2xl" />
                    <img
                      src={trainer.image}
                      alt={`${trainer.name} Portrait`}
                      className="relative h-full w-full rounded-[2rem] object-cover shadow-[0_20px_60px_rgba(15,23,42,0.18)]"
                      width="192"
                      height="192"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
                    {trainer.role}
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold">{trainer.name}</h2>
                </div>

                <p className="text-lg leading-relaxed text-gray-600">
                  {trainer.shortBio}
                </p>

                <div className="mt-8">
                  <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-500">
                    Fokus in der Ausbildung
                  </h3>
                  <ul className="mt-4 space-y-3 text-gray-700">
                    {trainer.specialties.map(item => (
                      <li key={item} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-premium px-4 py-20">
          <div className="container max-w-4xl text-center">
            <h2 className="text-4xl font-semibold md:text-5xl">
              Direkter Kontakt, klare Verantwortung
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-xl text-gray-600">
              Fragen zur Weiterbildung, zur IHK-Struktur oder zum Ablauf beantworten wir nicht
              anonym, sondern persönlich.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <a href={`mailto:${CONTACT_EMAIL}`}>
                <Button className="btn-apple px-8 py-4 text-lg">
                  Kontakt aufnehmen
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <a href="/impressum">
                <Button variant="outline" className="px-8 py-4 text-lg">
                  Zum Impressum
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      <PublicSiteFooter />
    </div>
  );
}
