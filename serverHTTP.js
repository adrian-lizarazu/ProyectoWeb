const fs = require('fs');
const path = require('path');
const express = require('express');
const http = require('http');
const http2 = require('http2');

const app = express();


app.get('/', (req, res) => {
  res.send('Hola desde Express usando HTTP/2 correctamente!');
});


const certDir = path.join(__dirname, 'certs');

const options = {
  key: fs.readFileSync(path.join(certDir, 'localhost.key')),
  cert: fs.readFileSync(path.join(certDir, 'localhost.crt')),
  allowHTTP1: true   
};


const http2Server = http2.createSecureServer(options);

// Adaptador: convierte HTTP/2 en requests compatibles con Express
http2Server.on('stream', (stream, headers) => {
  const req = {
    method: headers[':method'],
    url: headers[':path'],
    headers,
    connection: { encrypted: true }
  };

  
  const res = {
    _headers: {},
    write: chunk => stream.write(chunk),
    end: chunk => stream.end(chunk),
    writeHead: (status, headers) => {
      stream.respond({ ':status': status, ...headers });
    },
    setHeader: (name, value) => {
      res._headers[name.toLowerCase()] = value;
    },
    getHeader: name => res._headers[name.toLowerCase()],
  };

  app(req, res);
});

http2Server.listen(8443, () => {
  console.log("HTTP/2 en https://localhost:8443");
});



http.createServer((req, res) => {
  res.writeHead(301, {
    Location: `https://localhost:8443${req.url}`
  });
  res.end();
}).listen(8080, () => {
  console.log("Redirigiendo HTTP → HTTPS en http://localhost:8080");
});
