const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { Server } = require('socket.io');

const connectDB = require('./src/config/db');
const socketHandler = require('./src/sockets/socketHandler');
const eventRoutes = require('./src/routes/eventRoutes');

dotenv.config();
connectDB();

const app = express();
const httpServer = http.createServer(app);

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API da Dalodio está funcionando!');
});

app.use('/api/events', eventRoutes);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"]
  }
});

socketHandler(io);

const PORT = process.env.PORT || 8080;

httpServer.listen(PORT, () => {
  console.log(`Servidor rodando no modo ${process.env.NODE_ENV || 'development'} na porta ${PORT}`);
});
