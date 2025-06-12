import { Router } from 'express';
import { authRouter } from './routers/auth.router';
import { chatRouter } from './routers/chat.router';

export const appRouter = Router();

appRouter.use('/auth', authRouter);
appRouter.use('/chat', chatRouter);
