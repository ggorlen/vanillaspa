const fs = require("fs");
const http = require("http");
const path = require("path");

const routes = ["about", "gists"];
const publicDir = path.join(__dirname, "public");
const mimeTypes = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

const servePublicFile = (reqPath, res) => {
  const filePath = path.join(
    publicDir,
    reqPath,
    (reqPath.endsWith("/") ? "index.html" : "")
  );
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || "application/octet-stream";

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === "ENOENT") {
        res.writeHead(404);
        res.end();
      }
      else {
        res.writeHead(500);
        res.end();
      }
    }
    else {
      res.writeHead(200, {"Content-Type": contentType});
      res.end(content, "utf-8");
    }
  });
};

const onRequest = (req, res) => {
  const resource = req.url.replace(/^\//, "").split("/")[0];

  if (req.method === "GET") {
    if (routes.includes(resource)) {
      return servePublicFile("/", res);
    }

    return servePublicFile(req.url, res);
  }

  res.writeHead(404);
  return res.end();
};
http.createServer(onRequest).listen(process.env.PORT || 5001);