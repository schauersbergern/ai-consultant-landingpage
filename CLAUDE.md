# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI Consultant Landing Page — a full-stack TypeScript application with a React (Vite) frontend, Express backend, tRPC API layer, and MySQL database (TiDB Cloud via Drizzle ORM). Includes a public blog and an admin dashboard with Google OAuth authentication.

## Commands

```bash
pnpm dev            # Start dev server (tsx watch, hot reload)
pnpm build          # Build client (Vite) + server (esbuild) → dist/
pnpm start          # Run production build (node dist/index.js)
pnpm check          # TypeScript type checking (tsc --noEmit)
pnpm format         # Prettier formatting
pnpm test           # Run tests (vitest, server-side only)
pnpm db:push        # Generate and run database migrations (drizzle-kit)
```

Package manager is **pnpm** (v10.4.1).

## Architecture

### Three-layer structure

- **`client/`** — React 19 SPA built with Vite 7. Uses wouter for routing, TanStack React Query for data fetching, shadcn/ui (Radix primitives) for components, Tailwind CSS 4 for styling.
- **`server/`** — Express server exposing tRPC endpoints under `/api/trpc` and Express routes for OAuth (`/api/auth/google/*`), sitemap, and robots.txt. Core framework files live in `server/_core/`.
- **`shared/`** — Code shared between client and server (constants, types, error classes).

### Path aliases

- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

### API layer (tRPC)

The main router is defined in `server/routers.ts`. Procedure types:
- `publicProcedure` — no auth required
- `protectedProcedure` — requires authenticated user
- Admin checks are done inline via `ctx.user.role !== 'admin'`

tRPC context is created in `server/_core/context.ts`, which extracts the session from cookies.

### Authentication

Google OAuth 2.0 flow handled in `server/_core/googleAuth.ts`. JWT session tokens (via `jose`) are stored in an httpOnly cookie (`app_session_id`, defined in `shared/const.ts`). Admin access is gate-kept by the `ADMIN_EMAILS` env var.

### Database

MySQL (TiDB Cloud) with Drizzle ORM. Schema in `drizzle/schema.ts` — two tables: `users` and `blog_articles`. Query functions in `server/db.ts`. Migrations in `drizzle/migrations/`.

### Frontend routing (wouter)

Public: `/`, `/blog`, `/blog/:slug`, `/impressum`, `/datenschutz`, `/danke`, `/thank-you`, `/login`
Admin: `/admin/blog`, `/admin/blog/new`, `/admin/blog/import`, `/admin/blog/:id/edit`

### Tests

Vitest, server-side only. Test files are colocated: `server/**/*.test.ts`. Run a single test file with `pnpm vitest run server/path/to/file.test.ts`.

## Environment Variables

Required in `.env`:
- `DATABASE_URL` — MySQL connection string (with SSL for TiDB)
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` — OAuth credentials
- `BASE_URL` — App URL (e.g. `http://localhost:3000`)
- `ADMIN_EMAILS` — Comma-separated admin email addresses
- `SESSION_SECRET` — JWT signing secret
- `PORT` — Server port (default 3000)

## Code Style

Prettier config: double quotes, semicolons, trailing commas (es5), 80 char width, 2-space indent, arrow parens avoided. No ESLint configured.
