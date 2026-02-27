import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import scoresRouter from './routes/scores.js';
import { handleConnection } from './sockets.js';

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Make io globally available for routes
(global as any).io = io;

io.on('connection', handleConnection);

app.use(cors({
  origin: "http://localhost:3000"
}));
app.use(express.json());

app.use('/api', scoresRouter);

const PORT = 8000;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});