import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  request,
  response,
} from "inversify-express-utils";

import { GetAllCategoryService } from "../../../../application/category/GetAllCategoryService";
import { AddCategoryService } from "../../../../application/category/AddCategoryService";
import { CategoryRequest } from "../../../../application/category/AddCategoryRequest";
import { sendSuccessResponse } from "../utils/response";
import role from "../middlewares/role";
import { Role } from "../../../../domain/models/Role";
import { removeTicks } from "sequelize/types/lib/utils";

@controller("/categories")
export class CategoryController implements interfaces.Controller {
  constructor(
    protected readonly _categoryService: GetAllCategoryService,
    protected readonly _addCategoryService: AddCategoryService
  ) {}

  @httpGet("/", role(Role.company))
  public async index(@request() req: Request, @response() res: Response) {
    const { company } = req.user;
    const data = await this._categoryService.execute(company.id);

    if (!data) {
      throw new Error("No data");
    }

    sendSuccessResponse(res, "", data);
  }

  @httpPost("/", role(Role.company))
  public async add(@request() req: Request, @response() res: Response) {
    const { company } = req.user;
    const { name } = req.body; 
    const data = await this._addCategoryService.execute(
      new CategoryRequest(company.id, name)
    );

    sendSuccessResponse(res, "Register category success", data);
  }
}
