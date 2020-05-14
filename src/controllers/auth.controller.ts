import { Request, Response, NextFunction } from "express";
import { generateToken } from "../helpers/jwt";
import { sendSuccessResponse } from "../helpers/response";
import User from "../models/user";
import { AuthenticationError } from "../helpers/error";

class AuthController {
  public async login(req: Request, res: Response, next: NextFunction) {
    const { username, password } = req.body;
    try {
      let user = await User.findOne({
        where: {
          username: username,
        },
        include: [
          {
            association: User.associations.company
          }
        ]
      });

      if (!user) {
        throw new AuthenticationError("Username or password incorrect.");
      }

      if (!(await user.verifyPassword(password))) {
        throw new AuthenticationError("Username or password incorrect.");
      }

      let token = generateToken(user.id);

      sendSuccessResponse(res, "", {
        token: token,
        token_type: "Bearer",
        user: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();
