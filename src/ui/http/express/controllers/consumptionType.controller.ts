import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  request,
  response,
} from "inversify-express-utils";

import { JWTToken } from "../utils/JWTToken";
import { GetAllConsumptionTypeService } from '../../../../application/consumptionType/GetAllConsumptionTypeService';

@controller("")
export class ConsumptionTypeController implements interfaces.Controller {
  constructor(
    protected readonly _consumptionTypeService: GetAllConsumptionTypeService,
    protected readonly _jwtUtil: JWTToken
  ) {}

  @httpGet("/consumption")
  public async index(@request() req: Request, @response() res: Response) {
    const { username, password } = req.body;
    const data = await this._consumptionTypeService.execute();

    if (!data) {
      throw new Error("No data");
    }

    return data
  }
}
