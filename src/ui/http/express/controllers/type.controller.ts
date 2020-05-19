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
import { GetAllTypeService } from "../../../../application/type/GetAllTypeService";
import { sendSuccessResponse } from "../utils/response";

@controller("/types")
export class TypeController implements interfaces.Controller {
  constructor(protected readonly _typeService: GetAllTypeService) {}

  @httpGet("/", role(Role.company))
  public async index(@request() req: Request, @response() res: Response) {
    const data = await this._typeService.execute();

    if (!data) {
      throw new Error("No data");
    }
    sendSuccessResponse(res, "", data);
  }
}
