import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import { getBlogArticles, getBlogArticleBySlug, createBlogArticle, updateBlogArticle, deleteBlogArticle } from "./db";
import { TRPCError } from "@trpc/server";
import { COOKIE_NAME } from "../shared/const";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  blog: router({
    // Get all published articles (public)
    listPublished: publicProcedure
      .input(z.object({
        limit: z.number().default(10),
        category: z.string().optional(),
      }).optional())
      .query(async ({ input }) => {
        return getBlogArticles({
          status: 'published',
          limit: input?.limit,
          category: input?.category,
        });
      }),

    // Get article by slug (public)
    getBySlug: publicProcedure
      .input(z.string())
      .query(async ({ input }) => {
        const article = await getBlogArticleBySlug(input);
        if (!article || article.status !== 'published') {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Article not found',
          });
        }
        return article;
      }),

    // Admin: Get all articles (draft, published, scheduled)
    listAll: protectedProcedure
      .input(z.object({
        status: z.enum(['draft', 'published', 'scheduled']).optional(),
        limit: z.number().default(50),
      }).optional())
      .query(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only admins can view all articles',
          });
        }
        return getBlogArticles({
          status: input?.status,
          limit: input?.limit,
        });
      }),

    // Admin: Create article
    create: protectedProcedure
      .input(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        featuredImage: z.string().optional(),
        status: z.enum(['draft', 'published', 'scheduled']).default('draft'),
        publishedAt: z.date().optional(),
        scheduledFor: z.date().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only admins can create articles',
          });
        }
        return createBlogArticle({
          ...input,
          authorId: ctx.user.id,
          publishedAt: input.status === 'published' ? new Date() : input.publishedAt,
        });
      }),

    // Admin: Update article
    update: protectedProcedure
      .input(z.object({
        id: z.number(),
        title: z.string().optional(),
        slug: z.string().optional(),
        content: z.string().optional(),
        excerpt: z.string().optional(),
        featuredImage: z.string().optional(),
        status: z.enum(['draft', 'published', 'scheduled']).optional(),
        publishedAt: z.date().optional(),
        scheduledFor: z.date().optional(),
        category: z.string().optional(),
        tags: z.string().optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only admins can update articles',
          });
        }
        const { id, ...updates } = input;
        
        // Set publishedAt when transitioning to published
        if (updates.status === 'published' && !updates.publishedAt) {
          updates.publishedAt = new Date();
        }
        
        return updateBlogArticle(id, updates);
      }),

    // Admin: Delete article
    delete: protectedProcedure
      .input(z.number())
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only admins can delete articles',
          });
        }
        return deleteBlogArticle(input);
      }),

    // Admin: Bulk import articles
    bulkImport: protectedProcedure
      .input(z.array(z.object({
        title: z.string().min(1),
        slug: z.string().min(1),
        content: z.string().min(1),
        excerpt: z.string().optional(),
        featuredImage: z.string().optional(),
        status: z.enum(['draft', 'published', 'scheduled']).default('draft'),
        category: z.string().optional(),
        tags: z.string().optional(),
        seoTitle: z.string().optional(),
        seoDescription: z.string().optional(),
      })))
      .mutation(async ({ ctx, input }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Only admins can import articles',
          });
        }
        const results = [];
        for (const article of input) {
          try {
            await createBlogArticle({
              ...article,
              authorId: ctx.user.id,
              publishedAt: article.status === 'published' ? new Date() : undefined,
            });
            results.push({ slug: article.slug, success: true });
          } catch (error: any) {
            results.push({ slug: article.slug, success: false, error: error.message || 'Unknown error' });
          }
        }
        return results;
      }),
  }),
});

export type AppRouter = typeof appRouter;
