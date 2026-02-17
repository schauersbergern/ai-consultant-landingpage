import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, X, Calendar } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useEffect } from "react";
import { format } from "date-fns";

interface AdminBlogEditorProps {
  id?: string;
}

export default function AdminBlogEditor({ id }: AdminBlogEditorProps) {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    excerpt: "",
    featuredImage: "",
    status: "draft" as "draft" | "published" | "scheduled",
    category: "",
    tags: "",
    seoTitle: "",
    seoDescription: "",
    scheduledFor: "",
  });

  const [isSaving, setIsSaving] = useState(false);

  const createMutation = trpc.blog.create.useMutation({
    onSuccess: () => {
      navigate("/admin/blog");
    },
  });

  const updateMutation = trpc.blog.update.useMutation({
    onSuccess: () => {
      navigate("/admin/blog");
    },
  });

  // Fetch article if ID is present
  const { data: article, isLoading: isArticleLoading } = trpc.blog.getById.useQuery(
    { id: parseInt(id!) },
    {
      enabled: !!id,
      retry: false
    }
  );

  useEffect(() => {
    if (article) {
      setFormData({
        title: article.title,
        slug: article.slug,
        content: article.content,
        excerpt: article.excerpt || "",
        featuredImage: article.featuredImage || "",
        status: article.status as any,
        category: article.category || "",
        tags: article.tags || "",
        seoTitle: article.seoTitle || "",
        seoDescription: article.seoDescription || "",
        scheduledFor: article.scheduledFor ? new Date(article.scheduledFor).toISOString().slice(0, 16) : "",
      });
    }
  }, [article]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [authLoading, user, navigate]);

  // Redirect if not authenticated or not admin
  if (authLoading || (id && isArticleLoading)) {
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

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const payload = {
        ...formData,
        scheduledFor: formData.scheduledFor ? new Date(formData.scheduledFor) : undefined,
      };

      if (id) {
        await updateMutation.mutateAsync({
          id: parseInt(id),
          ...payload,
        });
      } else {
        await createMutation.mutateAsync(payload);
      }
    } catch (error) {
      console.error("Error saving article:", error);
      alert("Fehler beim Speichern des Artikels");
    } finally {
      setIsSaving(false);
    }
  };

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">
              {id ? "Artikel bearbeiten" : "Neuer Artikel"}
            </h1>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => navigate("/admin/blog")}
              >
                <X className="w-4 h-4 mr-2" />
                Abbrechen
              </Button>
              <Button
                onClick={handleSave}
                disabled={isSaving || !formData.title || !formData.content}
                className="btn-apple"
              >
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Wird gespeichert..." : "Speichern"}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Editor */}
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Title */}
          <Card>
            <CardHeader>
              <CardTitle>Titel</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    title: e.target.value,
                    slug: generateSlug(e.target.value),
                  });
                }}
                placeholder="Artikel-Titel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </CardContent>
          </Card>

          {/* Slug */}
          <Card>
            <CardHeader>
              <CardTitle>URL-Slug</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">/blog/</span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="artikel-slug"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Content */}
          <Card>
            <CardHeader>
              <CardTitle>Inhalt</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Schreibe deinen Artikel hier... (Markdown wird unterstützt)"
                className="w-full h-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
              <p className="text-xs text-gray-500 mt-2">
                Unterstützt: # Überschrift, ## Unterüberschrift, - Listenpunkte
              </p>
            </CardContent>
          </Card>

          {/* Excerpt */}
          <Card>
            <CardHeader>
              <CardTitle>Zusammenfassung (optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Kurze Zusammenfassung des Artikels"
                className="w-full h-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </CardContent>
          </Card>

          {/* Featured Image */}
          <Card>
            <CardHeader>
              <CardTitle>Titelbild-URL (optional)</CardTitle>
            </CardHeader>
            <CardContent>
              <input
                type="url"
                value={formData.featuredImage}
                onChange={(e) => setFormData({ ...formData, featuredImage: e.target.value })}
                placeholder="https://beispiel.com/bild.jpg"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {formData.featuredImage && (
                <div className="mt-4">
                  <img
                    src={formData.featuredImage}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Category & Tags */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kategorie (optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="z.B. KI, Automatisierung"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tags (optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="Komma-getrennt: KI, Make, Automatisierung"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </CardContent>
            </Card>
          </div>

          {/* SEO */}
          <Card>
            <CardHeader>
              <CardTitle>SEO-Einstellungen (optional)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO-Titel
                </label>
                <input
                  type="text"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                  placeholder="Titel für Suchmaschinen (max. 60 Zeichen)"
                  maxLength={60}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seoTitle.length}/60 Zeichen
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  SEO-Beschreibung
                </label>
                <textarea
                  value={formData.seoDescription}
                  onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                  placeholder="Beschreibung für Suchmaschinen (max. 160 Zeichen)"
                  maxLength={160}
                  className="w-full h-20 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.seoDescription.length}/160 Zeichen
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Publishing Options */}
          <Card>
            <CardHeader>
              <CardTitle>Veröffentlichungsoptionen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Status
                </label>
                <div className="space-y-2">
                  {(["draft", "published", "scheduled"] as const).map((status) => (
                    <label key={status} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="status"
                        value={status}
                        checked={formData.status === status}
                        onChange={(e) =>
                          setFormData({ ...formData, status: e.target.value as any })
                        }
                        className="w-4 h-4"
                      />
                      <span className="text-sm">
                        {status === "draft" && "Entwurf"}
                        {status === "published" && "Sofort veröffentlichen"}
                        {status === "scheduled" && "Zeitgesteuert veröffentlichen"}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {formData.status === "scheduled" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Veröffentlichungsdatum und -zeit
                  </label>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400" />
                    <input
                      type="datetime-local"
                      value={formData.scheduledFor}
                      onChange={(e) =>
                        setFormData({ ...formData, scheduledFor: e.target.value })
                      }
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
