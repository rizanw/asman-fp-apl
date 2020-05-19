import { Request, Response, NextFunction } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (!req.user) {
    throw new Error("Unauthenticated");
  }

  next();
};
