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
import { RegisterCompanyService } from "src/application/company/RegisterCompanyService";
import { RegisterCompanyRequest } from "src/application/company/RegisterCompanyRequest";
import { sendSuccessResponse } from "../utils/response";

@controller("/companies")
export class CompanyController implements interfaces.Controller {
  constructor(
    protected readonly getAllCompanyService: GetAllCompanyService,
    protected readonly registerCompanyService: RegisterCompanyService
  ) {}

  @httpGet("/", role(Role.super_admin))
  public async index(req: Request, res: Response) {
    const companies = await this.getAllCompanyService.execute();

    sendSuccessResponse(res, "", companies);
  }

  @httpPost("/", role(Role.super_admin))
  public async create(req: Request, res: Response) {
    const {
      name,
      email,
      tel,
      address,
      latitude,
      longitude,
      username,
      password,
    } = req.body;

    const company = await this.registerCompanyService.execute(
      new RegisterCompanyRequest(
        name,
        email,
        tel,
        address,
        latitude,
        longitude,
        username,
        password
      )
    );

    sendSuccessResponse(res, "Register company success", company);
  }
}
