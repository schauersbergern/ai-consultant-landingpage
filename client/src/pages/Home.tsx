/**
 * AI Practitioner Landingpage - APPLE GLASMORPHISM DESIGN
 * 
 * Design-Philosophie:
 * - Glasmorphismus mit frosted glass Effekten
 * - Shiny, luxuriöse Optiken
 * - Durchsichtige, elegante Elemente
 * - Premium Animationen und Übergänge
 * - Minimalistische, aber opulente Ästhetik
 */

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import "@/glass.css";
import {
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { useEffect, useState, useCallback } from "react";
import { isTrackingAllowed } from "@/components/CookieConsent";

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    document.title = "KI-Weiterbildung mit IHK-Zertifikat | AI Practitioner";

    // Schema.org Course Schema
    const courseSchema = {
      "@context": "https://schema.org",
      "@type": "Course",
      "name": "KI-Automatisierungsexperte (IHK) – AI Practitioner Weiterbildung",
      "description": "In 13 Wochen zum IHK-zertifizierten KI-Experten. Lerne KI-Automatisierung mit Chatbots, RAG-Systemen, Make & n8n.",
      "provider": {
        "@type": "Organization",
        "name": "AI Practitioner",
        "url": "https://aipractitioner.manus.space"
      },
      "educationalCredentialAwarded": "IHK-Zertifikat KI-Automatisierungsexperte",
      "timeToComplete": "P13W",
      "numberOfCredits": "61 Unterrichtseinheiten",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "Online",
        "courseWorkload": "PT10H/Woche",
        "instructor": {
          "@type": "Person",
          "name": "Josef Held"
        }
      },
      "offers": {
        "@type": "Offer",
        "price": "6500",
        "priceCurrency": "EUR",
        "availability": "https://schema.org/InStock",
        "url": "https://aipractitioner.manus.space"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "40",
        "bestRating": "5"
      }
    };

    // Schema.org FAQPage Schema
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": [
        { "@type": "Question", "name": "Brauche ich Programmierkenntnisse für die KI-Weiterbildung?", "acceptedAnswer": { "@type": "Answer", "text": "Nein. Die Ausbildung nutzt No-Code-Tools wie Make, n8n und Voiceflow. Du lernst KI-Automatisierung Schritt für Schritt – ganz ohne Programmierkenntnisse." } },
        { "@type": "Question", "name": "Wie viel Zeit muss ich pro Woche investieren?", "acceptedAnswer": { "@type": "Answer", "text": "Plane etwa 10 Stunden pro Woche ein. Die KI-Weiterbildung umfasst 61 Unterrichtseinheiten über 13 Wochen. Du hast lebenslangen Zugang und kannst in deinem Tempo lernen." } },
        { "@type": "Question", "name": "Ist das IHK-Zertifikat bundesweit anerkannt?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Das Zertifikat wird direkt von der Industrie- und Handelskammer (IHK) ausgestellt und ist bundesweit anerkannt. Es bestätigt deine Qualifikation als KI-Automatisierungsexperte." } },
        { "@type": "Question", "name": "Kann ich mit KI-Automatisierung wirklich Geld verdienen?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Absolventen verdienen durchschnittlich 3.000–10.000€ pro KI-Automatisierungsprojekt. Die Nachfrage nach KI-Experten wächst stark, besonders bei KMU und im Mittelstand." } },
        { "@type": "Question", "name": "Was lerne ich in der KI-Ausbildung konkret?", "acceptedAnswer": { "@type": "Answer", "text": "Du lernst Chatbots zu erstellen, RAG-Systeme mit Flowise aufzubauen, Prozesse mit Make und n8n zu automatisieren, KI-Agenten zu entwickeln und Kunden für KI-Projekte zu gewinnen – alles praxisnah in 7 Modulen." } },
        { "@type": "Question", "name": "Was ist der Unterschied zwischen AI Practitioner und anderen KI-Kursen?", "acceptedAnswer": { "@type": "Answer", "text": "Unsere KI-Weiterbildung ist die einzige mit IHK-Zertifikat. Du lernst nicht nur Theorie, sondern baust echte Automatisierungsprojekte mit professionellen Tools wie Make, n8n, Voiceflow und Flowise." } },
        { "@type": "Question", "name": "Für wen ist die KI-Weiterbildung geeignet?", "acceptedAnswer": { "@type": "Answer", "text": "Die Ausbildung richtet sich an Berater, Freelancer, Unternehmer und Angestellte, die KI-Automatisierung als neue Kompetenz oder Einnahmequelle aufbauen möchten. Vorkenntnisse sind nicht erforderlich." } },
        { "@type": "Question", "name": "Gibt es eine Geld-zurück-Garantie?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Du hast eine 14-Tage Geld-zurück-Garantie. Wenn die Ausbildung nicht deinen Erwartungen entspricht, erhältst du den vollen Betrag zurück – ohne Wenn und Aber." } },
        { "@type": "Question", "name": "Kann ich die KI-Ausbildung neben dem Beruf absolvieren?", "acceptedAnswer": { "@type": "Answer", "text": "Absolut. Die Weiterbildung ist berufsbegleitend konzipiert. Mit ca. 10 Stunden pro Woche und lebenslangem Zugang kannst du flexibel lernen und die Module in deinem eigenen Tempo durcharbeiten." } },
        { "@type": "Question", "name": "Was kostet die KI-Weiterbildung mit IHK-Zertifikat?", "acceptedAnswer": { "@type": "Answer", "text": "Die Ausbildung zum KI-Automatisierungsexperten kostet 4.797€ zzgl. MwSt. als einmalige Investition. Darin enthalten sind alle 7 Module, das IHK-Zertifikat, lebenslanger Zugang und alle zukünftigen Updates." } },
        { "@type": "Question", "name": "Welche Tools lerne ich in der Ausbildung?", "acceptedAnswer": { "@type": "Answer", "text": "Du arbeitest mit den führenden KI-Automatisierungstools: ChatGPT, Make, n8n, Zapier, Voiceflow, ManyChat und Flowise. Damit deckst du das gesamte Spektrum von Chatbots über Prozessautomatisierung bis hin zu RAG-Systemen ab." } },
        { "@type": "Question", "name": "Erhalte ich nach Abschluss Unterstützung?", "acceptedAnswer": { "@type": "Answer", "text": "Ja. Du erhältst lebenslangen Zugang zu allen Kursinhalten und Updates. Zusätzlich profitierst du von der Community der Absolventen für Austausch und Networking." } }
      ]
    };

    // Schema.org Organization Schema
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "AI Practitioner",
      "url": "https://aipractitioner.manus.space",
      "logo": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/XjvoXOCMszZFXAGc.png",
      "description": "IHK-zertifizierte KI-Weiterbildung zum Automatisierungsexperten. Praxisnahe Ausbildung mit Chatbots, RAG-Systemen, Make & n8n.",
      "sameAs": [],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "availableLanguage": "German"
      }
    };

    // Inject JSON-LD scripts
    const schemas = [courseSchema, faqSchema, orgSchema];
    const scriptIds = ["schema-course", "schema-faq", "schema-org"];
    schemas.forEach((schema, i) => {
      let script = document.getElementById(scriptIds[i]) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement("script");
        script.id = scriptIds[i];
        script.type = "application/ld+json";
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(schema);
    });

    return () => {
      scriptIds.forEach((id) => {
        const el = document.getElementById(id);
        if (el) el.remove();
      });
    };
  }, []);

  // Load ThriveCart script when checkout modal opens
  useEffect(() => {
    if (showCheckout) {
      // Check if script already loaded
      const existingScript = document.getElementById("tc-ki-club-41-3RQOBP");
      if (!existingScript) {
        const script = document.createElement("script");
        script.src = "//tinder.thrivecart.com/embed/v2/thrivecart.js";
        script.id = "tc-ki-club-41-3RQOBP";
        script.async = true;
        document.body.appendChild(script);
      } else {
        // Re-trigger ThriveCart rendering
        if ((window as any).ThriveCart) {
          (window as any).ThriveCart.renderEmbeds();
        }
      }
      // Prevent background scrolling
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showCheckout]);

  const openCheckout = useCallback(() => {
    setShowCheckout(true);
    // Track Facebook Pixel event (only if consent given)
    if (isTrackingAllowed() && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout");
    }
  }, []);

  return (
    <>
    {/* ThriveCart Checkout Modal */}
    {showCheckout && (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowCheckout(false)}>
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl mx-4" onClick={(e) => e.stopPropagation()}>
          <button
            onClick={() => setShowCheckout(false)}
            className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition text-gray-600 hover:text-gray-900"
            aria-label="Schließen"
          >
            ✕
          </button>
          <div className="p-6 pt-12">
            <div
              className="tc-v2-embeddable-target"
              data-thrivecart-account="ki-club"
              data-thrivecart-tpl="v2"
              data-thrivecart-product="41"
              data-thrivecart-embeddable="tc-ki-club-41-3RQOBP"
            ></div>
          </div>
        </div>
      </div>
    )}

    <div className="min-h-screen bg-white text-gray-900">
      {/* Navigation - Glasmorphism */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/10 transition-all duration-300" style={{
        background: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
      }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/XjvoXOCMszZFXAGc.png" alt="KI Automatisierungsexperte IHK Zertifikat Logo" className="w-8 h-8" />
            <span className="font-semibold text-lg">AI Practitioner</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#modules" className="text-gray-600 hover:text-gray-900 transition">Module</a>
            <a href="#success" className="text-gray-600 hover:text-gray-900 transition">Erfolge</a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition">Investition</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition">FAQ</a>
            <a href="/blog" className="text-gray-600 hover:text-gray-900 transition">Blog</a>
          </div>
          <Button className="btn-apple" onClick={openCheckout}>Jetzt sichern</Button>
        </div>
      </nav>

      {/* Hero Section - Fullscreen Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/iEorTlaquYKZmtLt.png"
            alt="KI Automatisierung Weiterbildung Kursplattform mit IHK Zertifikat"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.65)] via-[rgba(0,0,0,0.5)] to-[rgba(0,0,0,0.7)]"></div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container max-w-4xl mx-auto text-center px-4 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* IHK Badge */}
            <motion.div
              className="mb-6 flex flex-col items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-4 py-2 inline-flex items-center">
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/CZAtZTUbDpyvWpkZ.jpg"
                  alt="IHK Bildungszentrum Halle-Dessau GmbH – Zertifizierungspartner"
                  className="h-10 md:h-12 w-auto object-contain"
                />
              </div>
              <span className="text-sm font-medium text-white/80">Zertifiziert durch das IHK Bildungszentrum Halle-Dessau</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 leading-tight text-white">
              KI-Automatisierungsexperte (IHK):<br />
              <span className="text-blue-400">Praxisnahe Weiterbildung mit Zertifikat</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg md:text-xl text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
              In 13 Wochen zum IHK-zertifizierten KI-Experten. Lerne KI-Automatisierung mit Chatbots, RAG-Systemen, Make & n8n – und baue Systeme, die Unternehmen wirklich nutzen und bezahlen.
            </p>

            {/* Single CTA */}
            <div className="flex justify-center mb-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="btn-apple px-10 py-5 text-lg" onClick={openCheckout}>
                  Ausbildung starten
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/70">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                40+ Teilnehmer aus der Pilotkohorte
              </span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                14-Tage Geld-zurück-Garantie
              </span>
              <span className="hidden sm:inline text-white/40">•</span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                IHK-Zertifikat inklusive
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Intro Content Section - SEO Keywords */}
      <section className="py-16 px-4 bg-white">
        <div className="container max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-8 text-center">
              Warum KI-Automatisierung die gefragteste Kompetenz 2026 ist
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p>
                Der Bedarf an <strong>KI-Experten</strong> wächst rasant: Über 50.000 Stellen im DACH-Raum bleiben unbesetzt, weil qualifizierte Fachkräfte fehlen, die <strong>KI-Automatisierung lernen</strong> und praktisch umsetzen können. Unternehmen jeder Größe – vom Startup bis zum Mittelstand – suchen nach Profis, die Geschäftsprozesse mit künstlicher Intelligenz effizienter gestalten.
              </p>
              <p>
                Die <strong>KI-Weiterbildung</strong> zum KI-Automatisierungsexperten (IHK) schließt genau diese Lücke. In 13 Wochen und 61 Unterrichtseinheiten lernst du, wie du mit professionellen No-Code-Tools wie <strong>Make</strong>, <strong>n8n</strong>, Voiceflow und Flowise echte Automatisierungslösungen baust. Du brauchst keine Programmierkenntnisse – der <strong>KI-Kurs</strong> ist für Quereinsteiger, Berater, Freelancer und Unternehmer konzipiert.
              </p>
              <p>
                Was diese Ausbildung einzigartig macht: Es ist der einzige <strong>KI-Kurs</strong> in Deutschland mit einem offiziellen <strong>KI-Zertifikat der IHK</strong>. Das bedeutet bundesweite Anerkennung und nachweisbare Kompetenz. Als <strong>KI-Manager (IHK)</strong> positionierst du dich als vertrauenswürdiger Experte für <strong>KI für KMU</strong> und Unternehmen.
              </p>
              <p>
                Die Ausbildung deckt das gesamte Spektrum ab: Du lernst, wie du einen <strong>Chatbot erstellst</strong>, <strong>RAG-Systeme</strong> mit eigenen Unternehmensdaten aufbaust, <strong>Prozesse automatisierst</strong> mit <strong>Make-Automatisierung</strong> und n8n-Workflows, und KI-Agenten entwickelst. Absolventen der Pilotkohorte haben über 120 Automatisierungsprojekte umgesetzt und sparen durchschnittlich 10+ Stunden pro Woche.
              </p>
              <p>
                Ob du <strong>KI-Experte werden</strong> möchtest, eine neue Einnahmequelle suchst oder dein Unternehmen mit KI-Automatisierung voranbringen willst – diese Weiterbildung gibt dir alle Werkzeuge und das Wissen, um sofort loszulegen. Erfahre mehr in unserem <a href="/blog" className="text-blue-600 hover:text-blue-800 underline">Blog über KI-Automatisierung</a>.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section - Glass Cards */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "https://private-us-east-1.manuscdn.com/sessionFile/YcbjwiWInGIVL0BsT3oWwc/sandbox/BcMJFSTsWIBgVRq2mfZscL_1770291693299_na1fn_aWNvbi10aW1lLWdsYXNzLXRyYW5zcGFyZW50.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWNiandpV0luR0lWTDBCc1Qzb1d3Yy9zYW5kYm94L0JjTUpGU1RzV0lCZ1ZScTJtZlpzY0xfMTc3MDI5MTY5MzI5OV9uYTFmbl9hV052YmkxMGFXMWxMV2RzWVhOekxYUnlZVzV6Y0dGeVpXNTAucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ryEtxrL2sIWWl48Sc6jkNhF6vnmnAU7395lXc05asV0zR3WezYWl-pFgUijMEtcODQGtjxRHr~VdihQUma07csKdzaRbJfCWP5wLCFCChYhEfFMWb6QE86Q5-h2bjmNm-4o5VBqZXDgcPY4AowaN4C7AQRYbzae0rWBuh1dGgscmlHdqc61GvQtKyMqTkE6nFYCAfRY2PJrkhbX1JKE8kTwACYfIXcdVA1i3Kdjv3XhlQdalCoJUo1RB-34Bb604LyRFbW9H65c9d9~mQlkEFjze-hCHl1Aw8vKRllUsi2Jdiicx6DQYCDXsGmZP11p-IkkD4ie1Yx~IeiXceP-8DQ__",
                title: "10+ Stunden/Woche sparen",
                alt: "Zeitersparnis durch KI Automatisierung 10 Stunden pro Woche",
                description: "Automatisiere repetitive Aufgaben und konzentriere dich auf strategische Arbeit"
              },
              {
                icon: "https://private-us-east-1.manuscdn.com/sessionFile/YcbjwiWInGIVL0BsT3oWwc/sandbox/BcMJFSTsWIBgVRq2mfZscL_1770291693300_na1fn_aWNvbi1pbmNvbWUtZ2xhc3MtdHJhbnNwYXJlbnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWNiandpV0luR0lWTDBCc1Qzb1d3Yy9zYW5kYm94L0JjTUpGU1RzV0lCZ1ZScTJtZlpzY0xfMTc3MDI5MTY5MzMwMF9uYTFmbl9hV052YmkxcGJtTnZiV1V0WjJ4aGMzTXRkSEpoYm5Od1lYSmxiblEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rA6SSBnPWMgim6xr~7Od~muq9RPf18aEI70wWXGWnc2n9OL9S52t~qjHfgEckcxx8H8m9pWdQ4bf2iDpzfCbF6smL1FL5ZtKTMmKwUGeK9Qj~TDqFiIS~WbwBwpVqIKsLiuv1IrCk1uTd4Fw8iQsGO0Q13ZIwVOgiVjRraE-9c-KKtXDKeZBtPZytNS3SuUviwTDDVgDXoHu5TJEb96QKCcg1MY6lNB5QmNbBIUlj0PcejZOUkb1uNeK7cEnk~6TCRtd6bQBpU5GIDPR1p6VPfHlhu06g6eS6aCCsKTR9OYxENnL9iJ9hlTfcGrEuetdOCpdvj6fkumrJCfli1S3jQ__",
                title: "Neue Einnahmequelle",
                alt: "Einnahmen als KI Automatisierungsexperte 3000 bis 10000 Euro pro Projekt",
                description: "Verdiene 3.000-10.000€ pro KI-Automatisierungsprojekt"
              },
              {
                icon: "https://private-us-east-1.manuscdn.com/sessionFile/YcbjwiWInGIVL0BsT3oWwc/sandbox/BcMJFSTsWIBgVRq2mfZscL_1770291693300_na1fn_aWNvbi1zeXN0ZW1zLWdsYXNzLXRyYW5zcGFyZW50.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWNiandpV0luR0lWTDBCc1Qzb1d3Yy9zYW5kYm94L0JjTUpGU1RzV0lCZ1ZScTJtZlpzY0xfMTc3MDI5MTY5MzMwMF9uYTFmbl9hV052YmkxemVYTjBaVzF6TFdkc1lYTnpMWFJ5WVc1emNHRnlaVzUwLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Z0cDdNiZfoBrTdW5rVoqpRNVGwMafZajF-xYXo~SxmRU-Z486rpczJQ1VG0R1Qjnsr9RxYj9PCRTwgBnYxjXuObnwPbD0uzt4Cyf-c-o8vGKTMSCzQDTJWnr3fQ5SqaKMT15y1ilXnyJ5bCzks4mryUyMf~qR4rb8tHoV0a5WJK1-Qjk6DC7w-x59fTWyvGrL36-eUVcfJwLkzxvcystTgjsSJ7bX3qwudnZJy39cMKvXPPbTg0b9lKwfCQ1HJyRHUs0S~YWE-UAL3qAyIKjR3dxb6HSJBlClt1JKqvQwysh1tPzj0VL1NdUbnih2lAyjjdxd4bodSM-aIqCGjlpSg__",
                title: "Professionelle Systeme",
                alt: "Professionelle KI Automatisierungssysteme mit Make und n8n",
                description: "Baue Automationen, die zuverlässig funktionieren und skalieren"
              }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-glass text-center"
              >
                <img src={benefit.icon} alt={benefit.alt} className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section - Background Image */}
      <section id="modules" className="relative py-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/OjzFLcWANByZmJSv.png"
            alt="7 Module der KI Automatisierung Weiterbildung Uebersicht"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.75)] via-[rgba(0,0,0,0.7)] to-[rgba(0,0,0,0.8)]"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
              7 Praxis-Module: Von Chatbots bis KI-Agenten
            </h2>
            <p className="text-xl text-white/75">
              Die KI-Weiterbildung, die dich in 13 Wochen zum Automatisierungsexperten macht
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              { num: "01", title: "KI-Grundlagen & Prompting", desc: "ChatGPT, Prompt Engineering und KI-Systeme verstehen – die Basis für deine KI-Weiterbildung" },
              { num: "02", title: "Chatbot erstellen", desc: "Intelligente Chatbots mit Voiceflow & ManyChat bauen – für Kundenservice und Lead-Generierung" },
              { num: "03", title: "RAG-Systeme & Flowise", desc: "Retrieval Augmented Generation mit Flowise – KI-Systeme mit eigenem Wissen ausstatten" },
              { num: "04", title: "Prozesse automatisieren", desc: "Make, n8n und Zapier meistern – KI-Automatisierung für KMU und Unternehmen" },
              { num: "05", title: "KI-Agenten & Datenverarbeitung", desc: "Autonome KI-Agenten, APIs und Datenströme integrieren" },
              { num: "06", title: "Akquise & Sales für KI-Experten", desc: "Kunden gewinnen, KI-Projekte verkaufen und als KI-Berater positionieren" },
              { num: "07", title: "Compliance, DSGVO & Business", desc: "Rechtssicher arbeiten, Verdienmodelle aufbauen und skalieren" }
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-6 rounded-xl p-6 backdrop-blur-md border border-white/15"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                }}
              >
                <div className="text-3xl font-bold text-blue-400">{module.num}</div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-2 text-white">{module.title}</h3>
                  <p className="text-white/70">{module.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success" className="py-20 px-4 section-premium">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Erfahrungen: Was Absolventen der KI-Weiterbildung berichten
            </h2>
            <p className="text-xl text-gray-600">
              Echte Ergebnisse von Teilnehmern des KI-Kurses
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "René Koch",
                role: "IT-Consultant",
                quote: "Die Ausbildung hat mir gezeigt, wie ich meine Kunden mit KI-Lösungen begeistern kann.",
                video: "https://www.youtube.com/embed/uGUrBdPuCBA"
              },
              {
                name: "Katharina Jakob",
                role: "Gründerin",
                quote: "Mit den Templates habe ich in 2 Wochen mein erstes Projekt abgeschlossen.",
                video: "https://www.youtube.com/embed/Ar2GXCjUdLg"
              }
            ].map((story, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-glass"
              >
                <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-50 mb-6 rounded-xl overflow-hidden">
                  <iframe
                    width="100%"
                    height="100%"
                    src={story.video}
                    title={story.name}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{story.name}</h3>
                  <p className="text-blue-600 text-sm mb-3 font-medium">{story.role}</p>
                  <p className="text-gray-700 italic">"{story.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-2xl"
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/oDfrkEvmjFxZDozO.png"
              alt="Erfolgsstatistiken KI Kurs 120 Projekte 95 Prozent Zufriedenheit"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-4 section-premium">
        <div className="container max-w-3xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Kosten & Investition: KI-Ausbildung mit IHK-Zertifikat
            </h2>
            <p className="text-xl text-gray-600">
              Einmalige Investition in deine Zukunft
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass text-center glow overflow-hidden"
          >
            {/* Premium Pricing Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-2xl overflow-hidden mb-10 shadow-xl mx-auto max-w-md"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/yQabxfmvZgaRyokf.png"
                alt="KI Weiterbildung IHK Zertifikat Kosten und Preise"
                className="w-full"
              />
            </motion.div>

            {/* Price Display */}
            <div className="mb-10">
              <motion.p
                className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-3"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                6.500€
              </motion.p>
              <p className="text-gray-500 text-lg">zzgl. MwSt. – Einmalige Zahlung, kein Abo</p>
            </div>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mb-8"
            >
              <Button className="btn-apple px-10 py-5 text-lg w-full max-w-sm mx-auto" onClick={openCheckout}>
                Jetzt buchen
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>

            <div className="divider-premium my-8"></div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-600">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>14-Tage Geld-zurück-Garantie</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Lebenslanger Zugang</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                <span>Alle Updates inklusive</span>
              </div>
            </div>

            {/* IHK Trust Badge */}
            <div className="mt-8 pt-6 border-t border-gray-200/50 flex flex-col items-center gap-2">
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/CZAtZTUbDpyvWpkZ.jpg"
                alt="IHK Bildungszentrum Halle-Dessau GmbH – Offizieller Zertifizierungspartner"
                className="h-10 w-auto object-contain opacity-80"
              />
              <span className="text-xs text-gray-400">Offizieller Zertifizierungspartner</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-white">
        <div className="container max-w-2xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Häufige Fragen zur KI-Weiterbildung
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Brauche ich Programmierkenntnisse für die KI-Weiterbildung?",
                a: "Nein. Die Ausbildung nutzt No-Code-Tools wie Make, n8n und Voiceflow. Du lernst KI-Automatisierung Schritt für Schritt – ganz ohne Programmierkenntnisse."
              },
              {
                q: "Wie viel Zeit muss ich pro Woche investieren?",
                a: "Plane etwa 10 Stunden pro Woche ein. Die KI-Weiterbildung umfasst 61 Unterrichtseinheiten über 13 Wochen. Du hast lebenslangen Zugang und kannst in deinem Tempo lernen."
              },
              {
                q: "Ist das IHK-Zertifikat bundesweit anerkannt?",
                a: "Ja. Das Zertifikat wird direkt von der Industrie- und Handelskammer (IHK) ausgestellt und ist bundesweit anerkannt. Es bestätigt deine Qualifikation als KI-Automatisierungsexperte."
              },
              {
                q: "Kann ich mit KI-Automatisierung wirklich Geld verdienen?",
                a: "Ja. Absolventen verdienen durchschnittlich 3.000–10.000€ pro KI-Automatisierungsprojekt. Die Nachfrage nach KI-Experten wächst stark, besonders bei KMU und im Mittelstand."
              },
              {
                q: "Was lerne ich in der KI-Ausbildung konkret?",
                a: "Du lernst Chatbots zu erstellen, RAG-Systeme mit Flowise aufzubauen, Prozesse mit Make und n8n zu automatisieren, KI-Agenten zu entwickeln und Kunden für KI-Projekte zu gewinnen – alles praxisnah in 7 Modulen."
              },
              {
                q: "Was ist der Unterschied zwischen AI Practitioner und anderen KI-Kursen?",
                a: "Unsere KI-Weiterbildung ist die einzige mit IHK-Zertifikat. Du lernst nicht nur Theorie, sondern baust echte Automatisierungsprojekte mit professionellen Tools wie Make, n8n, Voiceflow und Flowise."
              },
              {
                q: "Für wen ist die KI-Weiterbildung geeignet?",
                a: "Die Ausbildung richtet sich an Berater, Freelancer, Unternehmer und Angestellte, die KI-Automatisierung als neue Kompetenz oder Einnahmequelle aufbauen möchten. Vorkenntnisse sind nicht erforderlich."
              },
              {
                q: "Gibt es eine Geld-zurück-Garantie?",
                a: "Ja. Du hast eine 14-Tage Geld-zurück-Garantie. Wenn die Ausbildung nicht deinen Erwartungen entspricht, erhältst du den vollen Betrag zurück – ohne Wenn und Aber."
              },
              {
                q: "Kann ich die KI-Ausbildung neben dem Beruf absolvieren?",
                a: "Absolut. Die Weiterbildung ist berufsbegleitend konzipiert. Mit ca. 10 Stunden pro Woche und lebenslangem Zugang kannst du flexibel lernen und die Module in deinem eigenen Tempo durcharbeiten."
              },
              {
                q: "Was kostet die KI-Weiterbildung mit IHK-Zertifikat?",
                a: "Die Ausbildung zum KI-Automatisierungsexperten kostet 4.797€ zzgl. MwSt. als einmalige Investition. Darin enthalten sind alle 7 Module, das IHK-Zertifikat, lebenslanger Zugang und alle zukünftigen Updates."
              },
              {
                q: "Welche Tools lerne ich in der Ausbildung?",
                a: "Du arbeitest mit den führenden KI-Automatisierungstools: ChatGPT, Make, n8n, Zapier, Voiceflow, ManyChat und Flowise. Damit deckst du das gesamte Spektrum von Chatbots über Prozessautomatisierung bis hin zu RAG-Systemen ab."
              },
              {
                q: "Erhalte ich nach Abschluss Unterstützung?",
                a: "Ja. Du erhältst lebenslangen Zugang zu allen Kursinhalten und Updates. Zusätzlich profitierst du von der Community der Absolventen für Austausch und Networking."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-glass"
              >
                <h3 className="font-semibold mb-3">{faq.q}</h3>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/cClyWGwPGcqqeyJT.png')`,
          }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/60 to-gray-900/70" />
        <div className="container max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-6 text-white">
              Jetzt KI-Automatisierungsexperte werden
            </h2>
            <p className="text-xl text-gray-200 mb-8">
              Starte deine KI-Weiterbildung mit IHK-Zertifikat und werde der Automatisierungsexperte, den Unternehmen suchen.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="btn-apple px-8 py-4 text-lg" onClick={openCheckout}>
                Ausbildung sichern
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 py-8 px-4" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
      }}>
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/XjvoXOCMszZFXAGc.png" alt="KI Automatisierungsexperte IHK Zertifikat Logo" className="w-6 h-6" />
            <span className="font-semibold">AI Practitioner</span>
          </div>
          <div className="flex items-center gap-6 flex-wrap justify-center">
            <a href="/blog" className="text-gray-600 hover:text-gray-900 transition text-sm">Blog</a>
            <a href="#modules" className="text-gray-600 hover:text-gray-900 transition text-sm">Module</a>
            <a href="#faq" className="text-gray-600 hover:text-gray-900 transition text-sm">FAQ</a>
            <a href="/impressum" className="text-gray-600 hover:text-gray-900 transition text-sm">Impressum</a>
            <a href="/datenschutz" className="text-gray-600 hover:text-gray-900 transition text-sm">Datenschutz</a>
          </div>
          <p className="text-gray-600 text-sm">
            © 2026 AI Practitioner. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
    </>
  );
}
