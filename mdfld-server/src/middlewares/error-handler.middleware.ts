import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { HTTP_STATUS } from "../constants/http-status.constant.js";

import logger from "../utils/common/logger.util.js";
import CustomError from "../utils/common/error.util.js";
import ResponseUtils from "../utils/common/response.util.js";

const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof CustomError) {
    const errStatus =
      err.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR.statusCode;
    const errMsg = err.message || "Something went wrong";
    const errMetaData = err.metaData;
    logger.error(`${errMsg}: ${err?.statusCode}\n Stack:${err?.stack}`);
    if (errStatus === HTTP_STATUS.BAD_REQUEST.statusCode) {
      ResponseUtils.badRequest(res, errMsg, null, errMetaData);
    } else if (errStatus === HTTP_STATUS.UNAUTHORIZED.statusCode) {
      ResponseUtils.unauthorized(res, errMsg, null, errMetaData);
    } else if (errStatus === HTTP_STATUS.FORBIDDEN.statusCode) {
      ResponseUtils.forbidden(res, errMsg, null, errMetaData);
    } else if (errStatus === HTTP_STATUS.PAYMENT_REQUIRED.statusCode) {
      ResponseUtils.paymentRequired(res, errMsg, null, errMetaData);
    } else if (errStatus === HTTP_STATUS.NOT_FOUND.statusCode) {
      ResponseUtils.notFound(res, errMsg, null, errMetaData);
    } else if (errStatus === HTTP_STATUS.CONFLICT.statusCode) {
      ResponseUtils.conflict(res, errMsg, null, errMetaData);
    } else {
      ResponseUtils.internalServerError(res, errMsg, null, errMetaData);
    }
  } else if (err instanceof ZodError) {
    const fieldErrors = err.flatten()?.fieldErrors;
    const errorKeys = Object.values(fieldErrors);
    const errMsg = errorKeys[0]?.length ? errorKeys[0][0] : [];
    logger.error(
      `${errorKeys}: ${HTTP_STATUS.VALIDATION_ERROR.statusCode}\n Stack:${err?.stack}`
    );
    ResponseUtils.validationError(res, `${errMsg}`);
  } else {
    const errMsg = err.message || "Something went wrong";
    logger.error(`${errMsg}: ${err?.statusCode}\n Stack:${err?.stack}`);
    ResponseUtils.internalServerError(res, "Something went wrong");
  }
};

export default errorHandler;
