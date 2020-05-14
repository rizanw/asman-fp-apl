import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { NextFunction, Request, Response } from "express";
import User from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET || "secret";
const strategy = new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  },
  async (payload, done) => {
    try {
      const user = await User.findByPk(payload.sub);

      if (!user) {
        return done(null, false);
      }

      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);

passport.use(strategy);

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    req.user = user;
    next();
  })(req, res, next);
};
