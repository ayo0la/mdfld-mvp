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

const origins: Record<string, string[]> = {
  DEV: ['http://localhost:5173'],
  PROD: [''],
};
const origin = origins[process.env.NODE_ENV as string] || origins.PROD;
const PORT = process.env.PORT || 4000;

// Initialize database and cron service
(() => {
  MongoDBClient.init();
})();

// Middleware
app.use(cors({ origin, credentials: true }));
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
});
