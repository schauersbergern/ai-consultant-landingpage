import "dotenv/config";
import express, { type RequestHandler } from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { ENV, validateSecurityEnv } from "./env";
import { createOrUpdateQuentnLead, isValidEmail, isValidPhone } from "./quentn";
import {
  clearOAuthStateCookie,
  createOAuthStateValue,
  createRateLimiter,
  securityHeaders,
  validateOAuthState,
  writeOAuthStateCookie,
} from "./security";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  validateSecurityEnv();

  const app = express();
  app.disable("x-powered-by");
  app.set("trust proxy", 1);

  const server = createServer(app);
  const authStartLimiter = createRateLimiter({
    name: "auth-start",
    max: 20,
    windowMs: 60_000,
  });
  const authCallbackLimiter = createRateLimiter({
    name: "auth-callback",
    max: 30,
    windowMs: 60_000,
  });
  const trpcLimiter = createRateLimiter({
    name: "api-trpc",
    max: 180,
    windowMs: 60_000,
  });
  const leadCaptureLimiter = createRateLimiter({
    name: "lead-capture",
    max: 60,
    windowMs: 60_000,
  });

  // Configure body parser with larger size limit for file uploads
  app.use(securityHeaders);
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));
  // OAuth callback under /api/oauth/callback

  app.get("/api/auth/google", authStartLimiter, (req, res) => {
    import("./googleAuth").then(({ googleAuthService }) => {
      const state = createOAuthStateValue();
      writeOAuthStateCookie(req, res, state);
      const url = googleAuthService.generateAuthUrl(state);
      res.redirect(url);
    });
  });

  app.get("/api/auth/google/callback", authCallbackLimiter, async (req, res) => {
    const { code, state } = req.query;

    if (typeof code !== "string" || typeof state !== "string") {
      res.status(400).send("Missing code");
      return;
    }

    if (!validateOAuthState(req, state)) {
      clearOAuthStateCookie(req, res);
      res.redirect("/login?error=invalid_oauth_state");
      return;
    }

    clearOAuthStateCookie(req, res);

    try {
      const { googleAuthService } = await import("./googleAuth");
      const { access_token } = await googleAuthService.getToken(code);
      if (!access_token) throw new Error("No access token");

      const userInfo = await googleAuthService.getUserInfo(access_token);

      const { upsertUser, getUserByOpenId } = await import("../db");

      const email = String(userInfo.email || "").trim().toLowerCase();
      if (!email) {
        throw new Error("User email missing");
      }

      const isAdmin = ENV.adminEmails.includes(email);
      if (!isAdmin) {
        res.redirect("/login?error=forbidden");
        return;
      }

      // Sync user to DB
      await upsertUser({
        openId: userInfo.id as string,
        email: email,
        name: userInfo.name as string,
        loginMethod: "google",
        role: isAdmin ? "admin" : "user",
        lastSignedIn: new Date(),
      });

      const user = await getUserByOpenId(userInfo.id as string);

      if (!user) throw new Error("Failed to create user");

      // Create session
      const { sdk } = await import("./sdk");
      const { COOKIE_NAME, ONE_YEAR_MS } = await import("@shared/const");
      const { getSessionCookieOptions } = await import("./cookies");

      const sessionToken = await sdk.createSessionToken(user.openId, {
        name: user.name || "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect("/admin/blog");
    } catch (error: any) {
      console.error("OAuth error:", error);
      res.redirect(`/login?error=oauth_failed&message=${encodeURIComponent(error.message || String(error))}`);
    }
  });

  app.get("/api/auth/logout", async (req, res) => {
    const { COOKIE_NAME } = await import("@shared/const");
    const { getSessionCookieOptions } = await import("./cookies");

    const cookieOptions = getSessionCookieOptions(req);
    res.clearCookie(COOKIE_NAME, cookieOptions);
    res.redirect("/");
  });

  app.post("/api/lead-capture", leadCaptureLimiter, async (req, res) => {
    const email = typeof req.body?.email === "string" ? req.body.email.trim() : "";
    const phone = typeof req.body?.phone === "string" ? req.body.phone.trim() : "";
    const utmSource = typeof req.body?.utmSource === "string" ? req.body.utmSource.trim() : "";

    if (!isValidEmail(email)) {
      res.status(400).json({ message: "Bitte gib eine gueltige E-Mail-Adresse ein." });
      return;
    }

    if (!isValidPhone(phone)) {
      res.status(400).json({ message: "Bitte gib eine gueltige Telefonnummer ein." });
      return;
    }

    try {
      const leadResult = await createOrUpdateQuentnLead({
        email,
        phone,
        utmSource,
      });

      res.status(200).json({
        success: true,
        tag: leadResult.tag,
        listId: leadResult.listId,
      });
    } catch (error: any) {
      const message =
        error instanceof Error ? error.message : "Unbekannter Fehler bei der Lead-Uebermittlung";
      const statusCode =
        message === "Quentn API is not configured"
          ? 500
          : 502;

      console.error("Lead capture error:", message);
      res.status(statusCode).json({
        message:
          statusCode === 500
            ? "Serverseitige Quentn-Konfiguration fehlt."
            : "Lead konnte nicht an Quentn uebermittelt werden.",
      });
    }
  });

  // Enforce crawlable robots header for all responses.
  app.use((req, res, next) => {
    res.setHeader(
      "X-Robots-Tag",
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    next();
  });

  // robots.txt
  app.get("/robots.txt", (req, res) => {
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    res.set("Content-Type", "text/plain");
    res.send(`User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\n\nSitemap: ${baseUrl}/sitemap.xml`);
  });

  // Dynamic Sitemap.xml
  app.get("/sitemap.xml", (req, res) => {
    import("../sitemap").then(({ sitemapHandler }) => sitemapHandler(req, res));
  });
  // tRPC API
  app.use(
    "/api/trpc",
    trpcLimiter,
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  const requireAdminPageAccess: RequestHandler = async (req, res, next) => {
    if (req.method !== "GET") {
      next();
      return;
    }

    try {
      const { sdk } = await import("./sdk");
      const user = await sdk.authenticateRequest(req);

      if (user.role !== "admin") {
        res.redirect("/login");
        return;
      }

      next();
    } catch {
      res.redirect("/login");
    }
  };

  app.use("/admin", requireAdminPageAccess);
  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
