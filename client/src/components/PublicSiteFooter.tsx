import { BRAND_NAME, LOGO_PATH } from "@/site-content";

export function PublicSiteFooter() {
  return (
    <footer
      className="border-t border-white/20 py-8 px-4"
      style={{
        background: "rgba(255, 255, 255, 0.7)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
      }}
    >
      <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
        <a href="/" className="flex items-center gap-3">
          <img
            src={LOGO_PATH}
            alt={`${BRAND_NAME} Logo`}
            className="h-7 w-7 rounded-lg object-cover"
            width="28"
            height="28"
            loading="lazy"
            decoding="async"
          />
          <span className="font-semibold">{BRAND_NAME}</span>
        </a>
        <div className="flex items-center gap-6 flex-wrap justify-center">
          <a href="/#trainer" className="text-gray-600 hover:text-gray-900 transition text-sm">Trainer</a>
          <a href="/blog" className="text-gray-600 hover:text-gray-900 transition text-sm">KI-Blog</a>
          <a href="/impressum" className="text-gray-600 hover:text-gray-900 transition text-sm">Impressum</a>
          <a href="/datenschutz" className="text-gray-600 hover:text-gray-900 transition text-sm">Datenschutz</a>
        </div>
        <p className="text-gray-600 text-sm">
          © 2026 {BRAND_NAME}. Alle Rechte vorbehalten.
        </p>
      </div>
    </footer>
  );
}
