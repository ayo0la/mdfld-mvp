// src/models/chat.model.ts
import mongoose from 'mongoose';

export interface ChatDocument extends mongoose.Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  message: string;
  image?: string;
  read: boolean;
  createdAt: Date;
}

const chatSchema = new mongoose.Schema<ChatDocument>(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model<ChatDocument>('Chat', chatSchema);

export default Chat;
