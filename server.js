const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const path = require('path');

// Static files (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, 'public')));

// When user connects
io.on('connection', (socket) => {
    console.log('A user connected');

  socket.on('chat message', (msg) => {
  const formattedMsg = `${msg.user}: ${msg.text}`;
  io.emit('chat message', formattedMsg);
});

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start server
const PORT = 3003;
http.listen(PORT, () => {
console.log("Server is running on http://localhost:" + PORT);
});
