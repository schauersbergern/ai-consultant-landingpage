import { COOKIE_NAME, ONE_YEAR_MS } from "@shared/const";
import type { Express, Request, Response } from "express";
import * as db from "../db";
import { getSessionCookieOptions } from "./cookies";
import { ENV } from "./env";
import { googleAuthService } from "./googleAuth";
import { sdk } from "./sdk";

function getQueryParam(req: Request, key: string): string | undefined {
  const value = req.query[key];
  return typeof value === "string" ? value : undefined;
}

export function registerOAuthRoutes(app: Express) {
  app.get("/api/oauth/callback", async (req: Request, res: Response) => {
    const code = getQueryParam(req, "code");
    if (!code) {
      res.status(400).json({ error: "code is required" });
      return;
    }

    try {
      const { access_token } = await googleAuthService.getToken(code);
      if (!access_token) {
        res.status(400).json({ error: "missing access token" });
        return;
      }

      const userInfo = await googleAuthService.getUserInfo(access_token);

      if (!userInfo.id) {
        res.status(400).json({ error: "openId missing from user info" });
        return;
      }

      const openId = String(userInfo.id);
      const email = userInfo.email ? String(userInfo.email) : null;
      const isAdmin = email ? ENV.adminEmails.includes(email) : false;

      await db.upsertUser({
        openId,
        name: userInfo.name ? String(userInfo.name) : null,
        email,
        loginMethod: "google",
        role: isAdmin ? "admin" : "user",
        lastSignedIn: new Date(),
      });

      const sessionToken = await sdk.createSessionToken(openId, {
        name: userInfo.name ? String(userInfo.name) : "",
        expiresInMs: ONE_YEAR_MS,
      });

      const cookieOptions = getSessionCookieOptions(req);
      res.cookie(COOKIE_NAME, sessionToken, { ...cookieOptions, maxAge: ONE_YEAR_MS });

      res.redirect(302, "/");
    } catch (error) {
      console.error("[OAuth] Callback failed", error);
      res.status(500).json({ error: "OAuth callback failed" });
    }
  });
}
