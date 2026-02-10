import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "cookie_consent";

type ConsentStatus = "accepted" | "rejected" | null;

/**
 * Returns the current consent status from localStorage.
 */
export function getConsentStatus(): ConsentStatus {
  if (typeof window === "undefined") return null;
  const value = localStorage.getItem(CONSENT_KEY);
  if (value === "accepted" || value === "rejected") return value;
  return null;
}

/**
 * Check if marketing/tracking cookies are allowed.
 */
export function isTrackingAllowed(): boolean {
  return getConsentStatus() === "accepted";
}

/**
 * Initialize Facebook Pixel only if consent was given.
 * Call this after consent is granted or on page load if already consented.
 */
export function initFacebookPixel() {
  if (typeof window === "undefined") return;
  if (!isTrackingAllowed()) return;

  // Avoid double-init
  if ((window as any)._fbPixelInitialized) return;

  const fbq = (window as any).fbq;
  if (fbq) {
    fbq("consent", "grant");
    fbq("init", "1138180751401674");
    fbq("track", "PageView");
    (window as any)._fbPixelInitialized = true;
  }
}

/**
 * Revoke Facebook Pixel consent.
 */
export function revokeFacebookPixel() {
  if (typeof window === "undefined") return;
  const fbq = (window as any).fbq;
  if (fbq) {
    fbq("consent", "revoke");
  }
  (window as any)._fbPixelInitialized = false;
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const status = getConsentStatus();
    if (status === null) {
      // No decision yet – show banner after short delay
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
    // Already consented – init pixel
    if (status === "accepted") {
      initFacebookPixel();
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    initFacebookPixel();
  }, []);

  const handleReject = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "rejected");
    setVisible(false);
    revokeFacebookPixel();
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6"
        >
          <div
            className="max-w-4xl mx-auto rounded-2xl border border-white/30 p-6 shadow-2xl"
            style={{
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
            }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1 text-base">
                  Cookie-Einstellungen
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Wir verwenden Cookies und den Facebook Pixel, um unsere
                  Webseite zu optimieren und dir relevante Inhalte anzuzeigen.
                  Mit deiner Zustimmung helfen uns diese Technologien, unser
                  Angebot zu verbessern. Weitere Informationen findest du in
                  unserer{" "}
                  <a
                    href="/datenschutz"
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Datenschutzerklärung
                  </a>
                  .
                </p>
              </div>
              <div className="flex gap-3 shrink-0">
                <Button
                  variant="outline"
                  onClick={handleReject}
                  className="min-h-[48px] min-w-[120px] text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Ablehnen
                </Button>
                <Button
                  onClick={handleAccept}
                  className="min-h-[48px] min-w-[120px] text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Akzeptieren
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
