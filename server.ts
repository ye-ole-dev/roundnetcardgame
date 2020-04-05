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
let gameStats = {};


io.on('connection', (socket) => {
    let name = '';
    console.log('user connected');


    socket.on('new-user', (userName) => {
        console.log('new-user');
        users.forEach(n => {
            socket.emit('new-user', n);
        });
        users.push(userName);
        name = userName;
        sockets.push(socket.id);
        // return socket info to User
        socket.emit('my-data', { socketId: socket.id, name });
        io.emit('new-user', name);

    });

    socket.on('new-message', (message) => {
        console.log('new-message');
        io.emit('new-message', { message, from: name });
    });

    socket.on('new-message-to-room', data => {
        console.log('new-message-to-room');
        console.log(data);
        console.log(data.roomName);
        console.log(data.message);
        io.to(data.roomName).emit('new-message', { message: data.message, from: name });
    });

    socket.on('create-game', (data) => {
        console.log('create-game');
        // Create a new Room for this game:
        createNewGame(socket, data.name, data.privateGame);
        io.emit('create-game', { games });
    });

    socket.on('get-game-info', (gameId) => {
        console.log('get-game-info');
        getGameInfo(gameId);
    });

    socket.on('start-game', (data) => {
        console.log('start-game');
        console.log(data);


        gameInfo.name = '';

        // This returns to all in io
        io.emit('start-game', gameInfo);
        // This returns just to the calling channel
        // socket.emit('start-game', 'Testmessage EMIT');
    });

    socket.on('start-point', (data) => {
        console.log('start-point');
        io.emit('start-point', gameInfo);
    });

    socket.on('discard-card', (data) => {
        // Just return it to the sender ;-)
        console.log('discard-card: ' + data.card.title);
        socket.emit('discard-card', data);
    });

    socket.on('pass-card-to-teammate', (data) => {
        console.log('pass-card-to-teammate');
        // return it to the sender
        socket.emit('pass-card-to-teammate', data);
        // return it to the teammate
        const game = getGameFromSocketId(socket.id)
        socket.to(game).emit('recieve-card-from-teammate', data);
    });

    socket.on('play-card', (data) => {
        console.log('play-card');
        // INFO data = {card: RCGCard, user: string, gameId: string}
        // TODO: consider saving cards on server as well save card ..
        // gameStats[data.gameId].push(data.card);
        console.log(data.gameId);
        io.in(data.gameId).emit('play-card', data);

        // io.emit('play-card', data);
    });


    socket.on('change-possession', (data) => {
        io.in(data.gameId).emit('change-possession', data.atk);
    });

    socket.on('room-info', roomName => {
        console.log('room-info');
        const amount = io.sockets.clients(roomName).length;
        const data = { amount };
        socket.emit('room-info', data);
    });

    socket.on('private-message', (data) => {
        console.log('private-message');
        // sending to individual socketid (private message)
        io.to(`${data.socketId}`).emit('private-message', data.message);
    });

    socket.on('join-game', (data) => {
        console.log('join-game');
        if (joinGame(socket, data.gameId)) {
            // io.to(data.gameId).emit('join-game', data);
            console.log('EMITTING join-game');
            socket.emit('join-game', data);
        } else {
            // TODO: Game couldn't be joined
            // socket.emit('server-error');
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
    console.log('Try to join game: ' + gameId);
    let success = false;
    socket.join(gameId);
    // what to do if no game exits .. 

    if (games.length === 0) {
        console.log('Create a new (public) game ... ');
        createNewGame(socket, gameId, false);
    }
    games.forEach(g => {
        if (g.gameId === gameId) {
            if (g.sockets.length < 4) {
                g.sockets.push(socket.id);
                console.log('GAME JOINED');
                success = true;
                console.log('Game: ' + gameId + ' joined!');
                return true;
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

function createNewGame(socket, gameId, privateGame) {
    // add gameChannel to socket
    socket.join(gameId);

    // add game to list of games
    const game = {
        gameId,
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
    gameStats[gameId] = [];
    console.log('Games: ' + gameStrings.join(' '));
}




server.listen(PORT, () => {
    console.log(`started on port: ${PORT}`);
});

