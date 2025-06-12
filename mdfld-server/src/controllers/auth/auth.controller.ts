import { NextFunction, Request, Response } from 'express';

import { HTTP_STATUS } from '../../constants/http-status.constant.js';

import CustomError from '../../utils/common/error.util.js';
import TokenUtility from '../../utils/token-utility.js';
import StringUtils from '../../utils/common/string.util.js';
import ResponseUtils from '../../utils/common/response.util.js';
import MailTemplates from '../../utils/mail-template.utils.js';

import UserService from '../../services/user/user.service.js';
import AuthService from '../../services/user/auth.service.js';
import MailgunService from '../../services/mailgun.service.js';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.body.email;
  const checkLogin = await AuthService.login(req.body);
  if (!checkLogin) {
    const loginError = new CustomError(HTTP_STATUS.BAD_REQUEST.statusCode, 'Invalid username/password');
    return next(loginError);
  }
  // auth token for protected routes

  const [token, userData] = await Promise.all([
    TokenUtility.generateAccessToken({ email }),
    UserService.findByEmail(email),
  ]);
  ResponseUtils.success(ResponseUtils.addCookies(res, 'access_token', token), 'Login successfull', userData);
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const existingUser = await UserService.findByEmail(email);
  if (existingUser?.verified) {
    const registerError = new CustomError(HTTP_STATUS.CONFLICT.statusCode, 'User already registered');
    return next(registerError);
  }
  await AuthService.register(req.body, req.file as Express.Multer.File);
  const token = await TokenUtility.generateAccessToken({ email }, '1h');

  let url = `${process.env.MY_DOMAIN}/auth/login?regToken=${token}`;
  const name = StringUtils.getEmailFirstComponent(email);
  const body = MailTemplates.registerLink(url, name);
  const contextData = {
    domain: `${process.env.MAILGUN_DOMAIN}`,
    from: `Marketplace <${process.env.MAILGUN_SENDER}>`,
    to: [email],
    subject: 'Welcome User!',
    body: body.html,
  };

  await MailgunService.sendMail(contextData);
  ResponseUtils.success(res);
};

export const validateUserRegistration = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.email as string;
  // user validation promise
  await Promise.all([AuthService.validateUserRegistration(email)]);

  // auth token for protected routes
  const [token /*userData*/] = await Promise.all([
    TokenUtility.generateAccessToken({ email }),
    // UserUtils.getProfileData(email),
  ]);
  ResponseUtils.success(
    ResponseUtils.addCookies(res, 'access_token', token),
    'Login successfull'
    // userData
  );
};

export const userProfile = async (req: Request, res: Response, next: NextFunction) => {
  const email = req.email as string;
  const userData = await UserService.findByEmail(email);
  ResponseUtils.success(res, 'User Profile Fetched Successfully', userData);
};
