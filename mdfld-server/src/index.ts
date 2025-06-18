import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import http from 'http';

import logger from './utils/common/logger.util.js';
import MongoDBClient from './databases/mongo.database.js';
import errorHandler from './middlewares/error-handler.middleware.js';
import { appRouter } from './routes/index.js';
import { initializeSocket } from './config/socket.js';

const app = express();
const server = http.createServer(app);

const allowedOrigins = [
  'http://localhost:3000',
  'https://www.mdfld.co'
];

const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// App Routes
app.use('/api', appRouter);

// Custom Error Handler
app.use(errorHandler);

// Initialize Socket.io
initializeSocket(server);

// Start server
server.listen(PORT, () => {
  logger.info(`Server started on port ${PORT}`);
  // Initialize database and cron service (non-blocking)
  try {
    MongoDBClient.init();
  } catch (err) {
    logger.error('MongoDB init failed:', err);
  }
});
