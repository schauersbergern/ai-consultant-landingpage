
import { sitemapHandler } from "./server/sitemap";
import { Request, Response } from "express";

// Mock Request and Response
const req = {
    protocol: "http",
    get: (header: string) => "localhost:3000",
} as unknown as Request;

const res = {
    set: (header: string, value: string) => {
        console.log(`[Header] ${header}: ${value}`);
    },
    send: (body: string) => {
        console.log("[Body]");
        console.log(body);
    },
    status: (code: number) => {
        console.log(`[Status] ${code}`);
        return res;
    },
} as unknown as Response;

console.log("Testing sitemap generation...");
sitemapHandler(req, res).then(() => {
    console.log("Done.");
}).catch(err => {
    console.error(err);
});
