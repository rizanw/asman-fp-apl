import { Request, Response, NextFunction } from "express";
import { sendErrorResponse } from "../helpers/response";
import { AuthenticationError, AuthorizationError } from "../helpers/error";

export default (role: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new AuthenticationError();
    }

    const userRole = (req.user as any).role;
    if (!(userRole == role || role.includes(userRole))) {
      throw new AuthorizationError();
    }

    next();
  };
};
