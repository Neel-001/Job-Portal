import http from 'http';
import { Server } from 'socket.io';

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Signaling server is running");
});
const io = new Server(server, {
  cors: {
    origin: 'https://talent-nest-384p.onrender.com',
    methods: ["GET", "POST"],
    credentials: true
  }
});

io.on('connection', (socket) => {
  socket.on('join', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
  });

  socket.on('signal', ({ roomId, data }) => {
    socket.to(roomId).emit('signal', { id: socket.id, data });
  });

  // This will relay the camera status to the other user in the room
  socket.on('camera-toggle', ({ roomId, cameraOn }) => {
    socket.to(roomId).emit('camera-toggle', { id: socket.id, cameraOn });
  });

  // Add ready handshake for robust offer delivery
  socket.on('ready', (roomId) => {
    io.to(roomId).emit('ready');
  });

  // Handle custom leave event
  socket.on('leave', (roomId) => {
    socket.leave(roomId);
    socket.to(roomId).emit('user-left', socket.id);
  });

  socket.on('disconnecting', () => {
    for (const roomId of socket.rooms) {
      if (roomId !== socket.id) {
        socket.to(roomId).emit('user-left', socket.id);
      }
    }
  });
});

const PORT = process.env.SIGNAL_PORT || 5001;
server.listen(PORT, () => {
  console.log(`WebRTC signaling server running on port ${PORT}`);
});
