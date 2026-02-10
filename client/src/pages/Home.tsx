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
  Award,
  CheckCircle2,
  Play,
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
    document.title = "KI-Ausbildung mit IHK-Zertifikat | AI Practitioner";
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
      <nav className="fixed top-0 w-full z-50 border-b border-white/20" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
      }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/XjvoXOCMszZFXAGc.png" alt="AI Practitioner" className="w-8 h-8" />
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

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 section-premium">
        <div className="container max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="badge-glass mb-8 justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">IHK-zertifiziert</span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-semibold mb-6 leading-tight">
              Werde der KI-Experte,<br />
              <span className="shiny-text">den dein Markt braucht</span>
            </h1>

            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              In 12 Wochen zum IHK-zertifizierten AI Practitioner. Baue KI-Automatisierungen, die Unternehmen wirklich nutzen – und bezahlen.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="btn-apple px-8 py-4 text-lg" onClick={openCheckout}>
                  Ausbildung starten
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="btn-apple-secondary px-8 py-4 text-lg">
                  <Play className="w-5 h-5 mr-2" />
                  Video ansehen
                </Button>
              </motion.div>
            </div>

            <p className="text-sm text-gray-500">50+ erfolgreiche Absolventen • 14-Tage Geld-zurück-Garantie</p>
          </motion.div>
        </div>

        {/* Hero Image with Float Animation */}
        <motion.div
          className="container mt-16 float"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/iEorTlaquYKZmtLt.png"
            alt="AI Practitioner Ausbildung"
            className="hero-image w-full"
          />
        </motion.div>
      </section>

      {/* Benefits Section - Glass Cards */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "https://private-us-east-1.manuscdn.com/sessionFile/YcbjwiWInGIVL0BsT3oWwc/sandbox/BcMJFSTsWIBgVRq2mfZscL_1770291693299_na1fn_aWNvbi10aW1lLWdsYXNzLXRyYW5zcGFyZW50.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWNiandpV0luR0lWTDBCc1Qzb1d3Yy9zYW5kYm94L0JjTUpGU1RzV0lCZ1ZScTJtZlpzY0xfMTc3MDI5MTY5MzI5OV9uYTFmbl9hV052YmkxMGFXMWxMV2RzWVhOekxYUnlZVzV6Y0dGeVpXNTAucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=ryEtxrL2sIWWl48Sc6jkNhF6vnmnAU7395lXc05asV0zR3WezYWl-pFgUijMEtcODQGtjxRHr~VdihQUma07csKdzaRbJfCWP5wLCFCChYhEfFMWb6QE86Q5-h2bjmNm-4o5VBqZXDgcPY4AowaN4C7AQRYbzae0rWBuh1dGgscmlHdqc61GvQtKyMqTkE6nFYCAfRY2PJrkhbX1JKE8kTwACYfIXcdVA1i3Kdjv3XhlQdalCoJUo1RB-34Bb604LyRFbW9H65c9d9~mQlkEFjze-hCHl1Aw8vKRllUsi2Jdiicx6DQYCDXsGmZP11p-IkkD4ie1Yx~IeiXceP-8DQ__",
                title: "10+ Stunden/Woche sparen",
                description: "Automatisiere repetitive Aufgaben und konzentriere dich auf strategische Arbeit"
              },
              {
                icon: "https://private-us-east-1.manuscdn.com/sessionFile/YcbjwiWInGIVL0BsT3oWwc/sandbox/BcMJFSTsWIBgVRq2mfZscL_1770291693300_na1fn_aWNvbi1pbmNvbWUtZ2xhc3MtdHJhbnNwYXJlbnQ.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWNiandpV0luR0lWTDBCc1Qzb1d3Yy9zYW5kYm94L0JjTUpGU1RzV0lCZ1ZScTJtZlpzY0xfMTc3MDI5MTY5MzMwMF9uYTFmbl9hV052YmkxcGJtTnZiV1V0WjJ4aGMzTXRkSEpoYm5Od1lYSmxiblEucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=rA6SSBnPWMgim6xr~7Od~muq9RPf18aEI70wWXGWnc2n9OL9S52t~qjHfgEckcxx8H8m9pWdQ4bf2iDpzfCbF6smL1FL5ZtKTMmKwUGeK9Qj~TDqFiIS~WbwBwpVqIKsLiuv1IrCk1uTd4Fw8iQsGO0Q13ZIwVOgiVjRraE-9c-KKtXDKeZBtPZytNS3SuUviwTDDVgDXoHu5TJEb96QKCcg1MY6lNB5QmNbBIUlj0PcejZOUkb1uNeK7cEnk~6TCRtd6bQBpU5GIDPR1p6VPfHlhu06g6eS6aCCsKTR9OYxENnL9iJ9hlTfcGrEuetdOCpdvj6fkumrJCfli1S3jQ__",
                title: "Neue Einnahmequelle",
                description: "Verdiene 3.000-10.000€ pro KI-Automatisierungsprojekt"
              },
              {
                icon: "https://private-us-east-1.manuscdn.com/sessionFile/YcbjwiWInGIVL0BsT3oWwc/sandbox/BcMJFSTsWIBgVRq2mfZscL_1770291693300_na1fn_aWNvbi1zeXN0ZW1zLWdsYXNzLXRyYW5zcGFyZW50.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvWWNiandpV0luR0lWTDBCc1Qzb1d3Yy9zYW5kYm94L0JjTUpGU1RzV0lCZ1ZScTJtZlpzY0xfMTc3MDI5MTY5MzMwMF9uYTFmbl9hV052YmkxemVYTjBaVzF6TFdkc1lYTnpMWFJ5WVc1emNHRnlaVzUwLnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Z0cDdNiZfoBrTdW5rVoqpRNVGwMafZajF-xYXo~SxmRU-Z486rpczJQ1VG0R1Qjnsr9RxYj9PCRTwgBnYxjXuObnwPbD0uzt4Cyf-c-o8vGKTMSCzQDTJWnr3fQ5SqaKMT15y1ilXnyJ5bCzks4mryUyMf~qR4rb8tHoV0a5WJK1-Qjk6DC7w-x59fTWyvGrL36-eUVcfJwLkzxvcystTgjsSJ7bX3qwudnZJy39cMKvXPPbTg0b9lKwfCQ1HJyRHUs0S~YWE-UAL3qAyIKjR3dxb6HSJBlClt1JKqvQwysh1tPzj0VL1NdUbnih2lAyjjdxd4bodSM-aIqCGjlpSg__",
                title: "Professionelle Systeme",
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
                <img src={benefit.icon} alt={benefit.title} className="w-16 h-16 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules Section */}
      <section id="modules" className="py-20 px-4">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Was du lernst
            </h2>
            <p className="text-xl text-gray-600">
              8 Module, die dich vom Anfänger zum Profi machen
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden"
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/OjzFLcWANByZmJSv.png"
              alt="8 Module der Ausbildung"
              className="w-full shadow-2xl"
            />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mt-12">
            {[
              { num: "01", title: "KI-Grundlagen", desc: "ChatGPT, Prompting, AI-Systeme verstehen" },
              { num: "02", title: "Chatbots bauen", desc: "Intelligente Bots mit Voiceflow & ManyChat" },
              { num: "03", title: "Automatisierungen", desc: "Make, N8N, Zapier meistern" },
              { num: "04", title: "Datenverarbeitung", desc: "APIs, Datenströme, Integrationen" },
              { num: "05", title: "KI-Agenten", desc: "Autonome Systeme mit Flowise" },
              { num: "06", title: "Akquise & Sales", desc: "Kunden gewinnen und überzeugen" },
              { num: "07", title: "Business-Modelle", desc: "Verdienmodelle und Skalierung" },
              { num: "08", title: "Compliance & DSGVO", desc: "Rechtssicher arbeiten" }
            ].map((module, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="card-glass flex gap-6"
              >
                <div className="text-3xl font-semibold text-blue-600">{module.num}</div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold mb-2">{module.title}</h3>
                  <p className="text-gray-600">{module.desc}</p>
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
              Erfolgsgeschichten
            </h2>
            <p className="text-xl text-gray-600">
              Das sagen unsere Absolventen
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
              alt="Erfolgsstatistiken"
              className="w-full"
            />
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 px-4 section-premium">
        <div className="container max-w-2xl">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-4">
              Investition
            </h2>
            <p className="text-xl text-gray-600">
              Einmalige Zahlung oder flexible Raten
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card-glass text-center glow"
          >
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="rounded-2xl overflow-hidden mb-8 shadow-xl"
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/gMrfgNKGYGRdAKCR.png"
                alt="Premium Pricing"
                className="w-full"
              />
            </motion.div>

            <div className="mb-8">
              <p className="text-5xl font-semibold text-blue-600 mb-2">6.500€</p>
              <p className="text-gray-600">oder 6x 1.083€/Monat</p>
            </div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="btn-apple px-8 py-4 text-lg w-full mb-6" onClick={openCheckout}>
                Jetzt buchen
              </Button>
            </motion.div>

            <div className="divider-premium my-6"></div>

            <p className="text-sm text-gray-600">
              <CheckCircle2 className="w-4 h-4 inline mr-2 text-green-600" />
              14-Tage Geld-zurück-Garantie<br />
              <CheckCircle2 className="w-4 h-4 inline mr-2 text-green-600" />
              Lebenslanger Zugang<br />
              <CheckCircle2 className="w-4 h-4 inline mr-2 text-green-600" />
              Alle Updates inklusive
            </p>
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
              Häufig gestellte Fragen
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "Brauche ich Programmierkenntnisse?",
                a: "Nein. Wir nutzen No-Code-Tools wie Make und Voiceflow. Du lernst alles Schritt für Schritt."
              },
              {
                q: "Wie viel Zeit muss ich investieren?",
                a: "Etwa 5-8 Stunden pro Woche. Du hast lebenslangen Zugang und kannst in deinem Tempo lernen."
              },
              {
                q: "Ist das IHK-Zertifikat anerkannt?",
                a: "Ja, es wird von der Industrie- und Handelskammer ausgestellt und ist bundesweit anerkannt."
              },
              {
                q: "Kann ich damit wirklich Geld verdienen?",
                a: "Ja. Absolventen verdienen durchschnittlich 3.000-10.000€ pro KI-Automatisierungsprojekt."
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
      <section className="py-20 px-4 section-premium">
        <div className="container max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-semibold mb-6">
              Bereit, deine KI-Karriere zu starten?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Schließe dich 50+ erfolgreichen Absolventen an und werde der KI-Experte, den dein Markt braucht.
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
            <img src="/logo.png" alt="AI Practitioner" className="w-6 h-6" />
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
