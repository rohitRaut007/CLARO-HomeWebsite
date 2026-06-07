import { Readable } from "node:stream";
// Built by `vite build` (via the TanStack Start plugin) into a self-contained
// bundle where the `#tanstack-router-entry` virtual module is already resolved.
// Calling `createStartHandler` directly from the raw package fails at runtime
// with ERR_PACKAGE_IMPORT_NOT_DEFINED because that alias only exists post-build.
// @ts-expect-error - generated at build time, no type declarations available
import server from "../dist/server/server.js";

export default async function handler(req: any, res: any) {
  try {
    const protocol = (req.headers["x-forwarded-proto"] as string) || "https";
    const host = (req.headers["x-forwarded-host"] as string) || req.headers.host;
    const url = new URL(req.url ?? "/", `${protocol}://${host}`);

    const hasBody = req.method !== "GET" && req.method !== "HEAD";
    const request = new Request(url, {
      method: req.method,
      headers: new Headers(req.headers as Record<string, string>),
      ...(hasBody
        ? { body: Readable.toWeb(req) as any, duplex: "half" as const }
        : {}),
    });

    const response = await server.fetch(request);

    res.status(response.status);
    response.headers.forEach((value: string, key: string) => {
      res.setHeader(key, value);
    });

    if (response.body) {
      Readable.fromWeb(response.body as any).pipe(res);
    } else {
      res.end();
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
