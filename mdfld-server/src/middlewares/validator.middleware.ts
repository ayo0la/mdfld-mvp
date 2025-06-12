import { NextFunction, Request, Response } from 'express';
import { Schema } from 'zod';

export const requestValidate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = schema.parse(req.body ? req.body : {});
    req.body = data;
    return next();
  };
};

export const queryValidate = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = schema.parse(req.query ? req.query : {});
    req.query = data;
    return next();
  };
};
