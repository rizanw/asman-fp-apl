import { Request, Response, NextFunction } from "express";
import { sendSuccessResponse } from "../helpers/response";
import ConsumptionType from "../models/consumptionType";

class ConsumptionTypeController {
  public async index(req: Request, res: Response, next: NextFunction) {
    try {
      let types = await ConsumptionType.findAll();

      sendSuccessResponse(res, "", types);
    } catch (error) {
      next(error);
    }
  }
}

export default new ConsumptionTypeController();
