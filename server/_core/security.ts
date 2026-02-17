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
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

function getClientIp(req: Request) {
  const forwardedFor = req.headers["x-forwarded-for"];

  if (typeof forwardedFor === "string" && forwardedFor.length > 0) {
    return forwardedFor.split(",")[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return forwardedFor[0];
  }

  return req.socket.remoteAddress || req.ip || "unknown";
}

function pruneStore(store: Map<string, RateLimitEntry>, now: number) {
  store.forEach((entry, key) => {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  });
}

export function createRateLimiter({ max, windowMs, name }: RateLimitOptions) {
  const store = new Map<string, RateLimitEntry>();

  return (req: Request, res: Response, next: NextFunction) => {
    const now = Date.now();

    if (store.size > 5_000) {
      pruneStore(store, now);
    }

    const key = `${name}:${getClientIp(req)}`;
    const existing = store.get(key);

    if (!existing || existing.resetAt <= now) {
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
      "img-src 'self' data: https:",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://connect.facebook.net",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' data: https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.facebook.com https://connect.facebook.net",
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
