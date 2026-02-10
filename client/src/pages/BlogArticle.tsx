import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useLocation, useParams } from "wouter";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function BlogArticle() {
  const params = useParams<{ slug: string }>();
  const slug = params.slug || "";
  const [, navigate] = useLocation();
  const { data: article, isLoading, error } = trpc.blog.getBySlug.useQuery(slug, {
    enabled: !!slug,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Set SEO meta tags
  useEffect(() => {
    if (article) {
      if (article.seoTitle) {
        document.title = article.seoTitle;
      } else {
        document.title = `${article.title} | AI Practitioner Blog`;
      }
      // Set meta description
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement("meta");
        metaDesc.setAttribute("name", "description");
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute("content", article.seoDescription || article.excerpt || "");

      // Set Open Graph tags
      const ogTags: Record<string, string> = {
        "og:title": article.seoTitle || article.title,
        "og:description": article.seoDescription || article.excerpt || "",
        "og:type": "article",
        "og:url": window.location.href,
      };
      if (article.featuredImage) {
        ogTags["og:image"] = article.featuredImage;
      }
      Object.entries(ogTags).forEach(([property, content]) => {
        let tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement("meta");
          tag.setAttribute("property", property);
          document.head.appendChild(tag);
        }
        tag.setAttribute("content", content);
      });

      // JSON-LD Structured Data (Article Schema)
      const existingJsonLd = document.querySelector('script[type="application/ld+json"][data-blog-article]');
      if (existingJsonLd) existingJsonLd.remove();

      const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": article.seoTitle || article.title,
        "description": article.seoDescription || article.excerpt || "",
        "url": window.location.href,
        "datePublished": article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined,
        "dateModified": article.updatedAt ? new Date(article.updatedAt).toISOString() : (article.publishedAt ? new Date(article.publishedAt).toISOString() : undefined),
        "author": {
          "@type": "Organization",
          "name": "AI Practitioner",
          "url": window.location.origin
        },
        "publisher": {
          "@type": "Organization",
          "name": "AI Practitioner",
          "logo": {
            "@type": "ImageObject",
            "url": "https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/XjvoXOCMszZFXAGc.png"
          }
        },
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        },
        ...(article.featuredImage ? { "image": article.featuredImage } : {}),
        ...(article.category ? { "articleSection": article.category } : {}),
        ...(article.tags ? { "keywords": article.tags } : {}),
        "inLanguage": "de-DE"
      };

      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-blog-article", "true");
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      document.title = "KI Ausbildung mit IHK-Zertifikat | AI Practitioner in 12 Wochen";
      const jsonLdScript = document.querySelector('script[type="application/ld+json"][data-blog-article]');
      if (jsonLdScript) jsonLdScript.remove();
    };
  }, [article]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-white px-4 py-20">
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

  return (
    <div className="min-h-screen bg-white">
      {/* Header Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/20" style={{
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.1)'
      }}>
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
            <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310419663031116390/XjvoXOCMszZFXAGc.png" alt="AI Practitioner" className="w-8 h-8" />
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
