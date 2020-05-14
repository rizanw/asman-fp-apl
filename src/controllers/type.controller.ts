import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../helpers/response";
import Type from "../models/type";

class TypeController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      let types = await Type.findAll();

      sendSuccessResponse(res, "", types);
    } catch (error) {
      next(error);
    }
  }
}

export default new TypeController();
