const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { initializeApp } = require('firebase/app');
const { getDatabase, ref, update } = require('firebase/database');
const firebaseConfig = require('../firebase-config.json');
const admin = require('../firebase-admin'); // Adjust the relative path accordingly

// Now you can use admin to perform any admin operations


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getDatabase(firebaseApp);

io.use(require('./middleware/rateLimiter'));

io.on('connection', (socket) => {
  let userId;
  let typingTimeout;

  socket.on('authenticate', (userData) => {
    userId = userData.uid;
    update(ref(db, `users/${userId}`), {
      online: true,
      lastSeen: Date.now()
    });
  });

  socket.on('typing_start', () => {
    socket.broadcast.emit('user_typing', userId);
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit('typing_stop', userId);
    }, 5000);
  });

  socket.on('message', (message) => {
    io.emit('new_message', message);
  });

  socket.on('disconnect', () => {
    if (userId) {
      update(ref(db, `users/${userId}`), {
        online: false,
        lastSeen: Date.now()
      });
    }
  });
});

server.listen(4000, () => {
  console.log('Socket.IO server running on port 4000');
});
