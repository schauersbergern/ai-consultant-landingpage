import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";
import {
  applyBaseUrl,
  getBaseUrl,
  getPrerenderFileName,
  injectRenderedApp,
  loadProductionRenderer,
  setSsrCacheHeaders,
  shouldServerRender,
  shouldServePrerendered,
} from "./ssr";

function stripSsrPlaceholders(template: string) {
  return template
    .replace("<!--app-head-->", "")
    .replace("<!--app-html-->", "")
    .replace("<!--app-ssr-data-->", "");
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html",
      );

      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        'src="/src/entry-client.tsx"',
        `src="/src/entry-client.tsx?v=${nanoid()}"`,
      );

      const baseUrl = getBaseUrl(req);
      template = applyBaseUrl(template, baseUrl);
      template = await vite.transformIndexHtml(url, template);

      if (shouldServerRender(req) || shouldServePrerendered(req)) {
        const entry = await vite.ssrLoadModule("/src/entry-server.tsx");
        const rendered = await entry.render({ url, origin: baseUrl });

        if (shouldServerRender(req)) {
          setSsrCacheHeaders(req, res);
        }

        const page = injectRenderedApp(template, rendered);
        res.status(rendered.statusCode).set({ "Content-Type": "text/html" }).end(page);
        return;
      }

      res
        .status(200)
        .set({ "Content-Type": "text/html" })
        .end(stripSsrPlaceholders(template));
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const distPath =
    process.env.NODE_ENV === "development"
      ? path.resolve(import.meta.dirname, "../..", "dist", "public")
      : path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  const prerenderPath = path.resolve(distPath, "_prerendered");
  const templatePath = path.resolve(distPath, "index.html");

  let renderProduction: Awaited<ReturnType<typeof loadProductionRenderer>> | null = null;

  app.use(express.static(distPath, { index: false }));

  app.use("*", async (req, res) => {
    try {
      const baseUrl = getBaseUrl(req);

      if (shouldServePrerendered(req)) {
        const prerenderFileName = getPrerenderFileName(req);
        const prerenderFilePath = path.resolve(prerenderPath, prerenderFileName);

        if (fs.existsSync(prerenderFilePath)) {
          const prerenderedHtml = await fs.promises.readFile(prerenderFilePath, "utf-8");
          const page = applyBaseUrl(prerenderedHtml, baseUrl);
          res.status(200).set({ "Content-Type": "text/html" }).send(page);
          return;
        }
      }

      const template = await fs.promises.readFile(templatePath, "utf-8");

      if (shouldServerRender(req)) {
        if (!renderProduction) {
          renderProduction = await loadProductionRenderer();
        }

        const rendered = await renderProduction({
          url: req.originalUrl,
          origin: baseUrl,
        });

        setSsrCacheHeaders(req, res);

        const page = injectRenderedApp(applyBaseUrl(template, baseUrl), rendered);
        res.status(rendered.statusCode).set({ "Content-Type": "text/html" }).send(page);
        return;
      }

      const fallback = stripSsrPlaceholders(applyBaseUrl(template, baseUrl));
      res.status(200).set({ "Content-Type": "text/html" }).send(fallback);
    } catch (e) {
      console.error("Error serving index.html:", e);
      res.status(500).send("Internal Server Error");
    }
  });
}
