import { Router } from 'express';
import ApiValidator from '../../validators/index.js';

import responseHandler from '../../middlewares/response-handler.middleware';
import { login, register, userProfile, validateUserRegistration } from '../../controllers/auth/auth.controller';
import { checkAuthentication, checkRegisterAuth } from '../../middlewares/auth.middleware';
import { requestValidate } from '../../middlewares/validator.middleware';
import multer from 'Multer';

const upload = multer({ storage: multer.memoryStorage() });

export const authRouter = Router();

authRouter.post('/login', requestValidate(ApiValidator.authValidator.login), responseHandler(login));
authRouter.post(
  '/register',
  upload.single('image'),
  requestValidate(ApiValidator.authValidator.register),
  responseHandler(register)
);
authRouter.post('/validate', checkRegisterAuth, responseHandler(validateUserRegistration));
authRouter.post('/me', checkAuthentication, responseHandler(userProfile));
