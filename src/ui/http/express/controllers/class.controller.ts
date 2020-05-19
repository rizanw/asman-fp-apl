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
import { GetAllClassService } from "../../../../application/class/GetAllClassService";
import { sendSuccessResponse } from "../utils/response";

@controller("/class")
export class ClassController implements interfaces.Controller {
  constructor(protected readonly _classController: GetAllClassService) {}

  @httpGet("/", role(Role.company))
  public async index(@request() req: Request, @response() res: Response) {
    const data = await this._classController.execute();

    if (!data) {
      throw new Error("No data");
    }
    sendSuccessResponse(res, "", data);
  }
}
