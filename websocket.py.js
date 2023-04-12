'use strict';

const https = require('https');
const fs = require('fs');
const WebSocket = require('ws');

const MAX_CONNECTIONS = 100;
const HTTP_PORT = 3000;

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

const server = https.createServer(options, (req, res) => {
  res.end('Hello World!');
});

const wss = new WebSocket.Server({
  server,
  maxPayload: 1024 * 1024,
  maxConnections: MAX_CONNECTIONS,
});

wss.on('connection', ws => {
  console.log('client connected');

  ws.on('message', message => {
    console.log(`received: ${message}`);
    wss.clients.forEach(client => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('client disconnected');
  });
});

server.listen(HTTP_PORT, () => {
  console.log(`HTTPS server listening on port ${HTTP_PORT}`);
});

server.on('error', (error) => {
  console.error('Server error:', error.stack);
});
