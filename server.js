'use strict';

const express = require('express');
const app = express();

const path = require('path');
const http = require('http');
const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const PORT = process.env.PORT || 8080;

// Game Stuff
const cutserve = {
  title: 'Cut Serve',
  type: 'serve',
  descr: 'A serve which alters direction when hitting the net.',
  atk: 10,
  def: 0
};
const recieve = {
  title: 'Recieve',
  type: 'recieve',
  descr: 'Recieving a serve.',
  atk: 2,
  def: 7
};
const gameInfo = {
  name: 'Test',
  cards: [cutserve, cutserve, recieve]
};


io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('new-message', (message) => {
    console.log(message);
    io.emit('new-message', message);
  });

  socket.on('start-game', (message) => {
    console.log('START GAME WITH: ' + message);
    // TODO: PLAYER READY CHECK

    io.emit('start-game', gameInfo);
  });

  socket.on('play-card', (data) => {
    console.log(data.card);
    console.log(data.user);

    io.emit('play-card', data);
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

