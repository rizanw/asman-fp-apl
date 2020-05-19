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
import { GetAllCategoryService } from '../../../../application/category/GetAllCategoryService';
import { AddCategoryService } from '../../../../application/category/AddCategoryService';
import { CategoryRequest } from "../../../../application/category/CategoryRequest";
import { sendSuccessResponse } from '../utils/response';

@controller("")
export class CategoryController implements interfaces.Controller {
  constructor(
    protected readonly _categoryService: GetAllCategoryService,
    protected readonly _addCategoryService: AddCategoryService,
    protected readonly _jwtUtil: JWTToken
  ) {}

  @httpGet("/category")
  public async index(@request() req: Request, @response() res: Response) {
    const data = await this._categoryService.execute();

    if (!data) {
      throw new Error("No data");
    }

    return data
  }

  @httpPost("/category")
  public async add(@request() req: Request, @response() res: Response) {
    const { company_id,name } = req.body;
    const data = await this._addCategoryService.execute(
      new CategoryRequest(company_id, name)
    );

    sendSuccessResponse(res, "Register category success", data);
  }
}
