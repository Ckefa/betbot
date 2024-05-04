const http = require('http');
const socketIo = require('socket.io');

// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Socket.IO Server\n');
});

// Attach Socket.IO to the HTTP server
const io = socketIo(server);

// Define a connection event handler
io.on('connection', (socket) => {
  console.log('A client connected');

  // Handle incoming messages
  socket.on('message', (data) => {
    console.log('Message received:', data);

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

// Start the server
const PORT = 5055;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
