import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
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
  const app = express();
  const server = createServer(app);
  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // OAuth callback under /api/oauth/callback

  app.get("/api/auth/google", (req, res) => {
    import("./googleAuth").then(({ googleAuthService }) => {
      const url = googleAuthService.generateAuthUrl();
      res.redirect(url);
    });
  });

  app.get("/api/auth/google/callback", async (req, res) => {
    const { code } = req.query;
    if (typeof code !== "string") {
      res.status(400).send("Missing code");
      return;
    }

    try {
      const { googleAuthService } = await import("./googleAuth");
      const { access_token } = await googleAuthService.getToken(code);
      if (!access_token) throw new Error("No access token");

      const userInfo = await googleAuthService.getUserInfo(access_token);

      const { upsertUser, getUserByOpenId } = await import("../db");
      const { ENV } = await import("./env");

      const email = userInfo.email as string;
      const isAdmin = ENV.adminEmails.includes(email);

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

  // Force X-Robots-Tag to allow indexing (fixes Google Search Console issue)
  app.use((req, res, next) => {
    res.setHeader("X-Robots-Tag", "all");
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
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );
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
