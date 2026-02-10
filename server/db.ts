import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, blogArticles, InsertBlogArticle } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Blog queries
export async function getBlogArticles(filters?: { status?: string; category?: string; limit?: number }) {
  const db = await getDb();
  if (!db) return [];

  try {
    let query = db.select().from(blogArticles) as any;
    
    if (filters?.status) {
      query = query.where(eq(blogArticles.status, filters.status as any));
    }
    if (filters?.category) {
      query = query.where(eq(blogArticles.category, filters.category));
    }

    const result = await query.orderBy(desc(blogArticles.publishedAt)).limit(filters?.limit || 10);
    return result;
  } catch (error) {
    console.error("Failed to get blog articles:", error);
    return [];
  }
}

export async function getBlogArticleBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(blogArticles).where(eq(blogArticles.slug, slug));
  return result.length > 0 ? result[0] : undefined;
}

export async function createBlogArticle(article: InsertBlogArticle) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.insert(blogArticles).values(article);
  return result;
}

export async function updateBlogArticle(id: number, updates: Partial<InsertBlogArticle>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.update(blogArticles).set(updates).where(eq(blogArticles.id, id));
  return result;
}

export async function deleteBlogArticle(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const result = await db.delete(blogArticles).where(eq(blogArticles.id, id));
  return result;
}

// TODO: add feature queries here as your schema grows.
