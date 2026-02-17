import type { Request } from "express";
import { pathToFileURL } from "url";
import path from "path";
import {
  isBlogSsrPath,
  isStaticPrerenderPath,
  normalizePathname,
  toPrerenderFileName,
} from "../../shared/ssr";

export type EntryRenderResult = {
  appHtml: string;
  headHtml: string;
  statusCode: number;
  serializedPayload: unknown;
};

export type EntryRenderer = (input: {
  url: string;
  origin: string;
}) => Promise<EntryRenderResult>;

export function getBaseUrl(req: Request) {
  const protocol = req.protocol;
  const host = req.get("host");
  return `${protocol}://${host}`;
}

export function getNormalizedPath(req: Request) {
  return normalizePathname(req.path || "/");
}

export function shouldServerRender(req: Request) {
  const pathname = getNormalizedPath(req);
  return isBlogSsrPath(pathname);
}

export function shouldServePrerendered(req: Request) {
  const pathname = getNormalizedPath(req);
  return isStaticPrerenderPath(pathname);
}

export function getPrerenderFileName(req: Request) {
  const pathname = getNormalizedPath(req);
  return toPrerenderFileName(pathname);
}

export function applyBaseUrl(html: string, baseUrl: string) {
  return html.replaceAll("__DYNAMIC_BASE_URL__", baseUrl);
}

function escapeForScript(json: string) {
  return json
    .replaceAll("<", "\\u003c")
    .replaceAll(">", "\\u003e")
    .replaceAll("&", "\\u0026")
    .replaceAll("\u2028", "\\u2028")
    .replaceAll("\u2029", "\\u2029");
}

export function injectRenderedApp(template: string, rendered: EntryRenderResult) {
  const payload = escapeForScript(JSON.stringify(rendered.serializedPayload));
  const templateWithoutBaseTitle = rendered.headHtml.includes("<title")
    ? template.replace(/<title[^>]*>[\s\S]*?<\/title>/i, "")
    : template;

  return templateWithoutBaseTitle
    .replace("<!--app-head-->", rendered.headHtml || "")
    .replace("<!--app-html-->", rendered.appHtml || "")
    .replace(
      "<!--app-ssr-data-->",
      `<script>window.__APP_SSR__=${payload};</script>`,
    );
}

export function setSsrCacheHeaders(req: Request, res: { setHeader: (name: string, value: string) => void }) {
  const hasCookies = Boolean(req.headers.cookie);

  if (hasCookies) {
    res.setHeader("Cache-Control", "private, no-store");
    return;
  }

  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
}

export async function loadProductionRenderer() {
  const entryPath = path.resolve(import.meta.dirname, "server", "entry-server.js");
  const mod = await import(pathToFileURL(entryPath).href);
  return mod.render as EntryRenderer;
}
