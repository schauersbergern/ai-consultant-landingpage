import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus, Edit2, Trash2, Eye, EyeOff, Clock, Upload, ExternalLink } from "lucide-react";
import { useLocation } from "wouter";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect, useState } from "react";

export default function AdminBlog() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();

  const { data: articles, isLoading, refetch } = trpc.blog.listAll.useQuery({
    status: selectedStatus as any,
    limit: 100,
  });

  const deleteMutation = trpc.blog.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  // Redirect if not authenticated or not admin
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) return null;

  if (user.role !== "admin") {
    return (
      <div className="min-h-screen bg-white px-4 py-20">
        <div className="container max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-semibold mb-4">Zugriff verweigert</h1>
          <p className="text-gray-600 mb-8">Du hast keine Berechtigung, auf diesen Bereich zuzugreifen.</p>
          <Button onClick={() => navigate("/")} className="btn-apple">
            Zurück zur Startseite
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-semibold">Blog-Verwaltung</h1>
              <p className="text-gray-600 mt-1">Verwalte deine Blog-Artikel</p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/api/auth/logout")}
              >
                Abmelden
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/blog")}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Blog ansehen
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/admin/blog/import")}
              >
                <Upload className="w-4 h-4 mr-2" />
                Importieren
              </Button>
              <Button
                onClick={() => navigate("/admin/blog/new")}
                className="btn-apple"
              >
                <Plus className="w-4 h-4 mr-2" />
                Neuer Artikel
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-4">
          <div className="flex gap-3 flex-wrap">
            <Button
              variant={selectedStatus === undefined ? "default" : "outline"}
              onClick={() => setSelectedStatus(undefined)}
              size="sm"
            >
              Alle
            </Button>
            <Button
              variant={selectedStatus === "draft" ? "default" : "outline"}
              onClick={() => setSelectedStatus("draft")}
              size="sm"
            >
              <EyeOff className="w-4 h-4 mr-2" />
              Entwürfe
            </Button>
            <Button
              variant={selectedStatus === "published" ? "default" : "outline"}
              onClick={() => setSelectedStatus("published")}
              size="sm"
            >
              <Eye className="w-4 h-4 mr-2" />
              Veröffentlicht
            </Button>
            <Button
              variant={selectedStatus === "scheduled" ? "default" : "outline"}
              onClick={() => setSelectedStatus("scheduled")}
              size="sm"
            >
              <Clock className="w-4 h-4 mr-2" />
              Geplant
            </Button>
          </div>
        </div>
      </div>

      {/* Articles List */}
      <div className="container max-w-6xl mx-auto px-4 py-8">
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        ) : articles && articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article: any) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold truncate">
                          {article.title}
                        </h3>
                        <div className="flex gap-2">
                          {article.status === "draft" && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              Entwurf
                            </span>
                          )}
                          {article.status === "published" && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Veröffentlicht
                            </span>
                          )}
                          {article.status === "scheduled" && (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              Geplant
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 line-clamp-2">
                        {article.excerpt || article.content.substring(0, 100)}...
                      </p>

                      <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                        {article.publishedAt && (
                          <span>
                            Veröffentlicht: {format(new Date(article.publishedAt), "d. MMM yyyy", { locale: de })}
                          </span>
                        )}
                        {article.scheduledFor && (
                          <span>
                            Geplant für: {format(new Date(article.scheduledFor), "d. MMM yyyy HH:mm", { locale: de })}
                          </span>
                        )}
                        {article.category && (
                          <span>Kategorie: {article.category}</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(`/admin/blog/${article.id}/edit`)}
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          if (confirm("Möchtest du diesen Artikel wirklich löschen?")) {
                            deleteMutation.mutate(article.id);
                          }
                        }}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Keine Artikel gefunden</h2>
            <p className="text-gray-600 mb-6">
              {selectedStatus
                ? `Es gibt keine ${selectedStatus === "draft" ? "Entwürfe" : selectedStatus === "published" ? "veröffentlichten Artikel" : "geplanten Artikel"}.`
                : "Es gibt noch keine Blog-Artikel."}
            </p>
            <Button onClick={() => navigate("/admin/blog/new")} className="btn-apple">
              <Plus className="w-4 h-4 mr-2" />
              Ersten Artikel erstellen
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
