import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  request,
  response,
} from "inversify-express-utils";

import { GetAllConsumptionTypeService } from "../../../../application/consumptionType/GetAllConsumptionTypeService";
import role from "../middlewares/role";
import { Role } from "../../../../domain/models/Role";

@controller("/consumption-type")
export class ConsumptionTypeController implements interfaces.Controller {
  constructor(
    protected readonly _consumptionTypeService: GetAllConsumptionTypeService
  ) {}

  @httpGet("/", role(Role.company))
  public async index(@request() req: Request, @response() res: Response) {
    const data = await this._consumptionTypeService.execute();

    if (!data) {
      throw new Error("No data");
    }

    return data;
  }
}
