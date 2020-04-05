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
let games = [];
let privateGames = [];
let sockets = [];


io.on('connection', (socket) => {
  let name = '';
  console.log('user connected');


  socket.on('new-user', (message) => {
    users.push(message);
    name = message;
    sockets.push(socket.id);
    // return socket info to User
    socket.emit('my-data', { socketId: socket.id, name: message });

    let amountString;
    if (users.length > 1) {
      amountString = 'Users are';
    } else {
      amountString = 'User is';
    }
    message = 'The following ' + amountString + ' online: ' + users.join(' ');
    io.emit('new-message', { message, from: 'System' });
  });

  socket.on('new-message', (message) => {
    console.log(message);
    io.emit('new-message', { message, from: name });
  });

  socket.on('new-message-to-room', data => {
    console.log(data);
    console.log(data.roomName);
    console.log(data.message);
    io.to(data.roomName).emit('new-message', { message: data.message, from: name });
  });

  socket.on('create-game', (data) => {
    // Create a new Room for this game:
    createNewGame(socket, data.name, data.privateGame);
    socket.emit('create-game', { games });
  });

  socket.on('get-game-info', (gameId) => {
    getGameInfo(gameId);
  });

  socket.on('start-game', (data) => {
    console.log(data);


    gameInfo.name = '';

    // This returns to all in io
    io.emit('start-game', gameInfo);
    // This returns just to the calling channel
    // socket.emit('start-game', 'Testmessage EMIT');
  });

  socket.on('discard-card', (data) => {
    // Just return it to the sender ;-)
    console.log('Discarded Card: ' + data.card.title);
    socket.emit('discard-card', data);
  });

  socket.on('pass-card-to-teammate', (data) => {
    // return it to the sender
    socket.emit('pass-card-to-teammate', data);
    // return it to the teammate
    const game = getGameFromSocketId(socket.id)
    socket.to(game).emit('recieve-card-from-teammate', data);
  });

  socket.on('play-card', (data) => {
    // data = {card: RCGCard, user: string}
    io.emit('play-card', data);
  });

  socket.on('room-info', roomName => {
    const amount = io.sockets.clients(roomName).length;
    const data = { amount };
    socket.emit('room-info', data);
  });

  socket.on('private-message', (data) => {
    // sending to individual socketid (private message)
    io.to(`${data.socketId}`).emit('private-message', data.message);
  });

  socket.on('join-game', (data) => {
    console.log('JOIN GAME');
    if (joinGame(socket, data.gameId)) {
      // io.to(data.gameId).emit('join-game', data);
      console.log('EMITTING join-game');
      socket.emit('join-game', data);
    }
  });


  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

app.use(express.static(__dirname + '/dist/roundnetcardgame'));

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'roundnetcardgame', 'index.html'));
});

function getGameFromSocketId(socketId) {
  let gameId = '';
  games.forEach(g => {
    g.sockets.forEach(s => {
      if (s === socketId) {
        gameId = g.gameId;
        return gameId;
      }
    });
    if (gameId) {
      return gameId;
    }
  });
  return gameId;
}

function joinGame(socket, gameId) {
  let success = false;
  socket.join(gameId);
  games.forEach(g => {
    if (g.gameId === gameId) {
      if (g.sockets.length < 4) {
        g.sockets.push(socket.id);
        console.log('GAME JOINED');
        success = true;
        return;
      } else {
        // WARNING
        console.warn('Game: ' + gameId + ' is full!');
      }
    } else {
      // ERROR
      console.error('GameId: ' + gameId + ' not found!');
    }
  });
  return success;
}

function getGameInfo(gameId) {
  games.forEach(g => {
    if (g.gameId === gameId) {
      const ready = g.sockets.length === 4;
      const text = ready ? 'Ready' : g.sockets.length + ' out of 4 Players!';
      const data = {
        ready,
        text
      };
      io.to(g.gameId).emit('game-ready-changed', data);
      if (ready) {
        const gameStateChanged = {
          gameState: 'ready',
          showDialog: true,
          dTitle: 'Lets Play',
          dText: 'See rules ... #discard'
        };
        io.to(g.gameId).emit('game-state-changed', gameStateChanged);
      }
    } else {
      // ERROR
      console.warn('GameId: ' + gameId + ' not found!');
    }
  });
}

function createNewGame(socket, name, privateGame) {
  // add gameChannel to socket
  socket.join(name);

  // add game to list of games
  const game = {
    gameId: name,
    sockets: []
  };
  if (privateGame) {
    privateGames.push(game);
  } else {
    games.push(game);
  }
  console.log('Number of rooms: ' + games.length);
  const gameStrings = [];
  games.forEach(g => {
    gameStrings.push(g.gameId);
  });
  console.log('Games: ' + gameStrings.join(' '));
}




server.listen(PORT, () => {
  console.log(`started on port: ${PORT}`);
});

