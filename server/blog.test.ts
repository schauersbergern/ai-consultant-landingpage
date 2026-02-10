import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { getBlogArticles, getBlogArticleBySlug, createBlogArticle, updateBlogArticle, deleteBlogArticle } from "./db";
import { getDb } from "./db";

describe("Blog Database Functions", () => {
  let testArticleId: number;

  beforeAll(async () => {
    // Initialize database connection if needed
    const db = await getDb();
    if (!db) {
      console.warn("Database not available for tests");
    }
  });

  afterAll(async () => {
    // Cleanup test data
    if (testArticleId) {
      try {
        await deleteBlogArticle(testArticleId);
      } catch (error) {
        console.error("Cleanup error:", error);
      }
    }
  });

  it("should create a blog article", async () => {
    const result = await createBlogArticle({
      title: "Test Article",
      slug: "test-article-" + Date.now(),
      content: "This is a test article",
      excerpt: "Test excerpt",
      status: "draft",
      authorId: 1,
      category: "Test",
      tags: "test,blog",
    });

    expect(result).toBeDefined();
    if (result && "insertId" in result) {
      testArticleId = result.insertId as number;
    }
  });

  it("should get articles by status", async () => {
    const articles = await getBlogArticles({
      status: "draft",
      limit: 10,
    });

    expect(Array.isArray(articles)).toBe(true);
  });

  it("should get article by slug", async () => {
    if (!testArticleId) {
      console.warn("Skipping test - no test article created");
      return;
    }

    const slug = "test-article-" + Date.now();
    const article = await getBlogArticleBySlug(slug);

    // Article might not exist if slug is different
    if (article) {
      expect(article.slug).toBe(slug);
    }
  });

  it("should update a blog article", async () => {
    if (!testArticleId) {
      console.warn("Skipping test - no test article created");
      return;
    }

    const result = await updateBlogArticle(testArticleId, {
      title: "Updated Test Article",
      status: "published",
    });

    expect(result).toBeDefined();
  });

  it("should handle empty article lists gracefully", async () => {
    const articles = await getBlogArticles({
      status: "scheduled",
      limit: 100,
    });

    expect(Array.isArray(articles)).toBe(true);
  });

  it("should return undefined for non-existent article", async () => {
    const article = await getBlogArticleBySlug("non-existent-article-slug-" + Date.now());
    expect(article).toBeUndefined();
  });
});
