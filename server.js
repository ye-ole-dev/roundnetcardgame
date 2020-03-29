'use strict';

const express = require('express');
const app = express();

const path = require('path');
const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const PORT = process.env.PORT || 3000;

//const INDEX = '/index.html';

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('new-message', (message) => {
    console.log(message);
    socket.emit('new-message', message);
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

app.use(express.static(__dirname + '/dist/roundnetcardgame'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'roundnetcardgame', 'index.html'));
});



console.log("LISTINING");



server.listen(PORT, () => {
  console.log(`started on port: ${PORT}`);
});

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