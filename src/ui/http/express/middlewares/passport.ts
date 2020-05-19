import passport from "passport";
import { NextFunction, Request, Response } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    req.user = user;
    next();
  })(req, res, next);
};
