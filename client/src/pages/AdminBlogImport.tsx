import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Upload, FileJson, FileText, CheckCircle2, XCircle, ArrowLeft, Download } from "lucide-react";
import { useLocation } from "wouter";
import { useState, useRef } from "react";

interface ImportArticle {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featuredImage?: string;
  status: "draft" | "published" | "scheduled";
  category?: string;
  tags?: string;
  seoTitle?: string;
  seoDescription?: string;
}

interface ImportResult {
  slug: string;
  success: boolean;
  error?: string;
}

export default function AdminBlogImport() {
  const { user, loading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [articles, setArticles] = useState<ImportArticle[]>([]);
  const [importResults, setImportResults] = useState<ImportResult[]>([]);
  const [parseError, setParseError] = useState<string>("");
  const [isImporting, setIsImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<"idle" | "preview" | "importing" | "done">("idle");

  const bulkImportMutation = trpc.blog.bulkImport.useMutation();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

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

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setParseError("");
    setImportResults([]);
    setImportStatus("idle");

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;

      try {
        if (file.name.endsWith(".json")) {
          parseJSON(text);
        } else if (file.name.endsWith(".csv")) {
          parseCSV(text);
        } else {
          setParseError("Nur JSON- und CSV-Dateien werden unterstützt.");
        }
      } catch (err: any) {
        setParseError(`Fehler beim Parsen: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const parseJSON = (text: string) => {
    const data = JSON.parse(text);
    const items = Array.isArray(data) ? data : [data];

    const parsed: ImportArticle[] = items.map((item: any) => ({
      title: item.title || "",
      slug: item.slug || generateSlug(item.title || ""),
      content: item.content || "",
      excerpt: item.excerpt || "",
      featuredImage: item.featuredImage || item.featured_image || "",
      status: item.status || "draft",
      category: item.category || "",
      tags: Array.isArray(item.tags) ? item.tags.join(", ") : (item.tags || ""),
      seoTitle: item.seoTitle || item.seo_title || "",
      seoDescription: item.seoDescription || item.seo_description || "",
    }));

    setArticles(parsed);
    setImportStatus("preview");
  };

  const parseCSV = (text: string) => {
    const lines = text.split("\n").filter((line) => line.trim());
    if (lines.length < 2) {
      setParseError("CSV-Datei muss mindestens eine Kopfzeile und eine Datenzeile enthalten.");
      return;
    }

    const headers = lines[0].split(";").map((h) => h.trim().toLowerCase());
    const parsed: ImportArticle[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(";").map((v) => v.trim());
      const row: any = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
      });

      parsed.push({
        title: row.title || row.titel || "",
        slug: row.slug || generateSlug(row.title || row.titel || ""),
        content: row.content || row.inhalt || "",
        excerpt: row.excerpt || row.zusammenfassung || "",
        featuredImage: row.featuredimage || row.featured_image || row.bild || "",
        status: (row.status || "draft") as "draft" | "published" | "scheduled",
        category: row.category || row.kategorie || "",
        tags: row.tags || "",
        seoTitle: row.seotitle || row.seo_title || "",
        seoDescription: row.seodescription || row.seo_description || "",
      });
    }

    setArticles(parsed);
    setImportStatus("preview");
  };

  const handleImport = async () => {
    setIsImporting(true);
    setImportStatus("importing");

    try {
      const results = await bulkImportMutation.mutateAsync(articles);
      setImportResults(results);
      setImportStatus("done");
    } catch (error: any) {
      setParseError(`Import-Fehler: ${error.message}`);
      setImportStatus("preview");
    } finally {
      setIsImporting(false);
    }
  };

  const handleReset = () => {
    setArticles([]);
    setImportResults([]);
    setParseError("");
    setImportStatus("idle");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const downloadTemplate = (format: "json" | "csv") => {
    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === "json") {
      const template = [
        {
          title: "Beispiel-Artikel: KI Automatisierung lernen",
          slug: "ki-automatisierung-lernen",
          content: "Hier kommt der vollständige Artikeltext hin.\n\n## Unterüberschrift\n\nWeiterer Text...",
          excerpt: "Kurze Zusammenfassung des Artikels für die Vorschau.",
          featuredImage: "https://beispiel.com/bild.jpg",
          status: "draft",
          category: "KI Automatisierung",
          tags: "KI, Automatisierung, Make, N8N",
          seoTitle: "KI Automatisierung lernen – Schritt für Schritt Anleitung",
          seoDescription: "Lerne KI Automatisierung mit Make und N8N. Praxisnahe Anleitung für Einsteiger.",
        },
      ];
      content = JSON.stringify(template, null, 2);
      filename = "blog-import-vorlage.json";
      mimeType = "application/json";
    } else {
      content = "title;slug;content;excerpt;status;category;tags;seoTitle;seoDescription\n";
      content += "Beispiel Artikel;beispiel-artikel;Hier kommt der Artikeltext hin;Kurze Zusammenfassung;draft;KI;KI, Automatisierung;SEO Titel;SEO Beschreibung\n";
      filename = "blog-import-vorlage.csv";
      mimeType = "text/csv";
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/admin/blog")}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="text-3xl font-semibold">Artikel importieren</h1>
                <p className="text-gray-600 mt-1">Lade mehrere Artikel auf einmal hoch (JSON oder CSV)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-6">
          {/* Templates Download */}
          <Card>
            <CardHeader>
              <CardTitle>Vorlagen herunterladen</CardTitle>
              <CardDescription>
                Lade eine Vorlage herunter, fülle sie mit deinen Artikeln aus und lade sie dann hoch.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => downloadTemplate("json")}
                >
                  <FileJson className="w-4 h-4 mr-2" />
                  JSON-Vorlage
                </Button>
                <Button
                  variant="outline"
                  onClick={() => downloadTemplate("csv")}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  CSV-Vorlage
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upload Area */}
          <Card>
            <CardHeader>
              <CardTitle>Datei hochladen</CardTitle>
              <CardDescription>
                Unterstützte Formate: JSON (empfohlen) und CSV (Semikolon-getrennt)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-12 text-center hover:border-blue-400 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-lg font-medium text-gray-700 mb-2">
                  Klicke hier oder ziehe eine Datei hierher
                </p>
                <p className="text-sm text-gray-500">
                  JSON oder CSV, max. 10 MB
                </p>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,.csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </div>

              {parseError && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-700 text-sm">{parseError}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Preview */}
          {importStatus === "preview" && articles.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Vorschau: {articles.length} Artikel erkannt</CardTitle>
                <CardDescription>
                  Überprüfe die erkannten Artikel vor dem Import.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {articles.map((article, index) => (
                    <div
                      key={index}
                      className="p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold truncate">{article.title || "Kein Titel"}</h4>
                          <p className="text-sm text-gray-500 mt-1">
                            /blog/{article.slug}
                          </p>
                          <div className="flex gap-3 mt-2 text-xs text-gray-500">
                            <span className={`px-2 py-0.5 rounded-full ${article.status === "published"
                                ? "bg-green-100 text-green-700"
                                : article.status === "scheduled"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-700"
                              }`}>
                              {article.status === "published" ? "Veröffentlicht" : article.status === "scheduled" ? "Geplant" : "Entwurf"}
                            </span>
                            {article.category && <span>Kategorie: {article.category}</span>}
                            <span>{article.content.length} Zeichen</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={handleImport}
                    disabled={isImporting}
                    className="btn-apple"
                  >
                    {isImporting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Importiere...
                      </>
                    ) : (
                      <>
                        <Upload className="w-4 h-4 mr-2" />
                        {articles.length} Artikel importieren
                      </>
                    )}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Abbrechen
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results */}
          {importStatus === "done" && importResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Import abgeschlossen</CardTitle>
                <CardDescription>
                  {importResults.filter((r) => r.success).length} von {importResults.length} Artikeln erfolgreich importiert.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {importResults.map((result, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg flex items-center gap-3 ${result.success
                          ? "bg-green-50 border border-green-200"
                          : "bg-red-50 border border-red-200"
                        }`}
                    >
                      {result.success ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-medium truncate block">
                          {result.slug}
                        </span>
                        {result.error && (
                          <span className="text-xs text-red-600">{result.error}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 mt-6">
                  <Button
                    onClick={() => navigate("/admin/blog")}
                    className="btn-apple"
                  >
                    Zur Artikel-Übersicht
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    Weitere Artikel importieren
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Format Guide */}
          <Card>
            <CardHeader>
              <CardTitle>Format-Anleitung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">JSON-Format (empfohlen)</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {`[
  {
    "title": "Artikeltitel",
    "slug": "artikel-slug",
    "content": "Vollständiger Artikeltext...",
    "excerpt": "Kurze Zusammenfassung",
    "status": "draft",
    "category": "KI Automatisierung",
    "tags": "KI, Make, N8N",
    "seoTitle": "SEO-optimierter Titel",
    "seoDescription": "Meta-Beschreibung"
  }
]`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">CSV-Format (Semikolon-getrennt)</h4>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                  {`title;slug;content;excerpt;status;category;tags;seoTitle;seoDescription
Mein Artikel;mein-artikel;Artikeltext;Zusammenfassung;draft;KI;KI, Make;SEO Titel;SEO Beschreibung`}
                </pre>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Pflichtfelder</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li><strong>title</strong> – Titel des Artikels</li>
                  <li><strong>content</strong> – Vollständiger Artikeltext</li>
                </ul>
                <p className="text-sm text-gray-500 mt-2">
                  Der Slug wird automatisch aus dem Titel generiert, wenn er nicht angegeben wird.
                  Status ist standardmäßig "draft" (Entwurf).
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
