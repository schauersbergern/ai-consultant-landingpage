import type { AppSsrPayload } from "@shared/ssr";
import { createRoot, hydrateRoot } from "react-dom/client";
import superjson from "superjson";
import { AppRoot } from "@/app/AppRoot";
import { createQueryClient, createTrpcClient } from "@/app/clients";
import { getBrowserRequestInfo } from "@/ssr/request-info";
import "./index.css";

declare global {
  interface Window {
    __APP_SSR__?: unknown;
  }
}

function getSsrPayload() {
  if (typeof window === "undefined") return null;
  if (!window.__APP_SSR__) return null;

  return superjson.deserialize(
    window.__APP_SSR__ as ReturnType<typeof superjson.serialize>,
  ) as AppSsrPayload;
}

const ssrPayload = getSsrPayload();
const requestInfo = ssrPayload?.request ?? getBrowserRequestInfo();
const queryClient = createQueryClient();
const trpcClient = createTrpcClient("/api/trpc");

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error("Root element not found");
}

const app = (
  <AppRoot
    queryClient={queryClient}
    trpcClient={trpcClient}
    requestInfo={requestInfo}
    ssrPayload={ssrPayload}
  />
);

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, app);
} else {
  createRoot(rootElement).render(app);
}
