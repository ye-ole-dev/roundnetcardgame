'use strict';

const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const PORT = process.env.PORT || 4321;
const INDEX = '/index.html';

const server = express();
server.use(express.static(__dirname + '/dist/roundnetcardgame'));

server.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'roundnetcardgame', 'index.html'));
});

server.listen(PORT);
console.log("LISTINING")

/*
const server = express()
  .use((req, res) => res.sendFile(INDEX, { root: __dirname }))
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

const io = socketIO(server);

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));

  socket.on('chat message', function (msg) {
    console.log('message: ' + msg);
    io.emit('chat message', msg);
  });
});

setInterval(() => io.emit('time2', 'TEST'), 1000);

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);
*/