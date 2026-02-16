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
  adminEmails: (process.env.ADMIN_EMAILS ?? "").split(",").map(e => e.trim()).filter(Boolean),
  // Legacy / Additional
  cookieSecret: process.env.SESSION_SECRET ?? "dev_secret_key_123",
};
