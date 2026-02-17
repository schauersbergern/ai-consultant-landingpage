import type { AppSsrPayload } from "@shared/ssr";
import { getBlogSlug, isBlogListPath, normalizePathname } from "@shared/ssr";
import { dehydrate } from "@tanstack/react-query";
import { getQueryKey } from "@trpc/react-query";
import { TRPCError } from "@trpc/server";
import { renderToString } from "react-dom/server";
import superjson from "superjson";
import { appRouter } from "../../server/routers";
import { AppRoot } from "@/app/AppRoot";
import { createQueryClient, createTrpcClient } from "@/app/clients";
import { trpc } from "@/lib/trpc";
import { createHeadState, renderHeadToString } from "@/ssr/head";

export type RenderOptions = {
  url: string;
  origin: string;
};

export type RenderResult = {
  appHtml: string;
  headHtml: string;
  statusCode: number;
  serializedPayload: unknown;
};

function createCaller() {
  return appRouter.createCaller({
    req: {} as any,
    res: {} as any,
    user: null,
  });
}

export async function render({ url, origin }: RenderOptions): Promise<RenderResult> {
  const requestUrl = new URL(url, origin);
  const pathname = normalizePathname(requestUrl.pathname);

  const requestInfo = {
    origin,
    href: `${origin}${pathname}${requestUrl.search}`,
    pathname,
    search: requestUrl.search,
  };

  const queryClient = createQueryClient();
  const trpcClient = createTrpcClient(`${origin}/api/trpc`);
  const caller = createCaller();

  const payload: AppSsrPayload = {
    request: requestInfo,
  };

  let statusCode = 200;

  if (isBlogListPath(pathname)) {
    const articles = await caller.blog.listPublished({ limit: 20 });
    payload.routeData = {
      kind: "blog-list",
      articles,
    };

    const queryKey = getQueryKey(trpc.blog.listPublished, { limit: 20 }, "query");
    queryClient.setQueryData(queryKey, articles);
  }

  const slug = getBlogSlug(pathname);
  if (slug) {
    let article: unknown | null = null;

    try {
      article = await caller.blog.getBySlug(slug);
    } catch (error) {
      if (error instanceof TRPCError && error.code === "NOT_FOUND") {
        article = null;
      } else {
        throw error;
      }
    }

    payload.routeData = {
      kind: "blog-article",
      slug,
      article,
      notFound: !article,
    };

    if (article) {
      const queryKey = getQueryKey(trpc.blog.getBySlug, slug, "query");
      queryClient.setQueryData(queryKey, article);
    } else {
      statusCode = 404;
    }
  }

  payload.dehydratedState = dehydrate(queryClient);

  const headState = createHeadState();
  const appHtml = renderToString(
    <AppRoot
      queryClient={queryClient}
      trpcClient={trpcClient}
      requestInfo={requestInfo}
      ssrPayload={payload}
      headState={headState}
      router={{
        ssrPath: pathname,
        ssrSearch: requestUrl.search,
      }}
    />,
  );

  const headHtml = renderHeadToString(headState);
  const serializedPayload = superjson.serialize(payload);

  return {
    appHtml,
    headHtml,
    statusCode,
    serializedPayload,
  };
}
