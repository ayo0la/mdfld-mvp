// src/services/chat.service.ts
import Chats, { ChatDocument } from '../models/chat.model';
import User from '../models/user.model';
import UserService from './user/user.service';
import mongoose from 'mongoose';
import { ROLES } from '../models/user.model';
import CustomError from '../utils/common/error.util';
import { HTTP_STATUS } from '../constants/http-status.constant';

class ChatService {
  async getUserChats(userId: mongoose.Types.ObjectId) {
    const user = await User.findById(userId);
    return user?.participants || [];
  }

  static async getMessages(senderId: mongoose.Types.ObjectId, receiverId: mongoose.Types.ObjectId) {
    return await Chats.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ createdAt: 1 });
  }

  static async sendMessage(
    senderId: mongoose.Types.ObjectId,
    receiverId: mongoose.Types.ObjectId,
    messageData: {
      message?: string;
      image?: string;
    }
  ) {
    // Fetch sender and receiver
    const sender = await User.findById(senderId);
    const receiver = await User.findById(receiverId);

    if (!sender || !receiver) {
      throw new CustomError(HTTP_STATUS.NOT_FOUND.statusCode, 'Sender or Receiver not found');
    }

    // Check if seller is trying to initiate a conversation
    if (sender.role === ROLES.SELLER && !sender.participants.includes(receiverId)) {
      throw new CustomError(HTTP_STATUS.FORBIDDEN.statusCode, 'Sellers can only reply to existing conversations');
    }

    // Update participants list
    await UserService.updateParticipants(senderId, receiverId);
    await UserService.updateParticipants(receiverId, senderId);

    // Create and save message
    const newMessage = new Chats({
      senderId,
      receiverId,
      ...messageData,
    });

    return await newMessage.save();
  }
}

export default ChatService;
