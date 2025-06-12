import mongoose from 'mongoose';

const messageModel = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    body: {
      type: String,
      trim: true,
      required: true,
    },
    chat: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Chat',
    },
  },
  { timestamps: true }
);

const Message = mongoose.model('Message', messageModel);

export default Message;
