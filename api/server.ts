import { Readable } from "node:stream";
import {
  createStartHandler,
  defaultStreamHandler,
} from "@tanstack/react-start/server";

const fetchHandler = createStartHandler(defaultStreamHandler);

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

    const response = await fetchHandler(request);

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
