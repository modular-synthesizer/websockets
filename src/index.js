"use strict";

import 'dotenv/config'
import { WebSocketServer } from 'ws';
import querystring from './utils/querystring.js';
import sessionFetch from './api/sessionFetch.js';
import handleConnection from './handlers/handleConnection.js'
import express from 'express';

const app = express();

const wss = new WebSocketServer({ noServer: true });

wss.on('connection', handleConnection);

const server = app.listen(process.env.PORT || 3000);

server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, async s => {
    try {
      const params = querystring(request.url);
      const session = await sessionFetch(params.auth_token);
      wss.emit('connection', s, request, session);
    }
    catch(exception) {
      s.close(exception.code, exception.reason);
    }
  })
});