import type { NextFunction, Request, Response } from "express";
import crypto from "crypto";
import { parse as parseCookieHeader } from "cookie";
import { ENV } from "./env";

const OAUTH_STATE_COOKIE = "oauth_state";
const OAUTH_STATE_TTL_MS = 10 * 60 * 1000;

type RateLimitOptions = {
  max: number;
  windowMs: number;
  name: string;
  maxEntries?: number;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

function getClientIp(req: Request) {
  return req.ip || req.socket.remoteAddress || "unknown";
}

function pruneStore(store: Map<string, RateLimitEntry>, now: number) {
  store.forEach((entry, key) => {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  });
}

export function createRateLimiter({
  max,
  windowMs,
  name,
  maxEntries = 5_000,
}: RateLimitOptions) {
  const store = new Map<string, RateLimitEntry>();
  let lastPruneAt = 0;
  const pruneIntervalMs = Math.min(30_000, windowMs);

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();
    const shouldPrune =
      store.size >= maxEntries || now - lastPruneAt >= pruneIntervalMs;

    if (shouldPrune) {
      pruneStore(store, now);
      lastPruneAt = now;
    }

    const key = `${name}:${getClientIp(req)}`;
    const existing = store.get(key);

    if (!existing || existing.resetAt <= now) {
      if (!existing && store.size >= maxEntries) {
        // Fail closed when limiter storage is saturated to avoid memory abuse.
        res.setHeader("Retry-After", "1");
        res.status(429).json({ error: "Too many requests" });
        return;
      }

      store.set(key, {
        count: 1,
        resetAt: now + windowMs,
      });
      next();
      return;
    }

    if (existing.count >= max) {
      const retryAfterSeconds = Math.max(
        1,
        Math.ceil((existing.resetAt - now) / 1_000),
      );

      res.setHeader("Retry-After", String(retryAfterSeconds));
      res.status(429).json({ error: "Too many requests" });
      return;
    }

    existing.count += 1;
    next();
  };
}

export function securityHeaders(req: Request, res: Response, next: NextFunction) {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(), payment=()",
  );
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Resource-Policy", "same-origin");

  if (ENV.isProduction) {
    res.setHeader(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload",
    );

    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: https: https://ping.byspotify.com",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net https://pixel.byspotify.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.facebook.com https://connect.facebook.net https://ping.byspotify.com https://pixel.byspotify.com",
      "frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://tinder.thrivecart.com",
      "form-action 'self' https://tinder.thrivecart.com",
    ].join("; ");

    res.setHeader("Content-Security-Policy", csp);
  }

  next();
}

export function createOAuthStateValue() {
  return crypto.randomBytes(32).toString("hex");
}

function safeEqual(a: string, b: string) {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);

  if (aBuf.length !== bBuf.length) {
    return false;
  }

  return crypto.timingSafeEqual(aBuf, bBuf);
}

export function readOAuthStateCookie(req: Request) {
  const cookies = parseCookieHeader(req.headers.cookie || "");
  return cookies[OAUTH_STATE_COOKIE];
}

export function writeOAuthStateCookie(req: Request, res: Response, state: string) {
  const secure = ENV.isProduction || req.protocol === "https";
  res.cookie(OAUTH_STATE_COOKIE, state, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: OAUTH_STATE_TTL_MS,
  });
}

export function clearOAuthStateCookie(req: Request, res: Response) {
  const secure = ENV.isProduction || req.protocol === "https";
  res.clearCookie(OAUTH_STATE_COOKIE, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
  });
}

export function validateOAuthState(
  req: Request,
  stateFromQuery: string | undefined,
) {
  const stateCookie = readOAuthStateCookie(req);

  if (!stateFromQuery || !stateCookie) return false;
  return safeEqual(stateFromQuery, stateCookie);
}
