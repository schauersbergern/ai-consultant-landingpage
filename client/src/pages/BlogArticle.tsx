import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { PageSeo } from "@/ssr/head";
import { useRequestInfo } from "@/ssr/request-info";
import { useServerData } from "@/ssr/server-data";

export default function BlogArticle() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const [, navigate] = useLocation();
  const requestInfo = useRequestInfo();
  const serverData = useServerData();

  const articleRouteData = (() => {
    if (serverData?.routeData?.kind !== "blog-article") return null;
    if (serverData.routeData.slug !== slug) return null;
    return serverData.routeData;
  })();

  const prefetchedArticle = articleRouteData?.article;
  const prefetchedNotFound = articleRouteData?.notFound ?? false;

  const query = trpc.blog.getBySlug.useQuery(slug, {
    enabled: !!slug && !prefetchedNotFound,
    initialData: (prefetchedArticle as any) ?? undefined,
    staleTime: 60_000,
  });

  const article = (prefetchedArticle ?? query.data) as any;

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.scrollTo(0, 0);
  }, [slug]);

  if (query.isLoading && !article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <PageSeo
          title="KI-Automatisierung Blog | AI Practitioner"
          description="Fachartikel zu KI-Automatisierung, RAG-Systemen und No-Code-Workflows."
          canonicalPath={`/blog/${slug}`}
          ogType="article"
        />
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (query.error || prefetchedNotFound || !article) {
    return (
      <div className="min-h-screen bg-white px-4 py-20">
        <PageSeo
          title="Artikel nicht gefunden | AI Practitioner Blog"
          description="Der gesuchte Blog-Artikel konnte nicht gefunden werden."
          canonicalPath={`/blog/${slug}`}
        />
        <div className="container max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Blog
          </Button>
          <div className="text-center">
            <h1 className="text-3xl font-semibold mb-4">Artikel nicht gefunden</h1>
            <p className="text-gray-600 mb-8">Der gesuchte Artikel existiert nicht oder wurde gelöscht.</p>
            <Button onClick={() => navigate("/blog")} className="btn-apple">
              Alle Artikel anzeigen
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const seoTitle = article.seoTitle || `${article.title} | AI Practitioner Blog`;
  const seoDescription = article.seoDescription || article.excerpt || "";

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.seoTitle || article.title,
    "description": seoDescription,
    "url": requestInfo.href,
    "datePublished": article.publishedAt
      ? new Date(article.publishedAt).toISOString()
      : undefined,
    "dateModified": article.updatedAt
      ? new Date(article.updatedAt).toISOString()
      : article.publishedAt
        ? new Date(article.publishedAt).toISOString()
        : undefined,
    "author": {
      "@type": "Organization",
      "name": "AI Practitioner",
      "url": requestInfo.origin,
    },
    "publisher": {
      "@type": "Organization",
      "name": "AI Practitioner",
      "logo": {
        "@type": "ImageObject",
        "url": `${requestInfo.origin}/images/logo.png`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": requestInfo.href,
    },
    ...(article.featuredImage ? { "image": article.featuredImage } : {}),
    ...(article.category ? { "articleSection": article.category } : {}),
    ...(article.tags ? { "keywords": article.tags } : {}),
    "inLanguage": "de-DE",
  };

  return (
    <div className="min-h-screen bg-white">
      <PageSeo
        title={seoTitle}
        description={seoDescription}
        canonicalPath={`/blog/${slug}`}
        ogType="article"
        ogImage={article.featuredImage || undefined}
        jsonLd={articleJsonLd}
      />
      {/* Header Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/20" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
      }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src="/images/logo.png" alt="AI Practitioner" className="w-8 h-8" />
            <span className="font-semibold text-lg">AI Practitioner</span>
          </div>
          <div className="flex items-center gap-6">
            <a href="/" className="text-gray-600 hover:text-gray-900 transition hidden md:inline">Startseite</a>
            <a href="/blog" className="text-gray-600 hover:text-gray-900 transition">Blog</a>
          </div>
        </div>
      </nav>

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="pt-16 h-96 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <article className={`${article.featuredImage ? 'py-12' : 'pt-28 pb-12'} px-4`}>
        <div className="container max-w-4xl mx-auto">
          {/* Meta Information */}
          <div className="mb-8 pb-8 border-b border-gray-200">
            {article.category && (
              <div className="mb-4 inline-block">
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                  {article.category}
                </span>
              </div>
            )}

            <h1 className="text-4xl md:text-5xl font-semibold mb-6 leading-tight">
              {article.title}
            </h1>

            <div className="flex flex-wrap gap-8 text-gray-600">
              {article.publishedAt && (
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {format(new Date(article.publishedAt), "d. MMMM yyyy", { locale: de })}
                  </span>
                </div>
              )}
              {article.viewCount !== undefined && (
                <div className="flex items-center gap-2">
                  <span>{article.viewCount} Aufrufe</span>
                </div>
              )}
            </div>

            {/* Share Button */}
            <div className="mt-6">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: article.title,
                      text: article.excerpt || article.title,
                      url: window.location.href,
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert("Link kopiert!");
                  }
                }}
              >
                <Share2 className="w-4 h-4 mr-2" />
                Teilen
              </Button>
            </div>
          </div>

          {/* Article Body - Markdown Rendering */}
          <div className="prose prose-lg max-w-none mb-16 prose-headings:font-semibold prose-headings:text-gray-900 prose-p:text-gray-700 prose-p:leading-relaxed prose-li:text-gray-700 prose-strong:text-gray-900 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {article.content}
            </ReactMarkdown>
          </div>

          {/* Tags */}
          {article.tags && (
            <div className="mb-16 pb-16 border-b border-gray-200">
              <div className="flex flex-wrap gap-3">
                {article.tags.split(",").map((tag: string) => (
                  <span
                    key={tag.trim()}
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="card-glass p-8 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Interessiert an KI-Automatisierungen?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Lerne in der AI Practitioner Ausbildung, wie du professionelle KI-Lösungen aufbaust und damit Geld verdienst.
            </p>
            <Button className="btn-apple" onClick={() => navigate("/")}>
              Zur Ausbildung
            </Button>
          </div>
        </div>
      </article>
    </div>
  );
}
