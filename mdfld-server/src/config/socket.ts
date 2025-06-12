import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import express from 'express';

export let io: Server;
const userSocketMap: Record<string, string> = {};

export const initializeSocket = (server: HttpServer) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', socket => {
    console.log('User connected:', socket.handshake.query.user_id, socket.id);

    const userId = socket.handshake.query.user_id as string;
    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    // Emit online users
    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
      delete userSocketMap[userId];
      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });

  return io;
};

export const getReceiverSocketId = (userId: string) => {
  return userSocketMap[userId];
};
