import type { CreateExpressContextOptions } from "@trpc/server/adapters/express";
import type { User } from "../../drizzle/schema";
// import { sdk } from "./sdk";

export type TrpcContext = {
  req: CreateExpressContextOptions["req"];
  res: CreateExpressContextOptions["res"];
  user: User | null;
};

export async function createContext(
  opts: CreateExpressContextOptions
): Promise<TrpcContext> {
  let user: User | null = null;

  try {
    const { sdk } = await import("./sdk");
    const { COOKIE_NAME } = await import("@shared/const");
    const { getUserByOpenId } = await import("../db");

    // Check for session cookie
    // We navigate the cookie parsing manually here or reuse sdk helper if available
    // But since context runs per request, we can assume standard express req

    // Quick parse to mock sdk.authenticateRequest behavior without the overhead if needed
    // or just use sdk.authenticateRequest as originally intended?
    // Let's use the code that was commented out but adapted.

    // Actually, sdk.authenticateRequest seems robust.
    user = await sdk.authenticateRequest(opts.req);
  } catch (error) {
    user = null;
  }

  return {
    req: opts.req,
    res: opts.res,
    user,
  };
}
