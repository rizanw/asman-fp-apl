import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  request,
  response,
} from "inversify-express-utils";

import role from "../middlewares/role";
import { Role } from "../../../../domain/models/Role";
import { GetAllGrowthTypeService } from "../../../../application/growthType/GetAllGrowthTypeService";
import { sendSuccessResponse } from "../utils/response";

@controller("/growth-types")
export class GrowthTypeController implements interfaces.Controller {
  constructor(protected readonly _growthTypeService: GetAllGrowthTypeService) {}

  @httpGet("/", role(Role.company))
  public async index(@request() req: Request, @response() res: Response) {
    const data = await this._growthTypeService.execute();

    if (!data) {
      throw new Error("No data");
    }
    sendSuccessResponse(res, "", data);
  }
}
