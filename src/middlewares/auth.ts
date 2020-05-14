import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../helpers/response";
import { AuthenticationError } from "../helpers/error";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new AuthenticationError();
  }

  next();
};
