export const BLOG_LIST_ROUTE = "/blog";

export const STATIC_PRERENDER_ROUTES = [
  "/",
  "/impressum",
  "/datenschutz",
  "/danke",
  "/thank-you",
] as const;

export type StaticPrerenderRoute = (typeof STATIC_PRERENDER_ROUTES)[number];

export type RequestInfo = {
  origin: string;
  href: string;
  pathname: string;
  search: string;
};

export type BlogListRouteData = {
  kind: "blog-list";
  articles: unknown[];
};

export type BlogArticleRouteData = {
  kind: "blog-article";
  slug: string;
  article: unknown | null;
  notFound: boolean;
};

export type RouteData = BlogListRouteData | BlogArticleRouteData;

export type AppSsrPayload = {
  request: RequestInfo;
  routeData?: RouteData;
  dehydratedState?: unknown;
};

export function normalizePathname(pathname: string) {
  if (!pathname) return "/";
  if (pathname === "/") return "/";
  const trimmed = pathname.replace(/\/+$/, "");
  return trimmed.length > 0 ? trimmed : "/";
}

export function isBlogListPath(pathname: string) {
  return normalizePathname(pathname) === BLOG_LIST_ROUTE;
}

export function getBlogSlug(pathname: string) {
  const normalized = normalizePathname(pathname);
  if (!normalized.startsWith(`${BLOG_LIST_ROUTE}/`)) return null;

  const slug = normalized.slice(BLOG_LIST_ROUTE.length + 1);
  if (!slug || slug.includes("/")) return null;

  return decodeURIComponent(slug);
}

export function isBlogSsrPath(pathname: string) {
  return isBlogListPath(pathname) || getBlogSlug(pathname) !== null;
}

export function isStaticPrerenderPath(pathname: string) {
  const normalized = normalizePathname(pathname);
  return STATIC_PRERENDER_ROUTES.includes(normalized as StaticPrerenderRoute);
}

export function toPrerenderFileName(pathname: string) {
  const normalized = normalizePathname(pathname);
  if (normalized === "/") return "index.html";
  return `${normalized.slice(1).replaceAll("/", "__")}.html`;
}
