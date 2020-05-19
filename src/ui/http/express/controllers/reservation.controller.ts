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
import role from "../middlewares/role";
import { Role } from '../../../../domain/models/Role';


@controller("/category")
export class CategoryController implements interfaces.Controller {
  constructor( 
    protected readonly _jwtUtil: JWTToken
  ) {}

  @httpGet("/", role(Role.company))
  public async index(@request() req: Request, @response() res: Response) {
    const data = await this._categoryService.execute();

    if (!data) {
      throw new Error("No data");
    }

    return data
  }

}
