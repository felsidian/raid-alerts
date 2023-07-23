import { createServer, Socket } from 'net';

const API_KEY = 'qwe';

const PORT = 7070;
const HOST = '127.0.0.1';

const sockets: Socket[] = [];

const server = createServer();

server.listen(PORT, HOST, () => {
  console.log(`TCP Server is running on port ${PORT}`);
});

server.on('connection', (socket) => {
  console.log(`Socket connected: ${socket.remoteAddress}:${socket.remotePort}`);

  // Close connection if API_KEY is not received within 3 seconds
  socket.setTimeout(3000);
  socket.on('timeout', () => {
    console.log('Socket timeout');
    socket.end();
  });

  socket.once('data', (data) => {
    const s = data.toString();
    console.log(`Data received: ${s}`);

    if (API_KEY !== s.trimEnd()) {
      console.log('Wrong API key');
      socket.end();
      return;
    }

    // API_KEY is correct, start working with socket
    socket.setTimeout(0);
    socket.write('hello\n');
    sockets.push(socket);
  });

  socket.on('error', (error) => {
    console.log(`Socket Error: ${error.message}`);
  });

  socket.on('close', function () {
    console.log(`Socket closed: ${socket.remoteAddress}:${socket.remotePort}`);
    const i = sockets.findIndex((s) => s === socket);
    if (i !== -1) {
      sockets.splice(i, 1);
    }
  });
});

setInterval(() => {
  console.log(`Sending ping to ${sockets.length} sockets.`);
  sockets.forEach((socket) => socket.write('ping\n'));
}, 3000);
