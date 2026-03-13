import { useEffect, useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { BRAND_NAME, LOGO_PATH } from "@/site-content";

export type PublicNavItem = {
  href: string;
  label: string;
};

type HeaderAction = {
  label: string;
  href?: string;
  onClick?: () => void;
};

type PublicSiteHeaderProps = {
  items: PublicNavItem[];
  cta?: HeaderAction;
  extraDesktopContent?: ReactNode;
};

export function PublicSiteHeader({
  items,
  cta,
  extraDesktopContent,
}: PublicSiteHeaderProps) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const renderAction = (className?: string) => {
    if (!cta) return null;

    if (cta.href) {
      return (
        <a href={cta.href} className={className}>
          <Button className="btn-apple w-full md:w-auto">{cta.label}</Button>
        </a>
      );
    }

    return (
      <Button className={`btn-apple ${className ?? ""}`.trim()} onClick={cta.onClick}>
        {cta.label}
      </Button>
    );
  };

  return (
    <nav
      className="fixed top-0 z-50 w-full border-b border-white/10 transition-all duration-300"
      style={{
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.1)",
      }}
    >
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-3">
            <img
              src={LOGO_PATH}
              alt={`${BRAND_NAME} Logo`}
              className="h-8 w-8 rounded-lg object-cover"
              width="32"
              height="32"
              decoding="async"
            />
            <span className="font-semibold text-lg">{BRAND_NAME}</span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {items.map(item => {
              const isActive =
                item.href === location || (item.href !== "/" && !item.href.startsWith("#") && location.startsWith(item.href));

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={isActive ? "text-gray-900 font-medium transition" : "text-gray-600 hover:text-gray-900 transition"}
                >
                  {item.label}
                </a>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {extraDesktopContent}
            {renderAction()}
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(prev => !prev)}
            className="inline-flex items-center justify-center rounded-full border border-gray-200 p-2 text-gray-700 shadow-sm transition hover:bg-white md:hidden"
            aria-expanded={mobileOpen}
            aria-controls="mobile-public-nav"
            aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileOpen ? (
          <div
            id="mobile-public-nav"
            className="mt-4 rounded-3xl border border-white/70 bg-white/95 p-4 shadow-xl backdrop-blur-sm md:hidden"
          >
            <div className="flex flex-col gap-3">
              {items.map(item => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-4 py-3 text-gray-700 transition hover:bg-slate-50 hover:text-gray-900"
                >
                  {item.label}
                </a>
              ))}
              {renderAction("mt-2")}
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
}
