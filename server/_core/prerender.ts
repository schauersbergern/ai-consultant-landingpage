import fs from "fs";
import path from "path";
import { pathToFileURL } from "url";
import { STATIC_PRERENDER_ROUTES, toPrerenderFileName } from "../../shared/ssr";
import { injectRenderedApp, type EntryRenderer } from "./ssr";

const DYNAMIC_BASE_URL_TOKEN = "__DYNAMIC_BASE_URL__";
const PRERENDER_BASE_URL = "https://aipractitioner.invalid";

async function main() {
  const root = process.cwd();
  const templatePath = path.resolve(root, "dist", "public", "index.html");
  const entryPath = path.resolve(root, "dist", "server", "entry-server.js");
  const outputDir = path.resolve(root, "dist", "public", "_prerendered");

  if (!fs.existsSync(templatePath)) {
    throw new Error(`Template not found at ${templatePath}`);
  }

  if (!fs.existsSync(entryPath)) {
    throw new Error(`SSR entry not found at ${entryPath}`);
  }

  await fs.promises.mkdir(outputDir, { recursive: true });

  const template = await fs.promises.readFile(templatePath, "utf-8");
  const module = await import(pathToFileURL(entryPath).href);
  const render = module.render as EntryRenderer;

  for (const route of STATIC_PRERENDER_ROUTES) {
    const rendered = await render({
      url: route,
      origin: PRERENDER_BASE_URL,
    });

    const page = injectRenderedApp(template, rendered).replaceAll(
      PRERENDER_BASE_URL,
      DYNAMIC_BASE_URL_TOKEN,
    );
    const outputPath = path.resolve(outputDir, toPrerenderFileName(route));

    await fs.promises.writeFile(outputPath, page, "utf-8");
    console.log(`[prerender] ${route} -> ${outputPath}`);
  }
}

main().catch(error => {
  console.error("[prerender] Failed:", error);
  process.exit(1);
});
