import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const repository = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "ashfolio";
const basePath = repository.endsWith(".github.io") ? "" : `/${repository}`;
const port = Number(process.env.PORT ?? 4173);

const contentTypes = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url ?? "/", "http://localhost").pathname);

    if (basePath && pathname !== basePath && !pathname.startsWith(`${basePath}/`)) {
      response.writeHead(404).end("Not found");
      return;
    }

    const sitePath = basePath ? pathname.slice(basePath.length) : pathname;
    let filePath = resolve(root, `.${sitePath || "/"}`);

    if (filePath !== root && !filePath.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    let fileInfo;
    try {
      fileInfo = await stat(filePath);
    } catch {
      response.writeHead(404).end("Not found");
      return;
    }

    if (fileInfo.isDirectory()) {
      if (!pathname.endsWith("/")) {
        response.writeHead(308, { Location: `${pathname}/` }).end();
        return;
      }
      filePath = resolve(filePath, "index.html");
    }

    const body = await readFile(filePath);
    response.writeHead(200, {
      "Content-Type": contentTypes[extname(filePath)] ?? "application/octet-stream",
      "X-Content-Type-Options": "nosniff",
    });
    response.end(body);
  } catch {
    response.writeHead(400).end("Bad request");
  }
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`Serving ${root} at http://127.0.0.1:${port}${basePath}/\n`);
});
