import { Request, Response } from "express";
import { getDb } from "./db";
import { blogArticles } from "../drizzle/schema";
import { eq } from "drizzle-orm";

export async function sitemapHandler(req: Request, res: Response) {
  try {
    const db = await getDb();
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const today = new Date().toISOString().split("T")[0];

    // Static pages
    const staticPages = [
      { url: "/", priority: "1.0", changefreq: "weekly", lastmod: today },
      { url: "/trainer", priority: "0.7", changefreq: "monthly", lastmod: today },
      { url: "/blog", priority: "0.8", changefreq: "daily", lastmod: today },
      { url: "/impressum", priority: "0.3", changefreq: "yearly", lastmod: today },
      { url: "/datenschutz", priority: "0.3", changefreq: "yearly", lastmod: today },
    ];

    // Dynamic blog articles
    let articleUrls: { url: string; priority: string; changefreq: string; lastmod?: string }[] = [];
    if (db) {
      const articles = await db.select({
        slug: blogArticles.slug,
        updatedAt: blogArticles.updatedAt,
      }).from(blogArticles).where(eq(blogArticles.status, "published"));
      articleUrls = articles.map((a: any) => ({
        url: `/blog/${a.slug}`,
        priority: "0.7",
        changefreq: "monthly",
        lastmod: a.updatedAt ? new Date(a.updatedAt).toISOString().split("T")[0] : undefined,
      }));
    }

    const allPages: { url: string; priority: string; changefreq: string; lastmod?: string }[] = [...staticPages, ...articleUrls];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages.map(p => `  <url>
    <loc>${baseUrl}${p.url}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>${p.lastmod ? `\n    <lastmod>${p.lastmod}</lastmod>` : ""}
  </url>`).join("\n")}
</urlset>`;

    res.set("Content-Type", "application/xml");
    res.set("Cache-Control", "public, max-age=300, stale-while-revalidate=86400");
    res.send(xml);
  } catch (error) {
    console.error("[Sitemap] Error generating sitemap:", error);
    res.status(500).send("Error generating sitemap");
  }
}
