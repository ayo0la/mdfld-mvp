import { Request, Response, NextFunction } from 'express';
import { UserDocuments } from '../../models/user.model.js';
import UserService from '../../services/user/user.service.js';
import ResponseUtils from '../../utils/common/response.util.js';
import { getReceiverSocketId, io } from '../../config/socket.js';
import mongoose from 'mongoose';
import ChatService from '../../services/chat.service.js';

export const getChatsList = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.email as string;
  const user = (await UserService.findByEmail(email)) as UserDocuments;
  const chatList = user.participants;
  ResponseUtils.success(res, 'Chats Fetched Successfully', chatList);
};

export const getMessages = async (req: Request, res: Response, next: NextFunction) => {
  const { id: receiverId } = req.params;
  const senderEmail = req.email as string;
  const sender = (await UserService.findByEmail(senderEmail)) as UserDocuments;
  const senderId = sender._id;

  const messages = await ChatService.getMessages(
    new mongoose.Types.ObjectId(senderId),
    new mongoose.Types.ObjectId(receiverId)
  );

  ResponseUtils.success(res, 'Messages Fetched Successfully', messages);
};

export const sendMessage = async (req: Request, res: Response, next: NextFunction) => {
  const { message, image } = req.body;
  const { id: receiverId } = req.params;
  const sender = (await UserService.findByEmail(req.email as string)) as UserDocuments;
  const senderId = sender._id;

  const newMessage = await ChatService.sendMessage(
    new mongoose.Types.ObjectId(senderId),
    new mongoose.Types.ObjectId(receiverId),
    { message, image }
  );

  // Emit socket event
  const receiverSocketId = getReceiverSocketId(receiverId);
  console.log(receiverSocketId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit('newMessage', newMessage);
  }

  ResponseUtils.success(res, 'Message Sent Successfully', newMessage);
};
