import { NextFunction, Request, Response } from "express";

const responseHandler = (
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      return next(err);
    }
  };
};
export default responseHandler;
