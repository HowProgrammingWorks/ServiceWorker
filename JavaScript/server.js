'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const MIME_TYPES = {
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript; charset=UTF-8',
  css: 'text/css',
  png: 'image/png',
  ico: 'image/x-icon',
  json: 'application/json',
  svg: 'image/svg+xml',
};

const STATIC_PATH = path.join(process.cwd(), './static');

const serveFile = name => {
  const filePath = path.join(STATIC_PATH, name);
  if (!filePath.startsWith(STATIC_PATH)) return null;
  return fs.createReadStream(filePath);
};

http.createServer((req, res) => {
  const { url } = req;
  const name = url === '/' ? '/index.html' : url;
  const fileExt = path.extname(name).substring(1);
  res.writeHead(200, { 'Content-Type': MIME_TYPES[fileExt] });
  const stream = serveFile(name);
  if (stream) stream.pipe(res);
}).listen(8000);
