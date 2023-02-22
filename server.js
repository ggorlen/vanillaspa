const crypto = require("crypto");
const fs = require("fs");
const http = require("http");
const path = require("path");

// https://stackoverflow.com/questions/3393854/get-and-set-a-single-cookie-with-node-js-http-server
const parseCookies = request => {
  const list = {};
  const rc = request.headers.cookie;
  rc && rc.split(";").forEach(cookie => {
    const parts = cookie.split("=");
    list[parts.shift().trim()] = decodeURI(parts.join("="));
  });
  return list;
};

const dataDir = `${__dirname}/.data`;
const notesFile = `${dataDir}/notes.md`;
const publicDir = `${__dirname}/public`;
const staticFiles = new Set([
  "/", ...fs.readdirSync(publicDir).map(e => `/${e}`)
]);
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

const servePublicFile = (req, res) => {
  const filePath = publicDir + req.url + 
                   (req.url === "/" ? "index.html" : "");
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
  if (req.method === "GET" && staticFiles.has(req.url)) {
    return servePublicFile(req, res);
  }

  res.writeHead(404);
  return res.end();  
};
http.createServer(onRequest).listen(process.env.PORT);
