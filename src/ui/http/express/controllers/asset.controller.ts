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
  httpDelete,
  httpPut,
} from "inversify-express-utils";

import { GetAllCategoryService } from "../../../../application/category/GetAllCategoryService";
import { AddCategoryService } from "../../../../application/category/AddCategoryService";
import { CategoryRequest } from "../../../../application/category/AddCategoryRequest";
import { sendSuccessResponse, sendErrorResponse } from "../utils/response";
import role from "../middlewares/role";
import { Role } from "../../../../domain/models/Role";
import { GetAllAssetService } from "../../../../application/asset/GetAllAssetService";
import { RegisterAssetService } from "../../../../application/asset/RegisterAssetService";
import RegisterAssetRequest from "../../../../application/asset/RegisterAssetRequest";
import { FindAssetByIdService } from "../../../../application/asset/FindAssetByIdService";
import { DeleteAssetService } from "../../../../application/asset/DeleteAssetService";
import { EditAssetService } from "../../../../application/asset/EditAssetService";
import { SetServicePlanAssetService } from "../../../../application/asset/SetServicePlanAssetService";
import SetServicePlanAssetRequest from "../../../../application/asset/SetServicePlanAssetRequest";
import RegisterAssetCSVRequest from "../../../../application/asset/RegisterAssetCSVRequest";
import { RegisterAssetCSVService } from "../../../../application/asset/RegisterAssetCSVService";
import multer from "multer";

const upload = multer({ dest: "uploads" });

@controller("/assets")
export class AssetController implements interfaces.Controller {
  constructor(
    protected readonly _getAllAssetService: GetAllAssetService,
    protected readonly _findAssetByIdService: FindAssetByIdService,
    protected readonly _addAssetService: RegisterAssetService,
    protected readonly _addAssetCSVService: RegisterAssetCSVService,
    protected readonly _deleteAssetService: DeleteAssetService,
    protected readonly _editAssetService: EditAssetService,
    protected readonly _editServicePlanAssetService: SetServicePlanAssetService
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
    const { company } = req.user;
    const data = await this._findAssetByIdService.execute(
      company.id,
      params.id
    );

    if (!data) {
      sendErrorResponse(res, "Asset not found.", 404);
    }

    sendSuccessResponse(res, "", data);
  }

  @httpPost("/csv", upload.single("csv"), role(Role.company))
  public async addByCSV(@request() req: Request, @response() res: Response) {
    const { csv } = req.body;
    const data = await this._addAssetCSVService.execute(
      new RegisterAssetCSVRequest(csv)
    );
    sendSuccessResponse(res, "Register asset CSV success", data);
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

  @httpPut("/:id", role(Role.company))
  public async update(@request() req: Request, @response() res: Response) {
    let params = req.params as GetByIdParams;
    const { company } = req.user;
    const bodyParams = req.body;
    const data = await this._editAssetService.execute(params.id, bodyParams);

    if (!data) {
      sendErrorResponse(res, "Asset not found.", 404);
    }

    sendSuccessResponse(res, "Update asset success", data);
  }

  @httpPost("/:id/service-plan", role(Role.company))
  public async updateServicePlan(
    @request() req: Request,
    @response() res: Response
  ) {
    let params = req.params as GetByIdParams;
    const { company } = req.user;
    const { start_date, long, periodic } = req.body;
    const data = await this._editServicePlanAssetService.execute(
      new SetServicePlanAssetRequest(params.id, start_date, long, periodic)
    );

    if (!data) {
      sendErrorResponse(res, "Asset not found.", 404);
    }

    sendSuccessResponse(res, "Update service plan asset success", data);
  }

  @httpDelete("/:id", role(Role.company))
  public async delete(@request() req: Request, @response() res: Response) {
    let params = req.params as GetByIdParams;
    const { company } = req.user;
    const data = await this._deleteAssetService.execute(params.id);

    if (!data) {
      sendErrorResponse(res, "Asset not found.", 404);
    }

    sendSuccessResponse(res, "Delete asset success", data);
  }
}
