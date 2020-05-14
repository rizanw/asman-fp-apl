import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../helpers/response";
import GrowthType from "../models/growthType";

class GrowthTypeController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      let types = await GrowthType.findAll();

      sendSuccessResponse(res, "", types);
    } catch (error) {
      next(error);
    }
  }
}

export default new GrowthTypeController();
