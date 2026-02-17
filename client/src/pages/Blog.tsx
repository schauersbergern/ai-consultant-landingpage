import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ArrowRight, Calendar, Settings } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { PageSeo } from "@/ssr/head";
import { useServerData } from "@/ssr/server-data";

export default function Blog() {
  const [, navigate] = useLocation();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";
  const serverData = useServerData();
  const initialArticles =
    serverData?.routeData?.kind === "blog-list"
      ? serverData.routeData.articles
      : undefined;

  const { data: articles, isLoading, error } = trpc.blog.listPublished.useQuery(
    { limit: 20 },
    {
      initialData: initialArticles as any[] | undefined,
      staleTime: 60_000,
    },
  );

  const seo = (
    <PageSeo
      title="KI Automatisierung Blog | Wissen für KI Manager IHK"
      description="Expertenwissen zu KI Automatisierung, Praxistipps und Karrieretipps für KI Experten. Bleib auf dem neuesten Stand der KI Weiterbildung. Jetzt entdecken!"
      canonicalPath="/blog"
    />
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        {seo}
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white px-4 py-20">
        {seo}
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">Fehler beim Laden</h1>
          <p className="text-gray-600 mb-8">Es gab einen Fehler beim Laden der Blog-Artikel.</p>
          <Button onClick={() => navigate("/")} className="btn-apple">
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {seo}
      {/* Navigation */}
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
            <a href="/" className="text-gray-600 hover:text-gray-900 transition hidden md:inline">Zur Startseite</a>
            <a href="/blog" className="text-gray-900 font-medium transition">KI-Automatisierung Blog</a>
            {isAdmin && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/admin/blog")}
              >
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="pt-32 pb-16 px-4 section-premium">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-semibold mb-6">
            KI Automatisierung Blog – Tipps für angehende KI Experten
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Lerne die neuesten Trends in KI-Automatisierung, Make, N8N und praktische Anwendungen für dein Business.
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <section className="py-20 px-4 bg-gradient-to-b from-white to-gray-50">
        <div className="container max-w-6xl mx-auto">
          {articles && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.map((article: any) => (
                <Card
                  key={article.id}
                  className="card-glass hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group"
                  onClick={() => navigate(`/blog/${article.slug}`)}
                >
                  {/* Featured Image */}
                  <div className="h-48 overflow-hidden bg-gradient-to-br from-blue-100 to-blue-50">
                    {article.featuredImage ? (
                      <img
                        src={article.featuredImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-4xl font-bold text-blue-200">AI</span>
                      </div>
                    )}
                  </div>

                  <CardHeader>
                    {article.category && (
                      <div className="mb-2 inline-block">
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700">
                          {article.category}
                        </span>
                      </div>
                    )}
                    <CardTitle className="line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {article.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-2">
                      {article.excerpt || article.content.substring(0, 100) + "..."}
                    </CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        {article.publishedAt && (
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {format(new Date(article.publishedAt), "d. MMM yyyy", { locale: de })}
                            </span>
                          </div>
                        )}
                        {article.viewCount !== undefined && (
                          <div className="flex items-center gap-2">
                            <span>{article.viewCount} Aufrufe</span>
                          </div>
                        )}
                      </div>

                      {/* Tags */}
                      {article.tags && (
                        <div className="flex flex-wrap gap-2">
                          {article.tags.split(",").map((tag: string) => (
                            <span
                              key={tag.trim()}
                              className="text-xs px-2 py-1 rounded-md bg-gray-100 text-gray-700"
                            >
                              #{tag.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Read More Button */}
                      <Button
                        variant="ghost"
                        className="w-full justify-between mt-4 group/btn"
                        onClick={() => navigate(`/blog/${article.slug}`)}
                      >
                        Artikel lesen
                        <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-semibold mb-4">Keine Artikel gefunden</h2>
              <p className="text-gray-600 mb-8">Es gibt noch keine veröffentlichten Blog-Artikel.</p>
              <Button onClick={() => navigate("/")} className="btn-apple">
                Zurück zur KI-Ausbildung
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 section-premium">
        <div className="container max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-semibold mb-6">
            Bereit, KI-Automatisierungen zu meistern?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Schließe dich der AI Practitioner Ausbildung an und lerne von Experten.
          </p>
          <Button className="btn-apple px-8 py-4 text-lg" onClick={() => navigate("/")}>
            KI-Ausbildung entdecken
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
}
