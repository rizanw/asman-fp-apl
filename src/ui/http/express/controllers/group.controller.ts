import { Request, Response } from "express";
import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  request,
  response,
} from "inversify-express-utils";
import { GetAllCompanyService } from "src/application/company/GetAllCompanyService";
import role from "../middlewares/role";
import { Role } from "src/domain/models/Role";
import { sendSuccessResponse } from "../utils/response";
import { GetAllIndukService } from "../../../../application/group/GetAllIndukService";
import { RegisterGroupIndukService } from "../../../../application/group/RegisterGroupIndukService";
import { RegisterGroupRequest } from "../../../../application/group/RegisterGroupRequest";
import { GetAllSubIndukService } from "../../../../application/group/GetAllSubIndukService";
import { RegisterGroupSubIndukService } from "../../../../application/group/RegisterGroupSubIndukService";
import { GetAllEquipmentService } from "../../../../application/group/GetAllEquipmentService";
import { RegisterGroupEquipmentService } from "../../../../application/group/RegisterGroupEquipmentService";

@controller("")
export class GroupController implements interfaces.Controller {
  constructor(
    protected readonly getAllIndukService: GetAllIndukService,
    protected readonly registerGroupIndukService: RegisterGroupIndukService,
    protected readonly getAllSubIndukService: GetAllSubIndukService,
    protected readonly registerGroupSubIndukService: RegisterGroupSubIndukService,
    protected readonly getAllEquipmentService: GetAllEquipmentService,
    protected readonly registerGroupEquipmentService: RegisterGroupEquipmentService
  ) {}

  @httpGet("/induk", role(Role.company))
  public async index(req: Request, res: Response) {
    const { company_id } = req.user;
    const data = await this.getAllIndukService.execute(company_id);

    sendSuccessResponse(res, "", data);
  }

  @httpPost("/induk", role(Role.company))
  public async create(req: Request, res: Response) {
    const { company_id } = req.user;
    const { parent_id, name, tel, address, latitude, longitude } = req.body;

    const data = await this.registerGroupIndukService.execute(
      new RegisterGroupRequest(
        company_id,
        name,
        tel,
        address,
        latitude,
        longitude,
        parent_id
      )
    );

    sendSuccessResponse(res, "Register induk success", data);
  }

  @httpGet("/subinduk", role(Role.company))
  public async index(req: Request, res: Response) {
    const { company_id } = req.user;
    const data = await this.getAllSubIndukService.execute(company_id);

    sendSuccessResponse(res, "", data);
  }

  @httpPost("/subinduk", role(Role.company))
  public async create(req: Request, res: Response) {
    const { company_id } = req.user;
    const { parent_id, name, tel, address, latitude, longitude } = req.body;

    const data = await this.registerGroupSubIndukService.execute(
      new RegisterGroupRequest(
        company_id,
        name,
        tel,
        address,
        latitude,
        longitude,
        parent_id
      )
    );

    sendSuccessResponse(res, "Register induk success", data);
  }
  @httpGet("/equipment", role(Role.company))
  public async index(req: Request, res: Response) {
    const { company_id } = req.user;
    const data = await this.getAllSubIndukService.execute(company_id);

    sendSuccessResponse(res, "", data);
  }

  @httpPost("/equipment", role(Role.company))
  public async create(req: Request, res: Response) {
    const { company_id } = req.user;
    const { parent_id, name, tel, address, latitude, longitude } = req.body;

    const data = await this.registerGroupEquipmentService.execute(
      new RegisterGroupRequest(
        company_id,
        name,
        tel,
        address,
        latitude,
        longitude,
        parent_id
      )
    );

    sendSuccessResponse(res, "Register induk success", data);
  }
}
