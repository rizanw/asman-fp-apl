import { Request, Response, NextFunction } from "express";

export default (role: string | string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      throw new Error("Unauthenticated");
    }

    const userRole = (req.user as any).role;
    if (!(userRole == role || role.includes(userRole))) {
      throw new Error("Unauthorized");
    }

    next();
  };
};
