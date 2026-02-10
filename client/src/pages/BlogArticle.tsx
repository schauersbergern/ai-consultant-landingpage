import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Loader2, ArrowLeft, Calendar, Share2 } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect } from "react";

interface BlogArticleProps {
  slug: string;
}

export default function BlogArticle({ slug }: BlogArticleProps) {
  const [, navigate] = useLocation();
  const { data: article, isLoading, error } = trpc.blog.getBySlug.useQuery(slug);

  useEffect(() => {
    // Scroll to top when article loads
    window.scrollTo(0, 0);
  }, [slug]);

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
      <div className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-white/20">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate("/blog")}
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück zum Blog
          </Button>
        </div>
      </div>

      {/* Featured Image */}
      {article.featuredImage && (
        <div className="h-96 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {/* Article Content */}
      <article className="py-20 px-4">
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

            <h1 className="text-5xl md:text-6xl font-semibold mb-6 leading-tight">
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
                    // Fallback: copy to clipboard
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

          {/* Article Body */}
          <div className="prose prose-lg max-w-none mb-16">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: article.content
                  .split("\n")
                  .map((line: string) => {
                    if (line.startsWith("# ")) return `<h2 class="text-3xl font-bold mt-8 mb-4">${line.slice(2)}</h2>`;
                    if (line.startsWith("## ")) return `<h3 class="text-2xl font-bold mt-6 mb-3">${line.slice(3)}</h3>`;
                    if (line.startsWith("- ")) return `<li class="ml-4">${line.slice(2)}</li>`;
                    if (line.trim() === "") return "<br />";
                    return `<p class="mb-4">${line}</p>`;
                  })
                  .join(""),
              }}
            />
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
            <Button className="btn-apple">
              Zur Ausbildung
            </Button>
          </div>
        </div>
      </article>

      {/* Related Articles Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
        <div className="container max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-12">Weitere Artikel</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Placeholder for related articles */}
            <div className="card-glass p-6 text-center text-gray-500">
              <p>Weitere Artikel werden in Kürze hinzugefügt</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
