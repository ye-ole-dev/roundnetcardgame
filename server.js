'use strict';

const gameInfo = require('./game/cards.js');

const express = require('express');
const app = express();

const path = require('path');
const http = require('http');

const server = http.Server(app);

const socketIO = require('socket.io');
const io = socketIO(server);

const PORT = process.env.PORT || 3456;

let users = [];
let rooms = [];

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('new-user', (message) => {
    console.log(message);
    users.push(message);
    let amount_string;
    if (users.length > 1) {
      amount_string = 'Users are';
    } else {
      amount_string = 'User is';
    }
    message = 'The following ' + amount_string + ' in the game: ' + users.join(' ');
    io.emit('new-message', message);
  });

  socket.on('new-message', (message) => {
    console.log(message);
    io.emit('new-message', message);
  });

  socket.on('new-message-to-room', data => {
    console.log(data);
    console.log(data.roomName);
    console.log(data.message);
    io.to(data.roomName).emit('new-message', data.message);
  });

  socket.on('start-game', (message) => {
    if (typeof (message) !== 'string') {
      message = 'DUMMY'
    }
    console.log('START GAME: ' + message);
    // Create a new Room for this game:
    createNewRoom(socket, message);

    gameInfo.name = message;

    // This returns to all in io
    io.emit('start-game', gameInfo);
    // This returns just to the calling channel
    // socket.emit('start-game', 'Testmessage EMIT');
  });

  socket.on('play-card', (data) => {
    console.log(data.card);
    console.log(data.user);

    io.emit('play-card', data);
  });

  socket.on('room-info', roomName => {
    const amount = io.sockets.clients(roomName).length;
    const data = { amount };
    socket.emit('room-info', data);
  });

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

app.use(express.static(__dirname + '/dist/roundnetcardgame'));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, 'dist', 'roundnetcardgame', 'index.html'));
});

function createNewRoom(socket, name) {
  socket.join(name);
  rooms.push(name);
  console.log('Number of rooms: ' + rooms.length);
}
console.log("Listening");



server.listen(PORT, () => {
  console.log(`started on port: ${PORT}`);
});

