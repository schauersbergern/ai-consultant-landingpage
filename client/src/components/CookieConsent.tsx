import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const CONSENT_KEY = "cookie_consent";
const FACEBOOK_PIXEL_SRC = "https://connect.facebook.net/en_US/fbevents.js";
const SPOTIFY_PIXEL_SRC = "https://pixel.byspotify.com/ping.min.js";
const GOOGLE_TAG_SRC = "https://www.googletagmanager.com/gtag/js?id=G-JPRCSY52DS";

type ConsentStatus = "accepted" | "rejected" | null;

let facebookPixelPromise: Promise<void> | null = null;
let spotifyPixelPromise: Promise<void> | null = null;
let googleTagPromise: Promise<void> | null = null;

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

function loadScriptOnce(src: string, selector: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  const existing = document.querySelector(selector) as HTMLScriptElement | null;
  if (existing) {
    if ((existing as any).dataset.loaded === "true") {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load ${src}`)), { once: true });
    });
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.async = true;
    script.src = src;
    script.setAttribute("data-tracking-src", src);
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve();
    };
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.head.appendChild(script);
  });
}

function bootstrapFacebookPixel() {
  if (typeof window === "undefined") return;
  if ((window as any).fbq) return;

  const f = window as any;
  const fbq = function () {
    (fbq.callMethod ? fbq.callMethod : fbq.queue.push).apply(fbq, arguments as any);
  } as any;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  f.fbq = fbq;
  f._fbq = fbq;
}

/**
 * Initialize Facebook Pixel only if consent was given.
 * Call this after consent is granted or on page load if already consented.
 */
export async function initFacebookPixel() {
  if (typeof window === "undefined") return;
  if (!isTrackingAllowed()) return;

  if (!facebookPixelPromise) {
    bootstrapFacebookPixel();
    facebookPixelPromise = loadScriptOnce(
      FACEBOOK_PIXEL_SRC,
      `script[data-tracking-src="${FACEBOOK_PIXEL_SRC}"]`,
    );
  }

  await facebookPixelPromise;

  if ((window as any)._fbPixelInitialized) return;

  const fbq = (window as any).fbq;
  fbq?.("consent", "grant");
  fbq?.("init", "1138180751401674");
  fbq?.("track", "PageView");
  (window as any)._fbPixelInitialized = true;
}

async function initSpotifyPixel() {
  if (typeof window === "undefined" || !isTrackingAllowed()) return;

  const spotifyWindow = window as any;
  spotifyWindow.spotify = spotifyWindow.spotify || {};
  spotifyWindow.spotify.pixel = spotifyWindow.spotify.pixel || [];

  if (!spotifyWindow.spotify.pixel.initialized) {
    spotifyWindow.spotify.pixel.initialized = true;
    spotifyWindow.spotify.pixel.methods = ["init", "track"];
    spotifyWindow.spotify.pixel.factory = function (method: string) {
      return function () {
        const args = Array.prototype.slice.call(arguments);
        args.unshift(method);
        spotifyWindow.spotify.pixel.push(args);
        return spotifyWindow.spotify.pixel;
      };
    };
    for (const method of spotifyWindow.spotify.pixel.methods) {
      spotifyWindow.spotify.pixel[method] = spotifyWindow.spotify.pixel.factory(method);
    }
  }

  if (!spotifyPixelPromise) {
    spotifyPixelPromise = loadScriptOnce(
      SPOTIFY_PIXEL_SRC,
      `script[data-tracking-src="${SPOTIFY_PIXEL_SRC}"]`,
    );
  }

  await spotifyPixelPromise;
  spotifyWindow.spotify.pixel.init("d17e71c8-d748-41ea-9c8b-056d80bc9c69");
  spotifyWindow.spotify.pixel.track("pageView");
}

async function initGoogleAnalytics() {
  if (typeof window === "undefined" || !isTrackingAllowed()) return;

  const gtagWindow = window as any;
  gtagWindow.dataLayer = gtagWindow.dataLayer || [];
  gtagWindow.gtag = function () {
    gtagWindow.dataLayer.push(arguments);
  };

  if (!googleTagPromise) {
    googleTagPromise = loadScriptOnce(
      GOOGLE_TAG_SRC,
      `script[data-tracking-src="${GOOGLE_TAG_SRC}"]`,
    );
  }

  await googleTagPromise;
  gtagWindow.gtag("js", new Date());
  gtagWindow.gtag("config", "G-JPRCSY52DS");
}

async function initTrackingScripts() {
  await Promise.all([
    initFacebookPixel(),
    initSpotifyPixel(),
    initGoogleAnalytics(),
  ]);
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
      void initTrackingScripts();
    }
  }, []);

  const handleAccept = useCallback(() => {
    localStorage.setItem(CONSENT_KEY, "accepted");
    setVisible(false);
    void initTrackingScripts();
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
                  Wir verwenden Cookies sowie Facebook- und Spotify-Pixel, um unsere
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
