import express from 'express';
import { getChatsList, getMessages, sendMessage } from '../../controllers/chat/chat.controller.js';
import { checkChatAuthentication } from '../../middlewares/auth.middleware.js';
export const chatRouter = express.Router();

chatRouter.get('/users', checkChatAuthentication, getChatsList);
chatRouter.get('/:id', checkChatAuthentication, getMessages);
chatRouter.post('/send_message/:id', checkChatAuthentication, sendMessage);
