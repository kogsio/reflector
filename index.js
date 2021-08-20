'use strict';

const express = require('express');
const path = require('path');
const { createServer } = require('http');
var WebSocket = require('ws')

const app = express();
app.use(express.static(path.join(__dirname, '/public')));

const server = createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function (ws, request) {

  ws.on('message', function (message) {
    // ws.send(`Server msg - echoing recieved massage: ${message}`); 

    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(`${message}`);
      }
    });

  });

  ws.on('close', function () {
    ws.send('Server msg - closing connection');    
  });

});


// Start the server.
server.listen(8080, function () {
  console.log('Listening on http://localhost:8080');
});
