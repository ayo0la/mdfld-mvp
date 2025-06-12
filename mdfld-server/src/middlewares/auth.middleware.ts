import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { HTTP_STATUS } from '../constants/http-status.constant';
import CustomError from '../utils/common/error.util';
import UserService from '../services/user/user.service';
import { UserDocuments } from '../models/user.model';

export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      const tokenNotFoundError = new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, 'Token not found');
      return next(tokenNotFoundError);
    }
    const data = jwt.verify(token, process.env.ACCESS_TOKEN as string) as JwtPayload;

    if (data.email && typeof data.email === 'string') {
      req.email = data.email.toLowerCase();
    } else {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, 'Invalid token payload.');
    }
    return next();
  } catch (err) {
    if (err instanceof Error) {
      const invalidToken = new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, err.message);
      return next(invalidToken);
    } else {
      return next(err);
    }
  }
};

export const checkChatAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.access_token;
    if (!token) {
      const tokenNotFoundError = new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, 'Token not found');
      return next(tokenNotFoundError);
    }
    const data = jwt.verify(token, process.env.ACCESS_TOKEN as string) as JwtPayload;
    if (data.email && typeof data.email === 'string') {
      req.email = data.email.toLowerCase();
      const user = (await UserService.findByEmail(req.email)) as UserDocuments;
      if (!user) {
        const userNotFoundError = new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, 'User not found.');
        return next(userNotFoundError);
      }

      if (!user.verified) {
        const userNotVerifiedError = new CustomError(
          HTTP_STATUS.UNAUTHORIZED.statusCode,
          'Verify your email to access this feature.'
        );
        return next(userNotVerifiedError);
      }
    } else {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, 'Invalid token payload.');
    }
    return next();
  } catch (err) {
    if (err instanceof Error) {
      const invalidToken = new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, err.message);
      return next(invalidToken);
    } else {
      return next(err);
    }
  }
};

export const checkRegisterAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.body.regToken;
    if (!token) {
      const tokenError = new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, 'Invalid access token');
      return next(tokenError);
    }
    const data = jwt.verify(token, process.env.ACCESS_TOKEN as string) as JwtPayload;
    if (data.email && typeof data.email === 'string') {
      req.email = data.email.toLowerCase();
    } else {
      throw new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, 'Invalid token payload.');
    }
    return next();
  } catch (err) {
    if (err instanceof Error) {
      const invalidToken = new CustomError(HTTP_STATUS.UNAUTHORIZED.statusCode, err.message);
      return next(invalidToken);
    } else {
      return next(err);
    }
  }
};
