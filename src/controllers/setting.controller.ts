import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../helpers/response";
import User from "../models/user";
import bcrypt from "bcrypt";

class SettingController {
    public async updatePassword(req: Request, res: Response, next: NextFunction) {
        try {
            const { old_password, password, password_confirmation } = req.body;
            let user: User = req.user as User;

            if (password != password_confirmation) {
                throw new Error("Password confirmation doesn't match Password")
            }

            if (!await user.verifyPassword(old_password)) {
                throw new Error("Password incorrect");
            }
            
            let hashed = bcrypt.hashSync(password, 10);
            await user.update({
                password: hashed
            });

            sendSuccessResponse(res, "Password has been updated");
        } catch (error) {
            next(error);
        }
    }
}

export default new SettingController();
