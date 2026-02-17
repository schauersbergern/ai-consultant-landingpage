import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

type SessionSecretSource =
  | "env"
  | "generated-file"
  | "dev-default"
  | "env-default";

const SESSION_SECRET_FILE = process.env.SESSION_SECRET_FILE
  ? path.resolve(process.env.SESSION_SECRET_FILE)
  : path.resolve(process.cwd(), ".session-secret");

function getSessionSecret(): { secret: string; source: SessionSecretSource } {
  const configured = process.env.SESSION_SECRET?.trim();

  if (configured && configured !== "dev_secret_key_123") {
    return { secret: configured, source: "env" };
  }

  if (process.env.NODE_ENV !== "production") {
    return {
      secret: configured || "dev_secret_key_123",
      source: configured ? "env-default" : "dev-default",
    };
  }

  try {
    if (fs.existsSync(SESSION_SECRET_FILE)) {
      const existing = fs.readFileSync(SESSION_SECRET_FILE, "utf-8").trim();
      if (existing.length >= 32) {
        return { secret: existing, source: "generated-file" };
      }
    }

    const generated = crypto.randomBytes(64).toString("hex");
    fs.writeFileSync(SESSION_SECRET_FILE, `${generated}\n`, {
      mode: 0o600,
    });

    return { secret: generated, source: "generated-file" };
  } catch {
    // Last resort to keep service available; still flagged by validateSecurityEnv.
    return { secret: "dev_secret_key_123", source: "env-default" };
  }
}

const sessionSecret = getSessionSecret();

export const ENV = {
  databaseUrl: process.env.DATABASE_URL ?? "",
  isProduction: process.env.NODE_ENV === "production",
  forgeApiUrl: process.env.BUILT_IN_FORGE_API_URL ?? "",
  forgeApiKey: process.env.BUILT_IN_FORGE_API_KEY ?? "",
  // Google OAuth
  googleClientId: process.env.GOOGLE_CLIENT_ID ?? "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
  baseUrl: process.env.BASE_URL ?? "http://localhost:3000",
  // Admin Allowlist
  adminEmails: (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map(e => e.trim().toLowerCase())
    .filter(Boolean),
  // Legacy / Additional
  cookieSecret: sessionSecret.secret,
  sessionSecretSource: sessionSecret.source,
  sessionSecretFile: SESSION_SECRET_FILE,
};

export function validateSecurityEnv() {
  if (!ENV.isProduction) return;

  if (!ENV.googleClientId || !ENV.googleClientSecret) {
    throw new Error("Missing GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET in production");
  }

  if (!ENV.adminEmails.length) {
    throw new Error("ADMIN_EMAILS must contain at least one address in production");
  }

  if (ENV.cookieSecret === "dev_secret_key_123") {
    throw new Error(
      "SESSION_SECRET could not be loaded/generated in production; configure SESSION_SECRET or make session secret file writable",
    );
  }

  if (ENV.sessionSecretSource !== "env") {
    console.warn(
      `[Security] SESSION_SECRET not set via environment; using generated secret file at ${ENV.sessionSecretFile}`,
    );
  }
}
