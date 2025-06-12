import { Response } from "express";
import { HTTP_STATUS } from "../../constants/http-status.constant.js";
import { THTTP } from "../../types/http-status.type.js";

export type IMESSAGE = {
  statusCode: number;
  status: string;
  description: string | undefined;
};
class ResponseUtils {
  static sendResponse(
    res: Response,
    httpStatus: THTTP,
    resMessage?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return res.status(httpStatus.statusCode).json({
      message: {
        ...httpStatus,
        description: resMessage,
      },
      data,
      metaData,
    });
  }

  static success(
    res: Response,
    message?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return this.sendResponse(res, HTTP_STATUS.SUCCESS, message, data, metaData);
  }

  static badRequest(
    res: Response,
    message?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return this.sendResponse(
      res,
      HTTP_STATUS.BAD_REQUEST,
      message,
      data,
      metaData
    );
  }

  static unauthorized(
    res: Response,
    message?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return this.sendResponse(
      res,
      HTTP_STATUS.UNAUTHORIZED,
      message,
      data,
      metaData
    );
  }

  static forbidden(
    res: Response,
    message?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return this.sendResponse(
      res,
      HTTP_STATUS.FORBIDDEN,
      message,
      data,
      metaData
    );
  }

  static paymentRequired(
    res: Response,
    message?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return this.sendResponse(
      res,
      HTTP_STATUS.PAYMENT_REQUIRED,
      message,
      data,
      metaData
    );
  }

  static notFound(
    res: Response,
    message?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return this.sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      message,
      data,
      metaData
    );
  }

  static conflict(
    res: Response,
    message?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return this.sendResponse(
      res,
      HTTP_STATUS.CONFLICT,
      message,
      data,
      metaData
    );
  }

  static internalServerError(
    res: Response,
    message?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return this.sendResponse(
      res,
      HTTP_STATUS.INTERNAL_SERVER_ERROR,
      message,
      data,
      metaData
    );
  }

  static validationError(
    res: Response,
    message?: string,
    data?: unknown,
    metaData?: unknown
  ): Response {
    return this.sendResponse(
      res,
      HTTP_STATUS.VALIDATION_ERROR,
      message,
      data,
      metaData
    );
  }

  static addCookies(
    res: Response,
    cookieName: string,
    token: string,
    cookieExpiry?: number
  ): Response {
    return res.cookie(cookieName, token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: cookieExpiry || 30 * 24 * 60 * 60 * 1000,
    });
  }

  static clearCookies(res: Response, cookieName: string): Response {
    return res.clearCookie(cookieName);
  }
}
export default ResponseUtils;
