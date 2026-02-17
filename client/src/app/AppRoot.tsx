import type { AppSsrPayload, RequestInfo } from "@shared/ssr";
import { HydrationBoundary } from "@tanstack/react-query";
import { QueryClientProvider, type QueryClient } from "@tanstack/react-query";
import { type RouterProps, Router } from "wouter";
import App from "@/App";
import { trpc } from "@/lib/trpc";
import { HeadProvider, type HeadState } from "@/ssr/head";
import { RequestInfoProvider } from "@/ssr/request-info";
import { ServerDataProvider } from "@/ssr/server-data";
import type { TrpcClient } from "./clients";

type AppRootProps = {
  queryClient: QueryClient;
  trpcClient: TrpcClient;
  requestInfo: RequestInfo;
  ssrPayload: AppSsrPayload | null;
  headState?: HeadState | null;
  router?: Omit<RouterProps, "children">;
};

export function AppRoot({
  queryClient,
  trpcClient,
  requestInfo,
  ssrPayload,
  headState = null,
  router,
}: AppRootProps) {
  return (
    <HeadProvider state={headState}>
      <RequestInfoProvider value={requestInfo}>
        <ServerDataProvider value={ssrPayload}>
          <Router {...router}>
            <trpc.Provider client={trpcClient} queryClient={queryClient}>
              <QueryClientProvider client={queryClient}>
                <HydrationBoundary state={ssrPayload?.dehydratedState as any}>
                  <App />
                </HydrationBoundary>
              </QueryClientProvider>
            </trpc.Provider>
          </Router>
        </ServerDataProvider>
      </RequestInfoProvider>
    </HeadProvider>
  );
}
