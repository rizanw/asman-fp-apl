import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../helpers/response";
import Class from "../models/class";

class ClassController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      let classes = await Class.findAll();

      sendSuccessResponse(res, "", classes);
    } catch (error) {
      next(error);
    }
  }
}

export default new ClassController();
