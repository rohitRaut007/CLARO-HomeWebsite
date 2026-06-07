import { createRequestHandler } from "@tanstack/react-start/server";

export default async function handler(req: any, res: any) {
  const request = new Request(req.url, {
    method: req.method,
    headers: new Headers(req.headers as any),
    body: req.method !== "GET" && req.method !== "HEAD" ? req.body : undefined,
  });

  try {
    const handler = await createRequestHandler();
    const response = await handler(request);

    const headers: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headers[key] = value;
    });

    res.status(response.status);
    Object.entries(headers).forEach(([key, value]) => {
      res.setHeader(key, value);
    });

    const body = await response.text();
    res.send(body);
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
