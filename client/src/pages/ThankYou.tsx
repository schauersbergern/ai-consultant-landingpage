/**
 * Thank You / Erfolgsseite nach ThriveCart-Kauf.
 * Feuert das Facebook Pixel "Purchase"-Event wenn der Nutzer hierher weitergeleitet wird.
 * 
 * ThriveCart leitet nach erfolgreicher Zahlung auf diese Seite weiter.
 * URL: /danke oder /thank-you
 */

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { isTrackingAllowed } from "@/components/CookieConsent";
import { Link } from "wouter";
import { PageSeo } from "@/ssr/head";

export default function ThankYou() {
  useEffect(() => {
    // Fire Facebook Pixel Purchase event (only if consent given)
    if (isTrackingAllowed() && (window as any).fbq) {
      (window as any).fbq("track", "Purchase", {
        value: 6500.0,
        currency: "EUR",
        content_name: "AI Practitioner Ausbildung",
        content_type: "product",
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-900 flex items-center justify-center px-4">
      <PageSeo
        title="Vielen Dank! | AI Practitioner"
        description="Vielen Dank für deine Buchung der AI Practitioner Ausbildung. Hier findest du die nächsten Schritte."
        canonicalPath="/danke"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-xl w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", damping: 15, stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-8 rounded-full bg-green-100 flex items-center justify-center"
        >
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-semibold mb-4">
          Willkommen an Bord!
        </h1>

        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
          Deine Buchung war erfolgreich. Du bist jetzt Teil der AI Practitioner
          Ausbildung. Wir freuen uns, dich auf deinem Weg zum KI-Experten zu
          begleiten.
        </p>

        <div
          className="rounded-2xl p-6 mb-8 border border-white/30"
          style={{
            background: "rgba(59, 130, 246, 0.05)",
            backdropFilter: "blur(8px)",
          }}
        >
          <h3 className="font-semibold text-lg mb-3">Nächste Schritte:</h3>
          <ul className="text-left text-gray-700 space-y-3">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Prüfe dein E-Mail-Postfach für die Zugangsdaten</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Melde dich in der Lernplattform an</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
              <span>Starte mit Modul 1: KI-Grundlagen</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg">
              Zur Startseite
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/blog">
            <Button
              variant="outline"
              className="px-8 py-4 text-lg border-gray-300"
            >
              Blog lesen
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
