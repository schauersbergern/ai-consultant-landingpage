import { useEffect, useMemo } from "react";
import type { ReactNode } from "react";
import { createContext, useContext } from "react";
import { useLocation } from "wouter";
import { useRequestInfo } from "./request-info";

export type JsonLdData = Record<string, unknown>;

export type SeoConfig = {
  title: string;
  description?: string;
  canonicalUrl?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robots?: string;
  jsonLd?: JsonLdData | JsonLdData[];
};

export type HeadState = {
  seo: SeoConfig | null;
};

const HeadContext = createContext<HeadState | null>(null);

export function createHeadState(): HeadState {
  return { seo: null };
}

export function HeadProvider({
  state,
  children,
}: {
  state: HeadState | null;
  children: ReactNode;
}) {
  return <HeadContext.Provider value={state}>{children}</HeadContext.Provider>;
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function resolveUrl(urlOrPath: string | undefined, fallback: string) {
  if (!urlOrPath) return fallback;
  if (/^https?:\/\//i.test(urlOrPath)) return urlOrPath;
  if (!urlOrPath.startsWith("/")) return `${fallback}/${urlOrPath}`;
  return `${fallback}${urlOrPath}`;
}

function normalizeJsonLd(jsonLd?: JsonLdData | JsonLdData[]) {
  if (!jsonLd) return [] as JsonLdData[];
  return Array.isArray(jsonLd) ? jsonLd : [jsonLd];
}

function serializeJsonLd(jsonLd?: JsonLdData | JsonLdData[]) {
  return normalizeJsonLd(jsonLd)
    .map(item => JSON.stringify(item).replaceAll("<", "\\u003c"));
}

function applySeoToHeadState(headState: HeadState, seo: SeoConfig) {
  headState.seo = seo;
}

function upsertMetaByName(name: string, content: string) {
  let tag = document.querySelector(`meta[name="${name}"][data-app-seo="true"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("name", name);
    tag.setAttribute("data-app-seo", "true");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertMetaByProperty(property: string, content: string) {
  let tag = document.querySelector(`meta[property="${property}"][data-app-seo="true"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute("property", property);
    tag.setAttribute("data-app-seo", "true");
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(href: string) {
  let tag = document.querySelector('link[rel="canonical"][data-app-seo="true"]');
  if (!tag) {
    tag = document.createElement("link");
    tag.setAttribute("rel", "canonical");
    tag.setAttribute("data-app-seo", "true");
    document.head.appendChild(tag);
  }
  tag.setAttribute("href", href);
}

function clearManagedJsonLd() {
  document
    .querySelectorAll('script[type="application/ld+json"][data-app-seo="true"]')
    .forEach(el => el.remove());
}

function appendJsonLdScripts(serializedJsonLd: string[]) {
  clearManagedJsonLd();

  for (const json of serializedJsonLd) {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-app-seo", "true");
    script.textContent = json;
    document.head.appendChild(script);
  }
}

export function PageSeo({
  title,
  description,
  canonicalPath,
  ogType = "website",
  ogTitle,
  ogDescription,
  ogImage,
  robots,
  jsonLd,
}: {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogType?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  robots?: string;
  jsonLd?: JsonLdData | JsonLdData[];
}) {
  const requestInfo = useRequestInfo();
  const [locationPath] = useLocation();
  const headState = useContext(HeadContext);

  const seo = useMemo<SeoConfig>(() => {
    const origin =
      typeof window !== "undefined"
        ? window.location.origin
        : requestInfo.origin;
    const activePathname =
      typeof window !== "undefined" ? locationPath : requestInfo.pathname;

    const canonicalUrl = resolveUrl(canonicalPath || activePathname, origin);
    const resolvedOgImage = ogImage
      ? resolveUrl(ogImage, origin)
      : undefined;

    return {
      title,
      description,
      canonicalUrl,
      ogType,
      ogTitle: ogTitle || title,
      ogDescription: ogDescription || description,
      ogImage: resolvedOgImage,
      robots,
      jsonLd,
    };
  }, [
    canonicalPath,
    description,
    jsonLd,
    ogDescription,
    ogImage,
    ogTitle,
    ogType,
    locationPath,
    requestInfo.origin,
    requestInfo.pathname,
    title,
    robots,
  ]);

  if (headState) {
    applySeoToHeadState(headState, seo);
  }

  useEffect(() => {
    document.title = seo.title;

    if (seo.description) {
      upsertMetaByName("description", seo.description);
    }

    if (seo.robots) {
      upsertMetaByName("robots", seo.robots);
    }

    if (seo.canonicalUrl) {
      upsertCanonical(seo.canonicalUrl);
      upsertMetaByProperty("og:url", seo.canonicalUrl);
      upsertMetaByName("twitter:url", seo.canonicalUrl);
    }

    if (seo.ogType) {
      upsertMetaByProperty("og:type", seo.ogType);
    }

    if (seo.ogTitle) {
      upsertMetaByProperty("og:title", seo.ogTitle);
      upsertMetaByName("twitter:title", seo.ogTitle);
    }

    if (seo.ogDescription) {
      upsertMetaByProperty("og:description", seo.ogDescription);
      upsertMetaByName("twitter:description", seo.ogDescription);
    }

    if (seo.ogImage) {
      upsertMetaByProperty("og:image", seo.ogImage);
      upsertMetaByName("twitter:image", seo.ogImage);
      upsertMetaByName("twitter:card", "summary_large_image");
    }

    appendJsonLdScripts(serializeJsonLd(seo.jsonLd));
  }, [seo]);

  return null;
}

export function renderHeadToString(headState: HeadState) {
  const seo = headState.seo;
  if (!seo) return "";

  const lines: string[] = [];

  lines.push(`<title data-app-seo=\"true\">${escapeHtml(seo.title)}</title>`);

  if (seo.description) {
    lines.push(`<meta data-app-seo=\"true\" name=\"description\" content=\"${escapeHtml(seo.description)}\" />`);
  }

  if (seo.robots) {
    lines.push(`<meta data-app-seo=\"true\" name=\"robots\" content=\"${escapeHtml(seo.robots)}\" />`);
  }

  if (seo.canonicalUrl) {
    const canonical = escapeHtml(seo.canonicalUrl);
    lines.push(`<link data-app-seo=\"true\" rel=\"canonical\" href=\"${canonical}\" />`);
    lines.push(`<meta data-app-seo=\"true\" property=\"og:url\" content=\"${canonical}\" />`);
    lines.push(`<meta data-app-seo=\"true\" name=\"twitter:url\" content=\"${canonical}\" />`);
  }

  if (seo.ogType) {
    lines.push(`<meta data-app-seo=\"true\" property=\"og:type\" content=\"${escapeHtml(seo.ogType)}\" />`);
  }

  if (seo.ogTitle) {
    const ogTitle = escapeHtml(seo.ogTitle);
    lines.push(`<meta data-app-seo=\"true\" property=\"og:title\" content=\"${ogTitle}\" />`);
    lines.push(`<meta data-app-seo=\"true\" name=\"twitter:title\" content=\"${ogTitle}\" />`);
  }

  if (seo.ogDescription) {
    const ogDescription = escapeHtml(seo.ogDescription);
    lines.push(`<meta data-app-seo=\"true\" property=\"og:description\" content=\"${ogDescription}\" />`);
    lines.push(`<meta data-app-seo=\"true\" name=\"twitter:description\" content=\"${ogDescription}\" />`);
  }

  if (seo.ogImage) {
    const ogImage = escapeHtml(seo.ogImage);
    lines.push(`<meta data-app-seo=\"true\" property=\"og:image\" content=\"${ogImage}\" />`);
    lines.push(`<meta data-app-seo=\"true\" name=\"twitter:image\" content=\"${ogImage}\" />`);
    lines.push('<meta data-app-seo="true" name="twitter:card" content="summary_large_image" />');
  }

  const jsonLdScripts = serializeJsonLd(seo.jsonLd);
  for (const json of jsonLdScripts) {
    lines.push(`<script data-app-seo=\"true\" type=\"application/ld+json\">${json}</script>`);
  }

  return lines.join("\n");
}
