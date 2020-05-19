import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  request,
  response,
  queryParam,
  requestParam,
} from "inversify-express-utils";

import { GetAllCategoryService } from "../../../../application/category/GetAllCategoryService";
import { AddCategoryService } from "../../../../application/category/AddCategoryService";
import { CategoryRequest } from "../../../../application/category/AddCategoryRequest";
import { sendSuccessResponse } from "../utils/response";
import role from "../middlewares/role";
import { Role } from "../../../../domain/models/Role";
import { GetAllAssetService } from "../../../../application/asset/GetAllAssetService";
import { RegisterAssetService } from "../../../../application/asset/RegisterAssetService";
import RegisterAssetRequest from "../../../../application/asset/RegisterAssetRequest";
import { FindAssetByIdService } from "../../../../application/asset/FindAssetByIdService";

@controller("/asset")
export class AssetController implements interfaces.Controller {
  constructor(
    protected readonly _getAllAssetService: GetAllAssetService,
    protected readonly _findAssetByIdService: FindAssetByIdService,
    protected readonly _addAssetService: RegisterAssetService
  ) {}

  @httpGet("/", role(Role.company))
  public async index(@request() req: Request, @response() res: Response) {
    const { company } = req.user;
    const data = await this._getAllAssetService.execute(company.id);

    if (!data) {
      throw new Error("No data");
    }

    sendSuccessResponse(res, "", data);
  }

  @httpGet("/:id", role(Role.company))
  public async list(@request() req: Request, @response() res: Response) {
    let params = req.params as GetByIdParams;
    const data = await this._findAssetByIdService.execute(params.id);

    if (!data) {
      throw new Error("No data");
    }

    sendSuccessResponse(res, "", data);
  }

  @httpPost("/", role(Role.company))
  public async add(@request() req: Request, @response() res: Response) {
    const {
      group_id,
      name,
      type_id,
      growth_type_id,
      growth_rate,
      class_id,
      consumption_type_id,
      category_id,
      manufacturer,
      capacity,
      capacity_unit,
      serial_number,
      price,
      manufacture_date,
      installation_date,
      custom_fields,
      start_date,
      long,
      periodic,
    } = req.body;
    const data = await this._addAssetService.execute(
      new RegisterAssetRequest(
        group_id,
        name,
        type_id,
        growth_type_id,
        growth_rate,
        class_id,
        consumption_type_id,
        category_id,
        manufacturer,
        capacity,
        capacity_unit,
        serial_number,
        price,
        manufacture_date,
        installation_date,
        custom_fields,
        start_date,
        long,
        periodic
      )
    );

    sendSuccessResponse(res, "Register asset success", data);
  }
}
